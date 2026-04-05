export const SITE = {
  name: 'Rivers Lodge & Hunt Club',
  tagline: 'A private estate on the Marais des Cygnes.',
  description: 'Rivers Lodge and Hunt Club is a luxury private estate on over 300 acres along the Marais des Cygnes River in La Cygne, Kansas — offering weddings, corporate retreats, lodging, outdoor recreation, and private membership.',
  url: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://riverslodge.com',
  location: { city: 'La Cygne', state: 'Kansas', stateAbbr: 'KS', region: 'Kansas City area', river: 'Marais des Cygnes', acres: 300 },
  contact: { email: 'info@riverslodge.com', phone: '', address: 'La Cygne, Kansas' },
  social: { instagram: 'https://instagram.com/riverslodge' },
} as const
export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] }
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Estate', href: '/estate' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'Events', href: '/events' },
  { label: 'Lodging', href: '/lodging' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Membership', href: '/membership' },
]
export const WEDDINGS_SUBNAV: NavItem[] = [
  { label: 'The Experience', href: '/weddings/experience' },
  { label: 'Venues', href: '/weddings/venues' },
  { label: 'Packages', href: '/weddings/packages' },
  { label: 'Gallery', href: '/weddings/gallery' },
  { label: 'Availability', href: '/weddings/availability' },
  { label: 'Begin Inquiry', href: '/weddings/inquire' },
]
export type MembersNavItem = { label: string; href: string; icon: string }
export const MEMBERS_NAV: MembersNavItem[] = [
  { label: 'Home', href: '/members', icon: 'home' },
  { label: 'Book', href: '/members/book', icon: 'calendar' },
  { label: 'Events', href: '/members/events', icon: 'users' },
  { label: 'Seasons', href: '/members/seasons', icon: 'leaf' },
  { label: 'Messages', href: '/members/messages', icon: 'message' },
  { label: 'Documents', href: '/members/documents', icon: 'file' },
  { label: 'Profile', href: '/members/profile', icon: 'user' },
]
export const DEFAULT_OG_IMAGE = '/og/default.jpg'
export function buildMetadata({ title, description, path = '', ogImage = DEFAULT_OG_IMAGE }: { title?: string; description?: string; path?: string; ogImage?: string }) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.name
  const fullDescription = description ?? SITE.description
  const url = `${SITE.url}${path}`
  return {
    title: fullTitle, description: fullDescription,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description: fullDescription, url, siteName: SITE.name, images: [{ url: ogImage, width: 1200, height: 630 }], type: 'website' as const, locale: 'en_US' },
    twitter: { card: 'summary_large_image' as const, title: fullTitle, description: fullDescription, images: [ogImage] },
    robots: { index: true, follow: true },
  }
}
