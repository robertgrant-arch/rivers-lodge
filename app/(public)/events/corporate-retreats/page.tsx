import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'Corporate Retreats', description: 'Corporate retreats at Rivers Lodge near Kansas City.', path: '/events/corporate-retreats' })
export const revalidate = 300
const WHAT_WE_PROVIDE = [{ label: 'Estate Access', body: 'Full property buyout. No shared spaces, no outside guests.' }, { label: 'Overnight Lodging', body: 'The lodge accommodates your team on-site. No commuting between venue and hotel.' }, { label: 'Event Spaces', body: 'The lodge great room, the covered pavilion, and the outdoor lawns.' }, { label: 'Dining Coordination', body: 'We coordinate with vetted local catering partners for every meal.' }, { label: 'Outdoor Programming', body: 'Guided fishing, sporting clays, field walks, and private nature access.' }, { label: 'Technology', body: 'The lodge supports standard presentation and video-conferencing needs.' }]
export default function CorporateRetreatsPage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Leadership team working outdoors on the Rivers Lodge estate grounds" eyebrow="Corporate Retreats" headline="The environment changes the meeting." subline="Full estate buyout for teams that need to do actual work." height="large" actions={[{ label: 'Plan your retreat', href: '/events/inquire?type=corporate', variant: 'ghost-dark' }]} />
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Team around a long timber table in the lodge great room" imageLeft eyebrow="Why it works" headline="A property that produces decisions." body={['There is something about a place with no distractions that changes the quality of thought. No lobby bar. No conference center with identical rooms on every floor. No reason to leave.', 'Teams that retreat here consistently report that the most important conversations of the year happened during a walk along the river or around the table after dinner.']} />
      <Section background="parchment">
        <Container width="layout">
          <SectionHeader eyebrow="What's included" headline="Everything your group needs." align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_WE_PROVIDE.map(({ label, body }) => (<div key={label} className="card p-7"><h3 className="font-display font-light text-xl text-soil mb-3">{label}</h3><p className="font-body text-sm text-bark leading-relaxed">{body}</p></div>))}
          </div>
        </Container>
      </Section>
      <Section background="soil">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-cream text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>We respond within one business day.</h2>
          <Button href="/events/inquire?type=corporate" variant="ghost-dark" size="lg">Begin Your Inquiry</Button>
        </Container>
      </Section>
    </>
  )
}
