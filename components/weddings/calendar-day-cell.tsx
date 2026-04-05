import { cn } from '@/lib/utils'
import type { PublicCalendarStatus } from './wedding-calendar'
interface CalendarDayCellProps { day: number; dateIso: string; status: PublicCalendarStatus; isToday: boolean; isPast: boolean; isSelected: boolean; isOpen: boolean; onSelect: (dateIso: string) => void }
const STATUS_BG: Record<PublicCalendarStatus, string> = { available: 'bg-available hover:bg-available/80', limited: 'bg-hold hover:bg-hold/80', booked: 'bg-booked cursor-default', closed: 'bg-closed cursor-default text-stone' }
const STATUS_RING: Record<PublicCalendarStatus, string> = { available: 'ring-river/40', limited: 'ring-bark/30', booked: 'ring-transparent', closed: 'ring-transparent' }
const INTERACTIVE: Record<PublicCalendarStatus, boolean> = { available: true, limited: true, booked: false, closed: false }
export function CalendarDayCell({ day, dateIso, status, isToday, isPast, isSelected, isOpen, onSelect }: CalendarDayCellProps) {
  const interactive = INTERACTIVE[status] && !isPast
  return (
    <button type="button" disabled={!interactive} onClick={interactive ? () => onSelect(dateIso) : undefined}
      aria-label={`${dateIso}${status !== 'closed' ? `, ${status}` : ''}`} aria-pressed={isOpen && isSelected} aria-disabled={!interactive}
      className={cn('relative w-full aspect-square flex items-center justify-center font-mono text-xs rounded transition-colors duration-150', STATUS_BG[status], interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2', interactive && STATUS_RING[status], isOpen && isSelected && 'ring-2 ring-brass ring-offset-1', isPast && 'opacity-40 cursor-default')}>
      <span className={cn('leading-none', status === 'closed' || isPast ? 'text-stone' : 'text-soil', isOpen && isSelected && 'text-brass font-medium')}>{day}</span>
      {isToday && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brass" aria-hidden />}
    </button>
  )
}
