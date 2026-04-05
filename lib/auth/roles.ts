export type UserRole = 'member' | 'staff' | 'admin'
export function getRoleFromClaims(claims: Record<string, unknown> | null | undefined): UserRole {
  const metadata = claims?.['metadata'] as { role?: string } | undefined
  const raw = metadata?.role
  if (raw === 'staff' || raw === 'admin') return raw
  return 'member'
}
export function isStaff(role: UserRole): boolean { return role === 'staff' || role === 'admin' }
export function isAdmin(role: UserRole): boolean { return role === 'admin' }
export function assertStaff(role: UserRole): void {
  if (!isStaff(role)) throw new Response('Forbidden', { status: 403 })
}
