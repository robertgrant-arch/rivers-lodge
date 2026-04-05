import { formatDate } from '@/lib/utils'
import { Tag } from '@/components/ui/tag'
export interface PropertyUpdate { title: string; body: string; publishedAt: string; category: 'water_conditions' | 'game_activity' | 'property' | 'events' }
const CATEGORY_LABELS: Record<PropertyUpdate['category'], string> = { water_conditions: 'Water', game_activity: 'Game', property: 'Property', events: 'Events' }
export function PropertyUpdateFeed({ updates }: { updates: PropertyUpdate[] }) {
  if (updates.length === 0) return <p className="font-body text-sm" style={{ color: 'var(--portal-text-muted)' }}>No updates yet. Check back after the next activity on the property.</p>
  return (
    <ul className="space-y-4" aria-label="Property updates">
      {updates.map((update, i) => (
        <li key={i} className="portal-card rounded p-5 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-body text-sm font-medium leading-snug" style={{ color: 'var(--portal-text)' }}>{update.title}</h3>
            <Tag variant="portal" className="flex-shrink-0 text-[9px]">{CATEGORY_LABELS[update.category]}</Tag>
          </div>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--portal-text-muted)' }}>{update.body}</p>
          <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--portal-text-muted)' }}>{formatDate(update.publishedAt, 'long')}</p>
        </li>
      ))}
    </ul>
  )
}
