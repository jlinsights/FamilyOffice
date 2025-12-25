#!/usr/bin/env node

/**
 * 파트너사 기초자료 통합 및 활용 시스템
 * 삼성생명, 삼성화재, 런인베스트, 나눔파트너스 등의 자료 활용
 */

const fs = require('fs');
const path = require('path');

// 파트너사별 자료 분류 및 메타데이터
const PARTNER_DATA_CONFIG = {
  'samsung-life': {
    name: '삼성생명',
    category: '보험·연금',
    expertise: ['생명보험', '연금', '상속·증여', '세무최적화'],
    dataTypes: ['보험료율', '세제혜택', '상속세계산', '연금설계'],
    credibility: 'A+',
    usageGuidelines: {
      citation: '삼성생명 제공 자료',
      disclaimer: '본 자료는 삼성생명의 협조로 제공되었습니다.',
      updateFrequency: 'quarterly',
    },
  },
  'samsung-fire': {
    name: '삼성화재',
    category: '손해보험',
    expertise: ['손해보험', '자산보험', '리스크관리', '기업보험'],
    dataTypes: ['보험료율', '보상한도', '리스크분석', '사고통계'],
    credibility: 'A+',
    usageGuidelines: {
      citation: '삼성화재 제공 자료',
      disclaimer: '본 자료는 삼성화재의 협조로 제공되었습니다.',
      updateFrequency: 'quarterly',
    },
  },
  'run-investment': {
    name: '런인베스트',
    category: '자산운용',
    expertise: ['자산관리', '포트폴리오', '펀드운용', '투자전략'],
    dataTypes: ['펀드성과', '자산배분', '시장분석', '투자전략'],
    credibility: 'A',
    usageGuidelines: {
      citation: '런인베스트 제공 자료',
      disclaimer: '본 자료는 런인베스트의 협조로 제공되었습니다.',
      updateFrequency: 'monthly',
    },
  },
  'nanum-partners': {
    name: '나눔파트너스',
    category: '세무·회계',
    expertise: ['세무컨설팅', '회계', '상속세', '법인세'],
    dataTypes: ['세법개정', '절세전략', '세무사례', '회계기준'],
    credibility: 'A',
    usageGuidelines: {
      citation: '나눔파트너스 제공 자료',
      disclaimer: '본 자료는 나눔파트너스의 협조로 제공되었습니다.',
      updateFrequency: 'monthly',
    },
  },
};

class PartnerDataManager {
  constructor(publicPath = 'public') {
    this.publicPath = publicPath;
    this.partnerDataPath = path.join(publicPath, 'partner-data');
    this.initializeDirectories();
  }

  initializeDirectories() {
    // 파트너 데이터 디렉토리 구조 생성
    Object.keys(PARTNER_DATA_CONFIG).forEach(partnerKey => {
      const partnerDir = path.join(this.partnerDataPath, partnerKey);
      const subdirs = ['reports', 'data', 'images', 'documents'];

      subdirs.forEach(subdir => {
        const fullPath = path.join(partnerDir, subdir);
        if (!fs.existsSync(fullPath)) {
          fs.mkdirSync(fullPath, { recursive: true });
          console.log(`📁 Created directory: ${fullPath}`);
        }
      });
    });
  }

  scanPartnerData() {
    const partnerData = {};

    Object.keys(PARTNER_DATA_CONFIG).forEach(partnerKey => {
      const partnerDir = path.join(this.partnerDataPath, partnerKey);

      if (fs.existsSync(partnerDir)) {
        partnerData[partnerKey] = this.scanPartnerDirectory(
          partnerKey,
          partnerDir
        );
      }
    });

    return partnerData;
  }

  scanPartnerDirectory(partnerKey, partnerDir) {
    const config = PARTNER_DATA_CONFIG[partnerKey];
    const data = {
      partner: config,
      files: {},
      lastScanned: new Date().toISOString(),
    };

    const subdirs = ['reports', 'data', 'images', 'documents'];

    subdirs.forEach(subdir => {
      const subdirPath = path.join(partnerDir, subdir);

      if (fs.existsSync(subdirPath)) {
        data.files[subdir] = this.scanFiles(subdirPath);
      }
    });

    return data;
  }

  scanFiles(directory) {
    const files = [];

    try {
      const items = fs.readdirSync(directory, { withFileTypes: true });

      items.forEach(item => {
        if (item.isFile()) {
          const filePath = path.join(directory, item.name);
          const stats = fs.statSync(filePath);

          files.push({
            name: item.name,
            path: filePath,
            size: stats.size,
            modified: stats.mtime,
            extension: path.extname(item.name),
            relativePath: path.relative(this.publicPath, filePath),
          });
        }
      });
    } catch (error) {
      console.warn(
        `⚠️ Error scanning directory ${directory}: ${error.message}`
      );
    }

    return files;
  }

  getRelevantData(contentType, keywords = []) {
    const partnerData = this.scanPartnerData();
    const relevantData = [];

    Object.entries(partnerData).forEach(([partnerKey, data]) => {
      const partner = data.partner;

      // 키워드와 전문분야 매칭
      const isRelevant = keywords.some(
        keyword =>
          partner.expertise.some(expertise =>
            expertise.toLowerCase().includes(keyword.toLowerCase())
          ) ||
          partner.dataTypes.some(dataType =>
            dataType.toLowerCase().includes(keyword.toLowerCase())
          )
      );

      if (isRelevant || contentType === 'comprehensive') {
        relevantData.push({
          partner: partnerKey,
          config: partner,
          availableData: data.files,
          relevanceScore: this.calculateRelevanceScore(partner, keywords),
        });
      }
    });

    // 관련성 점수순 정렬
    return relevantData.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  calculateRelevanceScore(partner, keywords) {
    let score = 0;

    keywords.forEach(keyword => {
      // 전문분야 매칭
      partner.expertise.forEach(expertise => {
        if (expertise.toLowerCase().includes(keyword.toLowerCase())) {
          score += 10;
        }
      });

      // 데이터 타입 매칭
      partner.dataTypes.forEach(dataType => {
        if (dataType.toLowerCase().includes(keyword.toLowerCase())) {
          score += 5;
        }
      });
    });

    // 신뢰도 보너스
    if (partner.credibility === 'A+') score += 3;
    if (partner.credibility === 'A') score += 2;

    return score;
  }

  generateDataCitations(usedData) {
    const citations = [];
    const disclaimers = new Set();

    usedData.forEach(data => {
      const config = data.config;
      citations.push(`- ${config.usageGuidelines.citation}`);
      disclaimers.add(config.usageGuidelines.disclaimer);
    });

    return {
      citations,
      disclaimers: Array.from(disclaimers),
    };
  }

  getDataForBlogContent(contentType, category) {
    const keywordMap = {
      세무최적화: ['상속세', '절세', '세무', '상속증여', '법인세'],
      투자전략: ['투자', '포트폴리오', '자산배분', '펀드', '자산관리'],
      패밀리오피스: ['자산관리', '가족자산', '승계', '보험', '연금'],
      사례연구: ['실제사례', '성과', '전략', '성공사례'],
      시장분석: ['시장동향', '분석', '전망', '통계'],
      디지털혁신: ['핀테크', '디지털', '혁신', 'AI', '자동화'],
    };

    const keywords = keywordMap[category] || [];
    const relevantData = this.getRelevantData(contentType, keywords);

    return {
      relevantPartners: relevantData,
      suggestedInclusions: this.generateContentSuggestions(relevantData),
      citations: this.generateDataCitations(relevantData),
    };
  }

  generateContentSuggestions(relevantData) {
    const suggestions = [];

    relevantData.forEach(data => {
      const partner = data.config;

      // 데이터 활용 제안
      if (data.availableData.reports && data.availableData.reports.length > 0) {
        suggestions.push({
          type: 'report-reference',
          partner: partner.name,
          suggestion: `${partner.name} 최신 보고서 데이터 활용`,
          files: data.availableData.reports.slice(0, 3),
        });
      }

      if (data.availableData.data && data.availableData.data.length > 0) {
        suggestions.push({
          type: 'data-integration',
          partner: partner.name,
          suggestion: `${partner.name} 제공 통계 데이터 인용`,
          files: data.availableData.data.slice(0, 3),
        });
      }
    });

    return suggestions;
  }

  generatePartnerDataIndex() {
    const partnerData = this.scanPartnerData();
    const indexPath = path.join(this.partnerDataPath, 'index.json');

    const index = {
      lastUpdated: new Date().toISOString(),
      partners: Object.keys(PARTNER_DATA_CONFIG).map(key => ({
        key,
        name: PARTNER_DATA_CONFIG[key].name,
        category: PARTNER_DATA_CONFIG[key].category,
        fileCount: this.getTotalFileCount(partnerData[key]),
        lastModified: this.getLastModifiedDate(partnerData[key]),
      })),
      totalFiles: Object.values(partnerData).reduce(
        (total, data) => total + this.getTotalFileCount(data),
        0
      ),
      categories: [
        ...new Set(Object.values(PARTNER_DATA_CONFIG).map(p => p.category)),
      ],
    };

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`📊 Partner data index updated: ${indexPath}`);

    return index;
  }

  getTotalFileCount(partnerData) {
    if (!partnerData || !partnerData.files) return 0;

    return Object.values(partnerData.files).reduce(
      (total, files) => total + (Array.isArray(files) ? files.length : 0),
      0
    );
  }

  getLastModifiedDate(partnerData) {
    if (!partnerData || !partnerData.files) return null;

    let latestDate = new Date(0);

    Object.values(partnerData.files).forEach(files => {
      if (Array.isArray(files)) {
        files.forEach(file => {
          const fileDate = new Date(file.modified);
          if (fileDate > latestDate) {
            latestDate = fileDate;
          }
        });
      }
    });

    return latestDate.toISOString();
  }
}

// CLI 사용법
function main() {
  const command = process.argv[2];
  const manager = new PartnerDataManager();

  switch (command) {
    case 'scan':
      console.log('🔍 Scanning partner data...');
      const data = manager.scanPartnerData();
      console.log(JSON.stringify(data, null, 2));
      break;

    case 'index':
      console.log('📊 Generating partner data index...');
      const index = manager.generatePartnerDataIndex();
      console.log('✅ Index generated successfully');
      break;

    case 'setup':
      console.log('🏗️ Setting up partner data directories...');
      manager.initializeDirectories();
      console.log('✅ Directory structure created');
      break;

    case 'get-relevant':
      const category = process.argv[3] || '패밀리오피스';
      console.log(`🎯 Getting relevant data for category: ${category}`);
      const relevantData = manager.getDataForBlogContent('blog', category);
      console.log(JSON.stringify(relevantData, null, 2));
      break;

    default:
      console.log(`
📚 Partner Data Integration System

사용법:
  node partner-data-integration.js <command>

명령어:
  setup         - 파트너 데이터 디렉토리 구조 생성
  scan          - 현재 업로드된 파트너 자료 스캔
  index         - 파트너 데이터 인덱스 생성
  get-relevant  - 특정 카테고리 관련 데이터 조회

예시:
  node partner-data-integration.js setup
  node partner-data-integration.js get-relevant 세무최적화
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = PartnerDataManager;
