import { 
  consultationSchema, 
  contactSchema, 
  adminUserSchema,
  type ConsultationFormData,
  type ContactFormData,
  type AdminUserData
} from '../validation'

describe('Validation Schemas', () => {
  describe('consultationSchema', () => {
    const validConsultationData: ConsultationFormData = {
      name: '김철수',
      email: 'test@example.com',
      phone: '010-1234-5678',
      company: '테스트 회사',
      position: '대표이사',
      industry: '제조업',
      assets: '50억~100억',
      services: ['자산관리', '세무최적화'],
      message: '상담 요청드립니다.',
      privacyConsent: true,
      marketingConsent: false
    }

    it('validates correct consultation data', () => {
      const result = consultationSchema.safeParse(validConsultationData)
      expect(result.success).toBe(true)
    })

    it('fails validation for invalid name', () => {
      const invalidData = { ...validConsultationData, name: 'a' }
      const result = consultationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('이름은 2자 이상 입력해주세요')
      }
    })

    it('fails validation for invalid email', () => {
      const invalidData = { ...validConsultationData, email: 'invalid-email' }
      const result = consultationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('올바른 이메일 주소를 입력해주세요')
      }
    })

    it('fails validation for invalid phone number', () => {
      const invalidData = { ...validConsultationData, phone: '123-456-7890' }
      const result = consultationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('올바른 휴대폰 번호를 입력해주세요 (예: 010-1234-5678)')
      }
    })

    it('validates correct phone number formats', () => {
      const validPhones = [
        '010-1234-5678',
        '011-123-4567',
        '016-1234-5678',
        '017-123-4567',
        '018-1234-5678',
        '019-123-4567'
      ]

      validPhones.forEach(phone => {
        const data = { ...validConsultationData, phone }
        const result = consultationSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('fails validation when no services selected', () => {
      const invalidData = { ...validConsultationData, services: [] }
      const result = consultationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('관심 서비스를 선택해주세요')
      }
    })

    it('fails validation when privacy consent is false', () => {
      const invalidData = { ...validConsultationData, privacyConsent: false }
      const result = consultationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('개인정보 수집 및 이용에 동의해주세요')
      }
    })

    it('allows empty message', () => {
      const data = { ...validConsultationData, message: undefined }
      const result = consultationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('allows optional marketing consent', () => {
      const data = { ...validConsultationData, marketingConsent: undefined }
      const result = consultationSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('contactSchema', () => {
    const validContactData: ContactFormData = {
      name: '김철수',
      email: 'test@example.com',
      phone: '010-1234-5678',
      subject: '문의사항',
      message: '안녕하세요. 문의드립니다.',
      privacyConsent: true
    }

    it('validates correct contact data', () => {
      const result = contactSchema.safeParse(validContactData)
      expect(result.success).toBe(true)
    })

    it('fails validation for short message', () => {
      const invalidData = { ...validContactData, message: 'short' }
      const result = contactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('메시지는 10자 이상 입력해주세요')
      }
    })

    it('fails validation for long message', () => {
      const invalidData = { ...validContactData, message: 'a'.repeat(1001) }
      const result = contactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('메시지는 1000자 이하로 입력해주세요')
      }
    })

    it('fails validation when privacy consent is false', () => {
      const invalidData = { ...validContactData, privacyConsent: false }
      const result = contactSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('개인정보 수집 및 이용에 동의해주세요')
      }
    })
  })

  describe('adminUserSchema', () => {
    const validAdminData: AdminUserData = {
      email: 'admin@example.com',
      name: '관리자',
      role: 'admin'
    }

    it('validates correct admin user data', () => {
      const result = adminUserSchema.safeParse(validAdminData)
      expect(result.success).toBe(true)
    })

    it('validates user role', () => {
      const userData = { ...validAdminData, role: 'user' as const }
      const result = adminUserSchema.safeParse(userData)
      expect(result.success).toBe(true)
    })

    it('fails validation for invalid role', () => {
      const invalidData = { ...validAdminData, role: 'invalid' }
      const result = adminUserSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('올바른 역할을 선택해주세요')
      }
    })

    it('fails validation for invalid email', () => {
      const invalidData = { ...validAdminData, email: 'invalid-email' }
      const result = adminUserSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('올바른 이메일 주소를 입력해주세요')
      }
    })
  })
})