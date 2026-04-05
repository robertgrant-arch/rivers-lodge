'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EditorialAction { label: string; href: string; variant?: 'primary' | 'ghost' | 'ghost-dark' | 'text' }
interface EditorialSplitProps { imageSrc: string; imageAlt: string; imageSizes?: string; imageLeft?: boolean; eyebrow?: string; headline: string; body: string | string[]; actions?: EditorialAction[]; background?: 'cream' | 'parchment' | 'soil'; compact?: boolean; className?: string }

export function EditorialSplit({ imageSrc, imageAlt, imageSizes = '(max-width: 1024px) 100vw, 50vw', imageLeft = true, eyebrow, headline, body, actions = [], background = 'cream', compact = false, className }: EditorialSplitProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const bgClasses = { cream: 'bg-cream text-soil', parchment: 'bg-parchment text-soil', soil: 'bg-soil text-cream' }
  const bodyParagraphs = Array.isArray(body) ? body : [body]
  const isLight = background === 'soil'
  return (
    <section className={cn(bgClasses[background], !compact && 'py-16 lg:py-24', className)}>
      <div className="max-w-layout mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center">
          <div className={cn('w-full overflow-hidden', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
            <div className="relative aspect-editorial lg:aspect-auto lg:h-[560px] w-full overflow-hidden">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes={imageSizes} quality={85} />
            </div>
          </div>
          <motion.div ref={ref} className={cn('py-12 lg:py-0', imageLeft ? 'lg:order-2' : 'lg:order-1')} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {eyebrow && <p className={cn('eyebrow mb-5', isLight && 'text-cream/50')}>{eyebrow}</p>}
            <h2 className={cn('font-display font-light text-balance mb-6', isLight ? 'text-cream' : 'text-soil')} style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.1 }}>{headline}</h2>
            <div className="space-y-4">
              {bodyParagraphs.map((para, i) => <p key={i} className={cn('font-body text-base leading-relaxed', isLight ? 'text-cream/75' : 'text-bark')}>{para}</p>)}
            </div>
            {actions.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-8">
                {actions.map((action) => <Button key={action.href} href={action.href} variant={action.variant ?? (isLight ? 'ghost-dark' : 'ghost')}>{action.label}</Button>)}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
