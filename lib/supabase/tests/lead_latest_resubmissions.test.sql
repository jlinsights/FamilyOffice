-- lead_latest_resubmissions 뷰 검증 (트랜잭션 안에서 실행 후 ROLLBACK — 데이터를 남기지 않는다)
--
-- 운영 DB 에서 돌리지 말 것. 로컬·임시 Postgres 에서:
--   1) Supabase 와 같은 역할·기본 권한·auth 스텁을 만든다
--        create role anon nologin; create role authenticated nologin;
--        create role service_role nologin bypassrls;
--        grant usage on schema public to anon, authenticated, service_role;
--        alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
--        create schema auth;
--        create function auth.jwt() returns jsonb language sql stable as
--          $$ select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
--        create function auth.role() returns text language sql stable as $$ select auth.jwt() ->> 'role' $$;
--   2) lib/supabase/migrations/20250127_email_automation_schema.sql
--   3) lib/supabase/migrations/20261114_create_lead_latest_resubmissions_view.sql
--   4) psql -f lib/supabase/tests/lead_latest_resubmissions.test.sql
--      → BEHAVIOUR_OK, ANON_DENIED, AUTHENTICATED_DENIED, SERVICE_ROLE_OK, SERVICE_ROLE_READONLY
\set ON_ERROR_STOP 1
begin;
insert into leads (id, email, name, total_assets, estimated_tax) values
  ('00000000-0000-0000-0000-00000000000a', 'a@x.org', '김원래', null, null),
  ('00000000-0000-0000-0000-00000000000b', 'b@x.org', '이저장', 500, 50),
  ('00000000-0000-0000-0000-00000000000c', 'c@x.org', '박없음', null, null);
-- a: two resubmissions, latest wins
insert into email_events (lead_id, event_type, created_at, event_data) values
  ('00000000-0000-0000-0000-00000000000a', 'resubmitted', now() - interval '2 day',
   '{"name":"old","calculation":{"totalAssets":100,"estimatedTax":10}}'),
  ('00000000-0000-0000-0000-00000000000a', 'resubmitted', now() - interval '1 day',
   '{"name":"새이름","source":"inheritance_tax_calculator","calculation":{"totalAssets":3000000000,"totalDebts":0,"netAssets":3000000000,"estimatedTax":450000000.5,"hasSpouse":true,"numChildren":2}}'),
  -- b: hostile/garbage types must become NULL, not break the view
  ('00000000-0000-0000-0000-00000000000b', 'resubmitted', now(),
   '{"name":{"x":1},"source":123,"calculation":{"totalAssets":"9e99","estimatedTax":[1],"hasSpouse":"yes","numChildren":"two"}}'),
  -- c: other event types only → not listed
  ('00000000-0000-0000-0000-00000000000c', 'captured', now(), '{}'),
  -- b: calculation missing entirely in an older row (ignored, older)
  ('00000000-0000-0000-0000-00000000000b', 'resubmitted', now() - interval '3 day', '{"name":"x"}');

do $$
declare r record; n int;
begin
  select count(*) into n from lead_latest_resubmissions;
  if n <> 2 then raise exception 'expected 2 leads, got %', n; end if;

  select * into r from lead_latest_resubmissions where email = 'a@x.org';
  if r.resubmission_count <> 2 then raise exception 'a count %', r.resubmission_count; end if;
  if r.submitted_name <> '새이름' or r.stored_name <> '김원래' then raise exception 'a names % / %', r.submitted_name, r.stored_name; end if;
  if r.submitted_total_assets <> 3000000000 or r.submitted_estimated_tax <> 450000000.5 then raise exception 'a numbers'; end if;
  if r.submitted_has_spouse is not true or r.submitted_num_children <> 2 then raise exception 'a spouse/children'; end if;
  if r.submitted_num_minor_children is not null then raise exception 'a minor should be null'; end if;
  if r.stored_total_assets is not null then raise exception 'a stored assets should be null'; end if;

  select * into r from lead_latest_resubmissions where email = 'b@x.org';
  if r.resubmission_count <> 2 then raise exception 'b count'; end if;
  if r.submitted_name is not null or r.submitted_source is not null then raise exception 'b text not null'; end if;
  if r.submitted_total_assets is not null or r.submitted_estimated_tax is not null
     or r.submitted_has_spouse is not null or r.submitted_num_children is not null then raise exception 'b garbage leaked'; end if;
  if r.stored_total_assets <> 500 then raise exception 'b stored'; end if;
  raise notice 'BEHAVIOUR_OK';
end $$;

-- access: anon / authenticated denied even with claims; service_role allowed
set local role anon;
do $$ begin perform 1 from lead_latest_resubmissions; raise exception 'anon could read';
exception when insufficient_privilege then raise notice 'ANON_DENIED'; end $$;
reset role;
set local role authenticated;
select set_config('request.jwt.claims', '{"email":"jhlim725@gmail.com","role":"authenticated"}', true);
do $$ begin perform 1 from lead_latest_resubmissions; raise exception 'authenticated could read';
exception when insufficient_privilege then raise notice 'AUTHENTICATED_DENIED'; end $$;
reset role;
set local role service_role;
do $$ declare n int; begin select count(*) into n from lead_latest_resubmissions;
  if n <> 2 then raise exception 'service_role saw %', n; end if; raise notice 'SERVICE_ROLE_OK'; end $$;
do $$ begin delete from lead_latest_resubmissions; raise exception 'service_role could delete';
exception when insufficient_privilege or object_not_in_prerequisite_state or feature_not_supported then raise notice 'SERVICE_ROLE_READONLY'; end $$;
reset role;
rollback;
