import { NextRequest, NextResponse } from 'next/server'

interface TaxOptimizationData {
  dividendTax: {
    currentTax: number
    optimizedTax: number
    savings: number
    strategies: string[]
  }
  capitalGainsTax: {
    currentTax: number
    optimizedTax: number
    savings: number
    strategies: string[]
  }
  corporateTax: {
    currentTax: number
    optimizedTax: number
    savings: number
    strategies: string[]
  }
  recommendations: Array<{
    category: string
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    implementation: string
  }>
  koreanMarketSpecific: Array<{
    title: string
    description: string
    benefit: string
  }>
}

// Mock data for tax optimization
const mockTaxOptimizationData: TaxOptimizationData = {
  dividendTax: {
    currentTax: 15000000,
    optimizedTax: 10500000,
    savings: 4500000,
    strategies: [
      '배당소득 분산 전략 (연 1,200만원 이하)',
      '비과세 계좌 활용 (ISA, 개인연금)',
      '배당소득 공제 항목 최적화'
    ]
  },
  capitalGainsTax: {
    currentTax: 25000000,
    optimizedTax: 17500000,
    savings: 7500000,
    strategies: [
      '양도소득세 과세이연 전략',
      '장기보유 특별공제 활용',
      '손실상계 최적화'
    ]
  },
  corporateTax: {
    currentTax: 50000000,
    optimizedTax: 35000000,
    savings: 15000000,
    strategies: [
      '법인세 절약 전략 (연구개발비 공제)',
      '투자세액공제 활용',
      '중소기업 세제혜택 적용'
    ]
  },
  recommendations: [
    {
      category: '배당소득세',
      title: '배당소득 분산 전략',
      description: '연간 배당소득을 1,200만원 이하로 분산하여 세율을 낮춥니다.',
      impact: 'high',
      implementation: '배당 지급 시점 조정 및 계좌 분산'
    },
    {
      category: '양도소득세',
      title: '장기보유 특별공제',
      description: '3년 이상 보유한 주식에 대해 최대 50% 공제를 적용합니다.',
      impact: 'high',
      implementation: '보유기간 관리 및 매도 타이밍 최적화'
    },
    {
      category: '법인세',
      title: '연구개발비 세액공제',
      description: 'R&D 투자에 대해 최대 30% 세액공제를 받을 수 있습니다.',
      impact: 'medium',
      implementation: 'R&D 투자 확대 및 공제 신청'
    },
    {
      category: '종합소득세',
      title: 'ISA 계좌 활용',
      description: '개인형 퇴직연금(ISA)을 통한 비과세 투자 수익',
      impact: 'medium',
      implementation: 'ISA 계좌 개설 및 자산 이전'
    }
  ],
  koreanMarketSpecific: [
    {
      title: '한국 주식 시장 특화 전략',
      description: 'KOSPI, KOSDAQ 등 한국 시장 특성을 고려한 세무 최적화',
      benefit: '한국 시장 특성에 맞는 세무 혜택 최대화'
    },
    {
      title: '중소기업 세제혜택',
      description: '중소기업 주식 투자 시 세제 혜택 활용',
      benefit: '중소기업 투자 시 세율 감면 및 공제 혜택'
    },
    {
      title: '벤처기업 투자 공제',
      description: '벤처기업 투자 시 소득공제 및 세액공제 혜택',
      benefit: '벤처기업 투자 시 최대 30% 소득공제'
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const portfolioValue = searchParams.get('portfolioValue')
    const dividendIncome = searchParams.get('dividendIncome')
    const capitalGains = searchParams.get('capitalGains')
    const corporateIncome = searchParams.get('corporateIncome')

    // 실제 구현에서는 입력값을 기반으로 세무 계산 수행
    // 현재는 Mock 데이터 반환
    const data = mockTaxOptimizationData

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
      timezone: 'Asia/Seoul',
      parameters: {
        portfolioValue: portfolioValue ? parseFloat(portfolioValue) : null,
        dividendIncome: dividendIncome ? parseFloat(dividendIncome) : null,
        capitalGains: capitalGains ? parseFloat(capitalGains) : null,
        corporateIncome: corporateIncome ? parseFloat(corporateIncome) : null
      }
    })
  } catch (error) {
    console.error('Tax optimization calculation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate tax optimization',
        message: '세무 최적화 계산에 실패했습니다.'
      },
      { status: 500 }
    )
  }
} 