'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroAction { label: string; href: string; variant?: 'ghost' | 'ghost-dark' | 'primary' }
interface HeroFullProps { muxPlaybackId?: string; imageSrc?: string; imageAlt?: string; eyebrow?: string; headline: string; subline?: string; actions?: HeroAction[]; showScroll?: boolean; overlayStrength?: 'light' | 'medium' | 'heavy'; className?: string; height?: 'full' | 'large' | 'medium' }
const heightClasses = { full: 'h-[100dvh]', large: 'h-[80vh] min-h-[640px]', medium: 'h-[60vh] min-h-[480px]' }

export function HeroFull({ muxPlaybackId, imageSrc, imageAlt = '', eyebrow, headline, subline, actions = [], showScroll = false, overlayStrength = 'medium', className, height = 'full' }: HeroFullProps) {
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video || shouldReduceMotion) return
    video.play().catch(() => {})
  }, [shouldReduceMotion])
  const showVideo = !!muxPlaybackId && !shouldReduceMotion
  const muxSrc = muxPlaybackId ? `https://stream.mux.com/${muxPlaybackId}/low.mp4` : null
  const overlayStyle = { light: 'linear-gradient(to bottom, rgba(44,31,20,0.10) 0%, rgba(44,31,20,0.35) 100%)', medium: 'linear-gradient(to bottom, rgba(44,31,20,0.10) 0%, rgba(44,31,20,0.52) 100%)', heavy: 'linear-gradient(to bottom, rgba(44,31,20,0.20) 0%, rgba(44,31,20,0.72) 100%)' }[overlayStrength]
  return (
    <section className={cn('relative w-full overflow-hidden bg-soil', heightClasses[height], className)} aria-label={headline}>
      {showVideo && muxSrc ? (
        <video ref={videoRef} src={muxSrc} autoPlay muted loop playsInline poster={imageSrc} preload="auto" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
      ) : imageSrc ? (
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority sizes="100vw" quality={90} />
      ) : (
        <div className="absolute inset-0 bg-soil" aria-hidden />
      )}
      <div className="absolute inset-0" style={{ background: overlayStyle }} aria-hidden />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }} className="max-w-3xl mx-auto">
          {eyebrow && <p className="eyebrow text-cream/60 mb-5 tracking-[0.18em]">{eyebrow}</p>}
          <h1 className="font-display font-light text-cream text-balance leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>{headline}</h1>
          {subline && <p className="font-body text-cream/75 text-lg lg:text-xl max-w-xl mx-auto mb-10 leading-relaxed">{subline}</p>}
          {actions.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {actions.map((action) => <Button key={action.href} href={action.href} variant={action.variant ?? 'ghost-dark'} size="lg">{action.label}</Button>)}
            </div>
          )}
        </motion.div>
      </div>
      {showScroll && (
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} aria-hidden>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.15em] text-cream/40 uppercase">Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-chevron-bounce text-cream/40">
              <path d="M1 8.5L8 15.5L15 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      )}
    </section>
  )
}
