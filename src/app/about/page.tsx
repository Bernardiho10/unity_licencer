"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  Phone,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="web3-text-gradient">Unity Nodes</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Revolutionizing telecommunications through decentralized infrastructure and democratizing access to telecom revenues
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="web3-card">
            <CardHeader>
              <CardTitle className="text-white text-3xl text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto leading-relaxed">
                Unity Nodes democratizes telecommunications by allowing anyone to participate in the Minutes Network DePIN ecosystem. 
                We turn everyday phone calls into passive income opportunities while supporting a decentralized telecom infrastructure 
                that benefits users worldwide.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What is Unity Nodes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What are Unity Nodes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="web3-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-blue-400" />
                  Mobile-Based Nodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Unity Nodes are mobile-based nodes in the Minutes Network DePIN ecosystem that allow users to "mine" 
                  MNT cryptocurrency by consuming unused call minutes on their phone.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    No additional hardware required
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Works with any carrier
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Seamless integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="web3-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-purple-400" />
                  Passive Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  A static cost is deducted per call, and revenues from international call terminations are pooled 
                  and distributed as rewards to node operators.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Earn while you call
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Monthly reward distribution
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    No lockup periods
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Download App</h3>
              <p className="text-slate-400 text-sm">
                Get the Unity App from your app store and install it on your phone
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Generate License</h3>
              <p className="text-slate-400 text-sm">
                Create your Unity Node license and activate it in the app
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Make Calls</h3>
              <p className="text-slate-400 text-sm">
                Use your phone normally - the app tracks your call minutes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-400">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Earn Rewards</h3>
              <p className="text-slate-400 text-sm">
                Receive MNT rewards based on your node stake and activity
              </p>
            </div>
          </div>
        </div>

        {/* Node Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Node Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="web3-card border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-6 h-6 mr-3 text-purple-400" />
                  Switch Nodes
                </CardTitle>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 w-fit">
                  50,000 MNT Stake
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Premium nodes with higher reward potential and limited supply. Perfect for users looking to maximize their earnings.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Higher reward multiplier
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Limited to 500 nodes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Priority in reward distribution
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="web3-card border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-blue-400" />
                  Validation Nodes
                </CardTitle>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 w-fit">
                  10,000 MNT Stake
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Entry-level nodes with lower barrier to entry. Great for users new to the ecosystem or with smaller budgets.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Lower entry cost
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    2,500 nodes available
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Consistent rewards
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Unity Nodes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="web3-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-400" />
                  Global Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Join a worldwide network of 34M+ users across 180+ countries, all working together to decentralize telecommunications.
                </p>
              </CardContent>
            </Card>

            <Card className="web3-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-400" />
                  Secure & Reliable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Built on proven blockchain technology with 99.9% network uptime and secure reward distribution.
                </p>
              </CardContent>
            </Card>

            <Card className="web3-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
                  Growing Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Be part of the future of telecommunications as the network expands and rewards increase over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Start earning MNT rewards today and be part of the decentralized telecom future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="web3-button text-lg px-8 py-4">
              <Zap className="w-5 h-5 mr-2" />
              Generate Your License
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-4">
              <ArrowRight className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
