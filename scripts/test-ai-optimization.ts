/**
 * AI 최적화 시스템 테스트 스크립트
 * 블로그 AI 최적화 기능 동작 검증
 */
import {
    calculateAIOptimizationScore,
    extractAIOptimizedKeywords,
    generateAIOptimizedFAQ,
    generateAIOptimizedMetadata,
    generateOptimizationRecommendations,
} from '../lib/ai/blog-ai-optimization';
import { blogPosts } from '../lib/blog-data';

console.log('🤖 AI 최적화 시스템 테스트 시작\n');
console.log('='.repeat(80));

// 테스트할 블로그 포스트 선택
const testPostSlug = 'family-office-basics-guide';
const post = blogPosts[testPostSlug];

if (!post) {
  console.error('❌ 테스트 포스트를 찾을 수 없습니다:', testPostSlug);
  process.exit(1);
}

console.log(`\n📝 테스트 대상: ${post.title}`);
console.log(`📂 카테고리: ${post.category}`);
console.log(`🏷️  기존 태그 수: ${post.tags.length}`);
console.log('='.repeat(80));

// 1. AI 최적화 키워드 추출 테스트
console.log('\n1️⃣  AI 최적화 키워드 추출 테스트');
console.log('-'.repeat(80));
const aiKeywords = extractAIOptimizedKeywords(post);
console.log(`✅ 추출된 키워드 수: ${aiKeywords.length}`);
console.log(`📋 키워드 목록 (상위 10개):`);
aiKeywords.slice(0, 10).forEach((keyword, idx) => {
  console.log(`   ${idx + 1}. ${keyword}`);
});

// 2. AI 최적화 FAQ 생성 테스트
console.log('\n2️⃣  AI 최적화 FAQ 생성 테스트');
console.log('-'.repeat(80));
const aiOptimizedFAQ = generateAIOptimizedFAQ(post);
console.log(`✅ 생성된 FAQ 수: ${aiOptimizedFAQ.length}`);
aiOptimizedFAQ.forEach((faq, idx) => {
  console.log(`\n   FAQ ${idx + 1}:`);
  console.log(`   Q: ${faq.question}`);
  console.log(`   A: ${faq.answer.substring(0, 100)}...`);
  if ('targetEngines' in faq) {
    console.log(`   🎯 타겟 엔진: ${faq.targetEngines.join(', ')}`);
  }
});

// 3. AI 최적화 메타데이터 생성 테스트
console.log('\n3️⃣  AI 최적화 메타데이터 생성 테스트');
console.log('-'.repeat(80));
const aiMetadata = generateAIOptimizedMetadata(post);
console.log(`✅ 타이틀: ${aiMetadata.title}`);
console.log(`✅ 설명: ${aiMetadata.description.substring(0, 100)}...`);
console.log(`✅ BMAD 카테고리: ${aiMetadata.aiOptimization.bmadCategory}`);
console.log(
  `✅ 타겟 엔진 수: ${aiMetadata.aiOptimization.targetEngines.length}`
);
console.log(`📋 타겟 엔진:`);
aiMetadata.aiOptimization.targetEngines.forEach((engine, idx) => {
  console.log(`   ${idx + 1}. ${engine}`);
});

// 4. AI 최적화 점수 계산 테스트
console.log('\n4️⃣  AI 최적화 점수 계산 테스트');
console.log('-'.repeat(80));
const optimizationScore = calculateAIOptimizationScore(post);
console.log(`✅ 전체 최적화 점수: ${optimizationScore.overall}/100`);
console.log(`📊 엔진별 점수:`);
Object.entries(optimizationScore.byEngine).forEach(([engine, score]) => {
  const bar = '█'.repeat(Math.floor(score / 5));
  const status = score >= 70 ? '✅' : score >= 50 ? '⚠️' : '❌';
  console.log(`   ${status} ${engine.padEnd(15)} ${score}/100 ${bar}`);
});

// 5. 최적화 권장사항 생성 테스트
console.log('\n5️⃣  최적화 권장사항 생성 테스트');
console.log('-'.repeat(80));
const recommendations = generateOptimizationRecommendations(post);
console.log(`✅ 생성된 권장사항 수: ${recommendations.length}`);
recommendations.forEach((rec, idx) => {
  console.log(`   ${idx + 1}. ${rec}`);
});

// 6. Schema.org 확장 필드 검증
console.log('\n6️⃣  Schema.org 확장 필드 검증');
console.log('-'.repeat(80));
const schema = aiMetadata.aiEnhancedSchema;
console.log(`✅ @type: ${schema['@type']}`);
console.log(`✅ educationalLevel: ${schema.educationalLevel}`);
console.log(`✅ educationalUse: ${schema.educationalUse}`);
console.log(`✅ audience.audienceType: ${schema.audience.audienceType}`);
console.log(
  `✅ audience.geographicArea: ${schema.audience.geographicArea.name}`
);
console.log(`✅ about.name: ${schema.about.name}`);

// 종합 결과
console.log('\n' + '='.repeat(80));
console.log('📊 종합 결과');
console.log('='.repeat(80));
console.log(`✅ AI 최적화 시스템: 정상 작동`);
console.log(`✅ 키워드 추출: ${aiKeywords.length}개`);
console.log(`✅ FAQ 생성: ${aiOptimizedFAQ.length}개`);
console.log(`✅ 최적화 점수: ${optimizationScore.overall}/100`);
console.log(`✅ 권장사항: ${recommendations.length}개`);

// 점수 기반 등급 판정
let grade = 'F';
if (optimizationScore.overall >= 90) grade = 'A+';
else if (optimizationScore.overall >= 80) grade = 'A';
else if (optimizationScore.overall >= 70) grade = 'B';
else if (optimizationScore.overall >= 60) grade = 'C';
else if (optimizationScore.overall >= 50) grade = 'D';

console.log(`\n🏆 AI 최적화 등급: ${grade}`);

if (optimizationScore.overall >= 80) {
  console.log('💯 우수! 모든 AI 검색엔진에 최적화되어 있습니다.');
} else if (optimizationScore.overall >= 60) {
  console.log('⚠️  양호하지만 개선이 필요합니다. 권장사항을 참고하세요.');
} else {
  console.log('❌ 개선이 필요합니다. FAQ 추가 및 키워드 강화를 권장합니다.');
}

console.log('\n✨ AI 최적화 시스템 테스트 완료!\n');
