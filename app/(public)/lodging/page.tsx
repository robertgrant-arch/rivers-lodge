import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = buildMetadata({ title: 'Lodging & Grounds', description: 'Stay at Rivers Lodge — The Lodge, Riverhouse Suites, The Annex, and Ohana House accommodate your entire group on the estate.', path: '/lodging' })
export const revalidate = 300

const ACCOMMODATIONS = [
  {
    name: 'The Lodge',
    description: 'Our 5,200 square foot lodge has 4 bedrooms decorated by a prominent Kansas City designer, incorporating history and outdoor pursuits from the area. The lodge features a full kitchen, large balcony, heated floors, heating and air conditioning, and a large recreation room.',
    features: ['4 bedrooms', 'Full kitchen', 'Large balcony', 'Heated floors', 'Recreation room', 'Designer interiors'],
    image: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg',
    alt: 'The Lodge exterior at Rivers Lodge estate',
  },
  {
    name: 'Riverhouse Suites',
    description: 'Completed in 2022 and designed with luxury in mind, each suite is uniquely decorated with its own bathroom and individual heating and air conditioning. The Riverhouse is steps from the barn and the heart of the property.',
    features: ['Private bathrooms', 'Individual climate control', 'Uniquely decorated', 'Steps from the barn'],
    image: 'https://theriverslodge.com/wp-content/uploads/2023/06/Rivers_May2023-5.jpg',
    alt: 'Riverhouse Suites exterior with timber and open deck',
  },
  {
    name: 'The Annex & Bridal Suite',
    description: 'Completely remodeled in 2021 with a modern farmhouse aesthetic — light, airy, and just steps from the barn. Four bedrooms and three bathrooms make it the perfect place for the wedding party to get ready.',
    features: ['4 bedrooms', '3 bathrooms', 'Modern farmhouse design', 'Adjacent to the barn'],
    image: 'https://theriverslodge.com/wp-content/uploads/2023/06/Rivers_May2023-15.jpg',
    alt: 'The Annex bridal suite interior with natural light',
  },
  {
    name: 'Ohana House',
    description: 'Located fifteen minutes from the main lodge on its own 20-acre lake. Four bedrooms and bathrooms, a fire pit, and miles of nature trails. Fish, canoe, paddle board, hike, or just lay in a hammock.',
    features: ['4 bedrooms & bathrooms', '20-acre private lake', 'Fire pit', 'Nature trails', 'Canoes & paddle boards'],
    image: 'https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg',
    alt: 'Aerial view of Ohana House and its private lake surrounded by forest',
  },
]

export default function LodgingPage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/974A8432edit.jpg" imageAlt="Lodge great room with stone fireplace and designer interiors" eyebrow="Lodging & Grounds" headline="Stay on the property." subline="The estate sleeps your entire party and keeps everyone in the same place — the way a wedding weekend or a retreat should work." height="large" actions={[{ label: 'Inquire about lodging', href: '/contact', variant: 'ghost-dark' }]} />
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="Accommodations" headline="Where you sleep matters." subline="Four distinct buildings across the estate — each with its own character, all with the comfort your group deserves." align="center" />
          <div className="space-y-20">
            {ACCOMMODATIONS.map((room, i) => (
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
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg" imageAlt="Aerial view of the Rivers Lodge estate at golden hour" imageLeft={false} eyebrow="The Grounds" headline="Three hundred acres and no reason to leave." body={['Guests staying on the property have access to the full estate — the river, the trails through the timber, the fields, and the event spaces.', 'For wedding and retreat guests, it means a property that is genuinely yours for the duration of your stay. An hour south of Kansas City, close enough to reach on a Friday evening and far enough to feel like a genuine departure.']} />
      <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg" alt="The Lodge bar and great room interior with canoe on ceiling" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,31,20,0.15) 0%, rgba(44,31,20,0.7) 100%)' }} aria-hidden />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-end text-center px-6 py-16 lg:py-24" style={{ minHeight: '480px' }}>
          <p className="eyebrow text-cream/60 mb-4">The Lodge</p>
          <h2 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.1 }}>A full bar. A canoe on the ceiling. And the kind of night you talk about for years.</h2>
          <p className="font-body text-cream/70 text-lg max-w-xl mx-auto mb-8 leading-relaxed">The Lodge is the social center of the property — a place where the rehearsal dinner turns into a late-night card game and the morning starts with coffee on the balcony.</p>
        </div>
      </section>
      <Section background="cream">
        <Container width="layout">
          <SectionHeader eyebrow="Location" headline="An hour south of Kansas City." subline="La Cygne, Kansas — close enough to reach on a Friday evening, far enough to feel like a genuine departure." align="center" />
          <div className="mt-8 overflow-hidden rounded">
            <a href="https://maps.google.com/?q=18103+E+2300+Ln+La+Cygne+KS+66040" target="_blank" rel="noopener noreferrer" aria-label="View Rivers Lodge location on Google Maps">
              <Image src="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg" alt="Aerial view of Rivers Lodge estate showing the river, buildings, and surrounding landscape" width={1200} height={480} className="w-full object-cover hover:opacity-90 transition-opacity" quality={85} />
            </a>
          </div>
        </Container>
      </Section>
      <Section background="soil">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Lodging availability is confirmed during the booking process.</h2>
          <p className="font-body text-cream/70 text-base leading-relaxed max-w-prose mx-auto mb-8">Tell us about your event and we will put together a lodging plan that keeps your group together on the property.</p>
          <Button href="/contact" variant="ghost-dark" size="lg">Inquire About Lodging</Button>
        </Container>
      </Section>
    </>
  )
}
