'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Tag } from '@/components/ui/tag'
import { formatDate } from '@/lib/utils'
import type { MemberEventRow, EventRsvpRow } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'
interface EventCardProps { event: MemberEventRow; rsvp: EventRsvpRow | null; memberGuestAllotment: number; onRsvpChange: (eventId: string, guestCount: number) => Promise<void> }
export function EventCard({ event, rsvp, memberGuestAllotment, onRsvpChange }: EventCardProps) {
  const [guestCount, setGuestCount] = useState(rsvp?.guest_count ?? 0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isRsvpd = !!rsvp; const isWaitlisted = rsvp?.waitlisted ?? false
  async function handleRsvp() {
    if (guestCount > memberGuestAllotment) { setError(`Your membership allows up to ${memberGuestAllotment} guest${memberGuestAllotment !== 1 ? 's' : ''} per event.`); return }
    setError(null); setSubmitting(true)
    try { await onRsvpChange(event.id, guestCount) } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Something went wrong.') } finally { setSubmitting(false) }
  }
  return (
    <div className="portal-card rounded overflow-hidden">
      {event.image_url && (
        <div className="relative h-44 w-full">
          <Image src={event.image_url} alt={event.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 600px" quality={80} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(44,31,20,0.6) 100%)' }} aria-hidden />
        </div>
      )}
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-body text-sm font-medium leading-snug" style={{ color: 'var(--portal-text)' }}>{event.title}</h3>
            {event.host && <p className="font-mono text-[10px] tracking-wide mt-0.5 uppercase" style={{ color: 'var(--portal-text-muted)' }}>Hosted by {event.host}</p>}
          </div>
          {isWaitlisted ? <Tag variant="amber" dot>Waitlisted</Tag> : isRsvpd ? <Tag variant="river" dot>Going</Tag> : null}
        </div>
        <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--portal-text-muted)' }}>{formatDate(event.event_date, 'full')}</p>
        {event.description && <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--portal-text-muted)' }}>{event.description}</p>}
        <div className="pt-3 border-t border-white/10 space-y-3">
          {isWaitlisted ? (
            <p className="font-body text-xs" style={{ color: 'var(--portal-accent)' }}>You're on the waitlist — we'll notify you if a spot opens.</p>
          ) : (
            <>
              {memberGuestAllotment > 0 && (
                <div className="flex items-center gap-3">
                  <label htmlFor={`guests-${event.id}`} className="font-body text-xs flex-shrink-0" style={{ color: 'var(--portal-text-muted)' }}>Bringing guests</label>
                  <select id={`guests-${event.id}`} value={guestCount} onChange={(e) => { setGuestCount(Number(e.target.value)); setError(null) }} className="bg-white/[0.08] border border-white/15 rounded px-2 py-1 font-mono text-xs focus:outline-none" style={{ color: 'var(--portal-text)' }}>
                    {Array.from({ length: memberGuestAllotment + 1 }, (_, i) => <option key={i} value={i}>{i === 0 ? 'Just me' : `+${i}`}</option>)}
                  </select>
                </div>
              )}
              {error && <p className="font-body text-xs" style={{ color: 'var(--portal-accent)' }}>{error}</p>}
              <button type="button" onClick={handleRsvp} disabled={submitting}
                className={cn('w-full py-2.5 rounded font-body text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]', isRsvpd ? 'bg-white/[0.06] border border-white/15 hover:bg-white/[0.10]' : 'bg-[--portal-accent] hover:opacity-90', submitting && 'opacity-50 pointer-events-none')}
                style={{ color: isRsvpd ? 'var(--portal-text-muted)' : 'var(--color-soil)' }}>
                {submitting ? 'Saving…' : isRsvpd ? 'Change RSVP' : 'RSVP'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
