'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  home: ({ className }) => (<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M2 7.5L9 2L16 7.5V16H11.5V11H6.5V16H2V7.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/></svg>),
  calendar: ({ className }) => (<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><rect x="2" y="3.5" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.25"/><path d="M6 2V5M12 2V5M2 7.5H16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>),
  users: ({ className }) => (<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.25"/><path d="M1 16C1 13 3.5 10.5 7 10.5C10.5 10.5 13 13 13 16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/><path d="M12 8C13.5 8 15 9 15 10.5M17 16C17 14 15.5 11.5 13 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>),
  leaf: ({ className }) => (<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M9 16C9 16 3 13 3 7C3 4 6 2 9 2C12 2 15 4 15 7C15 10 12 12.5 9 16Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/><path d="M9 9V16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>),
  message: ({ className }) => (<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M2 3.5C2 2.67 2.67 2 3.5 2H14.5C15.33 2 16 2.67 16 3.5V11.5C16 12.33 15.33 13 14.5 13H5.5L2 16V3.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/></svg>),
  file: ({ className }) => (<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M10 2H4C3.45 2 3 2.45 3 3V15C3 15.55 3.45 16 4 16H14C14.55 16 15 15.55 15 15V7L10 2Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/><path d="M10 2V7H15" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/><path d="M6 10H12M6 13H10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>),
  user: ({ className }) => (<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.25"/><path d="M2 17C2 13.5 5 11 9 11C13 11 16 13.5 16 17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>),
}

interface NavItem { label: string; href: string; icon: keyof typeof ICONS; badgeCount?: number }
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/members', icon: 'home' }, { label: 'Book', href: '/members/book', icon: 'calendar' },
  { label: 'Events', href: '/members/events', icon: 'users' }, { label: 'Seasons', href: '/members/seasons', icon: 'leaf' },
  { label: 'Messages', href: '/members/messages', icon: 'message' }, { label: 'Documents', href: '/members/documents', icon: 'file' },
  { label: 'Profile', href: '/members/profile', icon: 'user' },
]

export function MembersNav({ unreadMessages = 0 }: { unreadMessages?: number }) {
  const pathname = usePathname()
  const { user } = useUser()
  const items = NAV_ITEMS.map((item) => ({ ...item, badgeCount: item.icon === 'message' ? unreadMessages : 0 }))
  const mobileItems = items.slice(0, 5)
  function isActive(href: string) { if (href === '/members') return pathname === '/members'; return pathname.startsWith(href) }
  return (
    <>
      <nav className="hidden lg:flex flex-col w-60 fixed left-0 top-0 bottom-0 z-30 border-r border-white/10" aria-label="Member navigation" style={{ backgroundColor: 'var(--portal-bg)' }}>
        <div className="px-5 py-6 border-b border-white/10">
          <Link href="/members" className="font-display font-light text-lg tracking-[0.06em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus] rounded" style={{ color: 'var(--portal-text)' }}>Rivers Lodge</Link>
          <p className="font-mono text-[9px] tracking-widest uppercase mt-0.5" style={{ color: 'var(--portal-text-muted)' }}>Member Portal</p>
        </div>
        <div className="flex-1 py-4 overflow-y-auto">
          {items.map((item) => {
            const Icon = ICONS[item.icon]!
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
                className={cn('flex items-center gap-3 px-4 py-3 text-sm font-body transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus] border-l-2', active ? 'border-[--portal-accent] bg-white/[0.08]' : 'border-transparent hover:bg-white/[0.05]')}
                style={{ color: active ? 'var(--portal-text)' : 'var(--portal-text-muted)' }}>
                <Icon className="flex-shrink-0" />
                <span>{item.label}</span>
                {(item.badgeCount ?? 0) > 0 && <Badge count={item.badgeCount!} variant="brass" className="ml-auto" />}
              </Link>
            )
          })}
        </div>
        <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
          {user && <div className="min-w-0"><p className="font-body text-xs truncate" style={{ color: 'var(--portal-text)' }}>{user.firstName} {user.lastName}</p><p className="font-mono text-[9px] tracking-wide uppercase truncate" style={{ color: 'var(--portal-text-muted)' }}>Member</p></div>}
        </div>
      </nav>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 flex" aria-label="Member navigation" style={{ backgroundColor: 'var(--portal-bg)' }}>
        {mobileItems.map((item) => {
          const Icon = ICONS[item.icon]!
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
              className="flex flex-col items-center gap-1 px-3 py-2 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus] rounded"
              style={{ color: active ? 'var(--portal-accent)' : 'var(--portal-text-muted)' }}>
              <div className="relative"><Icon />{(item.badgeCount ?? 0) > 0 && <Badge count={item.badgeCount!} variant="brass" className="absolute -top-1.5 -right-2" />}</div>
              <span className="font-mono text-[9px] tracking-wide uppercase">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
