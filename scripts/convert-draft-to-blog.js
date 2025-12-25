#!/usr/bin/env node

/**
 * Draft 콘텐츠를 실제 블로그 포스트로 변환하는 스크립트
 */

const fs = require('fs');
const path = require('path');

function parseFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const frontMatter = {};
  const frontMatterLines = match[1].split('\n');

  frontMatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(': ');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(': ').replace(/^["']|["']$/g, '');
      frontMatter[key.trim()] = value;
    }
  });

  return {
    frontMatter,
    content: match[2],
  };
}

function generateBlogPost(draftFile) {
  const draftContent = fs.readFileSync(draftFile, 'utf8');
  const { frontMatter, content } = parseFrontMatter(draftContent);

  // 블로그 포스트 객체 생성
  const blogPost = {
    id: frontMatter.slug,
    title: frontMatter.title,
    slug: frontMatter.slug,
    excerpt: frontMatter.excerpt,
    content: content.trim(),
    date: frontMatter.date,
    author: frontMatter.author,
    category: frontMatter.category,
    tags: frontMatter.tags ? frontMatter.tags.split(', ') : [],
    readTime: frontMatter.readTime,
    featured: frontMatter.featured === 'true',
    published: true,
    publishTime: frontMatter.publishTime,
    seoKeywords: frontMatter.seoKeywords || [],
    socialPreview: {
      title: frontMatter.title,
      description: frontMatter.excerpt,
      image: `/blog/images/${frontMatter.slug}-social.jpg`,
    },
  };

  return blogPost;
}

function updateBlogData(blogPost) {
  const blogDataPath = path.join(process.cwd(), 'lib', 'blog-data.ts');

  if (!fs.existsSync(blogDataPath)) {
    console.error('❌ blog-data.ts 파일을 찾을 수 없습니다.');
    process.exit(1);
  }

  let blogDataContent = fs.readFileSync(blogDataPath, 'utf8');

  // 새 블로그 포스트를 blogPosts 객체에 추가
  const blogPostString = `  '${blogPost.id}': ${JSON.stringify(blogPost, null, 4)},`;

  // blogPosts 객체 끝 부분에 새 포스트 추가
  const blogPostsEndRegex = /^(\s*};)\s*$/m;
  const match = blogDataContent.match(blogPostsEndRegex);

  if (match) {
    const insertPosition = blogDataContent.lastIndexOf(match[0]);
    const beforeEnd = blogDataContent.substring(0, insertPosition);
    const afterEnd = blogDataContent.substring(insertPosition);

    blogDataContent = beforeEnd + blogPostString + '\n' + afterEnd;
  } else {
    console.error('❌ blogPosts 객체의 끝을 찾을 수 없습니다.');
    process.exit(1);
  }

  // 파일 저장
  fs.writeFileSync(blogDataPath, blogDataContent, 'utf8');
  console.log(`✅ 블로그 포스트 '${blogPost.title}' 추가 완료`);

  return blogPost;
}

function main() {
  const draftFile = process.argv[2];

  if (!draftFile) {
    console.error('❌ Draft 파일 경로가 필요합니다.');
    console.log('사용법: node convert-draft-to-blog.js <draft-file-path>');
    process.exit(1);
  }

  if (!fs.existsSync(draftFile)) {
    console.error(`❌ Draft 파일을 찾을 수 없습니다: ${draftFile}`);
    process.exit(1);
  }

  try {
    console.log(`📝 Draft 파일 처리 중: ${draftFile}`);

    const blogPost = generateBlogPost(draftFile);
    const updatedPost = updateBlogData(blogPost);

    console.log(`🚀 블로그 포스트 발행 준비 완료:`);
    console.log(`   제목: ${updatedPost.title}`);
    console.log(`   슬러그: ${updatedPost.slug}`);
    console.log(`   카테고리: ${updatedPost.category}`);
    console.log(`   발행 일자: ${updatedPost.date}`);
    console.log(`   추천 여부: ${updatedPost.featured ? '예' : '아니오'}`);
  } catch (error) {
    console.error(`❌ 처리 중 오류 발생: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  generateBlogPost,
  updateBlogData,
  parseFrontMatter,
};
