import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { GalleryGrid, type GalleryImage } from '@/components/sections/gallery-grid'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = buildMetadata({ title: 'Gallery', description: 'Photography from Rivers Lodge and Hunt Club.', path: '/gallery' })
export const revalidate = 3600

const CATEGORIES = [
  { label: 'The Estate', id: 'estate', images: [
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg', alt: 'Aerial view of the Rivers Lodge estate at golden hour', featured: true },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg', alt: 'The Lodge exterior on the estate grounds' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-78.jpg', alt: 'The Clubhouse and gazebo by the pond' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/06/Rivers_May2023-5.jpg', alt: 'Riverhouse Suites exterior' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg', alt: 'Aerial view of Ohana House and private lake' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-195.jpg', alt: 'Clubhouse interior with rustic decor' },
  ] as GalleryImage[] },
  { label: 'Weddings', id: 'weddings', images: [
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-389_websize.jpg', alt: 'Barn interior set for a wedding reception', featured: true },
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Wedding reception at the Rivers Lodge barn' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-422_websize.jpg', alt: 'Wedding ceremony under the trees' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-456_websize.jpg', alt: 'Bride and groom first dance' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-694_websize.jpg', alt: 'Wedding guests celebrating at reception' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-660_websize.jpg', alt: 'Wedding details and floral arrangements' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-543_websize.jpg', alt: 'Outdoor wedding ceremony at sunset' },
  ] as GalleryImage[] },
  { label: 'The Lodge', id: 'lodge', images: [
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/974A8432edit.jpg', alt: 'Lodge great room with stone fireplace', featured: true },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg', alt: 'Lodge bar with canoe on the ceiling' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/974A8423edit.jpg', alt: 'Lodge interior seating area' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/974A8421edit.jpg', alt: 'Lodge bedroom with designer furnishings' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/974A8419edit.jpg', alt: 'Lodge kitchen and dining area' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/974A8402edit.jpg', alt: 'Lodge recreation room' },
  ] as GalleryImage[] },
  { label: 'The Barn', id: 'barn', images: [
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg', alt: 'Rivers Barn interior with vaulted ceiling', featured: true },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-61.jpg', alt: 'Barn interior with exposed beams' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-64.jpg', alt: 'Barn event setup with tables' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-73.jpg', alt: 'Barn exterior at dusk' },
  ] as GalleryImage[] },
  { label: 'Ohana House', id: 'ohana', images: [
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg', alt: 'Aerial view of Ohana House with private lake', featured: true },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/6M9A3255.jpg', alt: 'Ohana House exterior' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/6M9A3241.jpg', alt: 'Ohana House living room' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/6M9A3235.jpg', alt: 'Ohana House bedroom' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/6M9A3225.jpg', alt: 'Ohana House kitchen' },
    { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-116.jpg', alt: 'Lake view from Ohana House deck' },
  ] as GalleryImage[] },
]

export default function GalleryPage() {
  return (
    <>
      <div className="bg-soil pt-32 pb-16"><Container width="layout"><p className="eyebrow text-cream/40 mb-4">Rivers Lodge</p><h1 className="font-display font-light text-cream" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>Gallery</h1></Container></div>
      {CATEGORIES.map(({ label, id, images }, i) => (
        <Section key={id} background={i % 2 === 0 ? 'cream' : 'parchment'} id={id}>
          <Container width="layout"><SectionHeader eyebrow="Gallery" headline={label} align="left" /><GalleryGrid images={images} lightbox /></Container>
        </Section>
      ))}
    </>
  )
}
