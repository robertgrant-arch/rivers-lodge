import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { HeroFull } from '@/components/sections/hero-full'
import { EditorialSplit } from '@/components/sections/editorial-split'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'Private Events', description: 'Private celebrations at Rivers Lodge near Kansas City.', path: '/events/private-events' })
export const revalidate = 300
export default function PrivateEventsPage() {
  return (
    <>
      <HeroFull imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Private dinner set on the lodge terrace at golden hour" eyebrow="Private Events" headline="Celebrations worth the occasion." subline="Milestone birthdays, anniversary dinners, family gatherings — held on a property that takes the occasion as seriously as you do." height="large" actions={[{ label: 'Inquire about your event', href: '/events/inquire?type=private', variant: 'ghost-dark' }]} />
      <EditorialSplit imageSrc="https://theriverslodge.com/wp-content/uploads/2023/03/Anderegg-531_websize.jpg" imageAlt="Long dinner table set on the lawn with candles" imageLeft eyebrow="What we host" headline="The kind of gathering that doesn't fit a banquet hall." body={['Milestone birthdays. Anniversary dinners. Family reunion weekends. Private hunting parties. The events that matter enough to give them a proper setting.', 'The lodge and grounds are available for private buyout, with overnight lodging for your group, catering coordination, and full access to the property.']} />
      <Section background="parchment">
        <Container width="content" className="text-center">
          <h2 className="font-display font-light text-soil text-balance mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>Tell us what you're planning.</h2>
          <Button href="/events/inquire?type=private" variant="primary" size="lg">Begin Your Inquiry</Button>
        </Container>
      </Section>
    </>
  )
}
