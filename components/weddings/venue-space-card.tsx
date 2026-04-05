import Image from 'next/image'
import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'
export interface VenueSpace { name: string; type: 'indoor' | 'outdoor' | 'both'; ceremonyCapacity?: number; receptionCapacity?: number; description: string; imageSrc: string; imageAlt: string }
interface VenueSpaceCardProps { space: VenueSpace; imageRight?: boolean; className?: string }
const TYPE_LABELS: Record<VenueSpace['type'], string> = { indoor: 'Indoor', outdoor: 'Outdoor', both: 'Indoor / Outdoor' }
export function VenueSpaceCard({ space, imageRight = false, className }: VenueSpaceCardProps) {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded', className)}>
      <div className={cn('relative aspect-editorial lg:aspect-auto lg:min-h-[420px]', imageRight && 'lg:order-2')}>
        <Image src={space.imageSrc} alt={space.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} />
      </div>
      <div className={cn('bg-parchment border border-stone/50 p-8 lg:p-12 flex flex-col justify-center', imageRight ? 'lg:order-1' : '')}>
        <div className="flex items-center gap-3 mb-4"><Tag variant="default">{TYPE_LABELS[space.type]}</Tag></div>
        <h3 className="font-display font-light text-3xl text-soil mb-4">{space.name}</h3>
        <p className="font-body text-sm text-bark leading-relaxed mb-6">{space.description}</p>
        {(space.ceremonyCapacity ?? space.receptionCapacity) && (
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone/40">
            {space.ceremonyCapacity && <div><p className="eyebrow mb-1">Ceremony</p><p className="font-display font-light text-2xl text-soil">{space.ceremonyCapacity}</p><p className="font-mono text-[10px] text-stone tracking-widest uppercase">guests</p></div>}
            {space.receptionCapacity && <div><p className="eyebrow mb-1">Reception</p><p className="font-display font-light text-2xl text-soil">{space.receptionCapacity}</p><p className="font-mono text-[10px] text-stone tracking-widest uppercase">guests</p></div>}
          </div>
        )}
      </div>
    </div>
  )
}
