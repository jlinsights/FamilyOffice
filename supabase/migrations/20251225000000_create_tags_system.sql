-- Migration: Create tags and content_tags tables
-- Purpose: Enable advanced content tagging and filtering system
-- Date: 2025-12-25

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tags table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT CHECK (category IN ('primary', 'secondary', 'topic')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create content_tags junction table
CREATE TABLE IF NOT EXISTS public.content_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id TEXT NOT NULL, -- RSS item ID or blog slug
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(content_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tags_category ON public.tags(category);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON public.tags(slug);
CREATE INDEX IF NOT EXISTS idx_content_tags_content_id ON public.content_tags(content_id);
CREATE INDEX IF NOT EXISTS idx_content_tags_tag_id ON public.content_tags(tag_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for tags table
DROP TRIGGER IF EXISTS update_tags_updated_at ON public.tags;
CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON public.tags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed initial tags
-- Primary Tags (주요 주제)
INSERT INTO public.tags (name, slug, category, description) VALUES
  ('세무 전략', 'tax-strategy', 'primary', '세무 계획 및 절세 전략'),
  ('상속세', 'inheritance-tax', 'primary', '상속세 계산 및 절세'),
  ('증여세', 'gift-tax', 'primary', '증여세 계산 및 절세'),
  ('법인세', 'corporate-tax', 'primary', '법인세 계산 및 절세'),
  ('자산 관리', 'asset-management', 'primary', '자산 배분 및 관리 전략'),
  ('포트폴리오', 'portfolio', 'primary', '자산 포트폴리오 구성'),
  ('대체투자', 'alternative-investment', 'primary', '대체 투자 전략'),
  ('부동산', 'real-estate', 'primary', '부동산 투자 및 관리'),
  ('가업 승계', 'business-succession', 'primary', '가업 승계 계획 및 전략'),
  ('경영권 이전', 'management-transfer', 'primary', '경영권 승계 전략'),
  ('리스크 관리', 'risk-management', 'primary', '위험 관리 및 보험')
ON CONFLICT (slug) DO NOTHING;

-- Secondary Tags (상황별)
INSERT INTO public.tags (name, slug, category, description) VALUES
  ('급여소득자', 'salaried-employee', 'secondary', '급여 소득자 대상 정보'),
  ('사업가', 'business-owner', 'secondary', '사업가 및 기업주 대상 정보'),
  ('상장회사 대주주', 'major-shareholder-public', 'secondary', '상장회사 대주주'),
  ('비상장회사 오너', 'private-company-owner', 'secondary', '비상장회사 오너'),
  ('고액자산가', 'high-net-worth', 'secondary', '고액 순자산 보유자'),
  ('은퇴 준비', 'retirement-planning', 'secondary', '은퇴 준비 단계')
ON CONFLICT (slug) DO NOTHING;

-- Topic Tags (특정 주제)
INSERT INTO public.tags (name, slug, category, description) VALUES
  ('가업상속공제', 'business-succession-deduction', 'topic', '가업상속공제 활용 전략'),
  ('배우자공제', 'spouse-deduction', 'topic', '배우자 상속 공제'),
  ('증여세절세', 'gift-tax-reduction', ' topic', '증여세 절세 방법'),
  ('사전증여', 'advance-gift', 'topic', '사전 증여 전략'),
  ('법인보험', 'corporate-insurance', 'topic', '법인 보험 활용'),
  ('퇴직연금', 'retirement-pension', 'topic', '퇴직연금 운용'),
  ('가족법인', 'family-corporation', 'topic', '가족 법인 설립 및 운영'),
  ('지주회사', 'holding-company', 'topic', '지주회사 구조'),
  ('M&A', 'ma', 'topic', '인수합병 전략'),
  ('IPO', 'ipo', 'topic', '기업 공개'),
  ('ESG', 'esg', 'topic', 'ESG 경영'),
  ('지배구조', 'corporate-governance', 'topic', '기업 지배구조'),
  ('세대교육', 'next-generation-education', 'topic', '후계자 교육'),
  ('최대주주할증', 'major-shareholder-premium', 'topic', '최대주주 할증 과세'),
  ('재산분할', 'property-division', 'topic', '재산 분할'),
  ('신탁', 'trust', 'topic', '신탁 활용'),
  ('해외자산', 'overseas-assets', 'topic', '해외 자산 관리'),
  ('환율리스크', 'fx-risk', 'topic', '환율 리스크 관리')
ON CONFLICT (slug) DO NOTHING;

-- Add comment for documentation
COMMENT ON TABLE public.tags IS 'Content tagging system for improved discoverability';
COMMENT ON TABLE public.content_tags IS 'Junction table linking content to tags';
COMMENT ON COLUMN public.tags.category IS 'Tag category: primary (주제), secondary (상황), topic (특정주제)';
COMMENT ON COLUMN public.content_tags.content_id IS 'RSS item ID or local blog slug';
