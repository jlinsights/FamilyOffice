#!/usr/bin/env node

/**
 * 보험상품 자료 관리 시스템
 * 브로셔, 리플릿, 상품 설명서 등을 체계적으로 관리
 */

const fs = require('fs');
const path = require('path');

// 보험상품 분류 체계
const INSURANCE_CATEGORIES = {
  'life-insurance': {
    name: '생명보험',
    subcategories: {
      'whole-life': '종신보험',
      'term-life': '정기보험', 
      'savings-insurance': '저축보험',
      'inheritance-insurance': '상속보험'
    },
    providers: ['samsung-life', 'other-providers']
  },
  'property-insurance': {
    name: '손해보험',
    subcategories: {
      'asset-protection': '자산보험',
      'liability': '배상책임보험',
      'business-insurance': '기업보험',
      'travel-insurance': '해외여행보험'
    },
    providers: ['samsung-fire', 'other-providers']
  },
  'pension-products': {
    name: '연금상품',
    subcategories: {
      'annuity-insurance': '연금보험',
      'retirement-plans': '퇴직연금',
      'personal-pension': '개인연금'
    },
    providers: ['samsung-life', 'other-providers']
  },
  'investment-products': {
    name: '투자연계상품',
    subcategories: {
      'variable-life': '변액생명보험',
      'variable-annuity': '변액연금보험',
      'unit-linked': '유닛링크'
    },
    providers: ['samsung-life', 'run-investment', 'other-providers']
  }
};

// 문서 유형 정의
const DOCUMENT_TYPES = {
  'brochures': {
    name: '상품 브로셔',
    description: '상품의 주요 특징과 혜택을 소개하는 마케팅 자료',
    formats: ['PDF', 'JPG', 'PNG'],
    priority: 1
  },
  'leaflets': {
    name: '리플릿',
    description: '간단한 상품 소개 및 핵심 포인트 자료',
    formats: ['PDF', 'JPG', 'PNG'],
    priority: 2
  },
  'product-guides': {
    name: '상품 설명서',
    description: '상품의 상세한 조건과 약관 설명',
    formats: ['PDF', 'DOCX'],
    priority: 1
  },
  'rate-tables': {
    name: '보험료율표',
    description: '연령별, 성별 보험료 및 수익률 데이터',
    formats: ['XLSX', 'CSV', 'PDF'],
    priority: 1
  },
  'marketing-materials': {
    name: '마케팅 자료',
    description: '영업용 프레젠테이션 및 판매 지원 자료',
    formats: ['PPTX', 'PDF', 'JPG', 'PNG'],
    priority: 3
  }
};

class InsuranceProductsManager {
  constructor(publicPath = 'public') {
    this.publicPath = publicPath;
    this.productsPath = path.join(publicPath, 'insurance-products');
    this.initializeDirectories();
  }

  initializeDirectories() {
    console.log('🏗️ 보험상품 디렉토리 구조 생성 중...');
    
    // 메인 카테고리 생성
    Object.keys(INSURANCE_CATEGORIES).forEach(categoryKey => {
      const category = INSURANCE_CATEGORIES[categoryKey];
      const categoryDir = path.join(this.productsPath, categoryKey);
      
      // 공급사별 디렉토리 생성
      category.providers.forEach(provider => {
        const providerDir = path.join(categoryDir, provider);
        
        // 문서 유형별 하위 디렉토리 생성
        Object.keys(DOCUMENT_TYPES).forEach(docType => {
          const fullPath = path.join(providerDir, docType);
          if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`📁 Created: ${fullPath}`);
          }
        });
      });
      
      // 비교 분석 디렉토리
      const comparisonDir = path.join(categoryDir, 'comparative-analysis');
      if (!fs.existsSync(comparisonDir)) {
        fs.mkdirSync(comparisonDir, { recursive: true });
        console.log(`📊 Created: ${comparisonDir}`);
      }
    });
    
    // 판매 지원 도구 디렉토리
    const salesToolsDir = path.join(this.productsPath, 'sales-tools');
    const salesSubdirs = ['calculators', 'presentations', 'comparison-sheets', 'roi-simulators'];
    
    salesSubdirs.forEach(subdir => {
      const fullPath = path.join(salesToolsDir, subdir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`🛠️ Created: ${fullPath}`);
      }
    });
    
    // 컴플라이언스 디렉토리
    const complianceDir = path.join(this.productsPath, 'compliance');
    const complianceSubdirs = ['regulations', 'disclaimers', 'approval-documents'];
    
    complianceSubdirs.forEach(subdir => {
      const fullPath = path.join(complianceDir, subdir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`⚖️ Created: ${fullPath}`);
      }
    });
  }

  scanInsuranceProducts() {
    console.log('🔍 보험상품 자료 스캔 중...');
    
    const productData = {
      lastScanned: new Date().toISOString(),
      categories: {},
      totalFiles: 0,
      summary: {
        byCategory: {},
        byProvider: {},
        byDocumentType: {}
      }
    };

    Object.keys(INSURANCE_CATEGORIES).forEach(categoryKey => {
      const categoryDir = path.join(this.productsPath, categoryKey);
      
      if (fs.existsSync(categoryDir)) {
        productData.categories[categoryKey] = this.scanCategory(categoryKey, categoryDir);
        
        // 통계 업데이트
        const categoryFileCount = this.getFilesCount(productData.categories[categoryKey]);
        productData.totalFiles += categoryFileCount;
        productData.summary.byCategory[categoryKey] = categoryFileCount;
      }
    });

    return productData;
  }

  scanCategory(categoryKey, categoryDir) {
    const category = INSURANCE_CATEGORIES[categoryKey];
    const categoryData = {
      name: category.name,
      providers: {}
    };

    category.providers.forEach(provider => {
      const providerDir = path.join(categoryDir, provider);
      
      if (fs.existsSync(providerDir)) {
        categoryData.providers[provider] = this.scanProvider(provider, providerDir);
      }
    });

    // 비교 분석 자료도 스캔
    const comparisonDir = path.join(categoryDir, 'comparative-analysis');
    if (fs.existsSync(comparisonDir)) {
      categoryData.comparativeAnalysis = this.scanFiles(comparisonDir);
    }

    return categoryData;
  }

  scanProvider(provider, providerDir) {
    const providerData = {
      name: this.getProviderName(provider),
      documents: {}
    };

    Object.keys(DOCUMENT_TYPES).forEach(docType => {
      const docDir = path.join(providerDir, docType);
      
      if (fs.existsSync(docDir)) {
        providerData.documents[docType] = this.scanFiles(docDir);
      }
    });

    return providerData;
  }

  scanFiles(directory) {
    const files = [];
    
    try {
      const items = fs.readdirSync(directory, { withFileTypes: true });
      
      items.forEach(item => {
        if (item.isFile()) {
          const filePath = path.join(directory, item.name);
          const stats = fs.statSync(filePath);
          
          const fileInfo = {
            name: item.name,
            path: filePath,
            relativePath: path.relative(this.publicPath, filePath),
            size: stats.size,
            modified: stats.mtime,
            extension: path.extname(item.name).toLowerCase(),
            metadata: this.extractFileMetadata(item.name)
          };
          
          files.push(fileInfo);
        }
      });
    } catch (error) {
      console.warn(`⚠️ Error scanning directory ${directory}: ${error.message}`);
    }
    
    return files.sort((a, b) => b.modified - a.modified); // 최신순 정렬
  }

  extractFileMetadata(filename) {
    // 파일명에서 메타데이터 추출
    const parts = filename.split('_');
    
    if (parts.length >= 4) {
      return {
        provider: parts[0],
        productType: parts[1],
        productName: parts[2],
        documentType: parts[3],
        version: parts[4] || 'v1.0',
        date: parts[5] || new Date().toISOString().split('T')[0]
      };
    }
    
    return {
      provider: 'unknown',
      productType: 'unknown',
      productName: filename,
      documentType: 'unknown',
      version: 'v1.0',
      date: new Date().toISOString().split('T')[0]
    };
  }

  getProviderName(providerKey) {
    const providerNames = {
      'samsung-life': '삼성생명',
      'samsung-fire': '삼성화재',
      'run-investment': '런인베스트',
      'other-providers': '기타 보험사'
    };
    
    return providerNames[providerKey] || providerKey;
  }

  getFilesCount(categoryData) {
    if (!categoryData || !categoryData.providers) return 0;
    
    let count = 0;
    
    Object.values(categoryData.providers).forEach(provider => {
      if (provider.documents) {
        Object.values(provider.documents).forEach(docFiles => {
          if (Array.isArray(docFiles)) {
            count += docFiles.length;
          }
        });
      }
    });
    
    if (categoryData.comparativeAnalysis && Array.isArray(categoryData.comparativeAnalysis)) {
      count += categoryData.comparativeAnalysis.length;
    }
    
    return count;
  }

  generateProductRecommendations(clientProfile) {
    const recommendations = [];
    
    // 클라이언트 프로필 기반 상품 추천 로직
    const { age, income, assets, familyStructure, goals, riskTolerance } = clientProfile;
    
    // 생명보험 추천
    if (goals.includes('inheritance-planning') || assets > 5000000000) { // 50억 이상
      recommendations.push({
        category: 'life-insurance',
        product: 'inheritance-insurance',
        reason: '고액 자산에 대한 상속세 절세 효과',
        priority: 1,
        provider: 'samsung-life'
      });
    }
    
    // 연금상품 추천
    if (age >= 45 && goals.includes('retirement-planning')) {
      recommendations.push({
        category: 'pension-products',
        product: 'annuity-insurance',
        reason: '안정적인 노후 자금 확보',
        priority: 2,
        provider: 'samsung-life'
      });
    }
    
    // 투자연계상품 추천
    if (riskTolerance === 'aggressive' && age < 50) {
      recommendations.push({
        category: 'investment-products',
        product: 'variable-life',
        reason: '적극적 투자 성향에 맞는 변액 상품',
        priority: 3,
        provider: 'run-investment'
      });
    }
    
    return recommendations.sort((a, b) => a.priority - b.priority);
  }

  generateProductIndex() {
    const productData = this.scanInsuranceProducts();
    const indexPath = path.join(this.productsPath, 'index.json');
    
    const index = {
      lastUpdated: new Date().toISOString(),
      totalFiles: productData.totalFiles,
      categories: Object.keys(INSURANCE_CATEGORIES).map(key => ({
        key,
        name: INSURANCE_CATEGORIES[key].name,
        fileCount: productData.summary.byCategory[key] || 0
      })),
      providers: this.getProviderSummary(productData),
      documentTypes: Object.keys(DOCUMENT_TYPES).map(key => ({
        key,
        name: DOCUMENT_TYPES[key].name,
        priority: DOCUMENT_TYPES[key].priority
      })),
      recentUpdates: this.getRecentUpdates(productData)
    };
    
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`📊 보험상품 인덱스 생성: ${indexPath}`);
    
    return index;
  }

  getProviderSummary(productData) {
    const providers = {};
    
    Object.values(productData.categories).forEach(category => {
      if (category.providers) {
        Object.keys(category.providers).forEach(providerKey => {
          if (!providers[providerKey]) {
            providers[providerKey] = {
              name: this.getProviderName(providerKey),
              fileCount: 0
            };
          }
          
          const provider = category.providers[providerKey];
          if (provider.documents) {
            Object.values(provider.documents).forEach(docs => {
              if (Array.isArray(docs)) {
                providers[providerKey].fileCount += docs.length;
              }
            });
          }
        });
      }
    });
    
    return Object.entries(providers).map(([key, data]) => ({
      key,
      name: data.name,
      fileCount: data.fileCount
    }));
  }

  getRecentUpdates(productData, limit = 10) {
    const allFiles = [];
    
    Object.values(productData.categories).forEach(category => {
      if (category.providers) {
        Object.values(category.providers).forEach(provider => {
          if (provider.documents) {
            Object.values(provider.documents).forEach(docs => {
              if (Array.isArray(docs)) {
                allFiles.push(...docs);
              }
            });
          }
        });
      }
    });
    
    return allFiles
      .sort((a, b) => new Date(b.modified) - new Date(a.modified))
      .slice(0, limit)
      .map(file => ({
        name: file.name,
        path: file.relativePath,
        modified: file.modified,
        metadata: file.metadata
      }));
  }
}

// CLI 사용법
function main() {
  const command = process.argv[2];
  const manager = new InsuranceProductsManager();
  
  switch (command) {
    case 'setup':
      console.log('🏗️ 보험상품 디렉토리 구조 설정 중...');
      manager.initializeDirectories();
      console.log('✅ 디렉토리 구조 생성 완료');
      break;
      
    case 'scan':
      console.log('🔍 보험상품 자료 스캔 중...');
      const data = manager.scanInsuranceProducts();
      console.log(JSON.stringify(data, null, 2));
      break;
      
    case 'index':
      console.log('📊 보험상품 인덱스 생성 중...');
      const index = manager.generateProductIndex();
      console.log('✅ 인덱스 생성 완료');
      break;
      
    case 'recommend':
      console.log('🎯 상품 추천 테스트...');
      const testProfile = {
        age: 50,
        income: 500000000, // 5억
        assets: 10000000000, // 100억
        familyStructure: 'married-with-children',
        goals: ['inheritance-planning', 'retirement-planning'],
        riskTolerance: 'moderate'
      };
      const recommendations = manager.generateProductRecommendations(testProfile);
      console.log(JSON.stringify(recommendations, null, 2));
      break;
      
    default:
      console.log(`
🛡️ Insurance Products Management System

사용법:
  node insurance-products-manager.js <command>

명령어:
  setup       - 보험상품 디렉토리 구조 생성
  scan        - 업로드된 보험상품 자료 스캔
  index       - 보험상품 인덱스 생성
  recommend   - 상품 추천 시스템 테스트

디렉토리 구조:
  public/insurance-products/
  ├── life-insurance/          # 생명보험
  ├── property-insurance/      # 손해보험  
  ├── pension-products/        # 연금상품
  ├── investment-products/     # 투자연계상품
  ├── sales-tools/             # 판매 지원 도구
  └── compliance/              # 컴플라이언스

예시:
  node insurance-products-manager.js setup
  node insurance-products-manager.js scan
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = InsuranceProductsManager;