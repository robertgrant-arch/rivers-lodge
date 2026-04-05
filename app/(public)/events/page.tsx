import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { MediaCard } from '@/components/ui/media-card'
export const metadata: Metadata = buildMetadata({ title: 'Events & Corporate Retreats', description: 'Private events and corporate retreats at Rivers Lodge near Kansas City.', path: '/events' })
export const revalidate = 300
export default function EventsPage() {
  return (
    <>
      <HeroFull imageSrc="/images/events/hero.jpg" imageAlt="Corporate retreat dinner on the Rivers Lodge estate lawn at dusk" eyebrow="Events & Retreats" headline="Private events for the people and companies that matter." subline="A property that changes the quality of the conversation." height="large" actions={[{ label: 'Corporate Retreats', href: '/events/corporate-retreats', variant: 'ghost-dark' }, { label: 'Private Events', href: '/events/private-events', variant: 'ghost-dark' }]} />
      <Section background="cream">
        <Container width="layout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ src: '/images/events/corporate-retreat.jpg', alt: 'Team in the lodge great room', label: 'Corporate Retreats', sublabel: 'For teams and companies', href: '/events/corporate-retreats', headline: 'Corporate Retreats', body: 'The estate accommodates full corporate buyouts — overnight lodging, dedicated event spaces, catering coordination, and outdoor programming.', cta: 'Explore retreats' }, { src: '/images/events/private-event.jpg', alt: 'Dinner party setup in the lodge', label: 'Private Events', sublabel: 'Gatherings and celebrations', href: '/events/private-events', headline: 'Private Events', body: 'Milestone birthdays, family reunions, private dinners, anniversary celebrations. The lodge and grounds available for exclusive buyout.', cta: 'Explore private events' }].map(({ src, alt, label, sublabel, href, headline, body, cta }) => (
              <div key={href}>
                <MediaCard src={src} alt={alt} label={label} sublabel={sublabel} href={href} aspectRatio="editorial" overlayStrength="heavy" />
                <div className="pt-6"><h2 className="font-display font-light text-2xl text-soil mb-3">{headline}</h2><p className="font-body text-sm text-bark leading-relaxed mb-5">{body}</p><Button href={href} variant="ghost">{cta}</Button></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section background="parchment">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-soil text-balance mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}>Tell us about your event.</h2>
          <p className="font-body text-bark text-base leading-relaxed max-w-prose mx-auto mb-8">We respond within one business day with availability, capacity specifics, and a sense of what the property can offer your group.</p>
          <Button href="/events/inquire" variant="primary" size="lg">Begin Your Inquiry</Button>
        </Container>
      </Section>
    </>
  )
}
