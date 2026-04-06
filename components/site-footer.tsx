import Link from 'next/link'
import { SITE } from '@/lib/site'

const FOOTER_LINKS = {
  Estate: [{ label: 'The Land', href: '/estate' }, { label: 'Wildlife & Habitat', href: '/estate' }, { label: 'Gallery', href: '/gallery' }],
  Weddings: [{ label: 'The Experience', href: '/weddings' }, { label: 'Venue Spaces', href: '/weddings#venue-spaces' }, { label: 'Availability', href: '/weddings#availability' }, { label: 'Begin Inquiry', href: '/contact' }],
  'Events & Stays': [{ label: 'Corporate Retreats', href: '/events' }, { label: 'Private Events', href: '/events' }, { label: 'Lodging', href: '/lodging' }, { label: 'Book a Tour', href: '/contact' }],
  'Hunt Club & Membership': [{ label: 'Hunting & Fishing', href: '/membership' }, { label: 'The Seasons', href: '/membership' }, { label: 'Privileges', href: '/membership' }, { label: 'Apply', href: '/contact' }, { label: 'Member Login', href: '/login' }],
}

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-soil text-cream/80">
      <div className="max-w-layout mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block font-display font-light text-2xl text-cream tracking-[0.06em] mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded">Rivers Lodge</Link>
            <p className="font-body text-sm text-cream/60 leading-relaxed max-w-xs mb-6">A private estate on over 300 acres along the {SITE.location.river} River. {SITE.location.city}, {SITE.location.state}.</p>
            <a href={`mailto:${SITE.contact.email}`} className="block font-body text-sm text-cream/60 hover:text-cream transition-colors duration-150">{SITE.contact.email}</a>
            <div className="mt-6"><a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest text-cream/40 hover:text-cream/80 uppercase transition-colors duration-150">Instagram</a></div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="eyebrow text-cream/40 mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => <li key={link.href}><Link href={link.href} className="font-body text-sm text-cream/60 hover:text-cream transition-colors duration-150">{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10" />
      <div className="max-w-layout mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-cream/30 tracking-wide">&copy; {year} {SITE.name}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="font-mono text-xs text-cream/30 hover:text-cream/60 tracking-wide transition-colors">Privacy</Link>
          <Link href="/contact" className="font-mono text-xs text-cream/30 hover:text-cream/60 tracking-wide transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
