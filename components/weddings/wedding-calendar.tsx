'use client'
import { useState, useEffect, useCallback, useRef, type TouchEvent } from 'react'
import { toISODate, addDays, fromISODate } from '@/lib/utils'
import { SkeletonCalendarGrid } from '@/components/ui/skeleton'
import { AsyncError } from '@/components/ui/error-boundary'
import { CalendarDayCell } from './calendar-day-cell'
import { CalendarPopover } from './calendar-popover'
import { CalendarLegend } from './calendar-legend'

export type PublicCalendarStatus = 'available' | 'limited' | 'booked' | 'closed'
interface CalendarEntry { date: string; status: PublicCalendarStatus }
interface WeddingCalendarProps { embedded?: boolean }
const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const MIN_LEAD_DAYS = 90
const MAX_MONTHS_AHEAD = 24

function getMinBookableDate(): Date { return addDays(new Date(), MIN_LEAD_DAYS) }
function buildCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  while (days.length % 7 !== 0) days.push(null)
  return days
}
function formatMonthYear(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function WeddingCalendar({ embedded = false }: WeddingCalendarProps) {
  const today = new Date()
  const [displayYear, setDisplayYear] = useState(today.getFullYear())
  const [displayMonth, setDisplayMonth] = useState(today.getMonth())
  const [entries, setEntries] = useState<CalendarEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [openPopoverDate, setOpenPopoverDate] = useState<string | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true); setError(false)
    fetch(`/api/calendar?year=${displayYear}&month=${displayMonth + 1}`)
      .then((r) => { if (!r.ok) throw new Error('Failed'); return r.json() as Promise<{ dates: CalendarEntry[] }> })
      .then(({ dates }) => { if (!cancelled) { setEntries(dates); setLoading(false) } })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false) } })
    return () => { cancelled = true }
  }, [displayYear, displayMonth])

  const minYear = today.getFullYear(); const minMonth = today.getMonth()
  const maxDate = addDays(today, MAX_MONTHS_AHEAD * 30)
  const canGoPrev = displayYear > minYear || (displayYear === minYear && displayMonth > minMonth)
  const canGoNext = new Date(displayYear, displayMonth + 1, 1) <= maxDate
  const goToPrev = useCallback(() => { if (!canGoPrev) return; setOpenPopoverDate(null); setDisplayMonth((m) => { if (m === 0) { setDisplayYear((y) => y - 1); return 11 } return m - 1 }) }, [canGoPrev])
  const goToNext = useCallback(() => { if (!canGoNext) return; setOpenPopoverDate(null); setDisplayMonth((m) => { if (m === 11) { setDisplayYear((y) => y + 1); return 0 } return m + 1 }) }, [canGoNext])
  const yearOptions: number[] = []; for (let y = minYear; y <= maxDate.getFullYear(); y++) yearOptions.push(y)

  function onTouchStart(e: TouchEvent) { touchStartX.current = e.touches[0]?.clientX ?? null }
  function onTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    if (Math.abs(dx) > 50) { dx < 0 ? goToNext() : goToPrev() }
    touchStartX.current = null
  }

  const statusMap = new Map(entries.map((e) => [e.date, e.status]))
  function getStatus(dateIso: string): PublicCalendarStatus {
    const d = fromISODate(dateIso)
    if (d < getMinBookableDate()) return 'closed'
    return statusMap.get(dateIso) ?? 'available'
  }
  function handleCellSelect(dateIso: string) {
    if (openPopoverDate === dateIso) { setOpenPopoverDate(null); return }
    setSelectedDate(dateIso); setOpenPopoverDate(dateIso)
  }
  function closePopover() { setOpenPopoverDate(null) }

  const calendarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function onClick(e: MouseEvent) { if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) setOpenPopoverDate(null) }
    document.addEventListener('mousedown', onClick); return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const days = buildCalendarDays(displayYear, displayMonth)
  const todayIso = toISODate(today)
  const totalRows = days.length / 7
  const lastTwoRowStart = (totalRows - 2) * 7

  return (
    <div ref={calendarRef} className="w-full">
      {!embedded && (
        <div className="flex items-center justify-between mb-6 gap-4">
          <button type="button" onClick={goToPrev} disabled={!canGoPrev} aria-label="Previous month" className="p-2 text-bark hover:text-soil disabled:opacity-30 disabled:cursor-default transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex items-center gap-3">
            <h3 className="font-display font-light text-xl text-soil min-w-[180px] text-center">{formatMonthYear(displayYear, displayMonth)}</h3>
            <select value={displayYear} onChange={(e) => { setDisplayYear(Number(e.target.value)); setOpenPopoverDate(null) }} aria-label="Jump to year" className="font-mono text-xs text-bark bg-transparent border border-stone/50 rounded px-2 py-1 focus:outline-none focus:border-brass">
              {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <button type="button" onClick={goToNext} disabled={!canGoNext} aria-label="Next month" className="p-2 text-bark hover:text-soil disabled:opacity-30 disabled:cursor-default transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}
      <div className="grid grid-cols-7 mb-1" role="row">
        {DAY_HEADERS.map((d) => <div key={d} className="h-8 flex items-center justify-center font-mono text-[10px] tracking-widest text-stone uppercase" role="columnheader" aria-label={d}>{d.charAt(0)}</div>)}
      </div>
      {loading ? <SkeletonCalendarGrid /> : error ? <AsyncError inline message="We couldn't load availability right now." mailto="info@riverslodge.com" className="py-6" /> : (
        <div className="grid grid-cols-7 gap-1" role="grid" aria-label={`${formatMonthYear(displayYear, displayMonth)} availability`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {days.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} role="gridcell" aria-hidden />
            const dateIso = toISODate(new Date(displayYear, displayMonth, day))
            const status = getStatus(dateIso)
            const isToday = dateIso === todayIso
            const isPast = fromISODate(dateIso) < today && !isToday
            return (
              <div key={dateIso} role="gridcell" className="relative">
                <CalendarDayCell day={day} dateIso={dateIso} status={status} isToday={isToday} isPast={isPast} isSelected={selectedDate === dateIso} isOpen={openPopoverDate === dateIso} onSelect={handleCellSelect} />
                {openPopoverDate === dateIso && <CalendarPopover dateIso={dateIso} status={status} openAbove={idx >= lastTwoRowStart} onClose={closePopover} />}
              </div>
            )
          })}
        </div>
      )}
      <CalendarLegend />
    </div>
  )
}
