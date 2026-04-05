'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
export function MembershipSignal() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="bg-soil py-24 lg:py-32">
      <Container width="content" className="text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <p className="eyebrow text-cream/40 mb-6">Private Membership</p>
          <h2 className="font-display font-light text-cream text-balance mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>The property, season after season.</h2>
          <div className="max-w-prose mx-auto space-y-5 mb-12">
            <p className="font-body text-base text-cream/70 leading-relaxed">Membership at Rivers Lodge means priority access to the lodge, the guided hunt programs, and the fishing along the Marais des Cygnes — across deer, duck, and turkey seasons. It means knowing the land well enough to have a favorite stand.</p>
            <p className="font-body text-base text-cream/70 leading-relaxed">It also means a private concierge portal, invitations to member-only events throughout the year, and a staff that knows your preferences before you arrive.</p>
            <p className="font-body text-base text-cream/70 leading-relaxed">Membership is selective. Applications are reviewed personally.</p>
          </div>
          <Button href="/membership" variant="ghost-dark" size="lg">Explore Membership</Button>
        </motion.div>
      </Container>
    </section>
  )
}
