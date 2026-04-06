import type { Metadata } from 'next'
import { buildMetadata, SITE } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { ThreeColumnPillar } from '@/components/sections/three-column-pillar'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { GalleryGrid, type GalleryImage } from '@/components/sections/gallery-grid'
import { MembershipSignal } from '@/components/sections/membership-signal'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { publicConfig } from '@/lib/config'

export const metadata: Metadata = buildMetadata({ description: 'Rivers Lodge and Hunt Club — a private estate on over 300 acres along the Marais des Cygnes River in La Cygne, Kansas.' })
export const revalidate = 60

const GALLERY_TEASE: GalleryImage[] = [
  { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg', alt: 'Aerial view of the Rivers Lodge estate at golden hour', featured: true },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-422_websize.jpg', alt: 'Wedding ceremony under the trees on the estate' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/974A8432edit.jpg', alt: 'Lodge great room with stone fireplace' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-694_websize.jpg', alt: 'Wedding reception in the barn' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg', alt: 'Aerial view of Ohana House and private lake' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-78.jpg', alt: 'The Clubhouse and gazebo by the pond' },
]

export default function HomePage() {
  const muxId = publicConfig.mux.heroPlaybackId
  return (
    <>
      <HeroFull muxPlaybackId={muxId || undefined} imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg" imageAlt="Aerial view of the Rivers Lodge estate and Marais des Cygnes River" eyebrow={`${SITE.location.city}, ${SITE.location.state}`} headline="Rivers Lodge & Hunt Club" subline={SITE.tagline} showScroll actions={[{ label: 'Explore the Estate', href: '/estate', variant: 'ghost-dark' }, { label: 'Plan Your Wedding', href: '/weddings', variant: 'ghost-dark' }]} />
      <Section background="cream" className="py-20 lg:py-28">
        <Container width="prose" className="text-center">
          <p className="eyebrow mb-5">The Marais des Cygnes</p>
          <h2 className="font-display font-light text-soil text-balance mb-8" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Three hundred acres. One river. Singular moments.</h2>
          <p className="font-body text-base text-bark leading-relaxed">Rivers Lodge is a working private estate — not a resort, not a venue catalog. The land has been tended with purpose: the water holds fish, the fields hold game, and the spaces hold the kind of gatherings that people talk about for the rest of their lives. You are not renting a location. You are arriving somewhere.</p>
        </Container>
      </Section>

      <ThreeColumnPillar items={[{ imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-389_websize.jpg', imageAlt: 'Wedding reception in the Rivers Lodge barn', label: 'Weddings', description: 'Your wedding, without compromise.', href: '/weddings', ctaLabel: 'See wedding experiences' }, { imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg', imageAlt: 'The Lodge bar and great room interior', label: 'The Estate', description: 'A private retreat for the people who matter.', href: '/estate', ctaLabel: 'Explore the estate' }, { imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-170.jpg', imageAlt: 'Clubhouse interior set for an event', label: 'Membership', description: 'Access to the land and the seasons.', href: '/membership', ctaLabel: 'Explore membership' }]} />

      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg" imageAlt="The Lodge exterior on the Rivers Lodge estate grounds" imageLeft eyebrow={`La Cygne, Kansas — ${SITE.location.acres} acres`} headline="Where the river sets the calendar." body={['The Marais des Cygnes moves slowly in summer and rises urgently in spring. The fields drain into it and the timber grows along its banks for miles. Three hundred acres of this land belong to Rivers Lodge — and to the members and guests who know it.', 'The estate sits roughly an hour south of Kansas City, which means it is close enough to reach on a Friday evening and far enough that it feels like a genuine departure. The seasons here are not metaphors. They are on the calendar.']} actions={[{ label: 'Explore the estate', href: '/estate', variant: 'ghost' }]} />

      {/* Hunt Club Section */}
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg" imageAlt="Aerial view of wetlands and timber along the Marais des Cygnes River" eyebrow="The Hunt Club" headline="The land was a hunt club before it was anything else." body={['Whitetail deer hold in the timber edges from September through January. Waterfowl follow the Marais des Cygnes flyway from November to February. Spring turkey concentrate along the food plots and field edges in April and May. The river holds largemouth bass, channel catfish, and crappie year-round.', 'Members receive priority access to guided hunts, managed stands with cell cam monitoring, blind access and decoy equipment for waterfowl, and guided float fishing on the river. The property also hosts exclusive Flint Hills wild turkey experiences on over 10,000 additional acres.', 'This is not a hunting lease. It is a private club on working land — managed habitat, limited pressure, and a lodge waiting at the end of the day.']} actions={[{ label: 'Explore membership', href: '/membership', variant: 'ghost' }]} />

      {/* Weddings Feature */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" alt="Wedding reception celebration at Rivers Lodge" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, rgba(44,31,20,0.65) 100%)' }} aria-hidden />
        </div>
        <Container width="layout" className="relative z-10 flex flex-col justify-end h-full py-16 lg:py-24" style={{ minHeight: '520px' }}>
          <div className="max-w-xl">
            <p className="eyebrow text-white/70 mb-4">Weddings at Rivers Lodge</p>
            <h2 className="font-display font-light text-white text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Your wedding, without compromise.</h2>
            <p className="font-body text-white/80 text-base leading-relaxed mb-8">An estate that holds the day as beautifully as you imagined it.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/weddings" variant="ghost-light">See Wedding Experiences</Button>
              <Button href="/weddings#availability" variant="ghost-light">Check Availability</Button>
            </div>
          </div>
        </Container>
      </section>

      <GalleryGrid images={GALLERY_TEASE} ctaHref="/gallery" ctaLabel="View all photos" />

      <MembershipSignal />

      {/* CTA */}
      <Section background="soil">
        <Container width="prose" className="text-center">
          <p className="eyebrow text-white/50 mb-4">Get in touch</p>
          <h2 className="font-display font-light text-white text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Come see the property.</h2>
          <p className="font-body text-white/70 text-base leading-relaxed mb-8">The best way to understand Rivers Lodge is to walk it. We offer private tours of the estate, the venues, and the grounds — no pressure, no presentation. Just the land.</p>
          <Button href="/contact" variant="ghost-light">Book a Private Tour</Button>
        </Container>
      </Section>
    </>
  )
}
