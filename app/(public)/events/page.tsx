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
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-170.jpg" imageAlt="Clubhouse interior set for a corporate dinner at Rivers Lodge" eyebrow="Events & Retreats" headline="Private events for the people and companies that matter." subline="A property that changes the quality of the conversation." height="large" actions={[{ label: 'Corporate Retreats', href: '/events/corporate-retreats', variant: 'ghost-dark' }, { label: 'Private Events', href: '/events/private-events', variant: 'ghost-dark' }]} />
      <Section background="cream">
        <Container width="layout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ src: 'https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg', alt: 'The Lodge interior great room for corporate meetings', label: 'Corporate Retreats', sublabel: 'For teams and companies', href: '/events/corporate-retreats', headline: 'Corporate Retreats', body: 'The estate accommodates full corporate buyouts \u2014 overnight lodging, dedicated event spaces, catering coordination, and outdoor programming. An hour from Kansas City, but a world away from the office.', cta: 'Explore retreats' }, { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-73.jpg', alt: 'Barn exterior and patio for private events', label: 'Private Events', sublabel: 'Gatherings and celebrations', href: '/events/private-events', headline: 'Private Events', body: 'Milestone birthdays, family reunions, private dinners, anniversary celebrations. The lodge and grounds available for exclusive buyout.', cta: 'Explore private events' }].map(({ src, alt, label, sublabel, href, headline, body, cta }) => (
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
