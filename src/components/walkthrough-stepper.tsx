"use client"

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
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
  ExternalLink
} from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
  icon: React.ComponentType<any>
  details: string
  action?: string
  completed?: boolean
}

const steps: Step[] = [
  {
    id: 1,
    title: "Download Unity App",
    description: "Get the mobile app from your app store",
    icon: Download,
    details: "Download the Unity App from App Store/Google Play. This mobile app integrates with your carrier to track unused/international call minutes seamlessly.",
    action: "Download Now"
  },
  {
    id: 2,
    title: "Generate License",
    description: "Create your unique node license",
    icon: Key,
    details: "On the website, click 'Generate License' to pull an active license key from our database (Switch or Validation Node, pre-staked with 10k/50k MNT).",
    action: "Generate License"
  },
  {
    id: 3,
    title: "Copy & Paste License",
    description: "Activate your node in the app",
    icon: Copy,
    details: "Copy your License Key from the dashboard. Paste it into the Unity App settings to activate your node. This links your phone's carrier minutes to the network.",
    action: "Copy License"
  },
  {
    id: 4,
    title: "Make Your Minutes Count",
    description: "Start earning MNT rewards",
    icon: Phone,
    details: "Start making calls! The app farms your unused/international minutes via carrier integration. Network terminates calls globally, generating revenue. Earn MNT rewards: 25% to users, 60% to node operators, 15% to expansion.",
    action: "Start Farming"
  }
]

export function WalkthroughStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [generatedLicense, setGeneratedLicense] = useState<string | null>(null)
  const stepperRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const tl = gsap.timeline()
    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        tl.fromTo(ref,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          index * 0.1
        )
      }
    })
  }, [])

  const handleStepAction = (stepId: number) => {
    switch (stepId) {
      case 1:
        // Simulate app store links
        window.open('https://apps.apple.com', '_blank')
        break
      case 2:
        // Generate a mock license
        const mockLicense = `UNITY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        setGeneratedLicense(mockLicense)
        setCurrentStep(2)
        break
      case 3:
        if (generatedLicense) {
          navigator.clipboard.writeText(generatedLicense)
          setCurrentStep(3)
        }
        break
      case 4:
        setCurrentStep(3)
        break
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How to Get Started
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Follow these simple steps to start farming MNT rewards with your Unity Node
          </p>
        </div>

        <div ref={stepperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { stepRefs.current[index] = el }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-4 z-0" />
              )}
              
              {/* Step Number */}
              <div className="relative z-10 flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep >= step.id 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.id
                  )}
                </div>
              </div>

              {/* Step Card */}
              <Card className={`web3-card transition-all duration-300 ${
                currentStep === step.id ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-blue-500/20">
                    <step.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4">
                    {step.details}
                  </p>
                  
                  {step.id === 2 && generatedLicense && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <code className="text-green-400 text-sm font-mono">
                          {generatedLicense}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(generatedLicense)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step.id === 3 && generatedLicense && (
                    <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                      <QrCode className="w-16 h-16 mx-auto mb-2 text-blue-400" />
                      <p className="text-blue-300 text-sm">Scan QR code in Unity App</p>
                    </div>
                  )}

                  <Button
                    onClick={() => handleStepAction(step.id)}
                    className="w-full web3-button"
                    disabled={step.id === 2 && !generatedLicense}
                  >
                    {step.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Rewards Flow Visualization */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Reward Distribution Flow
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="web3-card p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">25%</div>
              <div className="text-white font-semibold mb-1">Users</div>
              <div className="text-slate-400 text-sm">Callers & Callees</div>
            </div>
            <div className="web3-card p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">60%</div>
              <div className="text-white font-semibold mb-1">Node Operators</div>
              <div className="text-slate-400 text-sm">Pro-rata based on stake</div>
            </div>
            <div className="web3-card p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">15%</div>
              <div className="text-white font-semibold mb-1">Expansion</div>
              <div className="text-slate-400 text-sm">Network growth</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
