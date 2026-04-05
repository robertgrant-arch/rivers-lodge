'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventInquirySchema, type EventInquiryInput, EVENT_TYPE_LABELS, GUEST_COUNT_LABELS, CONTACT_PREF_LABELS } from '@/lib/validations/event-inquiry'
import { Button } from '@/components/ui/button'
import { cn, trackEvent } from '@/lib/utils'

interface EventInquiryFormProps { defaultEventType?: EventInquiryInput['eventType'] }
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function EventInquiryForm({ defaultEventType }: EventInquiryFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const { register, handleSubmit, formState: { errors } } = useForm<EventInquiryInput>({ resolver: zodResolver(eventInquirySchema), defaultValues: { eventType: defaultEventType ?? 'corporate_retreat', contactPreference: 'either' } })
  async function onSubmit(data: EventInquiryInput) {
    setSubmitState('submitting')
    try {
      const res = await fetch('/api/inquiries/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      setSubmitState('success'); trackEvent('event_inquiry_submitted')
    } catch { setSubmitState('error') }
  }
  if (submitState === 'success') {
    return (
      <div className="text-center py-12 px-6 bg-parchment rounded border border-stone/40">
        <p className="eyebrow text-river mb-4">Inquiry received</p>
        <h3 className="font-display font-light text-2xl text-soil mb-4">We'll be in touch within one business day.</h3>
        <p className="font-body text-sm text-bark leading-relaxed max-w-sm mx-auto">Thank you for reaching out. A member of our team will contact you personally with availability and next steps.</p>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contactName" className="field-label">Your Name <span className="text-brass">*</span></label>
          <input id="contactName" type="text" autoComplete="name" inputMode="text" className={cn('field-input', errors.contactName && 'border-bark')} placeholder="First and last name" {...register('contactName')} />
          {errors.contactName && <p className="field-error">{errors.contactName.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className="field-label">Company <span className="text-stone">(optional)</span></label>
          <input id="company" type="text" autoComplete="organization" className="field-input" placeholder="Organization name" {...register('company')} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="field-label">Email <span className="text-brass">*</span></label>
          <input id="email" type="email" autoComplete="email" inputMode="email" className={cn('field-input', errors.email && 'border-bark')} placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="field-label">Phone <span className="text-stone">(optional)</span></label>
          <input id="phone" type="tel" autoComplete="tel" inputMode="tel" className="field-input" placeholder="(913) 555-0100" {...register('phone')} />
        </div>
      </div>
      <div>
        <label htmlFor="eventType" className="field-label">Event Type <span className="text-brass">*</span></label>
        <select id="eventType" className={cn('field-select', errors.eventType && 'border-bark')} {...register('eventType')}>
          {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        {errors.eventType && <p className="field-error">{errors.eventType.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="preferredDate" className="field-label">Estimated Date <span className="text-stone">(optional)</span></label>
          <input id="preferredDate" type="date" className="field-input" {...register('preferredDate')} />
        </div>
        <div>
          <label htmlFor="guestCount" className="field-label">Estimated Guest Count <span className="text-brass">*</span></label>
          <select id="guestCount" className={cn('field-select', errors.guestCount && 'border-bark')} {...register('guestCount')}>
            <option value="">Select a range</option>
            {Object.entries(GUEST_COUNT_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          {errors.guestCount && <p className="field-error">{errors.guestCount.message}</p>}
        </div>
      </div>
      <fieldset>
        <legend className="field-label mb-2">Preferred contact method <span className="text-brass">*</span></legend>
        <div className="flex flex-wrap gap-4">
          {Object.entries(CONTACT_PREF_LABELS).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer font-body text-sm text-bark hover:text-soil transition-colors">
              <input type="radio" value={value} className="w-4 h-4 accent-brass" {...register('contactPreference')} />{label}
            </label>
          ))}
        </div>
        {errors.contactPreference && <p className="field-error mt-2">{errors.contactPreference.message}</p>}
      </fieldset>
      <div>
        <label htmlFor="message" className="field-label">Anything else we should know? <span className="text-stone">(optional)</span></label>
        <textarea id="message" rows={4} maxLength={600} className="field-textarea" placeholder="Tell us about your vision, any specific requirements, or questions you have." {...register('message')} />
        {errors.message && <p className="field-error">{errors.message.message}</p>}
      </div>
      {submitState === 'error' && <p className="font-body text-sm text-bark bg-parchment px-4 py-3 rounded border border-stone/40">Something went wrong. Please try again or <a href="mailto:info@riverslodge.com" className="underline hover:no-underline">contact us directly</a>.</p>}
      <Button type="submit" variant="primary" size="lg" disabled={submitState === 'submitting'} className="w-full sm:w-auto">{submitState === 'submitting' ? 'Sending…' : 'Send Inquiry'}</Button>
      <p className="font-body text-xs text-stone leading-relaxed">We respond to all event inquiries within one business day.</p>
    </form>
  )
}
