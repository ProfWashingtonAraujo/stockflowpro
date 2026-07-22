import { Header } from '../components/landing/Header'
import { Hero } from '../components/landing/Hero'
import { Benefits } from '../components/landing/Benefits'
import { Features } from '../components/landing/Features'
import { DemoSection } from '../components/landing/DemoSection'
import { PricingCards } from '../components/landing/PricingCards'
import { AboutSection } from '../components/landing/AboutSection'
import { Testimonials } from '../components/landing/Testimonials'
import { ContactForm } from '../components/landing/ContactForm'
import { MapSection } from '../components/landing/MapSection'
import { Footer } from '../components/landing/Footer'

export function AccessLevels() {
  return (
    <div className="bg-[#f4f9fb] text-slate-900">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(14,116,144,0.16),transparent_55%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_45%),linear-gradient(180deg,#effbff_0%,#f4f9fb_70%)]" />
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <DemoSection />
      <PricingCards />
      <AboutSection />
      <Testimonials />
      <ContactForm />
      <MapSection />
      <Footer />
    </div>
  )
}
