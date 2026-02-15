import { z } from 'zod';

// Schema Definition based on "Request Ticket - 1 min form"
export const requestTicketSchema = z.object({
  // 1. 요청 유형
  requestType: z.enum(
    [
      'hotel_dining',
      'travel',
      'art_tour',
      'family_office_meeting',
      'network_inquiry',
      'other',
    ],
    { required_error: '요청 유형을 선택해주세요.' }
  ),
  requestTypeOther: z.string().optional(), // 기타 선택 시

  // 2. 희망 일정/마감
  preferredDate: z
    .string()
    .min(1, { message: '희망 날짜/시간을 입력해주세요.' }),
  deadline: z.string().min(1, { message: '확정 마감 시한을 입력해주세요.' }),

  // 3. 참여자/동행
  participantsAdults: z.coerce.number().min(0),
  participantsChildren: z.coerce.number().min(0),
  participantsNotes: z.string().optional(),

  // 4. 예산/선호
  budget: z.string().min(1, { message: '예산 범위를 입력해주세요.' }),
  stylePreference: z.string().optional(),

  // 5. 제약 조건
  constraints: z.string().optional(), // 절대 불가, 알레르기 등

  // 6. 옵션 제시 방식
  optionStyle: z.enum(['best_one', 'comparison', 'budget_approval'], {
    required_error: '옵션 제시 방식을 선택해주세요.',
  }),

  // 7. 회신 채널
  contactChannel: z.enum(['kakao', 'email', 'assistant']),
  contactDetail: z
    .string()
    .min(1, { message: '연락처 또는 이메일을 입력해주세요.' }),

  // 8. 추가 요청
  additionalNotes: z.string().optional(),
});

export type RequestTicketSubmission = z.infer<typeof requestTicketSchema> & {
  id: string;
  submittedAt: string;
  status: 'new' | 'processing' | 'completed';
};
