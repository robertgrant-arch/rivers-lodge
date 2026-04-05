'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag } from '@/components/ui/tag'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
export interface SeasonUpdate { season: 'deer' | 'duck' | 'turkey'; title: string; body: string; publishedAt: string; images: { url: string; alt?: string }[]; seasonStatus: 'open' | 'closed' | 'upcoming' }
type SeasonKey = 'deer' | 'duck' | 'turkey'
const SEASONS: { key: SeasonKey; label: string }[] = [{ key: 'deer', label: 'Deer' }, { key: 'duck', label: 'Duck' }, { key: 'turkey', label: 'Turkey' }]
const STATUS_VARIANT: Record<SeasonUpdate['seasonStatus'], 'river' | 'stone' | 'amber'> = { open: 'river', closed: 'stone', upcoming: 'amber' }
function SeasonUpdateCard({ update }: { update: SeasonUpdate }) {
  return (
    <div className="portal-card rounded overflow-hidden">
      {update.images.length > 0 && (
        <div className={cn('grid gap-0.5', update.images.length === 1 ? 'grid-cols-1' : update.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2')}>
          {update.images.slice(0, 4).map((img, i) => (
            <div key={i} className="relative h-36">
              <Image src={img.url} alt={img.alt ?? `${update.season} season update`} fill className="object-cover" sizes="300px" quality={75} />
            </div>
          ))}
        </div>
      )}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-body text-sm font-medium leading-snug" style={{ color: 'var(--portal-text)' }}>{update.title}</h3>
          <Tag variant={STATUS_VARIANT[update.seasonStatus]} dot className="flex-shrink-0 text-[9px]">{update.seasonStatus.charAt(0).toUpperCase() + update.seasonStatus.slice(1)}</Tag>
        </div>
        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--portal-text-muted)' }}>{update.body}</p>
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--portal-text-muted)' }}>{formatDate(update.publishedAt, 'long')}</p>
      </div>
    </div>
  )
}
export function SeasonTabs({ updates }: { updates: SeasonUpdate[] }) {
  const [active, setActive] = useState<SeasonKey>('deer')
  const [showAll, setShowAll] = useState<Record<SeasonKey, boolean>>({ deer: false, duck: false, turkey: false })
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 60)
  const filtered = updates.filter((u) => u.season === active)
  const recent = filtered.filter((u) => new Date(u.publishedAt) >= cutoff)
  const older = filtered.filter((u) => new Date(u.publishedAt) < cutoff)
  const isShowingAll = showAll[active]
  return (
    <div>
      <div className="flex gap-1 p-1 rounded mb-6" style={{ background: 'var(--portal-surface)', border: '1px solid var(--portal-border)' }} role="tablist">
        {SEASONS.map(({ key, label }) => {
          const status = updates.find((u) => u.season === key)?.seasonStatus ?? 'closed'
          return (
            <button key={key} role="tab" aria-selected={active === key} onClick={() => setActive(key)}
              className={cn('flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-sm font-body transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]', active === key ? 'text-soil' : 'hover:text-[--portal-text]')}
              style={{ background: active === key ? 'var(--portal-accent)' : 'transparent', color: active === key ? 'var(--color-soil)' : 'var(--portal-text-muted)' }}>
              {label}{status === 'open' && <span className="w-1.5 h-1.5 rounded-full bg-river flex-shrink-0" aria-label="Season open" />}
            </button>
          )
        })}
      </div>
      <div role="tabpanel" aria-label={`${active} season updates`}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {filtered.length === 0 ? (
              <div className="portal-card rounded p-8 text-center"><p className="font-body text-sm" style={{ color: 'var(--portal-text-muted)' }}>Updates will appear here when the season opens.</p></div>
            ) : (
              <div className="space-y-4">
                {recent.map((u, i) => <SeasonUpdateCard key={i} update={u} />)}
                {older.length > 0 && (
                  <div>
                    <button type="button" onClick={() => setShowAll((s) => ({ ...s, [active]: !s[active] }))} className="w-full py-3 font-body text-sm flex items-center justify-center gap-2" style={{ color: 'var(--portal-text-muted)' }}>
                      {isShowingAll ? 'Hide earlier updates' : `See ${older.length} earlier update${older.length !== 1 ? 's' : ''}`}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={cn('transition-transform duration-200', isShowingAll && 'rotate-180')} aria-hidden><path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <AnimatePresence>
                      {isShowingAll && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden space-y-4">
                          {older.map((u, i) => <SeasonUpdateCard key={i} update={u} />)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
