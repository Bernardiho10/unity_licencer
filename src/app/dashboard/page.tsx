"use client"

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  Download, 
  Copy, 
  Eye, 
  MoreHorizontal, 
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Activity,
  BarChart3,
  Network,
  Target,
  Award,
  Sparkles,
  Clock,
  Key,
  CheckCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { DashboardWebGLBackground } from '@/components/dashboard-webgl-background'
import { Navigation } from '@/components/navigation'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface License {
  id: string
  licenseKey: string
  type: 'switch' | 'validation'
  status: 'active' | 'inactive' | 'pending' | 'available' | 'generated' | 'used'
  createdAt: string
  expiresAt: string
  rewards: number
  nodeId: string
  region: string
  performance: number
  uptime: number
  stakeAmount: number
  userId?: string
  generatedAt?: string
  usedAt?: string
}

interface DashboardStats {
  totalLicenses: number
  activeLicenses: number
  inactiveLicenses: number
  pendingLicenses: number
  availableLicenses: number
  generatedLicenses: number
  usedLicenses: number
  totalRewards: number
  monthlyRewards: number
  networkNodes: number
  globalCoverage: number
  averageUptime: number
  dataTransferred: number
    totalUsers: number
    totalMinutesFarmed: number
    totalMntDistributed: number
    networkUptime: number
    averageRewardPerUser: number
  }

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '' }: { 
  end: number, 
  duration?: number, 
  prefix?: string, 
  suffix?: string 
}) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(counterRef.current, {
            duration,
            ease: "power2.out",
            onUpdate: function() {
              setCount(Math.round(this.targets()[0]._gsap.progress * end))
            }
          })
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={counterRef} className="font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Enhanced Stats Card Component
function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color, 
  delay = 0,
  isAnimated = true,
  trend = null
}: {
  title: string
  value: number | string
  subtitle: string
  icon: any
  color: string
  delay?: number
  isAnimated?: boolean
  trend?: { value: number, isPositive: boolean } | null
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.9 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          delay,
          ease: "back.out(1.7)"
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
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${color} opacity-80 group-hover:opacity-100 transition-opacity`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-white mb-1">
          {isAnimated && typeof value === 'number' ? (
            <AnimatedCounter end={value} />
          ) : (
            value
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">{subtitle}</p>
          {trend && (
            <div className={`flex items-center text-xs ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className={`w-3 h-3 mr-1 ${trend.isPositive ? '' : 'rotate-180'}`} />
              {trend.value}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Network Status Component
function NetworkStatus() {
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statusRef.current) {
      gsap.fromTo(statusRef.current,
        { scale: 0, rotation: -180 },
        { 
          scale: 1, 
          rotation: 0, 
          duration: 1, 
          delay: 0.5,
          ease: "elastic.out(1, 0.3)"
        }
      )
    }
  }, [])

  return (
    <div ref={statusRef} className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl blur-xl animate-pulse"></div>
      <Card className="web3-card-cyber relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 animate-float">
            <Network className="w-8 h-8 text-green-400" />
          </div>
          <CardTitle className="text-white text-xl">Network Status</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-green-400 mb-2 animate-pulse-glow">
            ONLINE
          </div>
          <p className="text-slate-400 text-sm">All systems operational</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// License Generation Component
function LicenseGenerator({ onGenerate }: { onGenerate: () => void }) {
  const [selectedNodeType, setSelectedNodeType] = useState<string>('')
  const [generating, setGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
        toast({
          title: "License Generated!",
          description: "Your Unity Node license has been generated successfully.",
        })
      onGenerate()
    } catch (error) {
        toast({
          title: "Generation Failed",
        description: "Failed to generate license",
        variant: "destructive"
      })
    } finally {
      setGenerating(false)
    }
  }

    return (
    <Card className="web3-card-holographic">
          <CardHeader>
        <CardTitle className="text-white flex items-center text-xl">
          <Zap className="w-6 h-6 mr-3 text-blue-400" />
              Generate New License
            </CardTitle>
        <CardDescription className="text-slate-400 text-base">
              Create a new Unity Node license to start farming MNT rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedNodeType} onValueChange={setSelectedNodeType}>
            <SelectTrigger className="w-full sm:w-64 bg-slate-800/50 border-slate-600">
                  <SelectValue placeholder="Select node type (optional)" />
                </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="switch">Switch Node (50,000 MNT stake)</SelectItem>
                  <SelectItem value="validation">Validation Node (10,000 MNT stake)</SelectItem>
                </SelectContent>
              </Select>
              <Button 
            onClick={handleGenerate} 
                disabled={generating}
            className="web3-button-primary"
          >
            {generating ? (
              <>
                <div className="web3-loading-spinner w-4 h-4 mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Generate License
              </>
            )}
              </Button>
            </div>
          </CardContent>
        </Card>
  )
}

export default function DashboardPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [stats, setStats] = useState<DashboardStats>({
    totalLicenses: 0,
    activeLicenses: 0,
    inactiveLicenses: 0,
    pendingLicenses: 0,
    availableLicenses: 0,
    generatedLicenses: 0,
    usedLicenses: 0,
    totalRewards: 0,
    monthlyRewards: 0,
    networkNodes: 0,
    globalCoverage: 0,
    averageUptime: 0,
    dataTransferred: 0,
    totalUsers: 0,
    totalMinutesFarmed: 0,
    totalMntDistributed: 0,
    networkUptime: 0,
    averageRewardPerUser: 0
  })

  const dashboardRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate API call with comprehensive dummy data
    setTimeout(() => {
      const dummyLicenses: License[] = [
        {
          id: 'UNITY-001',
          licenseKey: 'UNITY-ABC123DEF456',
          type: 'switch',
          status: 'active',
          createdAt: '2024-01-15',
          expiresAt: '2025-01-15',
          rewards: 1250.50,
          nodeId: 'NODE-001',
          region: 'North America',
          performance: 98.5,
          uptime: 99.2,
          stakeAmount: 50000,
          userId: 'user_001',
          generatedAt: '2024-01-15T10:30:00Z',
          usedAt: '2024-01-15T11:00:00Z'
        },
        {
          id: 'UNITY-002',
          licenseKey: 'UNITY-GHI789JKL012',
          type: 'validation',
          status: 'active',
          createdAt: '2024-01-10',
          expiresAt: '2025-01-10',
          rewards: 2100.75,
          nodeId: 'NODE-002',
          region: 'Europe',
          performance: 97.8,
          uptime: 98.9,
          stakeAmount: 10000,
          userId: 'user_002',
          generatedAt: '2024-01-10T09:15:00Z',
          usedAt: '2024-01-10T09:45:00Z'
        },
        {
          id: 'UNITY-003',
          licenseKey: 'UNITY-MNO345PQR678',
          type: 'switch',
          status: 'active',
          createdAt: '2024-01-20',
          expiresAt: '2025-01-20',
          rewards: 890.25,
          nodeId: 'NODE-003',
          region: 'Asia Pacific',
          performance: 96.2,
          uptime: 97.5,
          stakeAmount: 50000,
          userId: 'user_003',
          generatedAt: '2024-01-20T14:20:00Z',
          usedAt: '2024-01-20T14:50:00Z'
        },
        {
          id: 'UNITY-004',
          licenseKey: 'UNITY-STU901VWX234',
          type: 'validation',
          status: 'inactive',
          createdAt: '2024-01-05',
          expiresAt: '2025-01-05',
          rewards: 0,
          nodeId: 'NODE-004',
          region: 'South America',
          performance: 0,
          uptime: 0,
          stakeAmount: 10000,
          userId: 'user_004',
          generatedAt: '2024-01-05T08:00:00Z',
          usedAt: '2024-01-05T08:30:00Z'
        },
        {
          id: 'UNITY-005',
          licenseKey: 'UNITY-YZA567BCD890',
          type: 'switch',
          status: 'pending',
          createdAt: '2024-01-25',
          expiresAt: '2025-01-25',
          rewards: 0,
          nodeId: 'NODE-005',
          region: 'Africa',
          performance: 0,
          uptime: 0,
          stakeAmount: 50000,
          userId: 'user_005',
          generatedAt: '2024-01-25T16:45:00Z'
        },
        {
          id: 'UNITY-006',
          licenseKey: 'UNITY-EFG123HIJ456',
          type: 'validation',
          status: 'available',
          createdAt: '2024-01-12',
          expiresAt: '2025-01-12',
          rewards: 0,
          nodeId: 'NODE-006',
          region: 'Oceania',
          performance: 0,
          uptime: 0,
          stakeAmount: 10000,
          generatedAt: '2024-01-12T12:00:00Z'
        }
      ]

      setLicenses(dummyLicenses)
      
      const calculatedStats: DashboardStats = {
        totalLicenses: dummyLicenses.length,
        activeLicenses: dummyLicenses.filter(l => l.status === 'active').length,
        inactiveLicenses: dummyLicenses.filter(l => l.status === 'inactive').length,
        pendingLicenses: dummyLicenses.filter(l => l.status === 'pending').length,
        availableLicenses: dummyLicenses.filter(l => l.status === 'available').length,
        generatedLicenses: dummyLicenses.filter(l => l.status === 'generated').length,
        usedLicenses: dummyLicenses.filter(l => l.status === 'used').length,
        totalRewards: dummyLicenses.reduce((sum, l) => sum + l.rewards, 0),
        monthlyRewards: 1250.75,
        networkNodes: 1247,
        globalCoverage: 89.5,
        averageUptime: 98.8,
        dataTransferred: 2.4,
        totalUsers: 34250,
        totalMinutesFarmed: 1250000,
        totalMntDistributed: 2500000,
        networkUptime: 99.2,
        averageRewardPerUser: 73.5
      }
      
      setStats(calculatedStats)
      setLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    // GSAP animations for dashboard
    if (dashboardRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )

      // Stagger animation for stats cards
      gsap.fromTo(".stats-card",
        { opacity: 0, y: 50, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3
        }
      )

      // ScrollTrigger animations
      ScrollTrigger.create({
        trigger: ".dashboard-content",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".content-section",
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.2,
              ease: "power2.out"
            }
          )
        }
      })
    }
  }, [loading])

  const filteredLicenses = licenses.filter(license => {
    if (filter === 'all') return true
    return license.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'from-green-500/20 to-emerald-500/20'
      case 'inactive': return 'from-red-500/20 to-rose-500/20'
      case 'pending': return 'from-yellow-500/20 to-amber-500/20'
      case 'available': return 'from-blue-500/20 to-cyan-500/20'
      case 'generated': return 'from-purple-500/20 to-pink-500/20'
      case 'used': return 'from-slate-500/20 to-gray-500/20'
      default: return 'from-slate-500/20 to-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'inactive': return Shield
      case 'pending': return Clock
      case 'available': return Key
      case 'generated': return Zap
      case 'used': return CheckCircle
      default: return Shield
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="web3-loading-spinner mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* WebGL Background */}
      <DashboardWebGLBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        

        {/* License Generation */}
        <div className="content-section mb-8 mt-10">
          <LicenseGenerator onGenerate={() => window.location.reload()} />
        </div>

        {/* Filters and Actions */}
        <div className="content-section flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-600">
              <SelectValue placeholder="Filter licenses" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all">All Licenses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="used">Used</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Enhanced Licenses Table */}
        <div className="content-section mb-5">
          <Card className="web3-card-holographic">
          <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">License Management</CardTitle>
                  <CardDescription className="text-slate-400 text-lg">
                    Monitor and manage your Unity Node licenses
            </CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {filteredLicenses.length} Licenses
                </Badge>
              </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300 font-semibold">License Key</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Type</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Region</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Performance</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Rewards</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Stake</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Created</TableHead>
                      <TableHead className="text-slate-300 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredLicenses.map((license, index) => (
                      <TableRow 
                        key={license.id} 
                        className="border-slate-700 hover:bg-slate-800/30 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TableCell className="font-mono text-blue-400 font-semibold">
                        {license.licenseKey}
                      </TableCell>
                      <TableCell>
                          <Badge 
                            className={`bg-gradient-to-r ${license.type === 'switch' ? 'from-blue-500/20 to-cyan-500/20 text-blue-300' : 'from-purple-500/20 to-pink-500/20 text-purple-300'} border-0`}
                          >
                            {license.type}
                          </Badge>
                      </TableCell>
                      <TableCell>
                          <Badge 
                            className={`bg-gradient-to-r ${getStatusColor(license.status)} border-0 text-white`}
                          >
                            {license.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{license.region}</TableCell>
                        <TableCell className="text-slate-300">
                          {license.performance > 0 ? `${license.performance}%` : 'N/A'}
                      </TableCell>
                        <TableCell className="text-green-400 font-semibold">
                          {license.rewards.toFixed(2)} MNT
                      </TableCell>
                      <TableCell className="text-slate-300">
                          {license.stakeAmount.toLocaleString()} MNT
                      </TableCell>
                        <TableCell className="text-slate-400">{license.createdAt}</TableCell>
                      <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                          <Button
                              variant="ghost" 
                            size="sm"
                              className="text-slate-400 hover:text-white"
                            onClick={() => copyToClipboard(license.licenseKey)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Licenses"
            value={stats.totalLicenses}
            subtitle="All time licenses"
            icon={Shield}
            color="from-blue-500/20 to-cyan-500/20"
            delay={0}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Licenses"
            value={stats.activeLicenses}
            subtitle="Currently running"
            icon={Activity}
            color="from-green-500/20 to-emerald-500/20"
            delay={0.1}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Available Licenses"
            value={stats.availableLicenses}
            subtitle="Ready to use"
            icon={Key}
            color="from-cyan-500/20 to-blue-500/20"
            delay={0.2}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Total Rewards"
            value={stats.totalRewards}
            subtitle="MNT earned"
            icon={TrendingUp}
            color="from-purple-500/20 to-pink-500/20"
            delay={0.3}
            suffix=" MNT"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Monthly Rewards"
            value={stats.monthlyRewards}
            subtitle="This month"
            icon={Award}
            color="from-yellow-500/20 to-amber-500/20"
            delay={0.4}
            suffix=" MNT"
            trend={{ value: 22, isPositive: true }}
          />
          <StatsCard
            title="Network Nodes"
            value={stats.networkNodes}
            subtitle="Global nodes"
            icon={Network}
            color="from-emerald-500/20 to-teal-500/20"
            delay={0.5}
            trend={{ value: 3, isPositive: true }}
          />
          <StatsCard
            title="Global Coverage"
            value={stats.globalCoverage}
            subtitle="Countries"
            icon={Globe}
            color="from-indigo-500/20 to-purple-500/20"
            delay={0.6}
            suffix="%"
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="Average Uptime"
            value={stats.averageUptime}
            subtitle="Network reliability"
            icon={Target}
            color="from-rose-500/20 to-pink-500/20"
            delay={0.7}
            suffix="%"
            trend={{ value: 1, isPositive: true }}
          />
        </div>
      </div>
    </div>
  )
}
