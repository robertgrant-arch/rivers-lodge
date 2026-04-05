import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { GalleryGrid, type GalleryImage } from '@/components/sections/gallery-grid'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'Wedding Gallery', description: 'Weddings at Rivers Lodge.', path: '/weddings/gallery' })
export const revalidate = 3600
const CEREMONY: GalleryImage[] = [{ src: '/images/weddings/gallery/ceremony/arch-river.jpg', alt: 'Ceremony arch with river in background', featured: true }, { src: '/images/weddings/gallery/ceremony/processional.jpg', alt: 'Processional on the River Lawn' }, { src: '/images/weddings/gallery/ceremony/vows.jpg', alt: 'Couple exchanging vows' }]
const RECEPTION: GalleryImage[] = [{ src: '/images/weddings/gallery/reception/tables.jpg', alt: 'Reception tables in the Pavilion', featured: true }, { src: '/images/weddings/gallery/reception/dancing.jpg', alt: 'First dance under the open Pavilion' }, { src: '/images/weddings/gallery/reception/cake.jpg', alt: 'Wedding cake detail' }]
const DETAILS: GalleryImage[] = [{ src: '/images/weddings/gallery/details/rings.jpg', alt: 'Wedding rings on a wildflower bouquet' }, { src: '/images/weddings/gallery/details/flowers.jpg', alt: 'Floral centerpiece with seasonal blooms' }]
const GROUNDS: GalleryImage[] = [{ src: '/images/weddings/gallery/grounds/first-look.jpg', alt: 'First look on the lodge terrace', featured: true }, { src: '/images/weddings/gallery/grounds/timber-portrait.jpg', alt: 'Couple portrait in the timber edge at sunset' }, { src: '/images/weddings/gallery/grounds/send-off.jpg', alt: 'Sparkler send-off at dusk' }]
const CATS = [{ id: 'ceremony', label: 'Ceremony', images: CEREMONY }, { id: 'reception', label: 'Reception', images: RECEPTION }, { id: 'details', label: 'Details', images: DETAILS }, { id: 'grounds', label: 'Grounds & Portraits', images: GROUNDS }]
export default function WeddingGalleryPage() {
  return (
    <>
      <div className="bg-soil pt-32 pb-16"><Container width="layout"><p className="eyebrow text-cream/40 mb-4">Wedding Gallery</p><h1 className="font-display font-light text-cream" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}>Rivers Lodge weddings.</h1></Container></div>
      {CATS.map(({ id, label, images }, i) => (
        <Section key={id} background={i % 2 === 0 ? 'cream' : 'parchment'} id={id}>
          <Container width="layout"><SectionHeader eyebrow="Gallery" headline={label} align="left" /><GalleryGrid images={images} lightbox /></Container>
        </Section>
      ))}
      <Section background="soil">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Ready to imagine your day here?</h2>
          <div className="flex flex-wrap gap-4 justify-center"><Button href="/weddings/availability" variant="ghost-dark" size="lg">Check Availability</Button><Button href="/weddings/inquire" variant="ghost-dark" size="lg">Begin Your Inquiry</Button></div>
        </Container>
      </Section>
    </>
  )
}
