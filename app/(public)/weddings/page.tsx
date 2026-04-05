import type { Metadata } from 'next'
import { Suspense } from 'react'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { GalleryGrid, type GalleryImage } from '@/components/sections/gallery-grid'
import { VenueSpaceCard, type VenueSpace } from '@/components/weddings/venue-space-card'
import { WeddingCalendar } from '@/components/weddings/wedding-calendar'
import { SkeletonCalendarGrid } from '@/components/ui/skeleton'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
export const metadata: Metadata = buildMetadata({ title: 'Weddings', description: 'Weddings at Rivers Lodge — an estate on the Marais des Cygnes River in La Cygne, Kansas.', path: '/weddings' })
export const revalidate = 300
const VENUE_SPACES: VenueSpace[] = [
  { name: 'The River Lawn', type: 'outdoor', ceremonyCapacity: 200, receptionCapacity: 180, description: 'A level grass expanse with direct sightlines to the Marais des Cygnes. The natural backdrop for an outdoor ceremony — open sky, the river, and nothing competing with the moment.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', imageAlt: 'Ceremony on the River Lawn' },
  { name: 'The Timber Edge', type: 'outdoor', ceremonyCapacity: 120, description: 'Where the open field meets the tree line. A naturally framed space with dappled light and a sense of enclosure that larger venues cannot manufacture.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', imageAlt: 'Ceremony arch at the edge of the timber' },
  { name: 'The Event Pavilion', type: 'both', receptionCapacity: 200, description: 'A covered structure designed to bridge indoors and out. Configured for seated dining, dancing, or standing receptions.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', imageAlt: 'Event Pavilion set for an evening reception' },
]
const GALLERY_IMAGES: GalleryImage[] = [
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Ceremony at the River Lawn', featured: true }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Ring detail on a wildflower bouquet' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Reception tables at golden hour' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'First look on the lodge terrace' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Couple dancing under the pavilion' }, { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Sparkler send-off at dusk' },
]
export default function WeddingsPage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Ceremony at Rivers Lodge at golden hour" eyebrow="Weddings at Rivers Lodge" headline="Your wedding, without compromise." subline="An estate that holds the day as beautifully as you imagined it." height="full" showScroll actions={[{ label: 'Check Availability', href: '#availability', variant: 'ghost-dark' }, { label: 'Begin Inquiry', href: '/weddings/inquire', variant: 'ghost-dark' }]} />
      <Section background="cream">
        <Container width="prose" className="text-center">
          <p className="eyebrow mb-6">The experience</p>
          <div className="space-y-5 text-left">
            <p className="font-body text-base text-bark leading-relaxed">A wedding at Rivers Lodge is not a venue rental. It is a private estate experience — one where the property, the grounds, the lodging, and the staff are entirely yours for the weekend.</p>
            <p className="font-body text-base text-bark leading-relaxed">The lodge sleeps your closest people on-site. The reception carries into the evening under the pavilion, which opens fully to the summer air.</p>
            <p className="font-body text-base text-bark leading-relaxed">We host a limited number of weddings each year. Every couple gets our full attention. The calendar below shows what is available.</p>
          </div>
        </Container>
      </Section>
      <Divider className="max-w-layout mx-auto px-6 lg:px-8" />
      <Section background="cream">
        <Container width="layout">
          <SectionHeader eyebrow="Venue spaces" headline="Every space faces something worth looking at." align="center" />
          <div className="space-y-8">{VENUE_SPACES.map((space, i) => <VenueSpaceCard key={space.name} space={space} imageRight={i % 2 === 1} />)}</div>
          <div className="mt-10 text-center"><Button href="/weddings/venues" variant="ghost">Explore all venue spaces</Button></div>
        </Container>
      </Section>
      <Section background="cream" id="availability">
        <Container width="content">
          <SectionHeader eyebrow="Check availability" headline="The calendar is honest." subline="Dates shown as available are genuinely open. We host a limited number of weddings per year." align="center" />
          <Suspense fallback={<SkeletonCalendarGrid />}><WeddingCalendar /></Suspense>
          <div className="mt-10 text-center"><Button href="/weddings/availability" variant="text">Open full availability calendar →</Button></div>
        </Container>
      </Section>
      <Section background="parchment">
        <Container width="layout"><SectionHeader eyebrow="Wedding gallery" headline="Rivers Lodge weddings." align="center" /><GalleryGrid images={GALLERY_IMAGES} lightbox viewAllHref="/weddings/gallery" viewAllLabel="View full wedding gallery" /></Container>
      </Section>
      <Section background="soil">
        <Container width="content" className="text-center">
          <p className="eyebrow text-cream/40 mb-5">Ready to begin?</p>
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.1 }}>Begin your inquiry.</h2>
          <p className="font-body text-cream/70 text-base leading-relaxed max-w-prose mx-auto mb-10">Tell us your preferred dates and a little about what you are imagining. We will respond within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/weddings/inquire" variant="ghost-dark" size="lg">Begin Your Inquiry</Button>
            <Button href="/weddings/planning-guide" variant="ghost-dark" size="lg">Download Planning Guide</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
