'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { cn, trackEvent } from '@/lib/utils'
const schema = z.object({ firstName: z.string().trim().min(1, 'Required.').max(60), lastName: z.string().trim().min(1, 'Required.').max(60), email: z.string().trim().email('Please enter a valid email address.'), phone: z.string().trim().max(30).optional(), referralSource: z.string().trim().max(200).optional(), statement: z.string().trim().max(400).optional() })
type Input = z.infer<typeof schema>
type State = 'idle' | 'submitting' | 'success' | 'error'
export default function MembershipApplyPage() {
  const [state, setState] = useState<State>('idle')
  const { register, handleSubmit, formState: { errors } } = useForm<Input>({ resolver: zodResolver(schema) })
  async function onSubmit(data: Input) {
    setState('submitting')
    try {
      const res = await fetch('/api/applications/membership', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error(); setState('success'); trackEvent('membership_apply_clicked')
    } catch { setState('error') }
  }
  return (
    <>
      <div className="bg-soil pt-32 pb-16"><Container
