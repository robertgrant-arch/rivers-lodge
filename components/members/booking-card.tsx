import Link from 'next/link'
import { Tag } from '@/components/ui/tag'
import { formatDateRange, formatDate } from '@/lib/utils'
import { BOOKING_TYPE_LABELS } from '@/lib/validations/booking'
import type { MemberBookingRow } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'
interface BookingCardProps { booking: MemberBookingRow }
const STATUS_TAG: Record<MemberBookingRow['status'], { variant: 'river' | 'amber' | 'stone' | 'portal'; label: string }> = {
  pending: { variant: 'amber', label: 'Pending confirmation' }, confirmed: { variant: 'river', label: 'Confirmed' },
  modified: { variant: 'amber', label: 'Change requested' }, cancelled: { variant: 'stone', label: 'Cancelled' }, completed: { variant: 'portal', label: 'Completed' },
}
export function BookingCard({ booking }: BookingCardProps) {
  const tag = STATUS_TAG[booking.status]
  const dateRange = booking.start_date === booking.end_date ? formatDate(booking.start_date, 'long') : formatDateRange(booking.start_date, booking.end_date)
  return (
    <div className="portal-card rounded p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-body text-sm font-medium" style={{ color: 'var(--portal-text)' }}>{BOOKING_TYPE_LABELS[booking.type]}</p>
          <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--portal-text-muted)' }}>{dateRange}</p>
        </div>
        <Tag variant={tag.variant} dot>{tag.label}</Tag>
      </div>
      {booking.party_size > 1 && <p className="font-body text-xs" style={{ color: 'var(--portal-text-muted)' }}>Party of {booking.party_size}</p>}
      {booking.status === 'modified' && <div className="rounded p-3 text-sm font-body" style={{ background: 'rgba(168,134,74,0.12)', color: 'var(--portal-accent)' }}>The team has requested a change to this booking. Please check your messages.</div>}
      <div className="flex items-center gap-4 pt-1 border-t border-white/10">
        <Link href="/members/messages" className="font-body text-xs hover:underline underline-offset-2 transition-colors" style={{ color: 'var(--portal-text-muted)' }}>Message staff</Link>
        {booking.status === 'pending' && <span className="font-body text-xs" style={{ color: 'var(--portal-text-muted)' }}>· Confirmation within 24 hours</span>}
      </div>
    </div>
  )
}
export function BookingCardEmpty() {
  return (
    <div className="portal-card rounded p-6 text-center">
      <p className="font-body text-sm mb-3" style={{ color: 'var(--portal-text-muted)' }}>No upcoming visits. Ready to plan your next trip?</p>
      <Link href="/members/book" className={cn('inline-flex items-center gap-1.5 font-body text-sm transition-colors duration-150 hover:underline underline-offset-2')} style={{ color: 'var(--portal-accent)' }}>
        Book a stay or experience
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden><path d="M2 6.5H11M7 2.5L11 6.5L7 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
    </div>
  )
}
