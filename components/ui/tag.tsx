'use client'
import { cn } from '@/lib/utils'
type TagVariant = 'default' | 'brass' | 'stone' | 'available' | 'limited' | 'booked' | 'closed' | 'amber' | 'river' | 'portal'
interface TagProps { children: React.ReactNode; variant?: TagVariant; className?: string; dot?: boolean }
const variantClasses: Record<TagVariant, string> = {
  default: 'bg-parchment text-bark border-stone', brass: 'bg-brass/10 text-bark border-brass/30',
  stone: 'bg-stone/20 text-bark border-stone/40', available: 'border-transparent text-river',
  limited: 'border-transparent text-bark', booked: 'border-transparent text-bark/70',
  closed: 'border-transparent text-stone', amber: 'bg-hold border-transparent text-bark',
  river: 'bg-river/10 text-river border-river/20', portal: 'border-white/20 text-white/70',
}
const dotClasses: Record<TagVariant, string> = {
  default: 'bg-bark', brass: 'bg-brass', stone: 'bg-stone', available: 'bg-river',
  limited: 'bg-bark', booked: 'bg-bark/50', closed: 'bg-stone', amber: 'bg-bark', river: 'bg-river', portal: 'bg-white/50',
}
export function Tag({ children, variant = 'default', className, dot }: TagProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] uppercase px-2.5 py-1 rounded border', variantClasses[variant], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotClasses[variant])} aria-hidden />}
      {children}
    </span>
  )
}
