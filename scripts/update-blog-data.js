#!/usr/bin/env node

/**
 * 블로그 데이터 업데이트 및 최적화 스크립트
 */

const fs = require('fs');
const path = require('path');

function updateBlogCategories(blogPosts) {
  const categoryCount = {};
  
  // 각 카테고리별 포스트 수 계산
  Object.values(blogPosts).forEach(post => {
    if (post.published && post.category) {
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    }
  });
  
  // 카테고리 정보 업데이트
  const categories = [
    {
      name: '투자전략',
      slug: 'investment-strategy',
      description: '포트폴리오 최적화와 자산 배분 전략',
      icon: 'Target',
      count: categoryCount['투자전략'] || 0
    },
    {
      name: '세무최적화',
      slug: 'tax-optimization',
      description: '상속세 절세와 세무 구조 개선',
      icon: 'BarChart3',
      count: categoryCount['세무최적화'] || 0
    },
    {
      name: '패밀리오피스',
      slug: 'family-office',
      description: '가족 자산관리와 승계 전략',
      icon: 'Users',
      count: categoryCount['패밀리오피스'] || 0
    },
    {
      name: '사례연구',
      slug: 'case-study',
      description: '실제 클라이언트 성공 사례',
      icon: 'FileText',
      count: categoryCount['사례연구'] || 0
    },
    {
      name: '시장분석',
      slug: 'market-analysis',
      description: '자산관리 시장 동향과 인사이트',
      icon: 'TrendingUp',
      count: categoryCount['시장분석'] || 0
    },
    {
      name: '디지털혁신',
      slug: 'digital-innovation',
      description: 'AI와 디지털 기술을 활용한 자산관리',
      icon: 'Cpu',
      count: categoryCount['디지털혁신'] || 0
    }
  ];
  
  return categories;
}

function optimizeBlogData() {
  const blogDataPath = path.join(process.cwd(), 'lib', 'blog-data.ts');
  
  if (!fs.existsSync(blogDataPath)) {
    console.error('❌ blog-data.ts 파일을 찾을 수 없습니다.');
    process.exit(1);
  }
  
  console.log('📊 블로그 데이터 최적화 시작...');
  
  // 현재 blog-data.ts 내용 읽기
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
  
  // blogPosts 객체 추출 (간단한 정규식 방식)
  const blogPostsMatch = blogDataContent.match(/export const blogPosts: Record<string, BlogPost> = ({[\s\S]*?});/);
  
  if (!blogPostsMatch) {
    console.error('❌ blogPosts 객체를 찾을 수 없습니다.');
    process.exit(1);
  }
  
  try {
    // 안전한 JSON 파싱 사용 (eval 대신)
    const blogPostsString = blogPostsMatch[1];
    // JSON 형태로 변환하여 안전하게 파싱
    const jsonString = blogPostsString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
    const blogPosts = JSON.parse(jsonString);
    
    // 카테고리 업데이트
    const updatedCategories = updateBlogCategories(blogPosts);
    
    // 발행된 포스트만 필터링
    const publishedPosts = Object.fromEntries(
      Object.entries(blogPosts).filter(([_, post]) => post.published)
    );
    
    // 날짜 기준 정렬
    const sortedPosts = Object.fromEntries(
      Object.entries(publishedPosts).sort(([_, a], [__, b]) => 
        new Date(b.date) - new Date(a.date)
      )
    );
    
    // 새로운 blog-data.ts 내용 생성
    const newBlogDataContent = `import { BlogPost, BlogCategory } from '@/types/blog';

export const blogCategories: BlogCategory[] = ${JSON.stringify(updatedCategories, null, 2)};

export const blogPosts: Record<string, BlogPost> = ${JSON.stringify(sortedPosts, null, 2)};

// 통계 정보
export const blogStats = {
  totalPosts: ${Object.keys(sortedPosts).length},
  totalCategories: ${updatedCategories.length},
  featuredPosts: ${Object.values(sortedPosts).filter(post => post.featured).length},
  lastUpdated: "${new Date().toISOString()}",
  averageReadTime: "${Math.round(
    Object.values(sortedPosts)
      .map(post => parseInt(post.readTime.replace('분', '')))
      .reduce((a, b) => a + b, 0) / Object.keys(sortedPosts).length
  )}분"
};

export default blogPosts;
`;
    
    // 파일 저장
    fs.writeFileSync(blogDataPath, newBlogDataContent, 'utf8');
    
    console.log('✅ 블로그 데이터 최적화 완료:');
    console.log(`   📝 총 포스트: ${Object.keys(sortedPosts).length}개`);
    console.log(`   🏷️ 카테고리: ${updatedCategories.length}개`);
    console.log(`   ⭐ 추천 포스트: ${Object.values(sortedPosts).filter(post => post.featured).length}개`);
    console.log(`   📊 업데이트 시간: ${new Date().toLocaleString('ko-KR')}`);
    
    // 카테고리별 포스트 수 출력
    console.log('\n📊 카테고리별 포스트 수:');
    updatedCategories.forEach(category => {
      console.log(`   ${category.name}: ${category.count}개`);
    });
    
    return sortedPosts;
    
  } catch (error) {
    console.error(`❌ 블로그 데이터 처리 중 오류: ${error.message}`);
    process.exit(1);
  }
}

function validateBlogData() {
  const blogDataPath = path.join(process.cwd(), 'lib', 'blog-data.ts');
  const typesPath = path.join(process.cwd(), 'types', 'blog.ts');
  
  console.log('🔍 블로그 데이터 유효성 검사...');
  
  // 타입 정의 파일 확인
  if (!fs.existsSync(typesPath)) {
    console.warn('⚠️ types/blog.ts 파일을 찾을 수 없습니다.');
  }
  
  // 필수 필드 검사
  try {
    const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
    const blogPostsMatch = blogDataContent.match(/export const blogPosts: Record<string, BlogPost> = ({[\s\S]*?});/);
    
    if (blogPostsMatch) {
      // 안전한 JSON 파싱 사용 (eval 대신)
      const blogPostsString = blogPostsMatch[1];
      const jsonString = blogPostsString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
      const blogPosts = JSON.parse(jsonString);
      const requiredFields = ['id', 'title', 'slug', 'excerpt', 'content', 'date', 'author', 'category'];
      
      let validationErrors = [];
      
      Object.entries(blogPosts).forEach(([key, post]) => {
        requiredFields.forEach(field => {
          if (!post[field]) {
            validationErrors.push(`${key}: '${field}' 필드 누락`);
          }
        });
        
        // 날짜 형식 검사
        if (post.date && isNaN(Date.parse(post.date))) {
          validationErrors.push(`${key}: 잘못된 날짜 형식 - ${post.date}`);
        }
        
        // 슬러그 형식 검사 (URL-safe)
        if (post.slug && !/^[a-z0-9-]+$/.test(post.slug)) {
          validationErrors.push(`${key}: 잘못된 슬러그 형식 - ${post.slug}`);
        }
      });
      
      if (validationErrors.length > 0) {
        console.error('❌ 데이터 유효성 검사 실패:');
        validationErrors.forEach(error => console.error(`   ${error}`));
        return false;
      } else {
        console.log('✅ 모든 블로그 데이터가 유효합니다.');
        return true;
      }
    }
  } catch (error) {
    console.error(`❌ 유효성 검사 중 오류: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🚀 블로그 데이터 업데이트 시작\n');
  
  try {
    // 1. 데이터 최적화
    const optimizedPosts = optimizeBlogData();
    
    // 2. 유효성 검사
    const isValid = validateBlogData();
    
    if (isValid) {
      console.log('\n✅ 블로그 데이터 업데이트 완료!');
      console.log('🔄 Vercel 자동 배포가 트리거됩니다...');
    } else {
      console.error('\n❌ 유효성 검사 실패로 업데이트가 중단되었습니다.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error(`❌ 업데이트 중 오류 발생: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  updateBlogCategories,
  optimizeBlogData,
  validateBlogData
};