import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { GalleryGrid, type GalleryImage } from '@/components/sections/gallery-grid'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
export const metadata: Metadata = buildMetadata({ title: 'Gallery', description: 'Photography from Rivers Lodge and Hunt Club.', path: '/gallery' })
export const revalidate = 3600
const CATEGORIES = [
  { label: 'The Estate', id: 'estate', images: [{ src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Aerial view of the estate and Marais des Cygnes River', featured: true }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Lodge exterior at dusk' }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'River bank at dawn' }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Lodge great room' }] as GalleryImage[] },
  { label: 'Weddings', id: 'weddings', images: [{ src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Ceremony arch with the river in the background', featured: true }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Reception tables at golden hour' }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'First look on the lodge terrace' }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Couple dancing under string lights' }] as GalleryImage[] },
  { label: 'Wildlife', id: 'wildlife', images: [{ src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Whitetail buck in the south field at dusk', featured: true }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Duck marsh at sunrise' }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Tom turkey in the field' }] as GalleryImage[] },
  { label: 'The Seasons', id: 'seasons', images: [{ src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Marais des Cygnes in spring', featured: true }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'Timber in peak fall color' }, { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', alt: 'South field under snow' }] as GalleryImage[] },
]
export default function GalleryPage() {
  return (
    <>
      <div className="bg-soil pt-32 pb-16"><Container width="layout"><p className="eyebrow text-cream/40 mb-4">Rivers Lodge</p><h1 className="font-display font-light text-cream" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}>The property in every season.</h1></Container></div>
      {CATEGORIES.map(({ label, id, images }, i) => (
        <Section key={id} background={i % 2 === 0 ? 'cream' : 'parchment'} id={id}>
          <Container width="layout"><SectionHeader eyebrow="Gallery" headline={label} align="left" /><GalleryGrid images={images} lightbox /></Container>
        </Section>
      ))}
    </>
  )
}
