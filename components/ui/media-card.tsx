import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
type AspectRatio = 'editorial' | 'portrait' | 'wide' | 'square'
interface MediaCardProps { src: string; alt: string; label?: string; sublabel?: string; href?: string; aspectRatio?: AspectRatio; overlayStrength?: 'light' | 'medium' | 'heavy'; priority?: boolean; className?: string; sizes?: string }
const aspectClasses: Record<AspectRatio, string> = { editorial: 'aspect-editorial', portrait: 'aspect-portrait', wide: 'aspect-wide', square: 'aspect-square' }
const overlayClasses: Record<'light' | 'medium' | 'heavy', string> = { light: 'overlay-light', medium: 'overlay-medium', heavy: 'overlay-heavy' }
function MediaCardInner({ src, alt, label, sublabel, aspectRatio = 'editorial', overlayStrength = 'medium', priority = false, sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw' }: Omit<MediaCardProps, 'href' | 'className'>) {
  return (
    <div className={cn('relative overflow-hidden w-full', aspectClasses[aspectRatio])}>
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.03]" priority={priority} sizes={sizes} />
      {(label ?? sublabel) && (
        <>
          <div className={cn('absolute inset-0', overlayClasses[overlayStrength])} aria-hidden />
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
            {sublabel && <p className="eyebrow text-cream/70 mb-2">{sublabel}</p>}
            {label && <p className="font-display font-light text-2xl lg:text-3xl text-cream leading-tight text-balance">{label}</p>}
          </div>
        </>
      )}
    </div>
  )
}
export function MediaCard({ href, className, ...rest }: MediaCardProps) {
  const base = cn('group block overflow-hidden', href && 'cursor-pointer', className)
  if (href) return <Link href={href} className={base}><MediaCardInner {...rest} /></Link>
  return <div className={base}><MediaCardInner {...rest} /></div>
}
