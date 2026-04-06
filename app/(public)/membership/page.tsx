import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
export const metadata: Metadata = buildMetadata({ title: 'Membership', description: 'Private membership at Rivers Lodge and Hunt Club.', path: '/membership' })
export const revalidate = 300
const SEASONS = [
  { label: 'Whitetail Deer', period: 'September — January', description: 'The property holds a healthy resident herd. Managed stands throughout the timber and field edges, with cell cam monitoring updated to the member portal throughout the season.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Rivers_SEPT2022_-238-1.jpg', imageAlt: 'Whitetail buck in the south field at dusk', status: 'open' as const },
  { label: 'Waterfowl', period: 'November — February', description: 'The Marais des Cygnes corridor is a natural migration flyway. Blind access, decoy equipment, and guided options available to members through the peak of the migration.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Rivers_SEPT2022_-238-1.jpg', imageAlt: 'Duck marsh at sunrise', status: 'open' as const },
  { label: 'Turkey', period: 'April — May', description: 'Spring turkey on the property is a genuine experience. The timber edges and food plots concentrate birds. Walk-in access with guide options available.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Rivers_SEPT2022_-238-1.jpg', imageAlt: 'Tom turkey in the field at sunrise', status: 'upcoming' as const },
  { label: 'Fishing', period: 'Year-round', description: 'The Marais des Cygnes holds largemouth bass, channel catfish, and crappie year-round. Bank access and guided float options available to members.', imageSrc: 'https://theriverslodge.com/wp-content/uploads/2023/03/Rivers_SEPT2022_-238-1.jpg', imageAlt: 'Fishing on the Marais des Cygnes River', status: 'open' as const },
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
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Rivers_SEPT2022_-238-1.jpg" imageAlt="Aerial view of The Lodge at Rivers Lodge estate" eyebrow="Private Membership" headline="The property, season after season." subline="Access to the land, the water, and the people who take it seriously." height="full" showScroll actions={[{ label: 'Explore Membership', href: '#privileges', variant: 'ghost-dark' }]} />
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
      <Section background="parchment" id="privileges">
        <Container width="layout">
          <SectionHeader eyebrow="Member privileges" headline="What membership means in practice." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIVILEGES.map(({ label, body }) => (<div key={label} className="card p-7"><h3 className="font-display font-light text-xl text-soil mb-3">{label}</h3><p className="font-body text-sm text-bark leading-relaxed">{body}</p></div>))}
          </div>
        </Container>
      </Section>
      <Section background="cream" id="seasons">
        <Container width="layout">
          <SectionHeader eyebrow="The seasons" headline="Four reasons to be here." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEASONS.map(({ label, period, description, imageSrc, imageAlt, status }) => (
              <div key={label} className="card overflow-hidden">
                <div className="relative h-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(44,31,20,0.55) 100%)' }} aria-hidden />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3"><h3 className="font-display font-light text-xl text-cream">{label}</h3><Tag variant={status === 'open' ? 'river' : 'amber'} dot>{status === 'open' ? 'Open' : 'Upcoming'}</Tag></div>
                </div>
                <div className="p-6"><p className="eyebrow mb-3">{period}</p><p className="font-body text-sm text-bark leading-relaxed">{description}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Rivers_SEPT2022_-238-1.jpg" imageAlt="Lodge at dusk" imageLeft={false} eyebrow="How it works" headline="Membership is reviewed personally." body={['There is no membership tier page or instant-access form. The application takes five minutes. A member of our team follows up within 48 hours — personally.', 'Pricing is disclosed during that conversation. This is intentional. The right membership is built around how you plan to use the property.']} actions={[{ label: 'Apply for membership', href: '/membership/apply', variant: 'ghost' }]} />
      <Section background="soil">
        <Container width="content" className="text-center">
          <p className="eyebrow text-cream/40 mb-5">Ready to apply?</p>
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.1 }}>The application takes five minutes.</h2>
          <Button href="/membership/apply" variant="ghost-dark" size="lg">Apply for Membership</Button>
        </Container>
      </Section>
    </>
  )
}
