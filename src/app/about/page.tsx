"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Zap, 
  Shield, 
  TrendingUp,
  Phone,
  ArrowRight,
  CheckCircle,
  Target,
  Award,
  Sparkles,
  Crown,
  Key
} from 'lucide-react'
import { AboutWebGLBackground } from '@/components/about-webgl-background'
import { Navigation } from '@/components/navigation'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (counterRef.current) {
      const obj = { count: 0 }
      gsap.to(obj, {
        count: end,
        duration: duration,
        ease: "power1.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = obj.count.toFixed(0) + suffix
          }
        }
      })
    }
  }, [end, duration, suffix])

  return <span ref={counterRef}>0{suffix}</span>
}

// Animated Feature Card Component
function AnimatedFeatureCard({
  title,
  description,
  icon: Icon,
  color,
  delay = 0,
  stats = null
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  delay?: number
  stats?: { value: number, suffix: string, label: string } | null
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.9,
          rotationY: -15
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationY: 0,
          duration: 0.8, 
          delay: delay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }
  }, [delay])

  return (
    <Card 
      ref={cardRef}
      className="web3-card-holographic web3-hover-lift group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-white flex items-center">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${color} opacity-80 group-hover:opacity-100 transition-opacity mr-3`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-slate-300 mb-4 leading-relaxed">{description}</p>
        {stats && (
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              <AnimatedCounter end={stats.value} suffix={stats.suffix} />
            </div>
            <p className="text-xs text-slate-500">{stats.label}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Animated Step Component
function AnimatedStep({
  step,
  title,
  description,
  icon: Icon,
  color,
  delay = 0
}: {
  step: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  delay?: number
}) {
  const stepRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(stepRef.current, 
        { 
          opacity: 0, 
          y: 30, 
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          delay: delay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: stepRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    if (iconRef.current) {
      gsap.fromTo(iconRef.current, 
        { 
          rotation: -180,
          scale: 0
        },
        { 
          rotation: 0,
          scale: 1,
          duration: 0.8, 
          delay: delay + 0.2,
          ease: "back.out(1.7)"
        }
      )
    }
  }, [delay])

  return (
    <div ref={stepRef} className="text-center group">
      <div 
        ref={iconRef}
        className={`w-20 h-20 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold text-white">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  )
}

// Animated Node Type Card
function AnimatedNodeCard({
  title,
  description,
  icon: Icon,
  color,
  badge,
  features,
  delay = 0,
  isPopular = false
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  badge: string
  features: string[]
  delay?: number
  isPopular?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.9,
          rotationX: -10
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 0.8, 
          delay: delay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }
  }, [delay])

  return (
    <Card 
      ref={cardRef}
      className={`web3-card-holographic web3-hover-lift group cursor-pointer relative overflow-hidden ${isPopular ? 'ring-2 ring-purple-500/50' : ''}`}
    >
      {isPopular && (
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse">
            <Crown className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${color} opacity-80 group-hover:opacity-100 transition-opacity mr-4`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl">{title}</span>
          </div>
        </CardTitle>
        <Badge className={`bg-gradient-to-r ${color} text-white border-0 w-fit mt-2`}>
          {badge}
        </Badge>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-slate-300">
              <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (aboutRef.current) {
      gsap.fromTo(aboutRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out" }
      )
    }

    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      )
    }

    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }
  }, [])

  const features = [
    {
      title: "Global Network",
      description: "Join a worldwide network of users across 180+ countries, all working together to decentralize telecommunications.",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      stats: { value: 34, suffix: "M+", label: "Users" }
    },
    {
      title: "Secure & Reliable",
      description: "Built on proven blockchain technology with 99.9% network uptime and secure reward distribution.",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      stats: { value: 99.9, suffix: "%", label: "Uptime" }
    },
    {
      title: "Growing Ecosystem",
      description: "Be part of the future of telecommunications as the network expands and rewards increase over time.",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      stats: { value: 180, suffix: "+", label: "Countries" }
    }
  ]

  const steps = [
    {
      step: 1,
      title: "Download App",
      description: "Get the Unity App from your app store and install it on your phone",
      icon: Phone,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "Generate License",
      description: "Create your Unity Node license and activate it in the app",
      icon: Key,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: 3,
      title: "Make Calls",
      description: "Use your phone normally - the app tracks your call minutes",
      icon: Zap,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 4,
      title: "Earn Rewards",
      description: "Receive MNT rewards based on your node stake and activity",
      icon: Award,
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const nodeTypes = [
    {
      title: "Switch Nodes",
      description: "Premium nodes with higher reward potential and limited supply. Perfect for users looking to maximize their earnings.",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      badge: "50,000 MNT Stake",
      features: [
        "Higher reward multiplier",
        "Limited to 500 nodes",
        "Priority in reward distribution",
        "Exclusive network benefits"
      ],
      isPopular: true
    },
    {
      title: "Validation Nodes",
      description: "Entry-level nodes with lower barrier to entry. Great for users new to the ecosystem or with smaller budgets.",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      badge: "10,000 MNT Stake",
      features: [
        "Lower entry cost",
        "2,500 nodes available",
        "Consistent rewards",
        "Perfect for beginners"
      ]
    }
  ]

  return (
    <div ref={aboutRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* WebGL Background */}
      <AboutWebGLBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/80 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 mt-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 px-6 py-3 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            About Unity Nodes
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 animate-fade-in-up">
            Revolutionizing <span className="web3-text-glow">Telecommunications</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Democratizing telecommunications through decentralized infrastructure and turning everyday phone calls into passive income opportunities
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <Card className="web3-card-holographic p-8 text-center">
            <CardHeader>
              <CardTitle className="text-white text-4xl mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 mr-3 text-blue-400" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
                Unity Nodes democratizes telecommunications by allowing anyone to participate in the Minutes Network DePIN ecosystem. 
                We turn everyday phone calls into passive income opportunities while supporting a decentralized telecom infrastructure 
                that benefits users worldwide.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What is Unity Nodes */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center animate-fade-in-up">
            <span className="web3-text-glow">What are Unity Nodes?</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedFeatureCard
              title="Mobile-Based Nodes"
              description="Unity Nodes are mobile-based nodes in the Minutes Network DePIN ecosystem that allow users to 'mine' MNT cryptocurrency by consuming unused call minutes on their phone."
              icon={Phone}
              color="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <AnimatedFeatureCard
              title="Passive Income"
              description="A static cost is deducted per call, and revenues from international call terminations are pooled and distributed as rewards to node operators."
              icon={Zap}
              color="from-purple-500 to-pink-500"
              delay={0.2}
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center animate-fade-in-up">
            <span className="web3-text-glow">How It Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <AnimatedStep
                key={index}
                step={step.step}
                title={step.title}
                description={step.description}
                icon={step.icon}
                color={step.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Node Types */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center animate-fade-in-up">
            <span className="web3-text-glow">Node Types</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {nodeTypes.map((node, index) => (
              <AnimatedNodeCard
                key={index}
                title={node.title}
                description={node.description}
                icon={node.icon}
                color={node.color}
                badge={node.badge}
                features={node.features}
                delay={index * 0.2}
                isPopular={node.isPopular}
              />
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center animate-fade-in-up">
            <span className="web3-text-glow">Why Choose Unity Nodes?</span>
          </h2>
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedFeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                delay={index * 0.1}
                stats={feature.stats}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-4xl font-bold gradient-text mb-6">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Start earning MNT rewards today and be part of the decentralized telecom future
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="web3-button-primary text-lg px-10 py-4 group"
              onClick={() => window.location.href = '/'}
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate Your License
            </Button>
            <Button 
              size="lg" 
              className="web3-button-secondary text-lg px-10 py-4 group"
              onClick={() => window.location.href = '/dashboard'}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
