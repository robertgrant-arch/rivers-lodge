import type { Metadata } from 'next'
import { Suspense } from 'react'
import { buildMetadata } from '@/lib/site'
import { WeddingInquiryForm } from '@/components/weddings/wedding-inquiry-form'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
export const metadata: Metadata = buildMetadata({ title: 'Wedding Inquiry', description: 'Begin your wedding inquiry at Rivers Lodge.', path: '/weddings/inquire' })
export default function WeddingInquirePage() {
  return (
    <>
      <div className="bg-soil pt-32 pb-16">
        <Container width="content" className="text-center">
          <p className="eyebrow text-cream/40 mb-4">Begin Your Inquiry</p>
          <h1 className="font-display font-light text-cream text-balance mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>Tell us about your wedding.</h1>
          <p className="font-body text-cream/65 text-base leading-relaxed max-w-prose mx-auto">We respond to all wedding inquiries within 24 hours — personally, with availability and next steps.</p>
        </Container>
      </div>
      <Section background="cream"><Container width="content"><Suspense fallback={null}><WeddingInquiryForm /></Suspense></Container></Section>
    </>
  )
}
