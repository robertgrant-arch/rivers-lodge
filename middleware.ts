import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isMembersRoute = createRouteMatcher(['/members(.*)', '/members'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isPublicRoute = createRouteMatcher(['/', '/estate(.*)', '/weddings(.*)', '/events(.*)', '/lodging(.*)', '/gallery(.*)', '/membership(.*)', '/contact(.*)', '/login(.*)', '/api/calendar(.*)', '/api/inquiries(.*)', '/api/leads(.*)', '/api/applications(.*)', '/api/contact(.*)', '/api/webhooks(.*)', '/studio(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role
  if (isAdminRoute(req)) {
    if (!userId) { const u = new URL('/login', req.url); u.searchParams.set('redirect_url', req.url); return NextResponse.redirect(u) }
    if (role !== 'staff' && role !== 'admin') return NextResponse.redirect(new URL('/members', req.url))
    return NextResponse.next()
  }
  if (isMembersRoute(req)) {
    if (!userId) { const u = new URL('/login', req.url); u.searchParams.set('redirect_url', req.url); return NextResponse.redirect(u) }
    return NextResponse.next()
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)','/(api|trpc)(.*)'],
}
