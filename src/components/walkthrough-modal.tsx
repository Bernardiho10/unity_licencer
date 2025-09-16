"use client"

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Download, 
  Key, 
  Copy, 
  Phone, 
  ArrowRight, 
  CheckCircle,
  QrCode,
  X,
  ArrowLeft,
  ArrowRight as ArrowRightIcon
} from 'lucide-react'

interface WalkthroughStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  details: string
  action?: string
  videoUrl?: string
  imageUrl?: string
  completed?: boolean
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    id: 1,
    title: "Download Unity App",
    description: "Get the mobile app from your app store",
    icon: Download,
    details: "Download the Unity App from App Store/Google Play. This mobile app integrates with your carrier to track unused/international call minutes seamlessly.",
    action: "Download Now",
    videoUrl: "https://example.com/download-demo.mp4"
  },
  {
    id: 2,
    title: "Generate License",
    description: "Create your unique node license",
    icon: Key,
    details: "On the website, click 'Generate License' to pull an active license key from our database (Switch or Validation Node, pre-staked with 10k/50k MNT).",
    action: "Generate License",
    videoUrl: "https://example.com/generate-demo.mp4"
  },
  {
    id: 3,
    title: "Copy & Paste License",
    description: "Activate your node in the app",
    icon: Copy,
    details: "Copy your License Key from the dashboard. Paste it into the Unity App settings to activate your node. This links your phone's carrier minutes to the network.",
    action: "Copy License",
    videoUrl: "https://example.com/activate-demo.mp4"
  },
  {
    id: 4,
    title: "Make Your Minutes Count",
    description: "Start earning MNT rewards",
    icon: Phone,
    details: "Start making calls! The app farms your unused/international minutes via carrier integration. Network terminates calls globally, generating revenue. Earn MNT rewards: 25% to users, 60% to node operators, 15% to expansion.",
    action: "Start Farming",
    videoUrl: "https://example.com/farming-demo.mp4"
  }
]

interface WalkthroughModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function WalkthroughModal({ isOpen, onClose, onComplete }: WalkthroughModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [generatedLicense, setGeneratedLicense] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline()
      tl.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      )
    }
  }, [isOpen])

  useEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(stepRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      )
    }
  }, [currentStep])

  const handleStepAction = (stepId: number) => {
    switch (stepId) {
      case 1:
        // Simulate app store links
        window.open('https://apps.apple.com', '_blank')
        setCompletedSteps(prev => [...prev, stepId])
        break
      case 2:
        // Generate a mock license
        const mockLicense = `UNITY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        setGeneratedLicense(mockLicense)
        setCompletedSteps(prev => [...prev, stepId])
        break
      case 3:
        if (generatedLicense) {
          navigator.clipboard.writeText(generatedLicense)
          setCompletedSteps(prev => [...prev, stepId])
        }
        break
      case 4:
        setCompletedSteps(prev => [...prev, stepId])
        break
    }
  }

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  if (!isOpen) return null

  const currentStepData = walkthroughSteps[currentStep]
  const isStepCompleted = completedSteps.includes(currentStepData.id)
  const progress = ((currentStep + 1) / walkthroughSteps.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-2xl"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Unity Node Setup Guide</h2>
              <p className="text-slate-400 mt-1">Step {currentStep + 1} of {walkthroughSteps.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-slate-400 hover:text-white"
              >
                Skip Tutorial
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div ref={stepRef} className="space-y-6">
            {/* Step Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                <currentStepData.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{currentStepData.title}</h3>
              <p className="text-xl text-slate-300 mb-4">{currentStepData.description}</p>
            </div>

            {/* Step Details */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {currentStepData.details}
                </p>

                {/* License Display */}
                {currentStepData.id === 2 && generatedLicense && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-400 font-semibold mb-2">Your License Key:</p>
                        <code className="text-green-300 text-lg font-mono bg-slate-900/50 px-3 py-2 rounded">
                          {generatedLicense}
                        </code>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigator.clipboard.writeText(generatedLicense)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* QR Code Display */}
                {currentStepData.id === 3 && generatedLicense && (
                  <div className="mb-6 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                    <QrCode className="w-24 h-24 mx-auto mb-4 text-blue-400" />
                    <p className="text-blue-300 text-lg font-semibold">Scan QR Code in Unity App</p>
                    <p className="text-blue-400 text-sm mt-2">This will automatically activate your node</p>
                  </div>
                )}

                {/* Action Button */}
                <div className="text-center">
                  <Button
                    onClick={() => handleStepAction(currentStepData.id)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                    disabled={currentStepData.id === 2 && !generatedLicense}
                  >
                    {isStepCompleted ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        {currentStepData.action}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rewards Info */}
            {currentStepData.id === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">25%</div>
                    <div className="text-white font-semibold">Users</div>
                    <div className="text-slate-400 text-sm">Callers & Callees</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">60%</div>
                    <div className="text-white font-semibold">Node Operators</div>
                    <div className="text-slate-400 text-sm">Pro-rata based on stake</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">15%</div>
                    <div className="text-white font-semibold">Expansion</div>
                    <div className="text-slate-400 text-sm">Network growth</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="text-slate-400 hover:text-white disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {walkthroughSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-blue-500' 
                      : index < currentStep 
                        ? 'bg-green-500' 
                        : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {currentStep === walkthroughSteps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
