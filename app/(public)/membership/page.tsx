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
  { label: 'Whitetail Deer', period: 'September — January', description: 'The property holds a healthy resident herd. Managed stands throughout the timber and field edges, with cell cam monitoring updated to the member portal throughout the season.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/11/Rivers_SEPT2022_-238-1.jpg', imageAlt: 'Whitetail buck in the south field at dusk', status: 'open' as const },
  { label: 'Waterfowl', period: 'November — February', description: 'The Marais des Cygnes corridor is a natural migration flyway. Blind access, decoy equipment, and guided options available to members through the peak of the migration.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg', imageAlt: 'Duck marsh and wetlands at sunrise', status: 'open' as const },
  { label: 'Turkey', period: 'April — May', description: 'Spring turkey on the property is a genuine experience. The timber edges and food plots concentrate birds. Walk-in access with guide options available.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg', imageAlt: 'Timber edge habitat on the estate', status: 'upcoming' as const },
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
            <p className="font-body text-base text-bark leading-relaxed">Membership at Rivers Lodge means priority access to the lodge, the guided hunt programs, and the fishing along the Marais des Cygnes — across deer, duck, and turkey seasons. It means knowing the land well enough to have a favorite stand.</p>
            <p className="font-body text-base text-bark leading-relaxed">It also means a private concierge portal, invitations to member-only events throughout the year, and a staff that knows your preferences before you arrive.</p>
            <p className="font-body text-base text-bark leading-relaxed">Membership is selective. The community is small by design. Applications are reviewed personally.</p>
          </div>
        </Container>
      </Section>

      {/* Privileges */}
      <Section id="privileges">
        <Container width="layout">
          <SectionHeader eyebrow="Member Privileges" headline="What membership includes." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {PRIVILEGES.map(({ label, body }) => (
              <div key={label} className="border-t border-bark/10 pt-6">
                <h3 className="font-display text-lg text-soil mb-2">{label}</h3>
                <p className="font-body text-sm text-bark/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* The Land */}
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/11/DJI_0017.jpg" imageAlt="Aerial view of wetlands, timber, and river on the estate" eyebrow="The Land" headline="Three hundred acres managed for wildlife." body={['The property spans timber, river bottom, wetland, and open field — each managed for the species it supports. Food plots are planted seasonally. Stands are maintained and monitored with cell cameras. Controlled burns keep the habitat productive.', 'Members receive real-time updates through the portal: trail cam photos, field notes from staff, and seasonal reports on what is moving and where.']} actions={[{ label: 'Explore the estate', href: '/estate', variant: 'ghost' }]} />

      {/* Seasons */}
      <Section background="cream">
        <Container width="layout">
          <SectionHeader eyebrow="The Seasons" headline="What the calendar holds." />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {SEASONS.map(({ label, period, description, imageSrc, imageAlt, status }) => (
              <div key={label} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl text-soil">{label}</h3>
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
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2022/10/Rivers_SEPT2022_-29-1.jpg" imageAlt="Rivers Lodge estate at golden hour" imageLeft eyebrow="Beyond the Hunt" headline="The property is yours year-round." body={['Members have priority access to the lodge, the barn, the clubhouse, and all five lodging buildings on the estate. Host a family weekend, book a corporate retreat, or simply come out for a quiet few days on the river.', 'The Flint Hills wild turkey experience gives members access to over 10,000 additional acres of premier Kansas hunting ground — fully guided with lodging, meals, and transportation included.']} actions={[{ label: 'See lodging options', href: '/lodging', variant: 'ghost' }]} />

      {/* CTA */}
      <Section background="soil">
        <Container width="prose" className="text-center">
          <p className="eyebrow text-white/50 mb-4">Ready to apply?</p>
          <h2 className="font-display font-light text-white text-balance mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>The application takes five minutes.</h2>
          <p className="font-body text-white/70 text-base leading-relaxed mb-8">Tell us about yourself and what draws you to the property. We review every application personally and respond within a week.</p>
          <Button href="/contact" variant="ghost-light">Apply for Membership</Button>
        </Container>
      </Section>
    </>
  )
}
