// Triple-AI 환경 변수 검증 유틸리티
import { z } from 'zod';

const aiEnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required').startsWith('sk-', 'Invalid OpenAI API key format'),
  CLAUDE_API_KEY: z.string().min(1, 'Claude API key is required').optional(),
  ANTHROPIC_API_KEY: z.string().min(1, 'Anthropic API key is required').optional(),
  GEMINI_API_KEY: z.string().min(1, 'Gemini API key is required').optional(),
  GOOGLE_AI_API_KEY: z.string().min(1, 'Google AI API key is required').optional(),
});

export interface AIEnvironmentStatus {
  claude: {
    available: boolean;
    key: string | null;
    error?: string;
  };
  openai: {
    available: boolean;
    key: string | null;
    error?: string;
  };
  gemini: {
    available: boolean;
    key: string | null;
    error?: string;
  };
  overall: {
    healthy: boolean;
    availableModels: string[];
    missingKeys: string[];
    recommendations: string[];
  };
}

export function validateAIEnvironment(): AIEnvironmentStatus {
  const status: AIEnvironmentStatus = {
    claude: { available: false, key: null },
    openai: { available: false, key: null },
    gemini: { available: false, key: null },
    overall: {
      healthy: false,
      availableModels: [],
      missingKeys: [],
      recommendations: []
    }
  };

  // OpenAI 검증
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey && openaiKey.startsWith('sk-')) {
    status.openai.available = true;
    status.openai.key = openaiKey.substring(0, 8) + '***';
    status.overall.availableModels.push('GPT-4 Turbo');
  } else {
    status.openai.error = 'OpenAI API key is missing or invalid';
    status.overall.missingKeys.push('OPENAI_API_KEY');
  }

  // Claude/Anthropic 검증
  const claudeKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (claudeKey && claudeKey.startsWith('sk-ant-')) {
    status.claude.available = true;
    status.claude.key = claudeKey.substring(0, 10) + '***';
    status.overall.availableModels.push('Claude Opus 4');
  } else {
    status.claude.error = 'Claude/Anthropic API key is missing or invalid';
    status.overall.missingKeys.push('CLAUDE_API_KEY or ANTHROPIC_API_KEY');
  }

  // Gemini/Google AI 검증
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (geminiKey && geminiKey.length > 10) {
    status.gemini.available = true;
    status.gemini.key = geminiKey.substring(0, 8) + '***';
    status.overall.availableModels.push('Gemini 2.5 Pro');
  } else {
    status.gemini.error = 'Gemini/Google AI API key is missing or invalid';
    status.overall.missingKeys.push('GEMINI_API_KEY or GOOGLE_AI_API_KEY');
  }

  // 전체 상태 평가
  const availableCount = status.overall.availableModels.length;
  status.overall.healthy = availableCount >= 2; // 최소 2개 AI 모델 필요

  // 권장사항 생성
  if (availableCount === 0) {
    status.overall.recommendations.push('모든 AI API 키가 누락되었습니다. 최소한 OpenAI와 Claude API 키를 설정해주세요.');
  } else if (availableCount === 1) {
    status.overall.recommendations.push('하나의 AI만 사용 가능합니다. Triple-AI 기능을 위해 추가 API 키를 설정해주세요.');
  } else if (availableCount === 2) {
    status.overall.recommendations.push('2개의 AI 모델을 사용할 수 있습니다. 완전한 Triple-AI 경험을 위해 3개 모델을 모두 설정하는 것을 권장합니다.');
  } else {
    status.overall.recommendations.push('모든 AI 모델이 사용 가능합니다. Triple-AI 시스템이 완전히 작동합니다.');
  }

  return status;
}

export function getAvailableAIModels(): string[] {
  const status = validateAIEnvironment();
  return status.overall.availableModels;
}

export function isAISystemReady(): boolean {
  const status = validateAIEnvironment();
  return status.overall.healthy;
}

export function getAISystemStatus(): 'healthy' | 'degraded' | 'unavailable' {
  const status = validateAIEnvironment();
  const availableCount = status.overall.availableModels.length;
  
  if (availableCount >= 3) return 'healthy';
  if (availableCount >= 1) return 'degraded';
  return 'unavailable';
}

export function formatAIEnvironmentReport(): string {
  const status = validateAIEnvironment();
  
  let report = '=== Triple-AI 환경 상태 보고서 ===\n\n';
  
  report += `전체 상태: ${status.overall.healthy ? '🟢 정상' : '🟡 제한적'}\n`;
  report += `사용 가능한 모델: ${status.overall.availableModels.join(', ') || '없음'}\n`;
  report += `누락된 키: ${status.overall.missingKeys.join(', ') || '없음'}\n\n`;
  
  report += '개별 AI 상태:\n';
  report += `- Claude Opus 4: ${status.claude.available ? '🟢 사용가능' : '🔴 사용불가'} ${status.claude.key || ''}\n`;
  report += `- GPT-4 Turbo: ${status.openai.available ? '🟢 사용가능' : '🔴 사용불가'} ${status.openai.key || ''}\n`;
  report += `- Gemini 2.5 Pro: ${status.gemini.available ? '🟢 사용가능' : '🔴 사용불가'} ${status.gemini.key || ''}\n\n`;
  
  if (status.overall.recommendations.length > 0) {
    report += '권장사항:\n';
    status.overall.recommendations.forEach((rec, index) => {
      report += `${index + 1}. ${rec}\n`;
    });
  }
  
  return report;
}