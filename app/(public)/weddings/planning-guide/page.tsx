'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { cn, trackEvent } from '@/lib/utils'
const schema = z.object({ email: z.string().trim().email('Please enter a valid email address.') })
type Input = z.infer<typeof schema>
type State = 'idle' | 'submitting' | 'success' | 'error'
const GUIDE_CONTENTS = ['Venue space descriptions and capacities', 'Package overviews and inclusions', 'Vendor coordination and preferred partner list', 'Lodging layout and accommodation details', 'Day-of timeline guidance', 'How to begin the inquiry and booking process']
export default function PlanningGuidePage() {
  const [state, setState] = useState<State>('idle')
  const { register, handleSubmit, formState: { errors } } = useForm<Input>({ resolver: zodResolver(schema) })
  async function onSubmit(data: Input) {
    setState('submitting')
    try {
      const res = await fetch('/api/leads/planning-guide', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error(); setState('success'); trackEvent('planning_guide_download')
    } catch { setState('error') }
  }
  return (
    <>
      <div className="bg-soil pt-32 pb-0">
        <Container width="layout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end pb-0">
            <div><p className="eyebrow text-cream/40 mb-4">Planning Guide</p><h1 className="font-display font-light text-cream text-balance" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>Everything you need to start planning.</h1></div>
            <div className="pb-12"><p className="font-body text-cream/65 text-base leading-relaxed">The Rivers Lodge Wedding Planning Guide covers the full picture. Enter your email and we'll send it directly to you.</p></div>
          </div>
        </Container>
      </div>
      <Section background="cream">
        <Container width="layout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow mb-6">What's inside</p>
              <ul className="space-y-4">{GUIDE_CONTENTS.map((item) => (<li key={item} className="flex items-start gap-4"><span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 flex-shrink-0" aria-hidden /><span className="font-body text-base text-bark leading-relaxed">{item}</span></li>))}</ul>
            </div>
            <div>
              {state === 'success' ? (
                <div className="py-10 px-6 bg-parchment rounded border border-stone/40 text-center">
                  <p className="eyebrow text-river mb-4">On its way</p>
                  <h3 className="font-display font-light text-2xl text-soil mb-3">Check your inbox.</h3>
                  <p className="font-body text-sm text-bark leading-relaxed max-w-sm mx-auto">Your planning guide is on its way. The download link is valid for 72 hours.</p>
                  <div className="mt-6"><Button href="/weddings/inquire" variant="primary">Begin Your Inquiry</Button></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <p className="eyebrow mb-4">Get the guide</p>
                  <div>
                    <label htmlFor="email" className="field-label">Email address <span className="text-brass">*</span></label>
                    <input id="email" type="email" autoComplete="email" inputMode="email" className={cn('field-input', errors.email && 'border-bark')} placeholder="you@example.com" {...register('email')} />
                    {errors.email && <p className="field-error">{errors.email.message}</p>}
                  </div>
                  {state === 'error' && <p className="font-body text-sm text-bark bg-parchment px-4 py-3 rounded border border-stone/40">Something went wrong. Please try again or <a href="mailto:info@riverslodge.com" className="underline hover:no-underline">contact us directly</a>.</p>}
                  <Button type="submit" variant="primary" size="lg" disabled={state === 'submitting'} className="w-full">{state === 'submitting' ? 'Sending…' : 'Send Me the Guide'}</Button>
                  <p className="font-body text-xs text-stone">We will not send marketing email. The guide is a single PDF, delivered once.</p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
