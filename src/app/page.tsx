import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { WalkthroughStepper } from '@/components/walkthrough-stepper'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WalkthroughStepper />
    </main>
  )
}
