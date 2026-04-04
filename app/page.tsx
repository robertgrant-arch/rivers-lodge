import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-cream/90 backdrop-blur-sm border-b border-soil/10">
        <Link href="/" className="font-display text-2xl tracking-tight text-soil">
          Rivers Lodge
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/experience" className="eyebrow text-soil/70 hover:text-soil transition-colors">Experience</Link>
          <Link href="/hunting" className="eyebrow text-soil/70 hover:text-soil transition-colors">Hunting</Link>
          <Link href="/fishing" className="eyebrow text-soil/70 hover:text-soil transition-colors">Fishing</Link>
          <Link href="/weddings" className="eyebrow text-soil/70 hover:text-soil transition-colors">Weddings</Link>
          <Link href="/contact" className="btn-primary px-6 py-3 text-sm">Book Your Stay</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-soil">
        <div className="absolute inset-0 bg-gradient-to-b from-soil/60 via-soil/30 to-soil/80 z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="eyebrow text-brass mb-6">Est. Since Generations</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95] mb-8">
            Where the River
            <br />
            Meets the Wild
          </h1>
          <p className="font-body text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-12">
            A premier hunting and fishing lodge nestled in the heart of
            untouched wilderness. Experience nature as it was meant to be.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/experience" className="btn-primary px-8 py-4 text-sm">
              Explore the Lodge
            </Link>
            <Link href="/contact" className="btn-ghost-dark px-8 py-4 text-sm">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow text-brass mb-6">The Experience</p>
          <h2 className="font-display text-4xl md:text-5xl text-soil mb-8">
            More Than a Destination
          </h2>
          <p className="font-body text-lg text-soil/70 max-w-2xl mx-auto">
            Rivers Lodge is a place where tradition meets comfort. From
            world-class hunting grounds to pristine fishing waters, every moment
            here is crafted for those who appreciate the finer side of the
            outdoors.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 md:py-32 px-6 bg-soil">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Hunting",
                description:
                  "Guided hunts across thousands of acres of prime habitat. Whitetail, waterfowl, upland birds, and more.",
                href: "/hunting",
              },
              {
                title: "Fishing",
                description:
                  "Cast your line in pristine waters teeming with trophy bass, catfish, and crappie. Guided and solo options.",
                href: "/fishing",
              },
              {
                title: "Weddings & Events",
                description:
                  "Celebrate life's moments surrounded by natural beauty. Rustic elegance meets modern hospitality.",
                href: "/weddings",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="text-center">
                <h3 className="font-display text-3xl text-cream mb-4">
                  {pillar.title}
                </h3>
                <p className="font-body text-cream/60 mb-6">
                  {pillar.description}
                </p>
                <Link
                  href={pillar.href}
                  className="eyebrow text-brass hover:text-cream transition-colors"
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-brass mb-6">Your Adventure Awaits</p>
          <h2 className="font-display text-4xl md:text-5xl text-soil mb-8">
            Ready to Experience Rivers Lodge?
          </h2>
          <p className="font-body text-lg text-soil/70 mb-12">
            Whether you&apos;re planning a hunting trip, a fishing getaway, or a
            once-in-a-lifetime celebration, we&apos;re here to make it
            unforgettable.
          </p>
          <Link href="/contact" className="btn-primary px-10 py-4 text-sm">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-soil py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h4 className="font-display text-2xl text-cream mb-4">Rivers Lodge</h4>
              <p className="font-body text-cream/50 text-sm">
                A premier hunting and fishing destination.
              </p>
            </div>
            <div>
              <h5 className="eyebrow text-brass mb-4">Experience</h5>
              <ul className="space-y-2">
                <li><Link href="/hunting" className="text-cream/50 hover:text-cream text-sm transition-colors">Hunting</Link></li>
                <li><Link href="/fishing" className="text-cream/50 hover:text-cream text-sm transition-colors">Fishing</Link></li>
                <li><Link href="/lodging" className="text-cream/50 hover:text-cream text-sm transition-colors">Lodging</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="eyebrow text-brass mb-4">Events</h5>
              <ul className="space-y-2">
                <li><Link href="/weddings" className="text-cream/50 hover:text-cream text-sm transition-colors">Weddings</Link></li>
                <li><Link href="/corporate" className="text-cream/50 hover:text-cream text-sm transition-colors">Corporate</Link></li>
                <li><Link href="/private" className="text-cream/50 hover:text-cream text-sm transition-colors">Private Events</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="eyebrow text-brass mb-4">Connect</h5>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-cream/50 hover:text-cream text-sm transition-colors">Contact</Link></li>
                <li><Link href="/about" className="text-cream/50 hover:text-cream text-sm transition-colors">About</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-cream/10 text-center">
            <p className="text-cream/30 text-sm">&copy; {new Date().getFullYear()} Rivers Lodge & Hunt Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}