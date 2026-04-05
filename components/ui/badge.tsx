import { cn } from '@/lib/utils'
type BadgeVariant = 'brass' | 'soil' | 'stone' | 'amber' | 'river'
interface BadgeProps { count: number; variant?: BadgeVariant; max?: number; className?: string; label?: string }
const variantClasses: Record<BadgeVariant, string> = { brass: 'bg-brass text-soil', soil: 'bg-soil text-cream', stone: 'bg-stone text-soil', amber: 'bg-hold text-bark', river: 'bg-river text-cream' }
export function Badge({ count, variant = 'brass', max = 99, className, label }: BadgeProps) {
  if (count <= 0) return null
  const display = count > max ? `${max}+` : String(count)
  return (
    <span className={cn('inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 font-mono text-[10px] font-medium rounded-full', variantClasses[variant], className)}
      aria-label={label ?? `${count} notification${count !== 1 ? 's' : ''}`} role="status">
      {display}
    </span>
  )
}
