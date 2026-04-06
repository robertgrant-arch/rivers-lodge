import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
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

export const metadata: Metadata = buildMetadata({ title: 'Weddings', description: 'Weddings at Rivers Lodge \u2014 a private estate on the Marais des Cygnes River in La Cygne, Kansas. Your wedding, without compromise.', path: '/weddings' })
export const revalidate = 300

const VENUE_SPACES: VenueSpace[] = [
  { name: 'The River Lawn', type: 'outdoor', ceremonyCapacity: 200, receptionCapacity: 180, description: 'A level grass expanse with direct sightlines to the Marais des Cygnes. The natural backdrop for an outdoor ceremony \u2014 open sky, the river, and nothing competing with the moment.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-422_websize.jpg', imageAlt: 'Outdoor ceremony on the River Lawn with river views' },
  { name: 'The Timber Edge', type: 'outdoor', ceremonyCapacity: 120, description: 'Where the open field meets the tree line. A naturally framed space with dappled light and a sense of enclosure that larger venues cannot manufacture.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-456_websize.jpg', imageAlt: 'Ceremony arch at the edge of the timber' },
  { name: 'The Event Pavilion', type: 'both', receptionCapacity: 200, description: 'A covered structure designed to bridge indoors and out. Configured for seated dining, dancing, or standing receptions.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-694_websize.jpg', imageAlt: 'Event Pavilion set for an evening reception' },
  { name: 'Rivers Barn', type: 'indoor', receptionCapacity: 256, description: 'Designed by a prominent Kansas City architect, the barn blends raw materials with modern features \u2014 floor-to-ceiling windows, 22-foot facade doors, a lookout balcony, two fireplaces, and an indoor/outdoor bar. The blank slate for any vision.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg', imageAlt: 'Rivers Barn interior with vaulted ceilings and string lights' },
  { name: 'The Clubhouse', type: 'indoor', receptionCapacity: 80, description: 'An additional space on the estate often used for rehearsal dinners, cocktail hours, or intimate ceremonies. Sits by a pond with its own gazebo, bar, and flexible layout.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-78.jpg', imageAlt: 'The Clubhouse exterior with gazebo and pond' },
]

const GALLERY_IMAGES: GalleryImage[] = [
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg', alt: 'Ceremony at the River Lawn', featured: true },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-389_websize.jpg', alt: 'Wedding reception tables in the barn at golden hour' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-660_websize.jpg', alt: 'Couple dancing under the pavilion string lights' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-687_websize.jpg', alt: 'First look on the lodge terrace' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-739_websize.jpg', alt: 'Sparkler send-off at dusk' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-543_websize.jpg', alt: 'Wedding party celebration under the trees' },
]

const TIMELINE = [
  { time: 'Friday Evening', title: 'Welcome & Rehearsal', description: 'Guests arrive and settle into The Lodge, Riverhouse Suites, or The Annex. Rehearsal dinner at The Clubhouse with drinks on the pond deck.' },
  { time: 'Saturday Morning', title: 'Getting Ready', description: 'The bridal party takes over The Annex & Bridal Suite \u2014 four bedrooms, three bathrooms, light-filled and steps from the barn. The groomsmen have The Lodge bar to themselves.' },
  { time: 'Saturday Afternoon', title: 'Ceremony', description: 'Exchange vows on the River Lawn with the Marais des Cygnes as your backdrop, or choose the Timber Edge for a ceremony framed by old-growth trees.' },
  { time: 'Saturday Evening', title: 'Reception', description: 'Dinner in the barn or under the pavilion. Two fireplaces, an indoor/outdoor bar, and patios with string lights that carry the celebration into the night.' },
  { time: 'Sunday Morning', title: 'Farewell Brunch', description: 'Coffee on the lodge balcony, a walk along the Timber Trail, and a slow goodbye. The estate is yours through checkout.' },
]

export default function WeddingsPage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Ceremony at Rivers Lodge at golden hour" eyebrow="Weddings at Rivers Lodge" headline="Your wedding, without compromise." subline="An estate that holds the day as beautifully as you imagined it." height="full" showScroll actions={[{ label: 'Check Availability', href: '#availability', variant: 'ghost-dark' }, { label: 'Begin Inquiry', href: '/contact', variant: 'ghost-dark' }]} />

      <Section background="cream">
        <Container width="prose" className="text-center">
          <p className="eyebrow mb-6">The experience</p>
          <div className="space-y-5 text-left">
            <p className="font-body text-base text-bark leading-relaxed">A wedding at Rivers Lodge is not a venue rental. It is a private estate experience \u2014 one where the property, the grounds, the lodging, and the staff are entirely yours for the weekend.</p>
            <p className="font-body text-base text-bark leading-relaxed">The lodge sleeps your closest people on-site. The reception carries into the evening under the pavilion, which opens fully to the summer air. The barn holds up to 256 guests with two large patios, two fireplaces, and an indoor/outdoor bar.</p>
            <p className="font-body text-base text-bark leading-relaxed">We host a limited number of weddings each year. Every couple gets our full attention. The calendar below shows what is available.</p>
          </div>
        </Container>
      </Section>

      {/* Wedding Weekend Timeline */}
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="Your Weekend" headline="A wedding weekend, not just a wedding day." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 mt-8">
            {TIMELINE.map((step, i) => (
              <div key={i} className="relative px-6 py-8 text-center border-b md:border-b-0 md:border-r last:border-0 border-bark/10">
                <p className="eyebrow text-xs mb-2">{step.time}</p>
                <h3 className="font-display text-lg mb-3">{step.title}</h3>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Venue Spaces */}
      <Section>
        <SectionHeader eyebrow="Venue Spaces" headline="Spaces that shape the day." align="center" />
        {VENUE_SPACES.map((space, i) => <VenueSpaceCard key={space.name} space={space} reverse={i % 2 === 1} />)}
        <Container className="text-center mt-12">
          <Button href="/gallery" variant="ghost">View full gallery</Button>
        </Container>
      </Section>

      <Divider />

      {/* Lodging Section */}
      <Section background="cream">
        <Container width="layout">
          <SectionHeader eyebrow="On-Site Lodging" headline="Your guests stay on the estate." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {[
              { name: 'The Lodge', beds: '4 bedrooms', desc: '5,200 sq ft with full kitchen, bar, recreation room, heated floors, and a balcony overlooking the property.', image: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg' },
              { name: 'Riverhouse Suites', beds: '4 private suites', desc: 'Completed in 2022 with luxury finishes. Each suite uniquely decorated with private bath and climate control.', image: 'https://theriverslodge.com/wp-content/uploads/2023/06/Rivers_May2023-5.jpg' },
              { name: 'The Annex & Bridal Suite', beds: '4 bedrooms, 3 baths', desc: 'Modern farmhouse aesthetic, light and airy. Steps from the barn \u2014 the perfect bridal party headquarters.', image: 'https://theriverslodge.com/wp-content/uploads/2023/06/Rivers_May2023-15.jpg' },
              { name: 'Ohana House', beds: '4 bedrooms', desc: 'On its own 20-acre lake, 15 minutes from the main lodge. Fire pit, nature trails, canoes, and hammocks.', image: 'https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg' },
            ].map((lodge) => (
              <div key={lodge.name} className="text-center">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lodge.image} alt={lodge.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-display text-lg mb-1">{lodge.name}</h3>
                <p className="eyebrow text-xs mb-2">{lodge.beds}</p>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{lodge.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/lodging" variant="ghost">Explore all lodging</Button>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <GalleryGrid images={GALLERY_IMAGES} columns={3} />

      <Divider />

      {/* Calendar */}
      <Section id="availability">
        <SectionHeader eyebrow="Availability" headline="Find your date." align="center" />
        <Container>
          <Suspense fallback={<SkeletonCalendarGrid />}>
            <WeddingCalendar />
          </Suspense>
          <div className="text-center mt-8">
            <Button href="/contact" variant="ghost">Open full availability calendar \u2192</Button>
          </div>
        </Container>
      </Section>

      <Divider />

      {/* CTA */}
      <Section background="bark">
        <Container width="prose" className="text-center">
          <p className="eyebrow text-cream/60 mb-5">Ready to begin?</p>
          <h2 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Begin your inquiry.</h2>
          <p className="font-body text-cream/80 leading-relaxed mb-8">Tell us your preferred dates and a little about what you are imagining. We will respond within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact" variant="ghost-dark">Begin Your Inquiry</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
