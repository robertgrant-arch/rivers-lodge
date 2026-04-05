'use client'
import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'ghost-dark' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'
interface BaseProps { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: React.ReactNode }
interface ButtonElementProps extends BaseProps { href?: undefined; type?: 'button' | 'submit' | 'reset'; disabled?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; 'aria-label'?: string; 'aria-expanded'?: boolean }
interface AnchorElementProps extends BaseProps { href: string; external?: boolean; 'aria-label'?: string }
type ButtonProps = ButtonElementProps | AnchorElementProps

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary', ghost: 'btn-ghost', 'ghost-dark': 'btn-ghost-dark', text: 'btn-text',
}
const sizeClasses: Record<ButtonSize, string> = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
function getClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  if (variant === 'text') return cn(variantClasses[variant], className)
  return cn(variantClasses[variant], sizeClasses[size], className)
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'md', className, children } = props
    const classes = getClasses(variant, size, className)
    if ('href' in props && props.href !== undefined) {
      const { href, external, 'aria-label': ariaLabel } = props
      return (
        <Link href={href} ref={ref as React.Ref<HTMLAnchorElement>} className={classes} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </Link>
      )
    }
    const { type = 'button', disabled, onClick, 'aria-label': ariaLabel, 'aria-expanded': ariaExpanded } = props as ButtonElementProps
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} type={type} disabled={disabled} onClick={onClick}
        className={cn(classes, disabled && 'opacity-50 pointer-events-none')} aria-label={ariaLabel} aria-expanded={ariaExpanded}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
