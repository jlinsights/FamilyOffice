import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import crypto from 'crypto';

export interface MFASettings {
  id: string;
  userId: string;
  secret: string;
  backupCodes: string[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class MFAService {
  // TOTP 시크릿 생성
  static generateSecret(userId: string): string {
    return authenticator.generateSecret();
  }

  // QR 코드 생성
  static async generateQRCode(userId: string, secret: string): Promise<string> {
    const otpauth = authenticator.keyuri(userId, 'Family Office', secret);
    return await QRCode.toDataURL(otpauth);
  }

  // TOTP 토큰 검증
  static verifyToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  }

  // 백업 코드 생성
  static generateBackupCodes(): string[] {
    return Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
  }

  // MFA 설정 생성
  static async createMFASettings(userId: string): Promise<MFASettings> {
    const secret = this.generateSecret(userId);
    const backupCodes = this.generateBackupCodes();

    const settings: MFASettings = {
      id: crypto.randomUUID(),
      userId,
      secret,
      backupCodes,
      enabled: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 데이터베이스에 저장
    await this.saveMFASettings(settings);

    return settings;
  }

  // MFA 활성화
  static async enableMFA(userId: string, token: string): Promise<boolean> {
    const settings = await this.getMFASettings(userId);
    
    if (!settings) {
      throw new Error('MFA settings not found');
    }

    if (this.verifyToken(token, settings.secret)) {
      settings.enabled = true;
      settings.updatedAt = new Date();
      await this.updateMFASettings(settings);
      return true;
    }

    return false;
  }

  // 백업 코드 검증
  static async verifyBackupCode(userId: string, backupCode: string): Promise<boolean> {
    const settings = await this.getMFASettings(userId);
    
    if (!settings) {
      return false;
    }

    const isValid = settings.backupCodes.includes(backupCode);
    
    if (isValid) {
      // 사용된 백업 코드 제거
      settings.backupCodes = settings.backupCodes.filter(code => code !== backupCode);
      await this.updateMFASettings(settings);
    }

    return isValid;
  }

  // MFA 검증
  static async validateMFA(userId: string, token: string): Promise<boolean> {
    const settings = await this.getMFASettings(userId);
    
    if (!settings || !settings.enabled) {
      return true; // MFA가 비활성화된 경우 통과
    }

    return this.verifyToken(token, settings.secret);
  }

  // MFA 비활성화
  static async disableMFA(userId: string): Promise<void> {
    const settings = await this.getMFASettings(userId);
    
    if (settings) {
      settings.enabled = false;
      settings.updatedAt = new Date();
      await this.updateMFASettings(settings);
    }
  }

  // 백업 코드 재생성
  static async regenerateBackupCodes(userId: string): Promise<string[]> {
    const settings = await this.getMFASettings(userId);
    
    if (!settings) {
      throw new Error('MFA settings not found');
    }

    const newBackupCodes = this.generateBackupCodes();
    settings.backupCodes = newBackupCodes;
    settings.updatedAt = new Date();
    
    await this.updateMFASettings(settings);
    
    return newBackupCodes;
  }

  // 데이터베이스 작업 (구현 필요)
  private static async saveMFASettings(settings: MFASettings): Promise<void> {
    // 데이터베이스 저장 로직
    console.log('Saving MFA settings:', settings.id);
  }

  private static async getMFASettings(userId: string): Promise<MFASettings | null> {
    // 데이터베이스 조회 로직
    return null; // 구현 필요
  }

  private static async updateMFASettings(settings: MFASettings): Promise<void> {
    // 데이터베이스 업데이트 로직
    console.log('Updating MFA settings:', settings.id);
  }
} 