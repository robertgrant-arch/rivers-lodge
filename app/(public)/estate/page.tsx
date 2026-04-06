import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = buildMetadata({ title: 'The Estate', description: 'Rivers Lodge sits on over 300 acres along the Marais des Cygnes River in La Cygne, Kansas — an hour south of Kansas City.', path: '/estate' })
export const revalidate = 300

export default function EstatePage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg" imageAlt="Aerial view of Ohana House on the Marais des Cygnes River surrounded by timber" eyebrow="The Estate" headline="Three hundred acres. One river. Yours for the weekend." subline="Rivers Lodge sits on over 300 acres along the Marais des Cygnes River in La Cygne, Kansas." height="large" actions={[{ label: 'Book a private tour', href: '/contact', variant: 'ghost-dark' }]} />
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg" imageAlt="The Lodge exterior — dark modern farmhouse on the estate grounds" eyebrow="The Lodge" headline="The social center of the property." body={['Our 5,200 square foot lodge has 4 bedrooms decorated by a prominent Kansas City designer. A full kitchen, large balcony, heated floors, and a recreation room make it the place where the rehearsal dinner becomes a late-night card game.', 'The Lodge bar — with a canoe on the ceiling — is where stories get told and retold for years.']} actions={[{ label: 'Explore lodging', href: '/lodging', variant: 'ghost' }]} />
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-78.jpg" imageAlt="The Clubhouse exterior with gazebo and pond" imageLeft eyebrow="The Clubhouse" headline="Rehearsal dinners. Cocktail hours. Intimate ceremonies." body={['An additional space on the estate that is often used for rehearsal dinners, cocktail hours, or intimate wedding ceremonies. The Clubhouse sits by a pond with its own gazebo and outdoor entertaining area.', 'With its own bar and flexible layout, it is as suited to a corporate breakout session as it is to a casual evening under the stars.']} actions={[{ label: 'See event spaces', href: '/events', variant: 'ghost' }]} />
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
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="The Grounds" headline="Ceremony spaces, event lawns, and open sky." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[{ title: 'The River Lawn', body: 'A level grass expanse with direct sightlines to the Marais des Cygnes. Ceremonies here feel like they belong to the land itself.' }, { title: 'The North Patio', body: 'String-lit and open to the sky, ideal for cocktail hours, late-night dancing, or a second bar under the stars.' }, { title: 'The Barn Patios', body: 'South-side features two fireplaces and an indoor/outdoor bar. North-side has a ceiling of string lights perfect for dancing.' }, { title: 'The Timber Trail', body: 'A half-mile walk through mature timber along the river — a favorite for wedding portraits and morning walks.' }, { title: 'The South Field', body: 'Open meadow with views across the property. Used for outdoor games, lawn activities, and golden-hour photography.' }, { title: 'The Duck Marsh', body: 'Wetland habitat along the river. Home to waterfowl in season and dramatic sunrise views year-round.' }].map(({ title, body }) => (
              <div key={title} className="card p-8">
                <h3 className="font-display font-light text-2xl text-soil mb-3">{title}</h3>
                <p className="font-body text-sm text-bark leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section background="soil">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>The best way to understand Rivers Lodge is to walk it.</h2>
          <p className="font-body text-cream/70 text-base leading-relaxed max-w-prose mx-auto mb-10">We offer private tours of the estate, the venues, and the grounds — no pressure, no presentation. Just the land.</p>
          <Button href="/contact" variant="ghost-dark" size="lg">Book a Private Tour</Button>
        </Container>
      </Section>
    </>
  )
}
