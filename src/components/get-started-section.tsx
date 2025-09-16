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
  Play,
  Pause,
  Settings,
  Monitor,
  BarChart3,
  Activity,
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
  Database,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  Save,
  Upload,
  Download as DownloadIcon,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react'
import { GetStartedWebGLBackground } from './get-started-webgl-background'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface WorkflowStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  details: string
  actionLabel: string
  color: string
  status: 'completed' | 'current' | 'upcoming'
  duration: string
  progress: number
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Download Unity App",
    description: "Get the mobile app from your app store",
    icon: Download,
    details: "Download the Unity App from your device's App Store or Google Play Store. The app is optimized for both iOS and Android devices.",
    actionLabel: "Download Now",
    color: "#3b82f6",
    status: 'completed',
    duration: "2 min",
    progress: 100
  },
  {
    id: 2,
    title: "Generate Your License",
    description: "Create your unique node license key",
    icon: Key,
    details: "Generate a unique license key on this website. Each license is pre-staked with MNT tokens and ready for immediate activation.",
    actionLabel: "Generate License",
    color: "#8b5cf6",
    status: 'current',
    duration: "1 min",
    progress: 60
  },
  {
    id: 3,
    title: "Activate Your Node",
    description: "Copy and paste your license key into the app",
    icon: Copy,
    details: "Copy your License Key and paste it in the Unity App settings to activate your node and start earning rewards.",
    actionLabel: "Copy License",
    color: "#06b6d4",
    status: 'upcoming',
    duration: "1 min",
    progress: 0
  },
  {
    id: 4,
    title: "Start Earning Rewards",
    description: "Make your minutes count and earn MNT",
    icon: Phone,
    details: "Use your phone normally and earn MNT rewards from your call minutes automatically. No additional setup required.",
    actionLabel: "Go to Dashboard",
    color: "#10b981",
    status: 'upcoming',
    duration: "Instant",
    progress: 0
  },
  {
    id: 5,
    title: "Monitor Performance",
    description: "Track your earnings and network performance",
    icon: Target,
    details: "Track your earnings and network performance through the comprehensive dashboard with real-time analytics.",
    actionLabel: "View Analytics",
    color: "#f59e0b",
    status: 'upcoming',
    duration: "Ongoing",
    progress: 0
  }
]

// DaVinci Resolve Style Panel Component
function WorkflowPanel({ 
  step, 
  index, 
  isActive, 
  onStepClick,
  isExpanded 
}: { 
  step: WorkflowStep, 
  index: number, 
  isActive: boolean,
  onStepClick: (stepId: number) => void,
  isExpanded: boolean
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const IconComponent = step.icon

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, 
        { 
          opacity: 0, 
          x: -50, 
          scale: 0.95
        },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          duration: 0.6, 
          delay: index * 0.1,
          ease: "power2.out"
        }
      )
    }
  }, [index])

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed':
        return '#10b981'
      case 'current':
        return step.color
      case 'upcoming':
        return '#6b7280'
    }
  }

  const getStatusIcon = () => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'current':
        return <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: step.color }}></div>
      case 'upcoming':
        return <div className="w-4 h-4 rounded-full border-2 border-slate-500"></div>
    }
  }

  return (
    <div 
      ref={panelRef}
      className={`bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'hover:border-slate-600/50'
      }`}
      onClick={() => onStepClick(step.id)}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium text-slate-300">Step {step.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ color: getStatusColor() }}>
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-white">{step.title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{step.duration}</span>
          {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {/* Panel Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{step.details}</p>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Progress</span>
              <span>{step.progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${step.progress}%`,
                  backgroundColor: getStatusColor()
                }}
              ></div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
            disabled={step.status === 'upcoming'}
          >
            {step.actionLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}

// Timeline Component
function WorkflowTimeline({ steps, activeStep }: { steps: WorkflowStep[], activeStep: number | null }) {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(timelineRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      )
    }
  }, [])

  return (
    <div ref={timelineRef} className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Workflow Timeline
        </h3>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
            <Play className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
            <Pause className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.status === 'completed' ? 'bg-green-500 border-green-500' :
                step.status === 'current' ? 'border-blue-500' :
                'border-slate-600'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-medium text-slate-300">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-0.5 h-8 ${
                  step.status === 'completed' ? 'bg-green-500' : 'bg-slate-600'
                }`}></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{step.title}</span>
                <span className="text-xs text-slate-400">{step.duration}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                <div 
                  className="h-1 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${step.progress}%`,
                    backgroundColor: step.status === 'completed' ? '#10b981' : step.color
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Status Panel Component
function StatusPanel({ steps }: { steps: WorkflowStep[] }) {
  const statusRef = useRef<HTMLDivElement>(null)
  const completedSteps = steps.filter(s => s.status === 'completed').length
  const currentStep = steps.find(s => s.status === 'current')

  useEffect(() => {
    if (statusRef.current) {
      gsap.fromTo(statusRef.current, 
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      )
    }
  }, [])

  return (
    <div ref={statusRef} className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <Monitor className="w-5 h-5 text-green-400" />
        Status Overview
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Overall Progress</span>
          <span className="text-sm font-medium text-white">{Math.round((completedSteps / steps.length) * 100)}%</span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000"
            style={{ width: `${(completedSteps / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{completedSteps}</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{currentStep ? 1 : 0}</div>
            <div className="text-xs text-slate-400">Current</div>
          </div>
        </div>

        {currentStep && (
          <div className="pt-4 border-t border-slate-700/50">
            <div className="text-sm text-slate-300 mb-2">Current Step:</div>
            <div className="flex items-center gap-2">
              <div style={{ color: currentStep.color }}>
                <currentStep.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-white">{currentStep.title}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// DaVinci Resolve Style Launch Button
function LaunchButton({ onReveal }: { onReveal: () => void }) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        { 
          opacity: 0, 
          scale: 0.8,
          y: 30
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 1,
          delay: 2,
          ease: "power2.out"
        }
      )
    }
  }, [])

  useEffect(() => {
    if (buttonRef.current) {
      if (isHovered) {
        gsap.to(buttonRef.current, {
          scale: 1.05,
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
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <div
        ref={buttonRef}
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onReveal}
      >
        {/* Main Interface Preview */}
        <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 shadow-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">UNITY NODE SETUP</h3>
                <p className="text-xs text-slate-400">Workflow Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
              <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
              <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">
                Launch Workflow Manager
              </h4>
              <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                Access the professional setup interface with timeline, status panels, and step-by-step guidance
              </p>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              onClick={onReveal}
            >
              <Play className="w-4 h-4 mr-2" />
              Launch Interface
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
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
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState<number | null>(2) // Start with step 2 (current)
  const [expandedStep, setExpandedStep] = useState<number | null>(2)

  useEffect(() => {
    if (isVisible && sectionRef.current) {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }
  }, [isVisible])

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId)
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  if (!isVisible) return null

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* WebGL Background */}
      <GetStartedWebGLBackground />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/95" />
      
      {/* DaVinci Resolve Style Interface */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Bar */}
        <div ref={headerRef} className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">UNITY NODE SETUP</h1>
                  <p className="text-xs text-slate-400">Workflow Manager</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Save className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left Sidebar - Workflow Steps */}
          <div className="w-full lg:w-80 bg-slate-800/90 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-slate-700/50 p-4 space-y-3 overflow-y-auto max-h-96 lg:max-h-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                Workflow Steps
              </h2>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            
            {workflowSteps.map((step, index) => (
              <WorkflowPanel
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === step.id}
                onStepClick={handleStepClick}
                isExpanded={expandedStep === step.id}
              />
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Center Panel - Timeline */}
            <div className="flex-1 p-4 lg:p-6">
              <WorkflowTimeline steps={workflowSteps} activeStep={activeStep} />
            </div>

            {/* Right Sidebar - Status & Controls */}
            <div className="w-full lg:w-80 bg-slate-800/90 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-slate-700/50 p-4 space-y-4">
              <StatusPanel steps={workflowSteps} />
              
              {/* Quick Actions */}
              <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download App
                  </Button>
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    <Key className="w-4 h-4 mr-2" />
                    Generate License
                  </Button>
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Dashboard
                  </Button>
                </div>
              </div>

              {/* Complete Setup Button */}
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={onComplete}
              >
                <Crown className="w-4 h-4 mr-2" />
                Complete Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main component that manages the reveal flow
export function GetStartedFlow() {
  const [showGetStarted, setShowGetStarted] = useState(false)
  const [showLaunchButton, setShowLaunchButton] = useState(true)

  useEffect(() => {
    // Auto-reveal after 3 seconds (1 second after homepage scroll)
    const timer = setTimeout(() => {
      // Store current scroll position
      const currentScrollY = window.scrollY
      
      setShowLaunchButton(false)
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
    
    setShowLaunchButton(false)
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
      {showLaunchButton && (
        <LaunchButton onReveal={handleReveal} />
      )}
      <GetStartedSection 
        isVisible={showGetStarted} 
        onComplete={handleComplete}
      />
    </>
  )
}
