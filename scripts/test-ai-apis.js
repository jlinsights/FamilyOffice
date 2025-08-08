#!/usr/bin/env node

// AI API 연결 테스트 스크립트
require('dotenv').config({ path: '.env.local' });

async function testClaudeAPI() {
  console.log('\n🔍 Claude API 테스트...');
  try {
    const { Anthropic } = await import('@anthropic-ai/sdk');
    const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.log('❌ Claude API 키가 없습니다');
      return false;
    }
    
    console.log('🔑 API 키 확인:', apiKey.substring(0, 20) + '...');
    
    const client = new Anthropic({ apiKey });
    
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 50,
      messages: [{ role: 'user', content: '안녕하세요' }]
    });
    
    console.log('✅ Claude API 연결 성공');
    console.log('📝 응답 미리보기:', response.content[0].text.substring(0, 100) + '...');
    return true;
  } catch (error) {
    console.log('❌ Claude API 오류:', error.message);
    return false;
  }
}

async function testOpenAIAPI() {
  console.log('\n🔍 OpenAI API 테스트...');
  try {
    const OpenAI = await import('openai');
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.log('❌ OpenAI API 키가 없습니다');
      return false;
    }
    
    console.log('🔑 API 키 확인:', apiKey.substring(0, 20) + '...');
    
    const client = new OpenAI.default({ apiKey });
    
    const response = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      max_tokens: 50,
      messages: [{ role: 'user', content: '안녕하세요' }]
    });
    
    console.log('✅ OpenAI API 연결 성공');
    console.log('📝 응답 미리보기:', response.choices[0].message.content?.substring(0, 100) + '...');
    return true;
  } catch (error) {
    console.log('❌ OpenAI API 오류:', error.message);
    return false;
  }
}

async function testGeminiAPI() {
  console.log('\n🔍 Gemini API 테스트...');
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      console.log('❌ Gemini API 키가 없습니다');
      return false;
    }
    
    console.log('🔑 API 키 확인:', apiKey.substring(0, 20) + '...');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const result = await model.generateContent('안녕하세요');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API 연결 성공');
    console.log('📝 응답 미리보기:', text.substring(0, 100) + '...');
    return true;
  } catch (error) {
    console.log('❌ Gemini API 오류:', error.message);
    return false;
  }
}

async function main() {
  console.log('🤖 Triple-AI 시스템 연결 테스트 시작');
  console.log('=' .repeat(50));
  
  const results = {
    claude: await testClaudeAPI(),
    openai: await testOpenAIAPI(),
    gemini: await testGeminiAPI()
  };
  
  console.log('\n📊 테스트 결과 요약');
  console.log('=' .repeat(50));
  console.log('Claude:', results.claude ? '✅ 정상' : '❌ 오류');
  console.log('OpenAI:', results.openai ? '✅ 정상' : '❌ 오류');
  console.log('Gemini:', results.gemini ? '✅ 정상' : '❌ 오류');
  
  const workingAPIs = Object.values(results).filter(Boolean).length;
  console.log(`\n🎯 사용 가능한 AI: ${workingAPIs}/3`);
  
  if (workingAPIs > 0) {
    console.log('🎉 AI 컨설팅 시스템이 정상 작동할 수 있습니다!');
  } else {
    console.log('⚠️  모든 AI API에 문제가 있습니다. 환경 변수를 확인해주세요.');
  }
}

main().catch(console.error);