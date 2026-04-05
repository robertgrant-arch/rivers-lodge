'use client'
import { Component, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
interface ErrorBoundaryProps { children: ReactNode; fallback?: ReactNode; inline?: boolean; portal?: boolean; className?: string }
interface ErrorBoundaryState { hasError: boolean }
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true } }
  override componentDidCatch(error: Error) { if (process.env.NODE_ENV === 'production') console.error('[ErrorBoundary]', error) }
  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return <AsyncError inline={this.props.inline} portal={this.props.portal} className={this.props.className} />
    }
    return this.props.children
  }
}
interface AsyncErrorProps { inline?: boolean; portal?: boolean; className?: string; message?: string; mailto?: string }
export function AsyncError({ inline = false, portal = false, className, message = "We couldn't load this section right now.", mailto = 'info@riverslodge.com' }: AsyncErrorProps) {
  if (inline) {
    return (
      <p className={cn('font-body text-sm', portal ? 'text-white/50' : 'text-bark', className)}>
        {message}{' '}
        <a href={`mailto:${mailto}`} className={cn('underline underline-offset-2 hover:no-underline', portal ? 'text-brass-light' : 'text-bark hover:text-soil')}>Contact us directly.</a>
      </p>
    )
  }
  return (
    <div className={cn('flex flex-col items-center justify-center text-center px-6 py-16 rounded', portal ? 'bg-white/5 border border-white/10 text-cream/60' : 'bg-parchment border border-stone/40 text-bark', className)} role="alert">
      <p className="font-body text-base mb-3">{message}</p>
      <a href={`mailto:${mailto}`} className={cn('font-body text-sm underline underline-offset-2 hover:no-underline transition-colors', portal ? 'text-brass-light hover:text-cream' : 'text-bark hover:text-soil')}>
        Please refresh or contact us directly.
      </a>
    </div>
  )
}
