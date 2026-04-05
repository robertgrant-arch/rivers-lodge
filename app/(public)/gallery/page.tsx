import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { GalleryGrid, type GalleryImage } from '@/components/sections/gallery-grid'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
export const metadata: Metadata = buildMetadata({ title: 'Gallery', description: 'Photography from Rivers Lodge and Hunt Club.', path: '/gallery' })
export const revalidate = 3600
const CATEGORIES = [
  { label: 'The Estate', id: 'estate', images: [{ src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Aerial view of the estate and Marais des Cygnes River', featured: true }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Lodge exterior at dusk' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'River bank at dawn' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Lodge great room' }] as GalleryImage[] },
  { label: 'Weddings', id: 'weddings', images: [{ src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Ceremony arch with the river in the background', featured: true }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Reception tables at golden hour' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'First look on the lodge terrace' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Couple dancing under string lights' }] as GalleryImage[] },
  { label: 'Wildlife', id: 'wildlife', images: [{ src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Whitetail buck in the south field at dusk', featured: true }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Duck marsh at sunrise' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Tom turkey in the field' }] as GalleryImage[] },
  { label: 'The Seasons', id: 'seasons', images: [{ src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Marais des Cygnes in spring', featured: true }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Timber in peak fall color' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'South field under snow' }] as GalleryImage[] },
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
