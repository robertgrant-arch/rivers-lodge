'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface PillarItem { imageSrc: string; imageAlt: string; label: string; description: string; href: string; ctaLabel?: string }
interface ThreeColumnPillarProps { items: [PillarItem, PillarItem, PillarItem]; className?: string }

function Pillar({ item, index }: { item: PillarItem; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.a ref={ref} href={item.href} className="group relative overflow-hidden block" style={{ minHeight: '520px' }}
      initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
      aria-label={`${item.label} — ${item.ctaLabel ?? 'Explore'}`}>
      <Image src={item.imageSrc} alt={item.imageAlt} fill className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04]" sizes="(max-width: 1024px) 100vw, 33vw" quality={85} />
      <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90" style={{ background: 'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, rgba(44,31,20,0.78) 100%)' }} aria-hidden />
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
        <h3 className="font-display font-light text-cream text-balance leading-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>{item.label}</h3>
        <p className="font-body text-sm text-cream/75 leading-relaxed mb-5 max-w-[28ch]">{item.description}</p>
        <span className="inline-flex items-center gap-2 font-body text-sm text-cream/60 group-hover:text-cream transition-colors duration-150">
          {item.ctaLabel ?? 'Explore'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden>
            <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.a>
  )
}

export function ThreeColumnPillar({ items, className }: ThreeColumnPillarProps) {
  return (
    <section className={cn('w-full', className)} aria-label="Explore Rivers Lodge">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {items.map((item, i) => <Pillar key={item.href} item={item} index={i} />)}
      </div>
    </section>
  )
}
