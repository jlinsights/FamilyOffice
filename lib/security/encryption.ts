import crypto from 'crypto'
import { promisify } from 'util'

// 암호화 키 관리
class EncryptionManager {
  private algorithm = 'aes-256-gcm'
  private keyLength = 32
  private ivLength = 16
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
      const iv = crypto.randomBytes(this.ivLength)
      
      const cipher = crypto.createCipher(this.algorithm, key)
      cipher.setAAD(Buffer.from('familyoffice', 'utf8'))
      
      let encrypted = cipher.update(data, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      
      const tag = cipher.getAuthTag()
      
      // IV + Tag + Encrypted Data
      return iv.toString('hex') + tag.toString('hex') + encrypted
    } catch (error) {
      console.error('Encryption error:', error)
      throw new Error('Failed to encrypt data')
    }
  }

  // 데이터 복호화
  async decrypt(encryptedData: string): Promise<string> {
    try {
      const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
      
      // IV, Tag, Encrypted Data 분리
      const iv = Buffer.from(encryptedData.slice(0, this.ivLength * 2), 'hex')
      const tag = Buffer.from(encryptedData.slice(this.ivLength * 2, (this.ivLength + this.tagLength) * 2), 'hex')
      const encrypted = encryptedData.slice((this.ivLength + this.tagLength) * 2)
      
      const decipher = crypto.createDecipher(this.algorithm, key)
      decipher.setAuthTag(tag)
      decipher.setAAD(Buffer.from('familyoffice', 'utf8'))
      
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