import type { Metadata } from 'next'
import { Suspense } from 'react'
import { buildMetadata } from '@/lib/site'
import { WeddingCalendar } from '@/components/weddings/wedding-calendar'
import { SkeletonCalendarGrid } from '@/components/ui/skeleton'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'Wedding Availability', description: 'Check wedding date availability at Rivers Lodge.', path: '/weddings/availability' })
export const dynamic = 'force-dynamic'
export default function WeddingAvailabilityPage() {
  return (
    <>
      <div className="bg-soil pt-32 pb-16">
        <Container width="layout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div><p className="eyebrow text-cream/40 mb-4">Availability</p><h1 className="font-display font-light text-cream text-balance" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>The calendar is honest.</h1></div>
            <div><p className="font-body text-cream/65 text-base leading-relaxed">Dates shown as available are genuinely open. Select a date to begin your inquiry.</p></div>
          </div>
        </Container>
      </div>
      <Section background="cream"><Container width="content"><Suspense fallback={<SkeletonCalendarGrid />}><WeddingCalendar /></Suspense></Container></Section>
      <Section background="parchment">
        <Container width="content" className="text-center">
          <p className="eyebrow mb-4">Don't see your date?</p>
          <h2 className="font-display font-light text-soil text-balance mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}>Reach out directly.</h2>
          <p className="font-body text-bark text-sm leading-relaxed max-w-prose mx-auto mb-8">Dates within 90 days are handled through direct contact. It is worth reaching out even for reserved dates.</p>
          <div className="flex flex-wrap gap-4 justify-center"><Button href="/weddings/inquire" variant="primary">Begin Your Inquiry</Button><Button href="/contact" variant="ghost">Contact Us Directly</Button></div>
        </Container>
      </Section>
    </>
  )
}
