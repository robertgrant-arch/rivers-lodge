'use client'
import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryImage } from './gallery-grid'

interface GalleryLightboxProps { images: GalleryImage[]; initialIndex: number; onClose: () => void }
export function GalleryLightbox({ images, initialIndex, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)
  const current = images[index]
  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir)
    setIndex((i) => { const next = i + dir; if (next < 0) return images.length - 1; if (next >= images.length) return 0; return next })
  }, [images.length])
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  if (!current) return null
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(28,20,12,0.95)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} role="dialog" aria-modal="true" aria-label={`Image ${index + 1} of ${images.length}`}>
        <button onClick={onClose} className="absolute top-5 right-5 z-10 text-cream/60 hover:text-cream transition-colors duration-150 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded" aria-label="Close gallery">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden><line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-cream/50 hover:text-cream transition-colors duration-150 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded" aria-label="Previous image">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden><path d="M14 4L7 11L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16 flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={index} custom={direction} variants={{ enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: 'easeInOut' }} className="relative w-full h-full">
              <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="90vw" quality={90} priority />
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-cream/50 hover:text-cream transition-colors duration-150 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded" aria-label="Next image">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden><path d="M8 4L15 11L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center space-y-1.5">
          {current.caption && <p className="font-body text-sm text-cream/60">{current.caption}</p>}
          <p className="font-mono text-xs text-cream/30 tracking-widest">{index + 1} / {images.length}</p>
        </div>
        <button className="absolute inset-0 -z-0" onClick={onClose} aria-label="Close gallery" tabIndex={-1} />
      </motion.div>
    </AnimatePresence>
  )
}
