import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'

export const metadata: Metadata = buildMetadata({ title: 'Membership', description: 'Private membership at Rivers Lodge and Hunt Club. Priority access to guided hunts, fishing, lodging, and member events on 300 acres.', path: '/membership' })
export const revalidate = 300

const SEASONS = [
  { label: 'Whitetail Deer', period: 'September \u2014 January', description: 'The property holds a healthy resident herd. Managed stands throughout the timber and field edges, with cell cam monitoring updated to the member portal throughout the season.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg', imageAlt: 'Whitetail buck in the south field at dusk', status: 'open' as const },
  { label: 'Waterfowl', period: 'November \u2014 February', description: 'The Marais des Cygnes corridor is a natural migration flyway. Blind access, decoy equipment, and guided options available to members through the peak of the migration.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg', imageAlt: 'Duck marsh and wetlands at sunrise', status: 'open' as const },
  { label: 'Turkey', period: 'April \u2014 May', description: 'Spring turkey on the property is a genuine experience. The timber edges and food plots concentrate birds. Walk-in access with guide options available.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg', imageAlt: 'Timber edge habitat on the estate', status: 'upcoming' as const },
  { label: 'Fishing', period: 'Year-round', description: 'The Marais des Cygnes holds largemouth bass, channel catfish, and crappie year-round. Bank access and guided float options available to members.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-78.jpg', imageAlt: 'River and pond on the Rivers Lodge property', status: 'open' as const },
]

const PRIVILEGES = [
  { label: 'Priority booking', body: 'Members book lodging and guided experiences before the general calendar opens.' },
  { label: 'Seasonal intelligence', body: 'Cell cam captures, field notes, and staff-posted updates live in your private member portal throughout the season.' },
  { label: 'Member events', body: 'Annual opener weekends, appreciation dinners, and informal gatherings throughout the year.' },
  { label: 'Guest access', body: 'Bring guests to the property for lodging stays, guided hunts, and member events.' },
  { label: 'Concierge portal', body: 'Book visits, RSVP to events, message the team, and access property documents.' },
  { label: 'Vetted community', body: 'Membership is selective. The result is a community of people who share a genuine relationship to the land.' },
]

export default function MembershipPage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg" imageAlt="Aerial view of The Lodge at Rivers Lodge estate" eyebrow="Private Membership" headline="The property, season after season." subline="Access to the land, the water, and the people who take it seriously." height="full" showScroll actions={[{ label: 'Explore Membership', href: '#privileges', variant: 'ghost-dark' }]} />

      <Section background="cream">
        <Container width="prose" className="text-center">
          <p className="eyebrow mb-5">Membership at Rivers Lodge</p>
          <div className="text-left space-y-5">
            <p className="font-body text-base text-bark leading-relaxed">Membership at Rivers Lodge means priority access to the lodge, the guided hunt programs, and the fishing along the Marais des Cygnes \u2014 across deer, duck, and turkey seasons. It means knowing the land well enough to have a favorite stand.</p>
            <p className="font-body text-base text-bark leading-relaxed">It also means a private concierge portal, invitations to member-only events throughout the year, and a staff that knows your preferences before you arrive.</p>
            <p className="font-body text-base text-bark leading-relaxed">Membership is selective. The community is small by design. Applications are reviewed personally.</p>
          </div>
        </Container>
      </Section>

      {/* Privileges */}
      <Section id="privileges" background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="Member Privileges" headline="What membership includes." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {PRIVILEGES.map(({ label, body }) => (
              <div key={label} className="border-t border-bark/10 pt-6">
                <h3 className="font-display text-lg mb-2">{label}</h3>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* The Land */}
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/09/20200515-3M4A7081.jpg" imageAlt="The Lodge bar interior with canoe on ceiling" eyebrow="The Lodge" headline="Your home base on the property." body={['The Lodge is the social center of the estate \u2014 5,200 square feet with four bedrooms, a full kitchen, heated floors, and a bar with a canoe on the ceiling. Members have priority booking for lodge weekends.', 'After a morning in the blind or an afternoon on the river, this is where the stories land.']} actions={[{ label: 'See lodging details', href: '/lodging', variant: 'ghost' }]} />

      {/* Seasons */}
      <Section>
        <SectionHeader eyebrow="The Seasons" headline="The calendar on the land." align="center" />
        <Container width="layout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {SEASONS.map(({ label, period, description, imageSrc, imageAlt, status }) => (
              <div key={label} className="group">
                <div className="relative aspect-[3/2] rounded-sm overflow-hidden mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl">{label}</h3>
                  <Tag variant={status === 'open' ? 'default' : 'muted'}>{status === 'open' ? 'Open' : 'Upcoming'}</Tag>
                </div>
                <p className="font-mono text-xs text-bark/50 tracking-wide uppercase mb-2">{period}</p>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Outdoor Experience */}
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg" imageAlt="Aerial view of Ohana House and private lake" imageLeft eyebrow="Beyond the Hunt" headline="The property is yours year-round." body={['Membership is not limited to hunting season. Fish the Marais des Cygnes in summer. Hike the Timber Trail in fall. Host a weekend at Ohana House on its own 20-acre lake. Book the lodge for a family gathering.', 'The staff knows the property and they know what members want. That relationship is the difference.']} actions={[{ label: 'Explore the estate', href: '/estate', variant: 'ghost' }]} />

      {/* CTA */}
      <Section background="bark">
        <Container width="prose" className="text-center">
          <p className="eyebrow text-cream/60 mb-5">Ready to apply?</p>
          <h2 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>The application takes five minutes.</h2>
          <p className="font-body text-cream/80 leading-relaxed mb-8">Tell us about yourself and what draws you to the property. We review every application personally and respond within a week.</p>
          <Button href="/contact" variant="ghost-dark">Apply for Membership</Button>
        </Container>
      </Section>
    </>
  )
}
