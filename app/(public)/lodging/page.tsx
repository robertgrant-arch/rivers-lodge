import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'Lodging & Grounds', description: 'Stay at Rivers Lodge — overnight accommodations on the estate.', path: '/lodging' })
export const revalidate = 300
const ROOMS = [
  { name: 'The Great Room Suite', description: 'The flagship room opens directly onto the great room and looks out toward the timber. King bed, stone fireplace, and a bath finished in river slate.', features: ['King bed', 'Stone fireplace', 'Private bath', 'River views'], image: '/images/lodging/great-room-suite.jpg', alt: 'Great Room Suite with stone fireplace' },
  { name: 'The River Rooms', description: 'Four guest rooms on the eastern wing, each with direct sightlines to the Marais des Cygnes. Designed for quiet mornings and early starts.', features: ['Queen or king beds', 'Private baths', 'East-facing windows', 'Ground-floor access'], image: '/images/lodging/river-rooms.jpg', alt: 'River Room at sunrise' },
  { name: 'The Loft Rooms', description: 'Two upper-level rooms with exposed timber and views across the south field. Ideal for wedding party accommodations.', features: ['Queen beds', 'Shared bath access', 'Open-timber ceiling', 'Field views'], image: '/images/lodging/loft-rooms.jpg', alt: 'Loft room with exposed timber beams' },
]
export default function LodgingPage() {
  return (
    <>
      <HeroFull imageSrc="/images/lodging/hero.jpg" imageAlt="Lodge great room at dusk" eyebrow="Lodging & Grounds" headline="Stay on the property." subline="The lodge sleeps your party and keeps everyone in the same place — the way a wedding weekend or a retreat should work." height="large" actions={[{ label: 'Inquire about lodging', href: '/contact', variant: 'ghost-dark' }]} />
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="Accommodations" headline="Where you sleep matters." align="center" />
          <div className="space-y-16">
            {ROOMS.map((room, i) => (
              <div key={room.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative aspect-editorial overflow-hidden rounded"><Image src={room.image} alt={room.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} /></div>
                <div>
                  <h3 className="font-display font-light text-3xl text-soil mb-4">{room.name}</h3>
                  <p className="font-body text-bark text-base leading-relaxed mb-6">{room.description}</p>
                  <ul className="space-y-1.5">{room.features.map((f) => (<li key={f} className="flex items-center gap-2.5 font-body text-sm text-bark"><span className="w-1 h-1 rounded-full bg-brass flex-shrink-0" aria-hidden />{f}</li>))}</ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <EditorialSplit imageSrc="/images/estate/grounds-wide.jpg" imageAlt="Estate grounds at sunrise" imageLeft={false} eyebrow="The Grounds" headline="Three hundred acres and no reason to leave." body={['Guests staying at the lodge have access to the full property — the river, the trails through the timber, the fields, and the event spaces.', 'For members, this access extends across the seasons. For wedding and retreat guests, it means a property that is genuinely yours for the duration of your stay.']} />
      <Section background="cream">
        <Container width="layout">
          <SectionHeader eyebrow="Location" headline="An hour south of Kansas City." subline="La Cygne, Kansas — close enough to reach on a Friday evening, far enough to feel like a genuine departure." align="center" />
          <div className="mt-8 overflow-hidden rounded">
            <a href="https://maps.google.com/?q=La+Cygne+KS" target="_blank" rel="noopener noreferrer" aria-label="View Rivers Lodge location on Google Maps">
              <Image src="/images/map-la-cygne.jpg" alt="Map showing Rivers Lodge location in La Cygne, Kansas" width={1200} height={480} className="w-full object-cover hover:opacity-90 transition-opacity" quality={85} />
            </a>
          </div>
        </Container>
      </Section>
      <Section background="soil">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Lodging availability is confirmed during the booking process.</h2>
          <Button href="/contact" variant="ghost-dark" size="lg">Inquire About Lodging</Button>
        </Container>
      </Section>
    </>
  )
}
