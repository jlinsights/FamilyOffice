import { z } from 'zod'

export const consultationSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요').max(50, '이름은 50자 이하로 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  phone: z.string().regex(/^01[0-9]-\d{3,4}-\d{4}$/, '올바른 휴대폰 번호를 입력해주세요 (예: 010-1234-5678)'),
  company: z.string().min(1, '회사명을 입력해주세요').max(100, '회사명은 100자 이하로 입력해주세요'),
  position: z.string().min(1, '직급을 입력해주세요').max(50, '직급은 50자 이하로 입력해주세요'),
  industry: z.string().min(1, '업종을 선택해주세요'),
  assets: z.string().min(1, '자산 규모를 선택해주세요'),
  services: z.array(z.string()).min(1, '관심 서비스를 선택해주세요'),
  message: z.string().max(1000, '메시지는 1000자 이하로 입력해주세요').optional(),
  privacyConsent: z.boolean().refine(val => val === true, '개인정보 수집 및 이용에 동의해주세요'),
  marketingConsent: z.boolean().optional()
})

export const contactSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요').max(50, '이름은 50자 이하로 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  phone: z.string().regex(/^01[0-9]-\d{3,4}-\d{4}$/, '올바른 휴대폰 번호를 입력해주세요 (예: 010-1234-5678)'),
  subject: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이하로 입력해주세요'),
  message: z.string().min(10, '메시지는 10자 이상 입력해주세요').max(1000, '메시지는 1000자 이하로 입력해주세요'),
  privacyConsent: z.boolean().refine(val => val === true, '개인정보 수집 및 이용에 동의해주세요')
})

export const adminUserSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  name: z.string().min(2, '이름은 2자 이상 입력해주세요').max(50, '이름은 50자 이하로 입력해주세요'),
  role: z.enum(['admin', 'user'], {
    errorMap: () => ({ message: '올바른 역할을 선택해주세요' })
  })
})

export type ConsultationFormData = z.infer<typeof consultationSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type AdminUserData = z.infer<typeof adminUserSchema>