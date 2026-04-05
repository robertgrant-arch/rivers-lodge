import { z } from 'zod'
export const weddingInquirySchema = z.object({
  partner1Name: z.string().trim().min(2, 'Please enter a name.').max(100),
  partner2Name: z.string().trim().min(2, 'Please enter a name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().trim().max(30).optional(),
  preferredDates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format.')).min(1, 'Please select at least one preferred date.').max(3, 'You may select up to three dates.'),
  guestCountEstimate: z.enum(['under_50', '50_100', '100_150', '150_200', '200_plus'], { errorMap: () => ({ message: 'Please select an estimated guest count.' }) }),
  referralSource: z.enum(['instagram', 'pinterest', 'google', 'referral', 'other']).optional(),
  whatMattersMost: z.string().trim().max(500, 'Please keep your response under 500 characters.').optional(),
})
export type WeddingInquiryInput = z.infer<typeof weddingInquirySchema>
export const GUEST_COUNT_LABELS: Record<WeddingInquiryInput['guestCountEstimate'], string> = { under_50: 'Fewer than 50', '50_100': '50 – 100', '100_150': '100 – 150', '150_200': '150 – 200', '200_plus': '200 or more' }
export const REFERRAL_LABELS: Record<NonNullable<WeddingInquiryInput['referralSource']>, string> = { instagram: 'Instagram', pinterest: 'Pinterest', google: 'Google search', referral: 'Personal referral', other: 'Other' }
