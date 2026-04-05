import { z } from 'zod'
export const bookingSchema = z.object({
  type: z.enum(['lodging', 'guided_recreation', 'event_space', 'private_request'], { errorMap: () => ({ message: 'Please select a booking type.' }) }),
  resourceKey: z.string().trim().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format.').refine((d) => new Date(d) >= new Date(), 'Start date must be in the future.'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format.'),
  partySize: z.number({ invalid_type_error: 'Please enter a party size.' }).int().min(1, 'Party size must be at least 1.').max(200, 'Please contact us for groups over 200.'),
  guests: z.array(z.object({ name: z.string().trim().min(1), notes: z.string().optional() })).optional(),
  memberNotes: z.string().trim().max(800).optional(),
}).refine((d) => new Date(d.endDate) >= new Date(d.startDate), { message: 'End date must be on or after start date.', path: ['endDate'] })
export type BookingInput = z.infer<typeof bookingSchema>
export const BOOKING_TYPE_LABELS: Record<BookingInput['type'], string> = { lodging: 'Lodge or Cabin Stay', guided_recreation: 'Guided Experience', event_space: 'Event Space', private_request: 'Private Request' }
export const BOOKING_TYPE_DESCRIPTIONS: Record<BookingInput['type'], string> = { lodging: 'Overnight stay at the lodge or cabin.', guided_recreation: 'Guided hunt, fishing trip, or outdoor experience.', event_space: 'Rent a space for a private group event on the estate.', private_request: "Something that doesn't fit the above — tell us what you need." }
