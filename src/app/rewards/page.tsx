"use client"

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  BarChart3,
  Sparkles,
  Target,
  Network,
  Download,
  Coins,
  Wallet,
  Gift,
  Trophy,
  Calendar
} from 'lucide-react'
import { RewardsWebGLBackground } from '@/components/rewards-webgl-background'
import { Navigation } from '@/components/navigation'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface RewardTransaction {
  id: string
  type: 'earning' | 'bonus' | 'referral' | 'milestone'
  amount: number
  description: string
  timestamp: string
  status: 'completed' | 'pending' | 'processing'
  source: string
}

interface RewardStats {
  totalEarned: number
  monthlyEarnings: number
  weeklyEarnings: number
  dailyEarnings: number
  totalTransactions: number
  averagePerDay: number
  topEarningDay: number
  referralRewards: number
  bonusRewards: number
  milestoneRewards: number
  networkContribution: number
  uptimeBonus: number
  performanceBonus: number
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

// Enhanced Reward Stats Card Component
function RewardStatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color, 
  delay = 0,
  isAnimated = true,
  trend = null,
  percentage = null,
  suffix = ''
}: {
  title: string
  value: number | string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  delay?: number
  isAnimated?: boolean
  trend?: { value: number, isPositive: boolean } | null
  percentage?: number | null
  suffix?: string
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
            <AnimatedCounter end={value} suffix={suffix || ''} />
          ) : (
            `${value}${suffix || ''}`
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">{subtitle}</p>
          <div className="flex items-center gap-2">
            {trend && (
              <div className={`flex items-center text-xs ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                <TrendingUp className={`w-3 h-3 mr-1 ${trend.isPositive ? '' : 'rotate-180'}`} />
                {trend.value}%
              </div>
            )}
            {percentage && (
              <div className="text-xs text-slate-400">
                {percentage}%
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Reward Transaction Card Component
function RewardTransactionCard({ 
  transaction, 
  index 
}: { 
  transaction: RewardTransaction, 
  index: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "power2.out"
        }
      )
    }
  }, [index])

  const getTypeIcon = () => {
    switch (transaction.type) {
      case 'earning': return <Coins className="w-4 h-4" />
      case 'bonus': return <Gift className="w-4 h-4" />
      case 'referral': return <Users className="w-4 h-4" />
      case 'milestone': return <Trophy className="w-4 h-4" />
      default: return <Coins className="w-4 h-4" />
    }
  }

  const getTypeColor = () => {
    switch (transaction.type) {
      case 'earning': return 'from-green-500/20 to-emerald-500/20'
      case 'bonus': return 'from-blue-500/20 to-cyan-500/20'
      case 'referral': return 'from-purple-500/20 to-pink-500/20'
      case 'milestone': return 'from-yellow-500/20 to-amber-500/20'
      default: return 'from-slate-500/20 to-gray-500/20'
    }
  }

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'processing': return 'text-blue-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <Card ref={cardRef} className="web3-card-cyber web3-hover-lift">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor()}`}>
              {getTypeIcon()}
            </div>
            <div>
              <p className="text-white font-semibold">{transaction.description}</p>
              <p className="text-slate-400 text-sm">{transaction.source}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-400 font-bold text-lg">+{transaction.amount.toFixed(2)} MNT</p>
            <p className={`text-sm ${getStatusColor()}`}>{transaction.status}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-slate-400 text-sm">{transaction.timestamp}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<RewardTransaction[]>([])
  const [stats, setStats] = useState<RewardStats>({
    totalEarned: 0,
    monthlyEarnings: 0,
    weeklyEarnings: 0,
    dailyEarnings: 0,
    totalTransactions: 0,
    averagePerDay: 0,
    topEarningDay: 0,
    referralRewards: 0,
    bonusRewards: 0,
    milestoneRewards: 0,
    networkContribution: 0,
    uptimeBonus: 0,
    performanceBonus: 0
  })
  const [loading, setLoading] = useState(true)

  const rewardsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate API call with comprehensive dummy data
    setTimeout(() => {
      const dummyRewards: RewardTransaction[] = [
        {
          id: 'RWD-001',
          type: 'earning',
          amount: 125.50,
          description: 'Daily call minutes farming',
          timestamp: '2024-01-25 14:30:00',
          status: 'completed',
          source: 'Node UNITY-001'
        },
        {
          id: 'RWD-002',
          type: 'bonus',
          amount: 50.00,
          description: 'Weekly performance bonus',
          timestamp: '2024-01-24 09:15:00',
          status: 'completed',
          source: 'Network Performance'
        },
        {
          id: 'RWD-003',
          type: 'referral',
          amount: 200.00,
          description: 'Referral reward',
          timestamp: '2024-01-23 16:45:00',
          status: 'completed',
          source: 'User Referral'
        },
        {
          id: 'RWD-004',
          type: 'milestone',
          amount: 500.00,
          description: '1000 hours uptime milestone',
          timestamp: '2024-01-22 12:00:00',
          status: 'completed',
          source: 'Milestone Achievement'
        },
        {
          id: 'RWD-005',
          type: 'earning',
          amount: 89.25,
          description: 'International call routing',
          timestamp: '2024-01-21 18:20:00',
          status: 'completed',
          source: 'Node UNITY-002'
        },
        {
          id: 'RWD-006',
          type: 'bonus',
          amount: 75.00,
          description: 'Network contribution bonus',
          timestamp: '2024-01-20 11:30:00',
          status: 'pending',
          source: 'Network Contribution'
        },
        {
          id: 'RWD-007',
          type: 'earning',
          amount: 156.75,
          description: 'Peak hours call processing',
          timestamp: '2024-01-19 20:15:00',
          status: 'completed',
          source: 'Node UNITY-003'
        },
        {
          id: 'RWD-008',
          type: 'milestone',
          amount: 1000.00,
          description: 'First month anniversary bonus',
          timestamp: '2024-01-18 00:00:00',
          status: 'completed',
          source: 'Anniversary Bonus'
        }
      ]

      setRewards(dummyRewards)
      
      const calculatedStats: RewardStats = {
        totalEarned: 2196.50,
        monthlyEarnings: 1250.75,
        weeklyEarnings: 425.25,
        dailyEarnings: 89.50,
        totalTransactions: dummyRewards.length,
        averagePerDay: 78.45,
        topEarningDay: 156.75,
        referralRewards: 200.00,
        bonusRewards: 125.00,
        milestoneRewards: 1500.00,
        networkContribution: 95.5,
        uptimeBonus: 98.2,
        performanceBonus: 97.8
      }
      
      setStats(calculatedStats)
      setLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    // GSAP animations for rewards page
    if (rewardsRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )

      // Stagger animation for stats cards
      gsap.fromTo(".reward-stats-card",
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
        trigger: ".rewards-content",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="web3-loading-spinner mx-auto mb-4"></div>
        <div className="text-white text-xl">Loading rewards...</div>
        </div>
      </div>
    )
  }

  return (
    <div ref={rewardsRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* WebGL Background */}
      <RewardsWebGLBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        

        {/* Performance Metrics */}
        <div className="content-section mb-12 mt-10">
          <Card className="web3-card-holographic">
                <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-blue-400" />
                Performance Metrics
                  </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Track your network performance and contribution scores
              </CardDescription>
                </CardHeader>
                <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl">
                  <div className="text-4xl font-bold text-green-400 mb-2">{stats.uptimeBonus}%</div>
                  <div className="text-slate-400">Uptime Bonus</div>
                    </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{stats.performanceBonus}%</div>
                  <div className="text-slate-400">Performance Bonus</div>
                    </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl">
                  <div className="text-4xl font-bold text-purple-400 mb-2">{stats.topEarningDay}</div>
                  <div className="text-slate-400">Best Day (MNT)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

        {/* Recent Transactions */}
        <div className="content-section">
          <Card className="web3-card-holographic">
                <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">Recent Transactions</CardTitle>
                  <CardDescription className="text-slate-400 text-base">
                    Your latest MNT rewards and earnings
                  </CardDescription>
                  </div>
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {rewards.length} Transactions
                </Badge>
                  </div>
                </CardHeader>
                <CardContent>
              <div className="space-y-4">
                {rewards.map((transaction, index) => (
                  <RewardTransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                  />
                ))}
                  </div>
                </CardContent>
              </Card>
            </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <RewardStatsCard
            title="Total Earned"
            value={stats.totalEarned}
            subtitle="Lifetime earnings"
            icon={Coins}
            color="from-yellow-500/20 to-amber-500/20"
            delay={0}
            trend={{ value: 15, isPositive: true }}
            suffix=" MNT"
          />
          <RewardStatsCard
            title="Monthly Earnings"
            value={stats.monthlyEarnings}
            subtitle="This month"
            icon={Calendar}
            color="from-green-500/20 to-emerald-500/20"
            delay={0.1}
            trend={{ value: 22, isPositive: true }}
            suffix=" MNT"
          />
          <RewardStatsCard
            title="Weekly Earnings"
            value={stats.weeklyEarnings}
            subtitle="This week"
            icon={TrendingUp}
            color="from-blue-500/20 to-cyan-500/20"
            delay={0.2}
            trend={{ value: 8, isPositive: true }}
            suffix=" MNT"
          />
          <RewardStatsCard
            title="Daily Average"
            value={stats.averagePerDay}
            subtitle="Per day"
            icon={Target}
            color="from-purple-500/20 to-pink-500/20"
            delay={0.3}
            trend={{ value: 12, isPositive: true }}
            suffix=" MNT"
          />
              </div>
              
        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <RewardStatsCard
            title="Referral Rewards"
            value={stats.referralRewards}
            subtitle="From referrals"
            icon={Users}
            color="from-cyan-500/20 to-blue-500/20"
            delay={0.4}
            suffix=" MNT"
          />
          <RewardStatsCard
            title="Bonus Rewards"
            value={stats.bonusRewards}
            subtitle="Performance bonuses"
            icon={Gift}
            color="from-emerald-500/20 to-teal-500/20"
            delay={0.5}
            suffix=" MNT"
          />
          <RewardStatsCard
            title="Milestone Rewards"
            value={stats.milestoneRewards}
            subtitle="Achievement bonuses"
            icon={Trophy}
            color="from-indigo-500/20 to-purple-500/20"
            delay={0.6}
            suffix=" MNT"
          />
          <RewardStatsCard
            title="Network Contribution"
            value={stats.networkContribution}
            subtitle="Contribution score"
            icon={Network}
            color="from-rose-500/20 to-pink-500/20"
            delay={0.7}
            suffix="%"
          />
        </div>
      </div>
    </div>
  )
}
