import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
export interface WeddingPackage { name: string; tagline: string; description: string; inclusions: string[]; capacityMin?: number; capacityMax?: number; startingPrice?: number; featured?: boolean }
interface PackageCardProps { pkg: WeddingPackage; className?: string }
export function PackageCard({ pkg, className }: PackageCardProps) {
  return (
    <div className={cn('flex flex-col border rounded overflow-hidden', pkg.featured ? 'border-brass/40 bg-soil text-cream' : 'border-stone/50 bg-parchment text-soil', className)}>
      {pkg.featured && <div className="bg-brass/20 px-8 py-2.5 border-b border-brass/30"><p className="font-mono text-[10px] tracking-[0.15em] text-brass uppercase">Most requested</p></div>}
      <div className="p-8 lg:p-10 flex flex-col flex-1">
        <div className="mb-6">
          <h3 className={cn('font-display font-light text-3xl mb-2', pkg.featured ? 'text-cream' : 'text-soil')}>{pkg.name}</h3>
          <p className={cn('font-body text-sm italic', pkg.featured ? 'text-cream/60' : 'text-bark')}>{pkg.tagline}</p>
        </div>
        <p className={cn('font-body text-sm leading-relaxed mb-8', pkg.featured ? 'text-cream/75' : 'text-bark')}>{pkg.description}</p>
        <div className="flex-1 mb-8">
          <p className={cn('eyebrow mb-4', pkg.featured ? 'text-cream/40' : '')}>What's included</p>
          <ul className="space-y-2.5">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-brass" aria-hidden />
                <span className={cn('font-body text-sm leading-relaxed', pkg.featured ? 'text-cream/80' : 'text-bark')}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('border-t pt-6 mb-8', pkg.featured ? 'border-white/10' : 'border-stone/40')}>
          {(pkg.capacityMin ?? pkg.capacityMax) && (
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className={cn('font-mono text-xs tracking-wide', pkg.featured ? 'text-cream/40' : 'text-stone')}>Capacity:</span>
              <span className={cn('font-body text-sm', pkg.featured ? 'text-cream/70' : 'text-bark')}>{pkg.capacityMin && pkg.capacityMax ? `${pkg.capacityMin}–${pkg.capacityMax} guests` : pkg.capacityMax ? `Up to ${pkg.capacityMax} guests` : `From ${pkg.capacityMin} guests`}</span>
            </div>
          )}
          {pkg.startingPrice && (
            <div className="flex items-baseline gap-1.5">
              <span className={cn('font-mono text-xs tracking-wide', pkg.featured ? 'text-cream/40' : 'text-stone')}>Starting at:</span>
              <span className={cn('font-display font-light text-2xl', pkg.featured ? 'text-cream' : 'text-soil')}>${pkg.startingPrice.toLocaleString()}</span>
            </div>
          )}
        </div>
        <Button href="/weddings/inquire" variant={pkg.featured ? 'ghost-dark' : 'ghost'} className="w-full justify-center">Begin Inquiry</Button>
      </div>
    </div>
  )
}
