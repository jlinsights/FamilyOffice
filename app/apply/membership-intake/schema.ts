import { z } from 'zod';

export const membershipIntakeSchema = z.object({
  name: z.string(),
  affiliation: z.string(),
  title: z.string().optional(),
  phone: z.string(),
  email: z.string(),
  city: z.string(),
  interests: z.array(z.string()),
  interestsOther: z.string().optional(),
  frequency: z.enum(['monthly_1', 'monthly_2_3', 'weekly_1', 'project']),
  budget: z.enum(['300', '600', '1200', '2400', 'negotiable']),
  paymentMethod: z.enum(['personal_card', 'corporate_card', 'tax_invoice', 'invoice_foreign']),
  preferredTime: z.enum(['weekday_am', 'weekday_pm', 'evening', 'weekend']),
  keyProblem: z.string(),
  taboos: z.string().optional(),
  marketingConsent: z.boolean(),
  privacyConsent: z.boolean(),
});

export type MembershipIntakeSubmission = z.infer<typeof membershipIntakeSchema> & {
  id: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'completed';
};
