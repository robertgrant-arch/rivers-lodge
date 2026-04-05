import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/site'
import { PackageCard, type WeddingPackage } from '@/components/weddings/package-card'
import { Section, SectionHeader } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
export const metadata: Metadata = buildMetadata({ title: 'Wedding Packages', description: 'Wedding packages at Rivers Lodge.', path: '/weddings/packages' })
export const revalidate = 300
const PACKAGES: WeddingPackage[] = [
  { name: 'The River Weekend', tagline: 'The complete estate experience — two nights, one weekend.', featured: false, capacityMin: 50, capacityMax: 150, startingPrice: 12000, description: 'For couples who want the full Rivers Lodge experience. Two nights on-site, full grounds access from Friday afternoon through Sunday morning.', inclusions: ['Exclusive estate access Friday through Sunday', 'Lodge accommodations — all rooms for two nights', 'All ceremony and reception venue spaces', 'Rehearsal dinner setup and coordination', 'Catering coordination with vetted partners', 'Day-of coordination with Rivers Lodge staff', 'Morning-after breakfast for lodge guests'] },
  { name: 'The Saturday Estate', tagline: 'The ceremony, the reception, and the night.', featured: true, capacityMin: 50, capacityMax: 200, startingPrice: 8500, description: 'Saturday access to the full estate — from mid-morning setup through Sunday checkout. Lodge accommodations for the wedding night.', inclusions: ['Exclusive estate access Saturday through Sunday checkout', 'Lodge accommodations — all rooms for one night', 'All ceremony and reception venue spaces', 'Grounds access for portraits', 'Catering coordination with vetted partners', 'Day-of coordination with Rivers Lodge staff'] },
  { name: 'The Ceremony', tagline: 'The grounds, the ceremony, and the celebration.', featured: false, capacityMin: 25, capacityMax: 120, startingPrice: 5500, description: 'For smaller weddings and elopements. Ceremony space, grounds access, and the property to yourselves for the day.', inclusions: ['Exclusive estate access for one day', 'Ceremony venue space of your choice', 'Grounds access for portraits', 'Basic setup and cleanup coordination', 'Vendor access from 9am', 'Lodge accommodations available as add-on'] },
]
export default function WeddingPackagesPage() {
  return (
    <>
      <div className="bg-soil pt-32 pb-16">
        <Container width="layout">
          <p className="eyebrow text-cream/40 mb-4">Wedding Packages</p>
          <h1 className="font-display font-light text-cream text-balance max-w-2xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}>Three tiers. One property.</h1>
          <p className="font-body text-cream/65 text-base leading-relaxed max-w-xl mt-4">Each package includes full estate access. Pricing is a starting point; your final package is confirmed during the inquiry process.</p>
        </Container>
      </div>
      <Section background="cream">
        <Container width="layout">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">{PACKAGES.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}</div>
          <div className="mt-12 bg-parchment border border-stone/40 rounded p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div><p className="eyebrow mb-3">Custom packages</p><h3 className="font-display font-light text-2xl text-soil mb-3">Your wedding doesn't fit a grid.</h3><p className="font-body text-sm text-bark leading-relaxed">If none of the packages above quite match what you are imagining, tell us. We have built custom packages for every variation.</p></div>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end"><Button href="/weddings/inquire" variant="primary" size="lg">Begin Your Inquiry</Button><Button href="/weddings/planning-guide" variant="ghost" size="lg">Planning Guide</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
