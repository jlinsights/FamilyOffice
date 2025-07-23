import crypto from 'crypto'

// 암호화 키 관리
export class EncryptionService {
  private algorithm = 'aes-256-gcm'
  private keyLength = 32
  private tagLength = 16

  constructor() {
    this.validateEnvironment()
  }

  private validateEnvironment(): void {
    if (!process.env.ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY environment variable is required')
    }
  }

  // 데이터 암호화
  async encrypt(data: string): Promise<string> {
    try {
      const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
      const iv = crypto.randomBytes(16)
      
      const cipher = crypto.createCipher(this.algorithm, key)
      
      let encrypted = cipher.update(data, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      
      // IV + Encrypted Data
      return iv.toString('hex') + encrypted
    } catch (error) {
      console.error('Encryption error:', error)
      throw new Error('Failed to encrypt data')
    }
  }

  // 데이터 복호화
  async decrypt(encryptedData: string): Promise<string> {
    try {
      const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
      
      // IV, Encrypted Data 분리  
      const encrypted = encryptedData.slice(32)
      
      const decipher = crypto.createDecipher(this.algorithm, key)
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      
      return decrypted
    } catch (error) {
      console.error('Decryption error:', error)
      throw new Error('Failed to decrypt data')
    }
  }

  // 키 회전
  async rotateKeys(): Promise<void> {
    try {
      const newKey = crypto.randomBytes(this.keyLength)
      const newKeyHex = newKey.toString('hex')
      
      // 새 키를 안전한 방법으로 저장
      console.log('New encryption key generated:', newKeyHex)
      
      // 기존 데이터 재암호화 로직은 별도 구현 필요
      } catch (error) {
      console.error('Key rotation error:', error)
      throw new Error('Failed to rotate encryption keys')
    }
  }
} 