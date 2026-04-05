'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { cn, trackEvent } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().trim().max(30).optional(),
  interest: z.enum(['wedding', 'corporate_retreat', 'private_event', 'membership', 'lodging', 'tour', 'other'], { errorMap: () => ({ message: 'Please select a reason for reaching out.' }) }),
  message: z.string().trim().min(10, 'Please share a bit more detail.').max(800),
})
type ContactInput = z.infer<typeof contactSchema>
const INTEREST_LABELS: Record<ContactInput['interest'], string> = { wedding: 'Weddings', corporate_retreat: 'Corporate Retreat', private_event: 'Private Event', membership: 'Membership', lodging: 'Lodging', tour: 'Book a Private Tour', other: 'General Inquiry' }
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { interest: 'tour' } })
  async function onSubmit(data: ContactInput) {
    setSubmitState('submitting')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      setSubmitState('success'); trackEvent('tour_requested')
    } catch { setSubmitState('error') }
  }
  if (submitState === 'success') {
    return (
      <div className="text-center py-10 px-6 bg-parchment rounded border border-stone/40">
        <p className="eyebrow text-river mb-4">Message sent</p>
        <h3 className="font-display font-light text-2xl text-soil mb-3">We'll be in touch shortly.</h3>
        <p className="font-body text-sm text-bark max-w-sm mx-auto leading-relaxed">Thank you for reaching out. A member of our team will respond personally, typically within one business day.</p>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="field-label">Name <span className="text-brass">*</span></label>
          <input id="name" type="text" autoComplete="name" inputMode="text" className={cn('field-input', errors.name && 'border-bark')} placeholder="Your name" {...register('name')} />
          {errors.name && <p className="field-error">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="field-label">Email <span className="text-brass">*</span></label>
          <input id="email" type="email" autoComplete="email" inputMode="email" className={cn('field-input', errors.email && 'border-bark')} placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="field-label">Phone <span className="text-stone">(optional)</span></label>
          <input id="phone" type="tel" autoComplete="tel" inputMode="tel" className="field-input" placeholder="(913) 555-0100" {...register('phone')} />
        </div>
        <div>
          <label htmlFor="interest" className="field-label">I'm reaching out about <span className="text-brass">*</span></label>
          <select id="interest" className={cn('field-select', errors.interest && 'border-bark')} {...register('interest')}>
            {Object.entries(INTEREST_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          {errors.interest && <p className="field-error">{errors.interest.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="field-label">Message <span className="text-brass">*</span></label>
        <textarea id="message" rows={5} maxLength={800} className={cn('field-textarea', errors.message && 'border-bark')} placeholder="Tell us what you're planning, or simply ask a question." {...register('message')} />
        {errors.message && <p className="field-error">{errors.message.message}</p>}
      </div>
      {submitState === 'error' && <p className="font-body text-sm text-bark bg-parchment px-4 py-3 rounded border border-stone/40">Something went wrong. Please try again or <a href="mailto:info@riverslodge.com" className="underline hover:no-underline">email us directly</a>.</p>}
      <Button type="submit" variant="primary" size="lg" disabled={submitState === 'submitting'} className="w-full sm:w-auto">{submitState === 'submitting' ? 'Sending…' : 'Send Message'}</Button>
    </form>
  )
}
