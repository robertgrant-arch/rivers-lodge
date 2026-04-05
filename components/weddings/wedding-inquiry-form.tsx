'use client'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { weddingInquirySchema, type WeddingInquiryInput, GUEST_COUNT_LABELS, REFERRAL_LABELS } from '@/lib/validations/wedding-inquiry'
import { Button } from '@/components/ui/button'
import { cn, formatDate, trackEvent } from '@/lib/utils'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

function DateSelector({ value, onChange, error }: { value: string[]; onChange: (dates: string[]) => void; error?: string }) {
  function addDate(raw: string) { if (!raw || value.includes(raw) || value.length >= 3) return; onChange([...value, raw]) }
  function removeDate(d: string) { onChange(value.filter((x) => x !== d)) }
  const minDate = new Date(); minDate.setDate(minDate.getDate() + 90)
  const minIso = minDate.toISOString().split('T')[0]!
  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap mb-3">
        {value.map((d) => (
          <span key={d} className="inline-flex items-center gap-2 bg-parchment border border-stone rounded px-3 py-1.5 font-mono text-xs text-bark">
            {formatDate(d, 'long')}
            <button type="button" onClick={() => removeDate(d)} className="text-stone hover:text-bark transition-colors" aria-label={`Remove ${formatDate(d, 'long')}`}>×</button>
          </span>
        ))}
        {value.length === 0 && <span className="font-body text-sm text-stone">No dates selected yet.</span>}
      </div>
      {value.length < 3 && (
        <div>
          <label htmlFor="date-add" className="field-label">{value.length === 0 ? 'Select your preferred date' : 'Add another date'} <span className="text-stone font-normal">(up to 3)</span></label>
          <input id="date-add" type="date" min={minIso} className="field-input max-w-xs" onChange={(e) => { addDate(e.target.value); e.target.value = '' }} />
        </div>
      )}
      {error && <p className="field-error mt-2">{error}</p>}
    </div>
  )
}

export function WeddingInquiryForm() {
  const searchParams = useSearchParams()
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<WeddingInquiryInput>({ resolver: zodResolver(weddingInquirySchema), defaultValues: { preferredDates: [] } })
  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) setValue('preferredDates', [dateParam])
  }, [searchParams, setValue])
  async function onSubmit(data: WeddingInquiryInput) {
    setSubmitState('submitting')
    try {
      const res = await fetch('/api/inquiries/wedding', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      setSubmitState('success'); trackEvent('wedding_inquiry_submitted')
    } catch { setSubmitState('error') }
  }
  if (submitState === 'success') {
    return (
      <div className="py-12 px-6 bg-parchment rounded border border-stone/40 text-center">
        <p className="eyebrow text-river mb-4">Inquiry received</p>
        <h3 className="font-display font-light text-2xl text-soil mb-4 text-balance">We will be in touch within 24 hours.</h3>
        <p className="font-body text-sm text-bark leading-relaxed max-w-sm mx-auto">Thank you for reaching out. A member of our team will contact you personally to discuss your preferred dates and vision for the day.</p>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <div>
        <p className="eyebrow mb-4">The couple</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="partner1Name" className="field-label">Partner 1 — Full Name <span className="text-brass">*</span></label>
            <input id="partner1Name" type="text" autoComplete="name" inputMode="text" className={cn('field-input', errors.partner1Name && 'border-bark')} placeholder="First and last name" {...register('partner1Name')} />
            {errors.partner1Name && <p className="field-error">{errors.partner1Name.message}</p>}
          </div>
          <div>
            <label htmlFor="partner2Name" className="field-label">Partner 2 — Full Name <span className="text-brass">*</span></label>
            <input id="partner2Name" type="text" autoComplete="name" inputMode="text" className={cn('field-input', errors.partner2Name && 'border-bark')} placeholder="First and last name" {...register('partner2Name')} />
            {errors.partner2Name && <p className="field-error">{errors.partner2Name.message}</p>}
          </div>
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4">How to reach you</p>
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
      </div>
      <div>
        <p className="eyebrow mb-4">Preferred date(s) <span className="text-brass normal-case font-sans text-xs tracking-normal">*</span></p>
        <Controller name="preferredDates" control={control} render={({ field }) => <DateSelector value={field.value} onChange={field.onChange} error={errors.preferredDates?.message} />} />
      </div>
      <div>
        <label htmlFor="guestCountEstimate" className="field-label">Estimated guest count <span className="text-brass">*</span></label>
        <select id="guestCountEstimate" className={cn('field-select max-w-xs', errors.guestCountEstimate && 'border-bark')} {...register('guestCountEstimate')}>
          <option value="">Select a range</option>
          {Object.entries(GUEST_COUNT_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        {errors.guestCountEstimate && <p className="field-error">{errors.guestCountEstimate.message}</p>}
      </div>
      <div>
        <label htmlFor="referralSource" className="field-label">How did you hear about Rivers Lodge? <span className="text-stone">(optional)</span></label>
        <select id="referralSource" className="field-select max-w-xs" {...register('referralSource')}>
          <option value="">Select one</option>
          {Object.entries(REFERRAL_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="whatMattersMost" className="field-label">What matters most to you? <span className="text-stone">(optional)</span></label>
        <textarea id="whatMattersMost" rows={4} maxLength={500} className="field-textarea" placeholder="Tell us what you're imagining — the ceremony setting, the feeling, anything that matters. We read every word." {...register('whatMattersMost')} />
        {errors.whatMattersMost && <p className="field-error">{errors.whatMattersMost.message}</p>}
      </div>
      {submitState === 'error' && <p className="font-body text-sm text-bark bg-parchment px-4 py-3 rounded border border-stone/40">Something went wrong. Please try again or <a href="mailto:info@riverslodge.com" className="underline hover:no-underline">contact us directly</a>.</p>}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={submitState === 'submitting'}>{submitState === 'submitting' ? 'Sending…' : 'Begin Your Inquiry'}</Button>
        <p className="font-body text-xs text-stone leading-relaxed">We respond to all wedding inquiries within 24 hours.</p>
      </div>
    </form>
  )
}
