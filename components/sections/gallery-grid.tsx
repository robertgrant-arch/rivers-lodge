'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GalleryLightbox } from './gallery-lightbox'
import { cn } from '@/lib/utils'

export interface GalleryImage { src: string; alt: string; featured?: boolean; caption?: string }
interface GalleryGridProps { images: GalleryImage[]; lightbox?: boolean; viewAllHref?: string; viewAllLabel?: string; className?: string }

function getColSpan(index: number, featured: boolean): string {
  if (featured) return 'lg:col-span-2'
  if ((index + 1) % 10 === 0) return 'lg:col-span-3'
  return 'lg:col-span-1'
}
function getAspectClass(index: number, featured: boolean): string {
  if (featured || (index + 1) % 10 === 0) return 'aspect-wide'
  return index % 3 === 0 ? 'aspect-portrait' : 'aspect-editorial'
}

function GalleryItem({ image, index, onClick }: { image: GalleryImage; index: number; onClick: (i: number) => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.button ref={ref} onClick={() => onClick(index)}
      className={cn('group relative overflow-hidden w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2', getColSpan(index, image.featured ?? false), getAspectClass(index, image.featured ?? false))}
      initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 6) * 0.06 }} aria-label={`View ${image.alt}`} type="button">
      <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04]" sizes={image.featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'} quality={80} />
      <div className="absolute inset-0 bg-soil/0 group-hover:bg-soil/15 transition-colors duration-300" aria-hidden />
    </motion.button>
  )
}

export function GalleryGrid({ images, lightbox = true, viewAllHref, viewAllLabel = 'View all photos', className }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  return (
    <>
      <div className={cn('w-full', className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {images.map((image, i) => <GalleryItem key={`${image.src}-${i}`} image={image} index={i} onClick={(idx) => { if (lightbox) setLightboxIndex(idx) }} />)}
        </div>
        {viewAllHref && (
          <div className="flex justify-center mt-10">
            <a href={viewAllHref} className="btn-text font-body text-sm text-bark hover:text-soil transition-colors duration-150 inline-flex items-center gap-2">
              {viewAllLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        )}
      </div>
      {lightbox && lightboxIndex !== null && <GalleryLightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </>
  )
}
