"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Sparkles, 
  Rocket, 
  Shield, 
  Star, 
  Crown,
  Gem,
  Flame,
  CloudLightning,
  Target,
  Trophy,
  Award
} from 'lucide-react'

export function Web3Showcase() {
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveButton(prev => {
        const buttons = ['primary', 'secondary', 'glow', 'neon']
        const currentIndex = buttons.indexOf(prev || '')
        return buttons[(currentIndex + 1) % buttons.length]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const web3Buttons = [
    {
      id: 'primary',
      name: 'Primary Web3',
      className: 'web3-button-primary',
      icon: Zap,
      description: 'Cyan to Purple Gradient'
    },
    {
      id: 'secondary',
      name: 'Secondary Web3',
      className: 'web3-button-secondary',
      icon: Sparkles,
      description: 'Cyan Border Glow'
    },
    {
      id: 'glow',
      name: 'Glow Effect',
      className: 'web3-button-glow',
      icon: Flame,
      description: 'Emerald to Cyan Glow'
    },
    {
      id: 'neon',
      name: 'Neon Style',
      className: 'web3-button-neon',
      icon: CloudLightning,
      description: 'Pink Neon Border'
    }
  ]

  const web3Cards = [
    {
      id: 1,
      title: 'Holographic Card',
      description: 'Advanced holographic effects with shimmer animation',
      icon: Gem,
      className: 'web3-card-holographic',
      stats: { value: '99.9%', label: 'Uptime' }
    },
    {
      id: 2,
      title: 'Cyber Card',
      description: 'Cyberpunk-inspired design with neon accents',
      icon: Shield,
      className: 'web3-card-cyber',
      stats: { value: '256-bit', label: 'Security' }
    },
    {
      id: 3,
      title: 'Professional Card',
      description: 'Clean professional design with subtle effects',
      icon: Crown,
      className: 'professional-card',
      stats: { value: '24/7', label: 'Support' }
    }
  ]

  const textEffects = [
    {
      name: 'Neon Text',
      className: 'web3-text-neon',
      text: 'NEON GLOW',
      icon: Star
    },
    {
      name: 'Glow Text',
      className: 'web3-text-glow',
      text: 'TEXT GLOW',
      icon: Award
    },
    {
      name: 'Rainbow Text',
      className: 'web3-text-rainbow animate-rainbow-flow',
      text: 'RAINBOW FLOW',
      icon: Trophy
    }
  ]

  return (
    <section ref={showcaseRef} className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            Web3 Design Showcase
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="web3-text-gradient animate-holographic-shift">
              Advanced Web3
            </span>
            <br />
            <span className="web3-text-neon animate-neon-flicker">
              Design System
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of Web3 UI with our advanced design components, 
            featuring holographic effects, neon glows, and cyberpunk aesthetics.
          </p>
        </div>

        {/* Web3 Buttons Showcase */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="web3-text-glow">Interactive Buttons</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {web3Buttons.map((button) => {
              const IconComponent = button.icon
              return (
                <div key={button.id} className="text-center">
                  <Button
                    className={`${button.className} w-full mb-4 ${
                      activeButton === button.id ? 'animate-cyber-pulse' : ''
                    }`}
                    onClick={() => setActiveButton(button.id)}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {button.name}
                  </Button>
                  <p className="text-slate-400 text-sm">{button.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Web3 Cards Showcase */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="web3-text-glow">Advanced Cards</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {web3Cards.map((card) => {
              const IconComponent = card.icon
              return (
                <Card
                  key={card.id}
                  className={`${card.className} web3-hover-lift ${
                    hoveredCard === card.id ? 'animate-cyber-pulse' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-float">
                      <IconComponent className="w-8 h-8 text-cyan-400" />
                    </div>
                    <CardTitle className="text-white text-xl">{card.title}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      {card.stats.value}
                    </div>
                    <div className="text-slate-500 text-sm">
                      {card.stats.label}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Text Effects Showcase */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="web3-text-glow">Text Effects</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {textEffects.map((effect, index) => {
              const IconComponent = effect.icon
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <IconComponent className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                    <h4 className={`text-2xl font-bold mb-2 ${effect.className}`}>
                      {effect.text}
                    </h4>
                    <p className="text-slate-400 text-sm">{effect.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Loading Animations */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="web3-text-glow">Loading Animations</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <h4 className="text-white font-semibold mb-4">Loading Dots</h4>
              <div className="web3-loading-dots justify-center">
                <div style={{ '--i': 0 } as React.CSSProperties}></div>
                <div style={{ '--i': 1 } as React.CSSProperties}></div>
                <div style={{ '--i': 2 } as React.CSSProperties}></div>
              </div>
            </div>
            
            <div className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <h4 className="text-white font-semibold mb-4">Loading Spinner</h4>
              <div className="web3-loading-spinner mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            <span className="web3-text-glow">Interactive Elements</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="web3-hover-lift p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 cursor-pointer">
              <Rocket className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-white text-sm">Hover Lift</p>
            </div>
            
            <div className="web3-hover-glow p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 cursor-pointer">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white text-sm">Hover Glow</p>
            </div>
            
            <div className="web3-hover-scale p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 cursor-pointer">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white text-sm">Hover Scale</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
