import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { EventInquiryForm } from '@/components/forms/event-inquiry-form'
import type { EventInquiryInput } from '@/lib/validations/event-inquiry'
export const metadata: Metadata = buildMetadata({ title: 'Event Inquiry', description: 'Inquire about hosting a corporate retreat or private event at Rivers Lodge.', path: '/events/inquire' })
interface PageProps { searchParams: Promise<{ type?: string }> }
function resolveEventType(raw?: string): EventInquiryInput['eventType'] | undefined {
  if (raw === 'corporate') return 'corporate_retreat'; if (raw === 'private') return 'private_event'; return undefined
}
export default async function EventInquirePage({ searchParams }: PageProps) {
  const params = await searchParams; const defaultType = resolveEventType(params.type)
  return (
    <>
      <div className="bg-soil pt-32 pb-16">
        <Container width="content" className="text-center">
          <p className="eyebrow text-cream/40 mb-4">Events & Retreats</p>
          <h1 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>Tell us about your event.</h1>
          <p className="font-body text-cream/65 text-base leading-relaxed max-w-prose mx-auto">We respond to all inquiries within one business day with availability, capacity specifics, and a sense of what the property can offer.</p>
        </Container>
      </div>
      <Section background="cream"><Container width="content"><EventInquiryForm defaultEventType={defaultType} /></Container></Section>
    </>
  )
}
