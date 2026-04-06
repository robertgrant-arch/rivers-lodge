import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = buildMetadata({ title: 'The Estate', description: 'Rivers Lodge sits on over 300 acres along the Marais des Cygnes River in La Cygne, Kansas \u2014 an hour south of Kansas City. Explore the land, the buildings, and the history.', path: '/estate' })
export const revalidate = 300

const GROUNDS = [
  { title: 'The River Lawn', body: 'A level grass expanse with direct sightlines to the Marais des Cygnes. Ceremonies here feel like they belong to the land itself.' },
  { title: 'The North Patio', body: 'String-lit and open to the sky, ideal for cocktail hours, late-night dancing, or a second bar under the stars.' },
  { title: 'The Barn Patios', body: 'South-side features two fireplaces and an indoor/outdoor bar. North-side has a ceiling of string lights perfect for dancing.' },
  { title: 'The Timber Trail', body: 'A half-mile walk through mature timber along the river \u2014 a favorite for wedding portraits and morning walks.' },
  { title: 'The South Field', body: 'Open meadow with views across the property. Used for outdoor games, lawn activities, and golden-hour photography.' },
  { title: 'The Duck Marsh', body: 'Wetland habitat along the river. Home to waterfowl in season and dramatic sunrise views year-round.' },
]

const BY_THE_NUMBERS = [
  { stat: '300+', label: 'Acres' },
  { stat: '1', label: 'River' },
  { stat: '5', label: 'Buildings' },
  { stat: '16+', label: 'Bedrooms' },
  { stat: '256', label: 'Barn capacity' },
  { stat: '60', label: 'Minutes from KC' },
]

export default function EstatePage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg" imageAlt="Aerial view of Ohana House on the Marais des Cygnes River surrounded by timber" eyebrow="The Estate" headline="Three hundred acres. One river. Yours for the weekend." subline="Rivers Lodge sits on over 300 acres along the Marais des Cygnes River in La Cygne, Kansas." height="large" actions={[{ label: 'Book a private tour', href: '/contact', variant: 'ghost-dark' }]} />

      {/* By The Numbers */}
      <Section background="cream">
        <Container width="layout">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {BY_THE_NUMBERS.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-display text-4xl font-light text-soil mb-1">{item.stat}</p>
                <p className="font-mono text-xs text-bark/50 tracking-wide uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg" imageAlt="The Lodge exterior \u2014 dark modern farmhouse on the estate grounds" eyebrow="The Lodge" headline="The social center of the property." body={['Our 5,200 square foot lodge has 4 bedrooms decorated by a prominent Kansas City designer. A full kitchen, large balcony, heated floors, and a recreation room make it the place where the rehearsal dinner becomes a late-night card game.', 'The Lodge bar \u2014 with a canoe on the ceiling \u2014 is where stories get told and retold for years.']} actions={[{ label: 'Explore lodging', href: '/lodging', variant: 'ghost' }]} />

      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-78.jpg" imageAlt="The Clubhouse exterior with gazebo and pond" imageLeft eyebrow="The Clubhouse" headline="Rehearsal dinners. Cocktail hours. Intimate ceremonies." body={['An additional space on the estate that is often used for rehearsal dinners, cocktail hours, or intimate wedding ceremonies. The Clubhouse sits by a pond with its own gazebo and outdoor entertaining area.', 'With its own bar and flexible layout, it is as suited to a corporate breakout session as it is to a casual evening under the stars.']} actions={[{ label: 'See event spaces', href: '/events', variant: 'ghost' }]} />

      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg" imageAlt="Rivers Barn interior with vaulted timber ceilings" eyebrow="Rivers Barn" headline="The heart of every celebration." body={['Designed by a prominent Kansas City architect, the barn blends raw materials with modern features \u2014 floor-to-ceiling windows, 22-foot facade doors, a lookout balcony, two fireplaces, air conditioning, and an indoor/outdoor bar.', 'Capacity up to 256 guests with two large patios. The south-side patio features two fireplaces. The north-side has a ceiling of string lights perfect for dancing under the stars.']} actions={[{ label: 'Plan your wedding', href: '/weddings', variant: 'ghost' }]} />

      {/* Lodge Interior Full-Width */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg" alt="The Lodge interior bar with canoe on the ceiling and industrial stools" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,31,20,0.1) 0%, rgba(44,31,20,0.65) 100%)' }} aria-hidden />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-end text-center px-6 py-16 lg:py-24" style={{ minHeight: '480px' }}>
          <p className="eyebrow text-cream/60 mb-4">The Lodge Interior</p>
          <h2 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.1 }}>Decorated by a Kansas City designer. Built for the kind of weekend you remember.</h2>
        </div>
      </section>

      {/* The Grounds Grid */}
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="The Grounds" headline="Ceremony spaces, event lawns, and open sky." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {GROUNDS.map(({ title, body }) => (
              <div key={title} className="border-t border-bark/10 pt-6">
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Location */}
      <Section background="cream">
        <Container width="prose" className="text-center">
          <p className="eyebrow mb-5">Location</p>
          <h2 className="font-display font-light text-soil text-balance mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}>An hour south of Kansas City.</h2>
          <p className="font-body text-bark text-base leading-relaxed mb-6">Close enough to reach on a Friday evening. Far enough that it feels like a genuine departure. The estate sits at 18103 E 2300 Ln, La Cygne, KS 66040 \u2014 where the Marais des Cygnes River moves slowly through timber, fields, and three hundred acres of private land.</p>
          <Button href="https://maps.google.com/?q=18103+E+2300+Ln+La+Cygne+KS+66040" variant="ghost">Get Directions</Button>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="bark">
        <Container width="prose" className="text-center">
          <p className="eyebrow text-cream/60 mb-5">Visit</p>
          <h2 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>The best way to understand Rivers Lodge is to walk it.</h2>
          <p className="font-body text-cream/80 leading-relaxed mb-8">We offer private tours of the estate, the venues, and the grounds \u2014 no pressure, no presentation. Just the land.</p>
          <Button href="/contact" variant="ghost-dark">Book a Private Tour</Button>
        </Container>
      </Section>
    </>
  )
}
