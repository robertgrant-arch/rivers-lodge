'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { PRIMARY_NAV, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

function RiversLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded', className)} aria-label={`${SITE.name} — Home`}>
      <span className="font-display font-light text-xl tracking-[0.08em] whitespace-nowrap">Rivers Lodge</span>
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase ml-2 mt-0.5 opacity-60 hidden sm:block" aria-hidden>&amp; Hunt Club</span>
    </Link>
  )
}

function NavLink({ href, label, isScrolled }: { href: string; label: string; isScrolled: boolean }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link href={href} className={cn('font-body text-sm tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-sm px-0.5', isActive ? 'text-brass border-b border-brass' : isScrolled ? 'text-soil hover:text-brass' : 'text-cream/90 hover:text-cream')}>
      {label}
    </Link>
  )
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()
  useEffect(() => { onClose() }, [pathname, onClose])
  useEffect(() => { if (isOpen) { document.body.style.overflow = 'hidden' } else { document.body.style.overflow = '' } return () => { document.body.style.overflow = '' } }, [isOpen])
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: 'rgba(44,31,20,0.97)' }} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <RiversLogo className="text-cream" />
            <button onClick={onClose} className="text-cream/70 hover:text-cream transition-colors duration-150 p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden><line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
            {PRIMARY_NAV.map((item, i) => (
              <motion.div key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.28 }}>
                <Link href={item.href} className="block font-display font-light text-4xl text-cream/90 hover:text-cream py-2 transition-colors duration-150">{item.label}</Link>
              </motion.div>
            ))}
          </nav>
          <div className="px-8 py-8 border-t border-white/10 flex items-center justify-between">
            <Link href="/weddings/inquire" className="btn-ghost-dark text-sm">Begin Inquiry</Link>
            <div className="flex items-center gap-4">
              <SignedIn><Link href="/members" className="font-body text-xs text-cream/70 hover:text-cream">Member Portal</Link></SignedIn>
              <SignedOut><Link href="/login" className="font-body text-xs text-cream/70 hover:text-cream">Member Login</Link></SignedOut>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])
  const hasDarkHero = ['/', '/weddings', '/events', '/membership', '/estate'].includes(pathname)
  const closeMobile = useCallback(() => setMobileOpen(false), [])
  return (
    <>
      <header className={cn('fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color] ease-out', isScrolled ? 'bg-cream border-b border-stone/50' : hasDarkHero ? 'bg-transparent border-b border-transparent' : 'bg-cream border-b border-stone/50')} style={{ transitionDuration: '250ms' }}>
        <div className="max-w-layout mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <RiversLogo className={cn('transition-colors', isScrolled || !hasDarkHero ? 'text-soil' : 'text-cream')} />
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
              {PRIMARY_NAV.map((item) => <NavLink key={item.href} href={item.href} label={item.label} isScrolled={isScrolled || !hasDarkHero} />)}
            </nav>
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/contact" className={cn('btn text-sm px-5 py-2 rounded border transition-colors duration-150', isScrolled || !hasDarkHero ? 'btn-ghost' : 'btn-ghost-dark')}>Book a Tour</Link>
              <SignedIn><UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-8 h-8' } }} /></SignedIn>
              <SignedOut><Link href="/login" className={cn('font-body text-sm transition-colors duration-150', isScrolled || !hasDarkHero ? 'text-bark hover:text-soil' : 'text-cream/70 hover:text-cream')}>Members</Link></SignedOut>
            </div>
            <button onClick={() => setMobileOpen(true)} className={cn('lg:hidden p-2 -mr-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded', isScrolled || !hasDarkHero ? 'text-soil' : 'text-cream')} aria-label="Open menu" aria-expanded={mobileOpen}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden><line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  )
}
