import Image from 'next/image'
import { cn } from '@/lib/utils'
type AvatarSize = 'sm' | 'md' | 'lg'
interface AvatarProps { name: string; src?: string | null; size?: AvatarSize; className?: string; portal?: boolean }
const sizeClasses: Record<AvatarSize, string> = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' }
const sizePx: Record<AvatarSize, number> = { sm: 28, md: 36, lg: 48 }
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return `${parts[0]?.[0] ?? ''}${parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''}`.toUpperCase()
}
export function Avatar({ name, src, size = 'md', className, portal = false }: AvatarProps) {
  const px = sizePx[size]
  return (
    <span className={cn('relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0', portal ? 'bg-white/10 text-cream/80' : 'bg-stone/40 text-bark', 'font-body font-medium', sizeClasses[size], className)}
      aria-label={name} role="img">
      {src ? <Image src={src} alt={name} width={px} height={px} className="object-cover w-full h-full" sizes={`${px}px`} /> : <span aria-hidden>{getInitials(name)}</span>}
    </span>
  )
}
