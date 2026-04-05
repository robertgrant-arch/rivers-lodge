import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { VenueSpaceCard, type VenueSpace } from '@/components/weddings/venue-space-card'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'Wedding Venue Spaces', description: 'Wedding venue spaces at Rivers Lodge.', path: '/weddings/venues' })
export const revalidate = 300
const ALL_SPACES: VenueSpace[] = [
  { name: 'The River Lawn', type: 'outdoor', ceremonyCapacity: 200, receptionCapacity: 180, description: 'A level grass expanse with direct sightlines to the Marais des Cygnes. The river moves slowly beyond the tree line. The sky opens in every direction.', imageSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', imageAlt: 'River Lawn ceremony space' },
  { name: 'The Timber Edge', type: 'outdoor', ceremonyCapacity: 120, description: 'Where the open field meets the tree line — a naturally framed setting with the enclosure of timber on three sides and open sky above.', imageSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', imageAlt: 'Timber Edge ceremony space' },
  { name: 'The Lodge Terrace', type: 'both', ceremonyCapacity: 60, receptionCapacity: 80, description: 'The stone terrace directly adjacent to the lodge entrance. Ideal for rehearsal dinners, intimate ceremonies, and cocktail hours.', imageSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', imageAlt: 'Lodge Terrace with stone pavers' },
  { name: 'The Event Pavilion', type: 'both', receptionCapacity: 200, description: 'A purpose-built structure that bridges interior and exterior. Overhead doors open on two sides to the evening air.', imageSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', imageAlt: 'Event Pavilion set for an evening reception' },
]
export default function WeddingVenuesPage() {
  return (
    <>
      <HeroFull imageSrc="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" imageAlt="River Lawn ceremony in late afternoon light" eyebrow="Venue Spaces" headline="Every space faces something worth looking at." height="large" />
      <Section background="parchment" flushTop>
        <Container width="layout">
          <div className="space-y-8">{ALL_SPACES.map((space, i) => <VenueSpaceCard key={space.name} space={space} imageRight={i % 2 === 1} />)}</div>
        </Container>
      </Section>
      <Section background="cream">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-soil text-balance mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}>All venue spaces are included in every package.</h2>
          <div className="flex flex-wrap gap-4 justify-center"><Button href="/weddings/packages" variant="primary">View Packages</Button><Button href="/weddings/inquire" variant="ghost">Begin Inquiry</Button></div>
        </Container>
      </Section>
    </>
  )
}
