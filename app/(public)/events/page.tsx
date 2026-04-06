import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { MediaCard } from '@/components/ui/media-card'

export const metadata: Metadata = buildMetadata({ title: 'Events & Corporate Retreats', description: 'Private events and corporate retreats at Rivers Lodge near Kansas City. Full estate buyouts with overnight lodging, catering, and outdoor programming.', path: '/events' })
export const revalidate = 300

const EVENT_TYPES = [
  { src: 'https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg', alt: 'The Lodge interior great room for corporate meetings', label: 'Corporate Retreats', sublabel: 'For teams and companies', headline: 'Corporate Retreats', body: 'The estate accommodates full corporate buyouts with overnight lodging, dedicated event spaces, catering coordination, and outdoor programming. An hour from Kansas City, but a world away from the office.', cta: 'Inquire about retreats' },
  { src: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-73.jpg', alt: 'Barn exterior and patio for private events', label: 'Private Events', sublabel: 'Gatherings and celebrations', headline: 'Private Events', body: 'Milestone birthdays, family reunions, private dinners, anniversary celebrations. The lodge and grounds available for exclusive buyout.', cta: 'Inquire about events' },
]

const AMENITIES = [
  { title: 'Full Estate Buyout', desc: 'The entire 300-acre property is exclusively yours. No shared spaces, no overlapping events.' },
  { title: 'On-Site Lodging', desc: 'The Lodge, Riverhouse Suites, The Annex, and Ohana House accommodate groups from 10 to 40+ overnight.' },
  { title: 'Catering Coordination', desc: 'Work with our preferred caterers or bring your own. The barn and clubhouse kitchens support full-service events.' },
  { title: 'Outdoor Programming', desc: 'Guided hunts, fishing on the Marais des Cygnes, sporting clays, nature hikes, and bonfires under the stars.' },
  { title: 'Meeting Spaces', desc: 'The Lodge great room, The Clubhouse, and the barn balcony all serve as flexible meeting environments with A/V support.' },
  { title: 'Full Bar Service', desc: 'The Lodge bar and the barn indoor/outdoor bar are staffed and stocked for your event.' },
]

export default function EventsPage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-170.jpg" imageAlt="Clubhouse interior set for a corporate dinner at Rivers Lodge" eyebrow="Events & Retreats" headline="Private events for the people and companies that matter." subline="A property that changes the quality of the conversation." height="large" actions={[{ label: 'Inquire About Events', href: '/contact', variant: 'ghost-dark' }]} />

      <Section background="cream">
        <Container width="layout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENT_TYPES.map(({ src, alt, label, sublabel, headline, body, cta }) => (
              <div key={headline}>
                <MediaCard src={src} alt={alt} label={label} sublabel={sublabel} href="/contact" aspectRatio="editorial" overlayStrength="heavy" />
                <div className="pt-6"><h2 className="font-display font-light text-2xl text-soil mb-3">{headline}</h2><p className="font-body text-sm text-bark leading-relaxed mb-5">{body}</p><Button href="/contact" variant="ghost">{cta}</Button></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What's Included */}
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="What's Included" headline="Everything your group needs." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {AMENITIES.map((item) => (
              <div key={item.title} className="border-t border-bark/10 pt-6">
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Corporate Detail */}
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg" imageAlt="Lodge great room configured for a corporate meeting" eyebrow="Corporate Retreats" headline="Take the team off-site. Genuinely." body={['Most corporate retreats are a conference room in a different zip code. Rivers Lodge is a working estate with guided outdoor experiences, a full bar in a lodge with a canoe on the ceiling, and the kind of setting that makes people actually talk to each other.', 'We handle the logistics: lodging assignments, catering, A/V, and programming. You handle the agenda.']} actions={[{ label: 'Start planning', href: '/contact', variant: 'ghost' }]} />

      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-73.jpg" imageAlt="Barn patio with fireplaces for private events" imageLeft eyebrow="Private Events" headline="Milestones deserve a setting." body={['Birthday parties, family reunions, anniversary dinners, holiday gatherings. The estate becomes yours for the weekend with lodging for your closest people and spaces that feel like they were built for the occasion.', 'The barn seats up to 256. The Clubhouse handles intimate groups of 40-80. The Lodge bar handles everything after.']} actions={[{ label: 'Plan your event', href: '/contact', variant: 'ghost' }]} />

      {/* CTA */}
      <Section background="parchment">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-soil text-balance mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}>Tell us about your event.</h2>
          <p className="font-body text-bark text-base leading-relaxed max-w-prose mx-auto mb-8">We respond within one business day with availability, capacity specifics, and a sense of what the property can offer your group.</p>
          <Button href="/contact" variant="primary" size="lg">Begin Your Inquiry</Button>
        </Container>
      </Section>
    </>
  )
}
