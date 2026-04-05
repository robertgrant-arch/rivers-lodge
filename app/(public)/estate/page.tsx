import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'The Estate', description: 'Rivers Lodge sits on over 300 acres along the Marais des Cygnes River in La Cygne, Kansas.', path: '/estate' })
export const revalidate = 300
export default function EstatePage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Aerial view of the Rivers Lodge estate and Marais des Cygnes River corridor at dusk" eyebrow="La Cygne, Kansas" headline="The Estate" subline="Three hundred acres along the Marais des Cygnes." height="large" actions={[{ label: 'Book a Private Tour', href: '/contact', variant: 'ghost-dark' }]} />
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="River bank at the edge of the timber on the Rivers Lodge property" imageLeft eyebrow="The Land" headline="A property that earns your attention." body={['Rivers Lodge occupies a stretch of ground in Linn County that has been farmed, hunted, and fished for generations. The current estate encompasses over 300 acres — timber corridors along the river, open fields managed for wildlife, and a lodge and event campus designed to disappear into the landscape rather than impose on it.', 'The Marais des Cygnes runs along the property\'s eastern boundary. In French, the name means "marsh of the swans." The river holds largemouth bass, channel catfish, and crappie. The surrounding bottomland holds whitetail deer year-round and becomes some of the best duck hunting in eastern Kansas when the migration moves through.']} />
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Lodge exterior at dusk with warm light through the windows" imageLeft={false} eyebrow="The Lodge" headline="Built for long evenings and early mornings." body={['The main lodge was designed with the understanding that the people staying here will spend most of their time outdoors — and need a place that rewards coming back in. Stone, timber, and warm light throughout. A great room that holds a gathering without forcing one.', 'The lodge accommodates overnight stays for weddings, retreats, and member visits. Capacity and room configuration are confirmed during the booking process.']} actions={[{ label: 'View lodging details', href: '/lodging', variant: 'ghost' }]} />
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="The Grounds" headline="Ceremony spaces, event lawns, and open sky." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[{ title: 'The River Lawn', body: 'A level grass expanse with direct sightlines to the Marais des Cygnes. The natural choice for outdoor ceremonies and cocktail hours.' }, { title: 'The Timber Edge', body: 'Where the open field meets the tree line. A naturally framed space for intimate ceremonies and editorial photographs.' }, { title: 'The Event Pavilion', body: 'A covered structure that bridges indoor and outdoor. Configured for dining, dancing, or standing receptions up to full estate capacity.' }].map(({ title, body }) => (
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
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>The best way to understand it is to walk it.</h2>
          <p className="font-body text-cream/70 text-base leading-relaxed max-w-prose mx-auto mb-10">We offer private tours of the estate, the venues, and the grounds. No presentation. Just the land.</p>
          <Button href="/contact" variant="ghost-dark" size="lg">Book a Private Tour</Button>
        </Container>
      </Section>
    </>
  )
}
