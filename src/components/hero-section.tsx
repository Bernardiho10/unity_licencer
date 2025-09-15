"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Users, Globe, TrendingUp, Play, BookOpen, Shield } from 'lucide-react'
import { WebGLBackground } from './webgl-background'
import { WalkthroughModal } from './walkthrough-modal'

interface HeroSectionProps {
  onShowWalkthrough?: () => void
}

export function HeroSection({ onShowWalkthrough }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [showWalkthrough, setShowWalkthrough] = useState(false)
  const [walkthroughCompleted, setWalkthroughCompleted] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    )
  }, [])

  const stats = [
    { icon: Users, label: "Active Users", value: "34M+", color: "text-blue-400" },
    { icon: Globe, label: "Countries", value: "180+", color: "text-purple-400" },
    { icon: TrendingUp, label: "Monthly Rewards", value: "$2.5M+", color: "text-green-400" },
  ]

  const handleGenerateLicense = () => {
    if (!walkthroughCompleted) {
      setShowWalkthrough(true)
    } else {
      // Navigate to dashboard or generate license
      window.location.href = '/dashboard'
    }
  }

  const handleShowWalkthrough = () => {
    setShowWalkthrough(true)
    if (onShowWalkthrough) {
      onShowWalkthrough()
    }
  }

  const handleWalkthroughComplete = () => {
    setWalkthroughCompleted(true)
    setShowWalkthrough(false)
    // Navigate to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* WebGL Background */}
        <WebGLBackground />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/80" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              DePIN Revolution
            </Badge>
            
            {/* Main Title */}
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="web3-text-gradient">
                Turn Your Minutes into
              </span>
              <br />
              <span className="text-white">
                MNT Magic
              </span>
            </h1>
            
            {/* Subtitle */}
            <p ref={subtitleRef} className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Farm MNT rewards effortlessly with Unity Nodes. Turn every call into crypto gains 
              while supporting decentralized telecom infrastructure.
            </p>
            
            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                onClick={handleGenerateLicense}
                className="web3-button-primary text-lg px-8 py-4 group animate-cyber-pulse"
              >
                {walkthroughCompleted ? 'Generate License' : 'Start Setup'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                onClick={handleShowWalkthrough}
                className="web3-button-secondary text-lg px-8 py-4 group"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Tutorial
              </Button>
            </div>

            
            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="web3-card-holographic p-6 text-center web3-hover-lift animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} animate-pulse`} />
                  <div className="text-3xl font-bold text-white mb-1 web3-text-glow">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Walkthrough Modal */}
      <WalkthroughModal
        isOpen={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
        onComplete={handleWalkthroughComplete}
      />
    </>
  )
}
