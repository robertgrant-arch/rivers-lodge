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
  { src: '/images/gallery/estate-river.jpg', alt: 'The Marais des Cygnes River at dawn, viewed from the lodge grounds', featured: true },
  { src: '/images/gallery/ceremony-arch.jpg', alt: 'Outdoor ceremony arch surrounded by tall grass and open sky' },
  { src: '/images/gallery/lodge-interior.jpg', alt: 'Lodge great room with warm timber and stone fireplace' },
  { src: '/images/gallery/reception-evening.jpg', alt: 'Reception tables set at golden hour on the estate lawn' },
  { src: '/images/gallery/duck-blind-morning.jpg', alt: 'Duck blind at sunrise on the Marais des Cygnes' },
  { src: '/images/gallery/aerial-grounds.jpg', alt: 'Aerial view of the 300-acre estate and river corridor' },
]

export default function HomePage() {
  const muxId = publicConfig.mux.heroPlaybackId
  return (
    <>
      <HeroFull muxPlaybackId={muxId || undefined} imageSrc="/images/hero/hero-still.jpg" imageAlt="The Marais des Cygnes River at dusk, viewed across the Rivers Lodge grounds" eyebrow={`${SITE.location.city}, ${SITE.location.state}`} headline="Rivers Lodge & Hunt Club" subline={SITE.tagline} showScroll actions={[{ label: 'Explore the Estate', href: '/estate', variant: 'ghost-dark' }, { label: 'Plan Your Wedding', href: '/weddings', variant: 'ghost-dark' }]} />
      <Section background="cream" className="py-20 lg:py-28">
        <Container width="prose" className="text-center">
          <p className="eyebrow mb-5">The Marais des Cygnes</p>
          <h2 className="font-display font-light text-soil text-balance mb-8" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Three hundred acres. One river. Singular moments.</h2>
          <p className="font-body text-base text-bark leading-relaxed">Rivers Lodge is a working private estate — not a resort, not a venue catalog. The land has been tended with purpose: the water holds fish, the fields hold game, and the spaces hold the kind of gatherings that people talk about for the rest of their lives. You are not renting a location. You are arriving somewhere.</p>
        </Container>
      </Section>
      <ThreeColumnPillar items={[{ imageSrc: '/images/pillars/weddings.jpg', imageAlt: 'Bride and groom at the ceremony arch overlooking the river', label: 'Weddings', description: 'Your wedding, without compromise.', href: '/weddings', ctaLabel: 'See wedding experiences' }, { imageSrc: '/images/pillars/estate.jpg', imageAlt: 'The lodge exterior at golden hour with the river in the background', label: 'The Estate', description: 'A private retreat for the people who matter.', href: '/estate', ctaLabel: 'Explore the estate' }, { imageSrc: '/images/pillars/membership.jpg', imageAlt: 'Morning light over the duck marsh on the Marais des Cygnes', label: 'Membership', description: 'Access to the land and the seasons.', href: '/membership', ctaLabel: 'Explore membership' }]} />
      <EditorialSplit imageSrc="/images/estate/river-wide.jpg" imageAlt="The Marais des Cygnes River corridor from the north field" imageLeft eyebrow={`La Cygne, Kansas — ${SITE.location.acres} acres`} headline="Where the river sets the calendar." body={['The Marais des Cygnes moves slowly in summer and rises urgently in spring. The fields drain into it and the timber grows along its banks for miles. Three hundred acres of this land belong to Rivers Lodge — and to the members and guests who know it.', 'The estate sits roughly an hour south of Kansas City, which means it is close enough to reach on a Friday evening and far enough that it feels like a genuine departure. The seasons here are not metaphors. They are on the calendar.']} actions={[{ label: 'Explore the estate', href: '/estate', variant: 'ghost' }]} />
      <section className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/weddings/ceremony-wide.jpg" alt="Wedding ceremony on the Rivers Lodge estate lawn at golden hour" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,31,20,0.05) 0%, rgba(44,31,20,0.65) 100%)' }} aria-hidden />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-end text-center px-6 py-20 lg:py-28" style={{ minHeight: '520px' }}>
          <p className="eyebrow text-cream/60 mb-4">Weddings at Rivers Lodge</p>
          <h2 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>Your wedding, without compromise.</h2>
          <p className="font-body text-cream/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed">An estate that holds the day as beautifully as you imagined it.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/weddings" variant="ghost-dark" size="lg">See Wedding Experiences</Button>
            <Button href="/weddings/availability" variant="ghost-dark" size="lg">Check Availability</Button>
          </div>
        </div>
      </section>
      <MembershipSignal />
      <Section background="cream" flushTop>
        <Container width="layout">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader eyebrow="The property" headline="Rivers Lodge in every season." align="left" className="mb-0" />
            <Button href="/gallery" variant="text" className="hidden md:flex flex-shrink-0 ml-8">View all photos</Button>
          </div>
          <GalleryGrid images={GALLERY_TEASE} lightbox viewAllHref="/gallery" viewAllLabel="View all photos" />
        </Container>
      </Section>
      <Section background="parchment">
        <Container width="content" className="text-center">
          <p className="eyebrow mb-5">Get in touch</p>
          <h2 className="font-display font-light text-soil text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Come see the property.</h2>
          <p className="font-body text-bark text-base leading-relaxed max-w-prose mx-auto mb-10">The best way to understand Rivers Lodge is to walk it. We offer private tours of the estate, the venues, and the grounds — no pressure, no presentation. Just the land.</p>
          <Button href="/contact" variant="primary" size="lg">Book a Private Tour</Button>
        </Container>
      </Section>
    </>
  )
}
