'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BOOKING_TYPE_LABELS, BOOKING_TYPE_DESCRIPTIONS, type BookingInput } from '@/lib/validations/booking'
import { toISODate, addDays, formatDate } from '@/lib/utils'
import { trackEvent, cn } from '@/lib/utils'

type Step = 1 | 2 | 3 | 4 | 5
type BookingType = BookingInput['type']
const STEP_LABELS: Record<Step, string> = { 1: 'Type', 2: 'Dates', 3: 'Party', 4: 'Notes', 5: 'Review' }
const STEP_VARIANTS = { enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }), center: { opacity: 1, x: 0 }, exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }) }

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-0 mb-8" aria-label={`Step ${current} of 5`}>
      {([1,2,3,4,5] as Step[]).map((s) => (
        <div key={s} className="flex items-center">
          <div className={cn('w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] transition-colors duration-150', s < current ? 'text-soil' : s === current ? 'border-2 text-[--portal-accent]' : 'border text-[--portal-text-muted]')} style={{ background: s < current ? 'var(--portal-accent)' : 'transparent', borderColor: s === current ? 'var(--portal-accent)' : s < current ? 'transparent' : 'rgba(255,255,255,0.2)' }}>
            {s < current ? '✓' : s}
          </div>
          {s < 5 && <div className="h-px w-8 mx-1" style={{ background: s < current ? 'rgba(168,134,74,0.5)' : 'rgba(255,255,255,0.1)' }} />}
        </div>
      ))}
      <span className="ml-4 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--portal-text-muted)' }}>{STEP_LABELS[current]}</span>
    </div>
  )
}

export function BookingWizard({ resourceCapacity = 20 }: { resourceCapacity?: number }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1); const [direction, setDirection] = useState(1)
  const [type, setType] = useState<BookingType | null>(null)
  const [startDate, setStartDate] = useState(''); const [endDate, setEndDate] = useState('')
  const [partySize, setPartySize] = useState(1); const [notes, setNotes] = useState('')
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]); const [availabilityLoading, setAvailabilityLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false); const [submitError, setSubmitError] = useState<string | null>(null); const [success, setSuccess] = useState(false)

  function go(next: Step) { setDirection(next > step ? 1 : -1); setStep(next) }
  function canAdvance() { if (step === 1) return type !== null; if (step === 2) return !!startDate && !!endDate && new Date(endDate) >= new Date(startDate); if (step === 3) return partySize >= 1; return true }
  const checkAvailability = useCallback(async (s: string, e: string, t: BookingType | null) => {
    if (!s || !e || !t) return; setAvailabilityLoading(true)
    try { const res = await fetch(`/api/member-availability?type=${t}&start=${s}&end=${e}`); const data = await res.json() as { unavailableDates?: string[] }; setUnavailableDates(data.unavailableDates ?? []) } catch { setUnavailableDates([]) } finally { setAvailabilityLoading(false) }
  }, [])
  async function submit() {
    if (!type) return; setSubmitting(true); setSubmitError(null)
    try {
      const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, startDate, endDate, partySize, memberNotes: notes }) })
      if (!res.ok) throw new Error(); setSuccess(true); trackEvent('member_booking_submitted')
    } catch { setSubmitError('Something went wrong. Please try again or message our team.') } finally { setSubmitting(false) }
  }

  const minDate = toISODate(addDays(new Date(), 1))
  const overCapacity = partySize > resourceCapacity && resourceCapacity > 0

  if (success) {
    return (
      <div className="portal-card rounded p-8 text-center space-y-4">
        <p className="eyebrow" style={{ color: 'var(--portal-accent)' }}>Submitted</p>
        <h3 className="font-display font-light text-2xl" style={{ color: 'var(--portal-text)' }}>Your request is with us.</h3>
        <p className="font-body text-sm" style={{ color: 'var(--portal-text-muted)' }}>We'll confirm your booking within 24 hours. You'll receive an email once it's confirmed.</p>
        <button type="button" onClick={() => router.push('/members')} className="font-body text-sm underline underline-offset-2" style={{ color: 'var(--portal-accent)' }}>Return home</button>
      </div>
    )
  }

  const inputStyle = { background: 'var(--portal-surface)', border: '1px solid var(--portal-border)', color: 'var(--portal-text)' }

  return (
    <div>
      <StepIndicator current={step} />
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step} custom={direction} variants={STEP_VARIANTS} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: 'easeInOut' }}>
            {step === 1 && (
              <div className="space-y-3">
                <h2 className="font-display font-light text-2xl mb-6" style={{ color: 'var(--portal-text)' }}>What would you like to book?</h2>
                {(Object.keys(BOOKING_TYPE_LABELS) as BookingType[]).map((t) => (
                  <button key={t} type="button" onClick={() => setType(t)} className={cn('w-full text-left p-5 rounded border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]')} style={{ borderColor: type === t ? 'var(--portal-accent)' : 'rgba(255,255,255,0.15)', background: type === t ? 'rgba(168,134,74,0.10)' : 'rgba(255,255,255,0.03)' }}>
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--portal-text)' }}>{BOOKING_TYPE_LABELS[t]}</p>
                    <p className="font-body text-xs mt-1" style={{ color: 'var(--portal-text-muted)' }}>{BOOKING_TYPE_DESCRIPTIONS[t]}</p>
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display font-light text-2xl" style={{ color: 'var(--portal-text)' }}>When would you like to visit?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-xs mb-2 uppercase tracking-wide" style={{ color: 'var(--portal-text-muted)' }}>Arrival</label>
                    <input type="date" value={startDate} min={minDate} onChange={(e) => { setStartDate(e.target.value); void checkAvailability(e.target.value, endDate, type) }} className="w-full rounded px-3 py-2.5 font-mono text-sm focus:outline-none" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block font-body text-xs mb-2 uppercase tracking-wide" style={{ color: 'var(--portal-text-muted)' }}>Departure</label>
                    <input type="date" value={endDate} min={startDate || minDate} onChange={(e) => { setEndDate(e.target.value); void checkAvailability(startDate, e.target.value, type) }} className="w-full rounded px-3 py-2.5 font-mono text-sm focus:outline-none" style={inputStyle} />
                  </div>
                </div>
                {availabilityLoading && <p className="font-body text-xs" style={{ color: 'var(--portal-text-muted)' }}>Checking availability…</p>}
                {unavailableDates.length > 0 && <div className="p-4 rounded border" style={{ background: 'rgba(168,134,74,0.10)', borderColor: 'rgba(168,134,74,0.30)' }}><p className="font-body text-xs leading-relaxed" style={{ color: 'var(--portal-accent)' }}>Some dates in this range are unavailable. Try adjusting your range or <a href="/contact" className="underline">contact us</a> to discuss.</p></div>}
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display font-light text-2xl" style={{ color: 'var(--portal-text)' }}>Who's joining you?</h2>
                <div>
                  <label className="block font-body text-xs mb-2 uppercase tracking-wide" style={{ color: 'var(--portal-text-muted)' }}>Party size</label>
                  <input type="number" min={1} max={Math.max(resourceCapacity, 200)} value={partySize} onChange={(e) => setPartySize(Math.max(1, parseInt(e.target.value) || 1))} className="w-32 rounded px-3 py-2.5 font-mono text-sm focus:outline-none" style={{ ...inputStyle, borderColor: overCapacity ? 'var(--portal-accent)' : 'var(--portal-border)' }} />
                  {resourceCapacity > 0 && <p className="font-body text-xs mt-2" style={{ color: 'var(--portal-text-muted)' }}>Accommodates up to {resourceCapacity} guests.</p>}
                  {overCapacity && <p className="font-body text-xs mt-1.5" style={{ color: 'var(--portal-accent)' }}>This exceeds the standard capacity. For larger groups, <a href="/contact?inquiry=large-group" className="underline">contact us directly</a>.</p>}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-display font-light text-2xl" style={{ color: 'var(--portal-text)' }}>Anything for the team?</h2>
                <p className="font-body text-sm" style={{ color: 'var(--portal-text-muted)' }}>Special requests, accessibility needs, or anything else we should know.</p>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} maxLength={800} placeholder="Optional — share anything that will help us prepare for your visit." className="w-full rounded px-3 py-2.5 font-body text-sm resize-none focus:outline-none" style={inputStyle} />
              </div>
            )}
            {step === 5 && type && startDate && endDate && (
              <div className="space-y-6">
                <h2 className="font-display font-light text-2xl" style={{ color: 'var(--portal-text)' }}>Review your booking.</h2>
                <div className="rounded border divide-y" style={{ borderColor: 'var(--portal-border)' }}>
                  {[{ label: 'Type', value: BOOKING_TYPE_LABELS[type], step: 1 as Step }, { label: 'Arrival', value: formatDate(startDate, 'full'), step: 2 as Step }, { label: 'Departure', value: formatDate(endDate, 'full'), step: 2 as Step }, { label: 'Party size', value: String(partySize), step: 3 as Step }, ...(notes ? [{ label: 'Notes', value: notes, step: 4 as Step }] : [])].map(({ label, value, step: s }) => (
                    <div key={label} className="flex items-start justify-between gap-4 px-5 py-4" style={{ borderColor: 'var(--portal-border)' }}>
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase mb-0.5" style={{ color: 'var(--portal-text-muted)' }}>{label}</p>
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--portal-text)' }}>{value}</p>
                      </div>
                      <button type="button" onClick={() => go(s)} className="font-body text-xs underline underline-offset-2 hover:no-underline flex-shrink-0" style={{ color: 'var(--portal-text-muted)' }}>Edit</button>
                    </div>
                  ))}
                </div>
                <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--portal-text-muted)' }}>Your booking request will be reviewed by our team. We'll confirm within 24 hours.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        {step > 1 ? <button type="button" onClick={() => go((step - 1) as Step)} className="font-body text-sm transition-colors duration-150 hover:underline underline-offset-2" style={{ color: 'var(--portal-text-muted)' }}>← Back</button> : <div />}
        {step < 5 ? (
          <button type="button" onClick={() => go((step + 1) as Step)} disabled={!canAdvance()} className={cn('px-6 py-2.5 rounded font-body text-sm transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]', !canAdvance() ? 'opacity-30 pointer-events-none' : 'hover:opacity-80')} style={{ background: 'var(--portal-accent)', color: 'var(--color-soil)' }}>Continue →</button>
        ) : (
          <div className="flex flex-col items-end gap-2">
            {submitError && <p className="font-body text-xs" style={{ color: 'var(--portal-accent)' }}>{submitError}</p>}
            <button type="button" onClick={submit} disabled={submitting} className={cn('px-8 py-3 rounded font-body text-sm transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]', submitting ? 'opacity-50 pointer-events-none' : 'hover:opacity-80')} style={{ background: 'var(--portal-accent)', color: 'var(--color-soil)' }}>{submitting ? 'Submitting…' : 'Submit Request'}</button>
          </div>
        )}
      </div>
    </div>
  )
}
