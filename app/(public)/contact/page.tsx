import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata, SITE } from '@/lib/site'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Divider } from '@/components/ui/divider'
import { ContactForm } from '@/components/forms/contact-form'
export const metadata: Metadata = buildMetadata({ title: 'Contact & Book a Tour', description: 'Get in touch with Rivers Lodge and Hunt Club.', path: '/contact' })
export default function ContactPage() {
  return (
    <>
      <div className="bg-soil pt-32 pb-16">
        <Container width="layout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <p className="eyebrow text-cream/40 mb-4">Contact</p>
              <h1 className="font-display font-light text-cream text-balance" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}>Come see the property.</h1>
            </div>
            <div><p className="font-body text-cream/65 text-base leading-relaxed">The best way to understand Rivers Lodge is to walk it. We offer private tours for prospective wedding couples, corporate planners, and membership applicants.</p></div>
          </div>
        </Container>
      </div>
      <Section background="cream">
        <Container width="layout">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="font-display font-light text-2xl text-soil mb-8">Send us a message.</h2>
              <ContactForm />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-display font-light text-xl text-soil mb-5">Direct contact</h3>
                <div className="space-y-4">
                  <div><p className="eyebrow mb-1">Email</p><a href={`mailto:${SITE.contact.email}`} className="font-body text-sm text-bark hover:text-soil transition-colors">{SITE.contact.email}</a></div>
                  <div><p className="eyebrow mb-1">Location</p><a href="https://maps.google.com/?q=La+Cygne+KS" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-bark hover:text-soil transition-colors">La Cygne, Kansas — approximately one hour south of Kansas City</a></div>
                </div>
              </div>
              <Divider />
              <div>
                <h3 className="font-display font-light text-xl text-soil mb-3">Response time</h3>
                <p className="font-body text-sm text-bark leading-relaxed">We respond to all messages personally and typically within one business day.</p>
              </div>
              <Divider />
              <a href="https://maps.google.com/?q=La+Cygne+KS" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded hover:opacity-90 transition-opacity" aria-label="View on Google Maps">
                <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80" alt="Map showing La Cygne, Kansas — approximately one hour south of Kansas City" width={600} height={280} className="w-full object-cover" quality={80} />
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
