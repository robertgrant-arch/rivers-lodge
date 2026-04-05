'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/server'
import { Avatar } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { MessageRow, MessageThreadRow } from '@/lib/supabase/types'

interface ThreadViewProps { thread: MessageThreadRow; initialMessages: MessageRow[]; memberName: string }
export function ThreadView({ thread, initialMessages, memberName }: ThreadViewProps) {
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { void fetch('/api/messages/read', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ threadId: thread.id }) }) }, [thread.id])
  useEffect(() => {
    const supabase = createBrowserClient()
    const channel = supabase.channel(`thread:${thread.id}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${thread.id}` }, (payload) => {
      const newMsg = payload.new as MessageRow
      setMessages((prev) => { if (prev.some((m) => m.id === newMsg.id)) return prev; return [...prev, newMsg] })
    }).subscribe()
    return () => { void supabase.removeChannel(channel) }
  }, [thread.id])
  const send = useCallback(async () => {
    const trimmed = body.trim(); if (!trimmed || sending) return
    setSending(true); setError(null)
    const optimistic: MessageRow = { id: `optimistic-${Date.now()}`, thread_id: thread.id, sender_type: 'member', sender_name: memberName, body: trimmed, sent_at: new Date().toISOString(), read_at: null }
    setMessages((prev) => [...prev, optimistic]); setBody('')
    try {
      const res = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ threadId: thread.id, body: trimmed }) })
      if (!res.ok) throw new Error()
      router.refresh()
    } catch { setError('Message failed to send. Please try again.'); setMessages((prev) => prev.filter((m) => m.id !== optimistic.id)); setBody(trimmed) } finally { setSending(false) }
  }, [body, sending, thread.id, memberName, router])
  function onKeyDown(e: React.KeyboardEvent) { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); void send() } }
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-white/10 flex-shrink-0">
        <h2 className="font-body text-sm font-medium" style={{ color: 'var(--portal-text)' }}>{thread.subject}</h2>
        <p className="font-mono text-[10px] tracking-wide mt-0.5 uppercase" style={{ color: 'var(--portal-text-muted)' }}>{formatDate(thread.created_at, 'long')}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.length === 0 && <p className="font-body text-sm text-center py-8" style={{ color: 'var(--portal-text-muted)' }}>No messages yet.</p>}
        {messages.map((msg) => {
          const isMember = msg.sender_type === 'member'
          return (
            <div key={msg.id} className={cn('flex gap-3', isMember ? 'flex-row-reverse' : 'flex-row')}>
              <Avatar name={msg.sender_name} size="sm" portal={!isMember} className="flex-shrink-0 mt-0.5" />
              <div className={cn('max-w-[75%] space-y-1', isMember ? 'items-end' : 'items-start', 'flex flex-col')}>
                <div className={cn('px-4 py-3 rounded font-body text-sm leading-relaxed', isMember ? 'rounded-tr-none' : 'rounded-tl-none')} style={isMember ? { background: 'var(--color-cream)', color: 'var(--color-soil)' } : { background: 'var(--portal-surface)', border: '1px solid var(--portal-border)', color: 'var(--portal-text)' }}>{msg.body}</div>
                <div className="flex items-center gap-2 px-1">
                  <span className="font-mono text-[9px] tracking-wide" style={{ color: 'var(--portal-text-muted)' }}>{msg.sender_name}</span>
                  <span className="font-mono text-[9px]" style={{ color: 'var(--portal-text-muted)' }}>·</span>
                  <span className="font-mono text-[9px]" style={{ color: 'var(--portal-text-muted)' }}>{new Date(msg.sent_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>
      <div className="flex-shrink-0 px-5 py-4 border-t border-white/10">
        {error && <p className="font-body text-xs mb-2" style={{ color: 'var(--portal-accent)' }}>{error}</p>}
        <div className="flex gap-3 items-end">
          <textarea value={body} onChange={(e) => setBody(e.target.value)} onKeyDown={onKeyDown} rows={2} placeholder="Write a message…" className="flex-1 resize-none rounded px-3 py-2.5 font-body text-sm leading-relaxed focus:outline-none" style={{ background: 'var(--portal-surface)', border: '1px solid var(--portal-border)', color: 'var(--portal-text)' }} aria-label="Message body" />
          <button type="button" onClick={send} disabled={!body.trim() || sending} className={cn('flex-shrink-0 px-4 py-2.5 rounded font-body text-sm transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--portal-focus]', (!body.trim() || sending) ? 'opacity-40 pointer-events-none' : 'hover:opacity-80')} style={{ background: 'var(--portal-accent)', color: 'var(--color-soil)' }}>{sending ? '…' : 'Send'}</button>
        </div>
        <p className="font-mono text-[9px] mt-1.5 tracking-wide" style={{ color: 'var(--portal-text-muted)' }}>Cmd+Enter to send</p>
      </div>
    </div>
  )
}
