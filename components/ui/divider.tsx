import { cn } from '@/lib/utils'
interface DividerProps { label?: string; className?: string; light?: boolean }
export function Divider({ label, className, light = false }: DividerProps) {
  if (label) {
    return (
      <div className={cn('relative flex items-center gap-4', className)} role="separator" aria-label={label}>
        <div className={cn('flex-1 border-t', light ? 'border-white/15' : 'border-stone/60')} />
        <span className={cn('eyebrow flex-shrink-0', light ? 'text-cream/30' : 'text-stone')}>{label}</span>
        <div className={cn('flex-1 border-t', light ? 'border-white/15' : 'border-stone/60')} />
      </div>
    )
  }
  return <hr className={cn('border-0 border-t', light ? 'border-white/15' : 'border-stone/60', className)} role="separator" />
}
