"use client"

import { useEffect, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
// import { WalkthroughStepper } from '@/components/walkthrough-stepper'
import { GetStartedFlow } from '@/components/get-started-section'

export default function HomePage() {
  const getStartedRef = useRef<HTMLDivElement>(null)

  const handleShowWalkthrough = () => {
    // This function is passed to components but not used in this component
  }

  useEffect(() => {
    // Auto-scroll to Get Started section after 2 seconds
    const timer = setTimeout(() => {
      if (getStartedRef.current) {
        getStartedRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

      return (
        <main className="min-h-screen">
          <Navigation onShowWalkthrough={handleShowWalkthrough} />
          <HeroSection onShowWalkthrough={handleShowWalkthrough} />
          <div ref={getStartedRef}>
            <GetStartedFlow />
          </div>
          {/* <WalkthroughStepper /> */}
        </main>
      )
}
