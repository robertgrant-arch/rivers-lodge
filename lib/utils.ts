import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwindcss-merge'
export function cn(...inputs: ClassValue[]): string { return twMerge(clsx(inputs)) }
export function formatDate(date: string | Date, style: 'short' | 'long' | 'full' = 'long'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const formats: Record<typeof style, Intl.DateTimeFormatOptions> = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  }
  return new Intl.DateTimeFormat('en-US', formats[style]).format(d)
}
export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = typeof start === 'string' ? new Date(start) : start
  const e = typeof end === 'string' ? new Date(end) : end
  const startStr = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(s)
  const endStr = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(e)
  return `${startStr} – ${endStr}`
}
export function toISODate(date: Date): string { return date.toISOString().split('T')[0] ?? '' }
export function fromISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1)
}
export function isDateInPast(iso: string): boolean {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return fromISODate(iso) < today
}
export function addDays(date: Date, days: number): Date {
  const result = new Date(date); result.setDate(result.getDate() + days); return result
}
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str; return `${str.slice(0, maxLength - 1)}…`
}
export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}
type PlausibleEvent = 'wedding_inquiry_submitted' | 'availability_date_clicked' | 'planning_guide_download' | 'membership_apply_clicked' | 'tour_requested' | 'event_inquiry_submitted' | 'member_booking_submitted'
export function trackEvent(event: PlausibleEvent, props?: Record<string, string | number>): void {
  if (typeof window === 'undefined') return
  // @ts-expect-error — Plausible loaded via script tag
  if (typeof window.plausible === 'function') { window.plausible(event, props ? { props } : undefined) }
}
