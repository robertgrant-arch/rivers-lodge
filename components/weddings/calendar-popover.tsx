'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { PublicCalendarStatus } from './wedding-calendar'
interface CalendarPopoverProps { dateIso: string; status: PublicCalendarStatus; openAbove: boolean; onClose: () => void }
const CONTENT: Record<PublicCalendarStatus, { headline: string; body: string; cta: string | null }> = {
  available: { headline: 'This date is available.', body: 'Ready to begin your inquiry?', cta: 'Begin Inquiry' },
  limited: { headline: 'Limited availability.', body: "This date has limited availability. We'd love to discuss your vision.", cta: 'Inquire Anyway' },
  booked: { headline: 'This date is reserved.', body: 'Check nearby dates or explore all available weekends.', cta: null },
  closed: { headline: 'Not available.', body: 'This date is outside our booking window. Contact us for short-lead availability.', cta: null },
}
export function CalendarPopover({ dateIso, status, openAbove, onClose }: CalendarPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const content = CONTENT[status]
  const inquiryHref = `/weddings/inquire?date=${dateIso}`
  useEffect(() => { function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() } window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [onClose])
  useEffect(() => { const el = popoverRef.current?.querySelector<HTMLElement>('button, a'); el?.focus() }, [])
  return (
    <AnimatePresence>
      <motion.div ref={popoverRef} role="tooltip" aria-live="polite"
        initial={{ opacity: 0, scale: 0.97, y: openAbove ? 4 : -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2, ease: 'easeOut' }}
        className={['absolute z-30 w-[calc(100vw-2rem)] max-w-[280px] bg-cream border border-stone rounded shadow-lg p-5', openAbove ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]', 'left-1/2 -translate-x-1/2'].join(' ')}>
        <span aria-hidden className={['absolute left-1/2 -translate-x-1/2 w-2 h-2 border-l border-t border-stone bg-cream rotate-45', openAbove ? '-bottom-[5px] border-b border-r border-t-0 border-l-0' : '-top-[5px]'].join(' ')} />
        <p className="font-mono text-[10px] tracking-widest text-stone uppercase mb-2">{formatDate(dateIso, 'long')}</p>
        <p className="font-display font-light text-lg text-soil leading-tight mb-1">{content.headline}</p>
        <p className="font-body text-sm text-bark leading-relaxed mb-4">{content.body}</p>
        <div className="flex items-center gap-3">
          {content.cta && <Button href={inquiryHref} variant="primary" size="sm">{content.cta}</Button>}
          <button type="button" onClick={onClose} className="font-body text-xs text-stone hover:text-bark transition-colors duration-150">Close</button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
