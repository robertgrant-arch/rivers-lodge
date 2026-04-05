'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { MessageThreadRow, MessageRow } from '@/lib/supabase/types'
interface ThreadWithPreview extends MessageThreadRow { lastMessage: Pick<MessageRow, 'body' | 'sent_at' | 'sender_type'> | null; unreadCount: number }
interface ThreadListProps { threads: ThreadWithPreview[]; onNewThread: () => void }
export function ThreadList({ threads, onNewThread }: ThreadListProps) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
        <h2 className="font-display font-light text-xl" style={{ color: 'var(--portal-text)' }}>Messages</h2>
        <button type="button" onClick={onNewThread} className="px-3 py-1.5 rounded font-body text-xs hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]" style={{ background: 'var(--portal-accent)', color: 'var(--color-soil)' }} aria-label="New message">+ New</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="font-body text-sm mb-3" style={{ color: 'var(--portal-text-muted)' }}>No messages yet. Start a conversation with our team.</p>
            <button type="button" onClick={onNewThread} className="font-body text-sm underline underline-offset-2 hover:no-underline" style={{ color: 'var(--portal-accent)' }}>New Message</button>
          </div>
        ) : (
          threads.map((thread) => {
            const isActive = pathname === `/members/messages/${thread.id}`
            const hasUnread = thread.unreadCount > 0
            return (
              <Link key={thread.id} href={`/members/messages/${thread.id}`}
                className={cn('block px-4 py-4 border-b border-white/[0.06] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]', isActive ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]')}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={cn('font-body text-sm leading-snug line-clamp-1', hasUnread && 'font-medium')} style={{ color: hasUnread ? 'var(--portal-text)' : 'var(--portal-text-muted)' }}>{thread.subject}</p>
                  {hasUnread && <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: 'var(--portal-accent)' }} aria-label={`${thread.unreadCount} unread`} />}
                </div>
                {thread.lastMessage && <p className="font-body text-xs line-clamp-1 leading-relaxed" style={{ color: 'var(--portal-text-muted)' }}>{thread.lastMessage.sender_type === 'staff' ? 'Staff: ' : 'You: '}{thread.lastMessage.body}</p>}
                <p className="font-mono text-[9px] tracking-wide mt-1.5 uppercase" style={{ color: 'var(--portal-text-muted)' }}>{thread.lastMessage ? formatDate(thread.lastMessage.sent_at, 'short') : formatDate(thread.created_at, 'short')}</p>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
