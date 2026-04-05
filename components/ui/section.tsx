import { cn } from '@/lib/utils'
type SectionBackground = 'cream' | 'parchment' | 'soil' | 'estate' | 'transparent'
interface SectionProps { children: React.ReactNode; background?: SectionBackground; className?: string; id?: string; flushTop?: boolean; flushBottom?: boolean; as?: 'section' | 'div' | 'article' }
const backgroundClasses: Record<SectionBackground, string> = { cream: 'bg-cream text-soil', parchment: 'bg-parchment text-soil', soil: 'bg-soil text-cream', estate: 'bg-estate text-cream', transparent: '' }
export function Section({ children, background = 'cream', className, id, flushTop = false, flushBottom = false, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag id={id} className={cn(backgroundClasses[background], !flushTop && 'pt-16 lg:pt-24', !flushBottom && 'pb-16 lg:pb-24', className)}>
      {children}
    </Tag>
  )
}
interface SectionHeaderProps { eyebrow?: string; headline: string; subline?: string; align?: 'left' | 'center'; light?: boolean; className?: string }
export function SectionHeader({ eyebrow, headline, subline, align = 'center', light = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 lg:mb-16', align === 'center' && 'text-center', className)}>
      {eyebrow && <p className={cn('eyebrow mb-4', light && 'text-cream/50')}>{eyebrow}</p>}
      <h2 className={cn('display-md text-balance', light ? 'text-cream' : 'text-soil')}>{headline}</h2>
      {subline && <p className={cn('mt-4 font-body text-lg max-w-2xl', align === 'center' && 'mx-auto', light ? 'text-cream/70' : 'text-bark')}>{subline}</p>}
    </div>
  )
}
