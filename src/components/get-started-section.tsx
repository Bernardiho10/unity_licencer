"use client"

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  Key, 
  Copy, 
  Phone, 
  ArrowRight, 
  CheckCircle, 
  QrCode, 
  ExternalLink, 
  Zap,
  Shield,
  Globe,
  Users,
  Star,
  Sparkles,
  Rocket,
  Crown,
  Gem,
  Flame,
  CloudLightning,
  Target,
  Award,
  Layers,
  Cpu,
  Network,
  Database
} from 'lucide-react'
import { GetStartedWebGLBackground } from './get-started-webgl-background'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StepCard {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  details: string
  actionLabel: string
  color: string
  gradient: string
  status: 'completed' | 'current' | 'upcoming'
}

const stepCards: StepCard[] = [
  {
    id: 1,
    title: "Download Unity App",
    description: "Get the mobile app from your app store",
    icon: Download,
    details: "Download the Unity App from your device's App Store or Google Play.",
    actionLabel: "Download Now",
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-500/20 to-cyan-500/20",
    status: 'completed'
  },
  {
    id: 2,
    title: "Generate Your License",
    description: "Create your unique node license key",
    icon: Key,
    details: "Generate a unique license key on this website. Each license is pre-staked with MNT tokens.",
    actionLabel: "Generate License",
    color: "from-purple-500 to-pink-500",
    gradient: "from-purple-500/20 to-pink-500/20",
    status: 'current'
  },
  {
    id: 3,
    title: "Activate Your Node",
    description: "Copy and paste your license key into the app",
    icon: Copy,
    details: "Copy your License Key and paste it in the Unity App settings to activate your node.",
    actionLabel: "Copy License",
    color: "from-cyan-500 to-blue-500",
    gradient: "from-cyan-500/20 to-blue-500/20",
    status: 'upcoming'
  },
  {
    id: 4,
    title: "Start Earning Rewards",
    description: "Make your minutes count and earn MNT",
    icon: Phone,
    details: "Use your phone normally and earn MNT rewards from your call minutes automatically.",
    actionLabel: "Go to Dashboard",
    color: "from-green-500 to-emerald-500",
    gradient: "from-green-500/20 to-emerald-500/20",
    status: 'upcoming'
  },
  {
    id: 5,
    title: "Monitor Performance",
    description: "Track your earnings and network performance",
    icon: Target,
    details: "Track your earnings and network performance through the dashboard.",
    actionLabel: "View Analytics",
    color: "from-yellow-500 to-amber-500",
    gradient: "from-yellow-500/20 to-amber-500/20",
    status: 'upcoming'
  }
]

// Animated Step Card Component
function AnimatedStepCard({ 
  card, 
  index, 
  isActive, 
  onCardClick 
}: { 
  card: StepCard, 
  index: number, 
  isActive: boolean,
  onCardClick: (cardId: number) => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const IconComponent = card.icon

  useEffect(() => {
    if (cardRef.current) {
      // Initial animation
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationY: -15
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationY: 0,
          duration: 0.8, 
          delay: index * 0.2,
          ease: "back.out(1.7)"
        }
      )

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
          y: -10,
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      cardRef.current.addEventListener('mouseenter', handleMouseEnter)
      cardRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        cardRef.current?.removeEventListener('mouseenter', handleMouseEnter)
        cardRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [index])

  const getStatusIcon = () => {
    switch (card.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />
      case 'current':
        return <div className="w-6 h-6 rounded-full bg-blue-400 animate-pulse"></div>
      case 'upcoming':
        return <div className="w-6 h-6 rounded-full border-2 border-slate-400"></div>
    }
  }

  const getStatusBadge = () => {
    switch (card.status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
      case 'current':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse">Current</Badge>
      case 'upcoming':
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Upcoming</Badge>
    }
  }

  return (
    <Card 
      ref={cardRef}
      className={`web3-card-holographic cursor-pointer transform-gpu perspective-1000 ${
        isActive ? 'ring-2 ring-blue-400/50' : ''
      }`}
      onClick={() => onCardClick(card.id)}
    >
      <CardHeader className="text-center relative">
        <div className="absolute top-4 right-4">
          {getStatusIcon()}
        </div>
        
        <div className={`mx-auto mb-4 p-4 rounded-full bg-gradient-to-r ${card.gradient} animate-float`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge className={`bg-gradient-to-r ${card.gradient} border-0 text-white`}>
            Step {card.id}
          </Badge>
          {getStatusBadge()}
        </div>
        
        <CardTitle className="text-white text-xl mb-2">
          {card.title}
        </CardTitle>
        
        <CardDescription className="text-slate-400 text-base">
          {card.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center">
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          {card.details}
        </p>
        
        <Button 
          className={`web3-button-primary w-full bg-gradient-to-r ${card.color}`}
          disabled={card.status === 'upcoming'}
        >
          {card.actionLabel}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Huge Reveal Button Component
function HugeRevealButton({ onReveal }: { onReveal: () => void }) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (buttonRef.current) {
      // Initial animation
      gsap.fromTo(buttonRef.current,
        { 
          opacity: 0, 
          scale: 0.5,
          y: 50
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 1.2,
          delay: 2,
          ease: "elastic.out(1, 0.3)"
        }
      )

      // Continuous floating animation
      gsap.to(buttonRef.current, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })
    }
  }, [])

  useEffect(() => {
    if (buttonRef.current) {
      if (isHovered) {
        gsap.to(buttonRef.current, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }
  }, [isHovered])

  return (
    <div className="flex justify-center items-center py-20">
      <div
        ref={buttonRef}
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onReveal}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Main Button */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="mb-4">
              <Rocket className="w-16 h-16 text-white mx-auto animate-bounce" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-slate-200 text-lg mb-6">
              Follow our step-by-step guide to set up your Unity Node
            </p>
            <div className="flex items-center justify-center gap-2 text-white">
              <span className="text-lg font-semibold">Start Your Journey</span>
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface GetStartedSectionProps {
  isVisible: boolean
  onComplete?: () => void
}

export function GetStartedSection({ isVisible, onComplete }: GetStartedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    if (isVisible && sectionRef.current) {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      )

      // Cards animation
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      )

      // ScrollTrigger for cards
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".step-card",
            { opacity: 0, y: 100, scale: 0.8 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              duration: 0.8, 
              stagger: 0.2,
              ease: "back.out(1.7)"
            }
          )
        }
      })
    }
  }, [isVisible])

  const handleCardClick = (cardId: number) => {
    setActiveCard(activeCard === cardId ? null : cardId)
  }

  if (!isVisible) return null

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden flex flex-col">
      {/* WebGL Background */}
      <GetStartedWebGLBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            Getting Started Guide
          </Badge>
          
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
            <span className="web3-text-gradient">
              How to Get Started
            </span>
            <br />
            <span className="text-white">
              with Unity Nodes
            </span>
          </h2>
          
          <p ref={subtitleRef} className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Follow our comprehensive 5-step guide to set up your Unity Node and start earning MNT rewards 
            from your unused call minutes.
          </p>
        </div>

        {/* Step Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {stepCards.map((card, index) => (
            <div key={card.id} className="step-card">
              <AnimatedStepCard
                card={card}
                index={index}
                isActive={activeCard === card.id}
                onCardClick={handleCardClick}
              />
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-4">
            {stepCards.map((card, index) => (
              <div key={card.id} className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  card.status === 'completed' ? 'bg-green-400' :
                  card.status === 'current' ? 'bg-blue-400 animate-pulse' :
                  'bg-slate-600'
                }`}></div>
                {index < stepCards.length - 1 && (
                  <div className={`w-8 h-0.5 ${
                    card.status === 'completed' ? 'bg-green-400' : 'bg-slate-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            className="web3-button-primary text-lg px-8 py-4"
            onClick={onComplete}
          >
            <Crown className="w-5 h-5 mr-2" />
            Complete Setup
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// Main component that manages the reveal flow
export function GetStartedFlow() {
  const [showGetStarted, setShowGetStarted] = useState(false)
  const [showRevealButton, setShowRevealButton] = useState(true)

  useEffect(() => {
    // Auto-reveal after 3 seconds (1 second after homepage scroll)
    const timer = setTimeout(() => {
      // Store current scroll position
      const currentScrollY = window.scrollY
      
      setShowRevealButton(false)
      setTimeout(() => {
        setShowGetStarted(true)
        
        // Maintain scroll position after content changes
        setTimeout(() => {
          window.scrollTo({
            top: currentScrollY,
            behavior: 'instant'
          })
        }, 100)
      }, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleReveal = () => {
    // Store current scroll position
    const currentScrollY = window.scrollY
    
    setShowRevealButton(false)
    setTimeout(() => {
      setShowGetStarted(true)
      
      // Maintain scroll position after content changes
      setTimeout(() => {
        window.scrollTo({
          top: currentScrollY,
          behavior: 'instant'
        })
      }, 100)
    }, 500)
  }

  const handleComplete = () => {
    // Navigate to dashboard or next section
    window.location.href = '/dashboard'
  }

  return (
    <>
      {showRevealButton && (
        <HugeRevealButton onReveal={handleReveal} />
      )}
      <GetStartedSection 
        isVisible={showGetStarted} 
        onComplete={handleComplete}
      />
    </>
  )
}
