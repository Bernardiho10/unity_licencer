"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Phone, 
  Download,
  ArrowRight,
  Zap,
  Globe,
  Users
} from 'lucide-react'

interface RewardStats {
  today: {
    minutesFarmed: number
    mntEarned: number
    calls: number
  }
  thisWeek: {
    minutesFarmed: number
    mntEarned: number
    calls: number
  }
  thisMonth: {
    minutesFarmed: number
    mntEarned: number
    calls: number
  }
}

interface NetworkStats {
  totalUsers: number
  activeNodes: number
  totalMinutesFarmed: number
  totalMntDistributed: number
  networkUptime: number
  averageRewardPerUser: number
}

export default function RewardsPage() {
  const [rewards, setRewards] = useState<RewardStats | null>(null)
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRewards()
    fetchNetworkStats()
  }, [])

  const fetchRewards = async () => {
    try {
      const userId = `user_${Date.now()}` // Mock user ID
      const response = await fetch(`/api/rewards?userId=${userId}`)
      const data = await response.json()
      if (data.success) {
        setRewards(data.data.stats)
      }
    } catch (error) {
      console.error('Error fetching rewards:', error)
    }
  }

  const fetchNetworkStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      if (data.success) {
        setNetworkStats(data.data.network)
      }
    } catch (error) {
      console.error('Error fetching network stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading rewards...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="web3-text-gradient">MNT Rewards</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Track your earnings and see how your Unity Node is performing in the Minutes Network ecosystem
          </p>
        </div>

        {/* Your Rewards Section */}
        {rewards && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Your Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" />
                    Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Minutes Farmed</span>
                      <span className="text-white font-semibold">{rewards.today.minutesFarmed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">MNT Earned</span>
                      <span className="text-green-400 font-semibold">{rewards.today.mntEarned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Calls Made</span>
                      <span className="text-white font-semibold">{rewards.today.calls}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Minutes Farmed</span>
                      <span className="text-white font-semibold">{rewards.thisWeek.minutesFarmed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">MNT Earned</span>
                      <span className="text-green-400 font-semibold">{rewards.thisWeek.mntEarned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Calls Made</span>
                      <span className="text-white font-semibold">{rewards.thisWeek.calls}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Minutes Farmed</span>
                      <span className="text-white font-semibold">{rewards.thisMonth.minutesFarmed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">MNT Earned</span>
                      <span className="text-green-400 font-semibold">{rewards.thisMonth.mntEarned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Calls Made</span>
                      <span className="text-white font-semibold">{rewards.thisMonth.calls}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Network Statistics */}
        {networkStats && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Network Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {networkStats.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-slate-400 text-sm">Active network participants</p>
                </CardContent>
              </Card>

              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-400" />
                    Active Nodes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {networkStats.activeNodes.toLocaleString()}
                  </div>
                  <p className="text-slate-400 text-sm">Unity Nodes in operation</p>
                </CardContent>
              </Card>

              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-green-400" />
                    Network Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {networkStats.networkUptime}%
                  </div>
                  <p className="text-slate-400 text-sm">Reliable infrastructure</p>
                </CardContent>
              </Card>

              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-yellow-400" />
                    Minutes Farmed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {networkStats.totalMinutesFarmed.toLocaleString()}
                  </div>
                  <p className="text-slate-400 text-sm">Total network minutes</p>
                </CardContent>
              </Card>

              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                    MNT Distributed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    {networkStats.totalMntDistributed.toLocaleString()}
                  </div>
                  <p className="text-slate-400 text-sm">Total rewards paid out</p>
                </CardContent>
              </Card>

              <Card className="web3-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                    Avg Reward/User
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">
                    ${networkStats.averageRewardPerUser}
                  </div>
                  <p className="text-slate-400 text-sm">Monthly average</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* How It Works */}
        <Card className="web3-card mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl">How Rewards Work</CardTitle>
            <CardDescription className="text-slate-400">
              Understanding the Minutes Network reward distribution system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Make Calls</h3>
                <p className="text-slate-400">
                  Use your phone normally. The Unity App tracks your unused and international call minutes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Network Processing</h3>
                <p className="text-slate-400">
                  The network terminates calls globally, generating revenue from international call terminations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Earn Rewards</h3>
                <p className="text-slate-400">
                  Revenue is distributed: 25% to users, 60% to node operators, 15% to network expansion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users already farming MNT rewards with their Unity Nodes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="web3-button text-lg px-8 py-4">
              <Download className="w-5 h-5 mr-2" />
              Download Unity App
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-4">
              <ArrowRight className="w-5 h-5 mr-2" />
              Generate License
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
