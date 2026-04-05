import { cn } from '@/lib/utils'
interface SkeletonProps { className?: string; portal?: boolean }
export function Skeleton({ className, portal = false }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded', portal ? 'bg-white/10' : 'bg-stone/30', className)} aria-hidden />
}
export function SkeletonText({ lines = 3, portal = false }: { lines?: number; portal?: boolean }) {
  return (
    <div className="space-y-2.5" aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} portal={portal} className={cn('h-4', i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')} />
      ))}
    </div>
  )
}
export function SkeletonCard({ portal = false }: { portal?: boolean }) {
  return (
    <div className={cn('rounded p-5 space-y-4', portal ? 'bg-white/5 border border-white/10' : 'bg-parchment border border-stone/40')} aria-hidden>
      <Skeleton portal={portal} className="h-40 w-full" />
      <Skeleton portal={portal} className="h-5 w-2/3" />
      <SkeletonText lines={2} portal={portal} />
    </div>
  )
}
export function SkeletonCalendarGrid() {
  return (
    <div className="grid grid-cols-7 gap-1" aria-hidden role="status" aria-label="Loading calendar">
      {['S','M','T','W','T','F','S'].map((d, i) => (
        <div key={i} className="h-8 flex items-center justify-center">
          <span className="font-mono text-xs text-stone/50">{d}</span>
        </div>
      ))}
      {Array.from({ length: 35 }).map((_, i) => <Skeleton key={i} className="h-10 w-full rounded" />)}
    </div>
  )
}
