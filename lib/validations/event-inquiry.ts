import { z } from 'zod'
export const eventInquirySchema = z.object({
  contactName: z.string().trim().min(2, 'Please enter your name.').max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().trim().max(30).optional(),
  eventType: z.enum(['corporate_retreat', 'private_event', 'other'], { errorMap: () => ({ message: 'Please select an event type.' }) }),
  preferredDate: z.string().trim().optional(),
  guestCount: z.enum(['under_25', '25_50', '50_100', '100_150', '150_plus'], { errorMap: () => ({ message: 'Please select an estimated guest count.' }) }),
  contactPreference: z.enum(['email', 'phone', 'either'], { errorMap: () => ({ message: 'Please select a contact preference.' }) }),
  message: z.string().trim().max(600, 'Please keep your message under 600 characters.').optional(),
})
export type EventInquiryInput = z.infer<typeof eventInquirySchema>
export const EVENT_TYPE_LABELS: Record<EventInquiryInput['eventType'], string> = { corporate_retreat: 'Corporate Retreat', private_event: 'Private Event', other: 'Other' }
export const GUEST_COUNT_LABELS: Record<EventInquiryInput['guestCount'], string> = { under_25: 'Fewer than 25', '25_50': '25 – 50', '50_100': '50 – 100', '100_150': '100 – 150', '150_plus': '150 or more' }
export const CONTACT_PREF_LABELS: Record<EventInquiryInput['contactPreference'], string> = { email: 'Email', phone: 'Phone', either: 'Either' }
