-- 기존 리드가 다시 제출한 계산 결과를 영업 담당자가 볼 수 있게 하는 뷰.
--
-- /api/leads/capture 는 공개 엔드포인트라 이미 있는 이메일이면 leads 행을 바꾸지
-- 않고, 다시 보낸 값을 email_events(event_type = 'resubmitted')에만 남긴다(PR #31).
-- 이 뷰는 리드마다 가장 최근 재제출 1건을 저장된 값과 나란히 보여준다.
--
-- 보안
-- - security_invoker: 조회하는 역할의 권한·RLS 로 실행한다(뷰 소유자 권한 우회 방지).
-- - anon·authenticated 에는 권한을 주지 않는다. 대시보드(postgres)·service_role 만 조회.
-- - event_data 는 검증되지 않은 공개 입력이다. 숫자·불리언은 JSON 타입이 맞을 때만
--   꺼내고, 아니면 NULL 로 둔다(잘못된 값 하나가 뷰 전체 조회를 깨지 않게).
--   이름·출처는 표시용 텍스트일 뿐이며, 리드 소유가 확인된 값이 아니다.

CREATE OR REPLACE VIEW public.lead_latest_resubmissions
WITH (security_invoker = true) AS
WITH resubmissions AS (
  SELECT
    e.id,
    e.lead_id,
    e.created_at,
    e.event_data,
    count(*) OVER (PARTITION BY e.lead_id) AS resubmission_count,
    row_number() OVER (PARTITION BY e.lead_id ORDER BY e.created_at DESC, e.id DESC) AS rn
  FROM public.email_events e
  WHERE e.event_type = 'resubmitted'
    AND e.lead_id IS NOT NULL
),
latest AS (
  SELECT
    r.*,
    r.event_data -> 'calculation' AS calc
  FROM resubmissions r
  WHERE r.rn = 1
)
SELECT
  l.id                       AS lead_id,
  l.email,
  l.name                     AS stored_name,
  latest.created_at          AS resubmitted_at,
  latest.resubmission_count,
  latest.id                  AS event_id,

  -- 다시 보낸 값(검증되지 않은 공개 입력)
  CASE WHEN jsonb_typeof(latest.event_data -> 'name') = 'string'
       THEN left(latest.event_data ->> 'name', 100) END                  AS submitted_name,
  CASE WHEN jsonb_typeof(latest.event_data -> 'source') = 'string'
       THEN left(latest.event_data ->> 'source', 50) END                 AS submitted_source,
  CASE WHEN jsonb_typeof(latest.calc -> 'totalAssets') = 'number'
       THEN (latest.calc ->> 'totalAssets')::numeric END                 AS submitted_total_assets,
  CASE WHEN jsonb_typeof(latest.calc -> 'totalDebts') = 'number'
       THEN (latest.calc ->> 'totalDebts')::numeric END                  AS submitted_total_debts,
  CASE WHEN jsonb_typeof(latest.calc -> 'netAssets') = 'number'
       THEN (latest.calc ->> 'netAssets')::numeric END                   AS submitted_net_assets,
  CASE WHEN jsonb_typeof(latest.calc -> 'estimatedTax') = 'number'
       THEN (latest.calc ->> 'estimatedTax')::numeric END                AS submitted_estimated_tax,
  CASE WHEN jsonb_typeof(latest.calc -> 'hasSpouse') = 'boolean'
       THEN (latest.calc ->> 'hasSpouse')::boolean END                   AS submitted_has_spouse,
  CASE WHEN jsonb_typeof(latest.calc -> 'numChildren') = 'number'
       THEN (latest.calc ->> 'numChildren')::numeric END                 AS submitted_num_children,
  CASE WHEN jsonb_typeof(latest.calc -> 'numMinorChildren') = 'number'
       THEN (latest.calc ->> 'numMinorChildren')::numeric END            AS submitted_num_minor_children,

  -- 리드에 저장된 값(비교용)
  l.total_assets             AS stored_total_assets,
  l.total_debts              AS stored_total_debts,
  l.net_assets               AS stored_net_assets,
  l.estimated_tax            AS stored_estimated_tax,
  l.has_spouse               AS stored_has_spouse,
  l.num_children             AS stored_num_children,
  l.num_minor_children       AS stored_num_minor_children
FROM latest
JOIN public.leads l ON l.id = latest.lead_id;

COMMENT ON VIEW public.lead_latest_resubmissions IS
  '기존 리드의 최근 재제출 계산 결과(검증되지 않은 공개 입력)와 저장된 값 비교. 영업 조회 전용, service_role·대시보드만.';

REVOKE ALL ON public.lead_latest_resubmissions FROM PUBLIC;
REVOKE ALL ON public.lead_latest_resubmissions FROM anon, authenticated, service_role;
GRANT SELECT ON public.lead_latest_resubmissions TO service_role;
