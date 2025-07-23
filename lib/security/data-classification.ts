export interface DataClassification {
  id: string;
  name: string;
  level: 'public' | 'internal' | 'confidential' | 'restricted';
  description: string;
  retentionPeriod: number; // 일 단위
  encryptionRequired: boolean;
  accessLogging: boolean;
  auditRequired: boolean;
  gdprCompliance: boolean;
  soxCompliance: boolean;
}

export interface DataRetentionPolicy {
  id: string;
  classificationId: string;
  retentionPeriod: number; // 일 단위
  archiveAfter: number; // 일 단위
  deleteAfter: number; // 일 단위
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  encryptionRequired: boolean;
  accessControls: string[];
}

export interface DataSubject {
  id: string;
  type: 'individual' | 'family' | 'entity';
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  gdprRights: GDPRRights;
  dataProcessing: DataProcessing[];
  consentHistory: ConsentRecord[];
}

export interface GDPRRights {
  rightToAccess: boolean;
  rightToRectification: boolean;
  rightToErasure: boolean;
  rightToPortability: boolean;
  rightToObject: boolean;
  rightToRestriction: boolean;
  automatedDecisionMaking: boolean;
  profiling: boolean;
}

export interface DataProcessing {
  id: string;
  purpose: string;
  legalBasis: string;
  dataCategories: string[];
  recipients: string[];
  retentionPeriod: number;
  automatedDecisionMaking: boolean;
  profiling: boolean;
  internationalTransfers: boolean;
  safeguards: string[];
}

export interface ConsentRecord {
  id: string;
  timestamp: Date;
  consentType: string;
  granted: boolean;
  withdrawalDate?: Date;
  legalBasis: string;
  dataCategories: string[];
  purpose: string;
}

export class DataClassificationService {
  private static classifications: DataClassification[] = [
    {
      id: 'public',
      name: 'Public Information',
      level: 'public',
      description: '공개 가능한 정보',
      retentionPeriod: 2555, // 7년
      encryptionRequired: false,
      accessLogging: false,
      auditRequired: false,
      gdprCompliance: false,
      soxCompliance: false
    },
    {
      id: 'internal',
      name: 'Internal Use Only',
      level: 'internal',
      description: '내부 사용만 가능한 정보',
      retentionPeriod: 2555, // 7년
      encryptionRequired: true,
      accessLogging: true,
      auditRequired: false,
      gdprCompliance: true,
      soxCompliance: false
    },
    {
      id: 'confidential',
      name: 'Confidential Information',
      level: 'confidential',
      description: '기밀 정보 - 제한된 접근',
      retentionPeriod: 3650, // 10년
      encryptionRequired: true,
      accessLogging: true,
      auditRequired: true,
      gdprCompliance: true,
      soxCompliance: true
    },
    {
      id: 'restricted',
      name: 'Restricted Information',
      level: 'restricted',
      description: '최고 보안 등급 - 특별 승인 필요',
      retentionPeriod: 7300, // 20년
      encryptionRequired: true,
      accessLogging: true,
      auditRequired: true,
      gdprCompliance: true,
      soxCompliance: true
    }
  ];

  // 데이터 분류 가져오기
  static getClassification(level: string): DataClassification | undefined {
    return this.classifications.find(c => c.level === level);
  }

  // 모든 분류 가져오기
  static getAllClassifications(): DataClassification[] {
    return this.classifications;
  }

  // 데이터 분류 결정
  static classifyData(
    dataType: string,
    content: string
  ): DataClassification {
    // 금융 데이터
    if (this.isFinancialData(dataType, content)) {
      return this.getClassification('restricted')!;
    }

    // 개인정보
    if (this.isPersonalData(dataType, content)) {
      return this.getClassification('confidential')!;
    }

    // 내부 운영 데이터
    if (this.isInternalData(dataType, content)) {
      return this.getClassification('internal')!;
    }

    // 기본값
    return this.getClassification('public')!;
  }

  // 금융 데이터 확인
  private static isFinancialData(dataType: string, content: string): boolean {
    const financialKeywords = [
      'portfolio', 'investment', 'asset', 'wealth', 'financial',
      'transaction', 'trade', 'balance', 'account', 'fund',
      'security', 'bond', 'stock', 'derivative', 'option'
    ];

    return financialKeywords.some(keyword => 
      dataType.toLowerCase().includes(keyword) || 
      content.toLowerCase().includes(keyword)
    );
  }

  // 개인정보 확인
  private static isPersonalData(dataType: string, content: string): boolean {
    const personalKeywords = [
      'name', 'email', 'phone', 'address', 'ssn', 'passport',
      'birth', 'family', 'personal', 'private', 'identity'
    ];

    return personalKeywords.some(keyword => 
      dataType.toLowerCase().includes(keyword) || 
      content.toLowerCase().includes(keyword)
    );
  }

  // 내부 데이터 확인
  private static isInternalData(dataType: string, content: string): boolean {
    const internalKeywords = [
      'internal', 'operational', 'process', 'workflow',
      'system', 'configuration', 'setting', 'log'
    ];

    return internalKeywords.some(keyword => 
      dataType.toLowerCase().includes(keyword) || 
      content.toLowerCase().includes(keyword)
    );
  }
}

export class DataRetentionService {
  // 데이터 보존 정책 생성
  static createRetentionPolicy(
    classificationId: string,
    customRetention?: number
  ): DataRetentionPolicy {
    const classification = DataClassificationService.getClassification(classificationId);
    
    if (!classification) {
      throw new Error(`Invalid classification: ${classificationId}`);
    }

    return {
      id: crypto.randomUUID(),
      classificationId,
      retentionPeriod: customRetention || classification.retentionPeriod,
      archiveAfter: Math.floor((customRetention || classification.retentionPeriod) * 0.7),
      deleteAfter: customRetention || classification.retentionPeriod,
      backupFrequency: classification.level === 'restricted' ? 'daily' : 'weekly',
      encryptionRequired: classification.encryptionRequired,
      accessControls: this.getAccessControls(classification.level)
    };
  }

  // 접근 제어 설정 가져오기
  private static getAccessControls(level: string): string[] {
    switch (level) {
      case 'restricted':
        return ['admin', 'super_admin', 'auditor'];
      case 'confidential':
        return ['admin', 'manager', 'auditor'];
      case 'internal':
        return ['user', 'manager', 'admin'];
      case 'public':
        return ['user', 'guest'];
      default:
        return ['user'];
    }
  }

  // 데이터 보존 정책 적용
  static async applyRetentionPolicy(
    dataId: string,
    policy: DataRetentionPolicy
  ): Promise<void> {
    const now = new Date();
    const archiveDate = new Date(now.getTime() + policy.archiveAfter * 24 * 60 * 60 * 1000);
    const deleteDate = new Date(now.getTime() + policy.deleteAfter * 24 * 60 * 60 * 1000);

    // 보존 정책 스케줄링
    await this.scheduleDataRetention(dataId, {
      archiveDate,
      deleteDate,
      policy
    });
  }

  // 데이터 보존 스케줄링
  private static async scheduleDataRetention(
    dataId: string,
    schedule: {
      archiveDate: Date;
      deleteDate: Date;
      policy: DataRetentionPolicy;
    }
  ): Promise<void> {
    console.log(`Scheduling data retention for ${dataId}:`, schedule);
  }
}

export class GDPRService {
  // 데이터 주체 생성
  static createDataSubject(
    type: 'individual' | 'family' | 'entity',
    name: string,
    email?: string
  ): DataSubject {
    return {
      id: crypto.randomUUID(),
      type,
      name,
      email,
      gdprRights: this.getDefaultGDPRRights(),
      dataProcessing: [],
      consentHistory: []
    };
  }

  // 기본 GDPR 권리 설정
  private static getDefaultGDPRRights(): GDPRRights {
    return {
      rightToAccess: true,
      rightToRectification: true,
      rightToErasure: true,
      rightToPortability: true,
      rightToObject: true,
      rightToRestriction: true,
      automatedDecisionMaking: false,
      profiling: false
    };
  }

  // 동의 기록 추가
  static addConsentRecord(
    subject: DataSubject,
    consentType: string,
    granted: boolean,
    legalBasis: string,
    dataCategories: string[],
    purpose: string
  ): ConsentRecord {
    const record: ConsentRecord = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      consentType,
      granted,
      legalBasis,
      dataCategories,
      purpose
    };

    subject.consentHistory.push(record);
    return record;
  }

  // 데이터 처리 기록 추가
  static addDataProcessing(
    subject: DataSubject,
    purpose: string,
    legalBasis: string,
    dataCategories: string[],
    recipients: string[],
    retentionPeriod: number
  ): DataProcessing {
    const processing: DataProcessing = {
      id: crypto.randomUUID(),
      purpose,
      legalBasis,
      dataCategories,
      recipients,
      retentionPeriod,
      automatedDecisionMaking: false,
      profiling: false,
      internationalTransfers: false,
      safeguards: []
    };

    subject.dataProcessing.push(processing);
    return processing;
  }

  // 데이터 주체 권리 실행
  static async executeDataSubjectRight(
    subject: DataSubject,
    right: keyof GDPRRights,
    requestDetails: Record<string, any>
  ): Promise<any> {
    switch (right) {
      case 'rightToAccess':
        return await this.executeRightToAccess(subject, requestDetails);
      case 'rightToRectification':
        return await this.executeRightToRectification(subject, requestDetails);
      case 'rightToErasure':
        return await this.executeRightToErasure(subject, requestDetails);
      case 'rightToPortability':
        return await this.executeRightToPortability(subject, requestDetails);
      case 'rightToObject':
        return await this.executeRightToObject(subject, requestDetails);
      case 'rightToRestriction':
        return await this.executeRightToRestriction(subject, requestDetails);
      default:
        throw new Error(`Unsupported GDPR right: ${right}`);
    }
  }

  // 접근권 실행
  private static async executeRightToAccess(
    subject: DataSubject,
    requestDetails: Record<string, any>
  ): Promise<any> {
    console.log('Executing right to access for:', subject.id);
    console.log('Request details:', requestDetails);
    return {
      subjectId: subject.id,
      dataProcessing: subject.dataProcessing,
      consentHistory: subject.consentHistory,
      gdprRights: subject.gdprRights
    };
  }

  // 정정권 실행
  private static async executeRightToRectification(
    subject: DataSubject,
    requestDetails: Record<string, any>
  ): Promise<any> {
    console.log('Executing right to rectification for:', subject.id);
    return { success: true, updatedFields: requestDetails.fields };
  }

  // 삭제권 실행
  private static async executeRightToErasure(
    subject: DataSubject,
    requestDetails: Record<string, any>
  ): Promise<any> {
    console.log('Executing right to erasure for:', subject.id);
    return { success: true, deletedData: requestDetails.dataTypes };
  }

  // 이전권 실행
  private static async executeRightToPortability(
    subject: DataSubject,
    requestDetails: Record<string, any>
  ): Promise<any> {
    console.log('Executing right to portability for:', subject.id);
    return {
      format: requestDetails.format || 'json',
      data: subject.dataProcessing
    };
  }

  // 이의권 실행
  private static async executeRightToObject(
    subject: DataSubject,
    requestDetails: Record<string, any>
  ): Promise<any> {
    console.log('Executing right to object for:', subject.id);
    return { success: true, processingStopped: requestDetails.processingTypes };
  }

  // 제한권 실행
  private static async executeRightToRestriction(
    subject: DataSubject,
    requestDetails: Record<string, any>
  ): Promise<any> {
    console.log('Executing right to restriction for:', subject.id);
    return { success: true, restrictionsApplied: requestDetails.restrictions };
  }
} 