"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Key, 
  Download, 
  Copy, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Users,
  Globe,
  Zap
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface License {
  id: number
  licenseKey: string
  userId: string | null
  status: string
  nodeType: string
  stakeAmount: number
  generatedAt: string | null
  usedAt: string | null
}

interface Stats {
  licenses: {
    total: number
    available: number
    generated: number
    used: number
    breakdown: {
      switch: number
      validation: number
    }
  }
  activity: {
    recentGenerations: number
    last24Hours: number
  }
  network: {
    totalUsers: number
    activeNodes: number
    totalMinutesFarmed: number
    totalMntDistributed: number
    networkUptime: number
    averageRewardPerUser: number
  }
}

export default function DashboardPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedNodeType, setSelectedNodeType] = useState<string>('')
  const { toast } = useToast()

  useEffect(() => {
    fetchStats()
    fetchLicenses()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchLicenses = async () => {
    try {
      const response = await fetch('/api/licenses')
      const data = await response.json()
      if (data.success) {
        setLicenses(data.data)
      }
    } catch (error) {
      console.error('Error fetching licenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateLicense = async () => {
    setGenerating(true)
    try {
      const userId = `user_${Date.now()}` // Mock user ID
      const response = await fetch('/api/licenses/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          nodeType: selectedNodeType || undefined
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "License Generated!",
          description: "Your Unity Node license has been generated successfully.",
        })
        fetchLicenses()
        fetchStats()
      } else {
        toast({
          title: "Generation Failed",
          description: data.error || "Failed to generate license",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error generating license:', error)
      toast({
        title: "Error",
        description: "Failed to generate license",
        variant: "destructive"
      })
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "License key copied to clipboard",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="secondary" className="bg-green-500/20 text-green-400">Available</Badge>
      case 'generated':
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Generated</Badge>
      case 'used':
        return <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">Used</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getNodeTypeBadge = (nodeType: string) => {
    switch (nodeType) {
      case 'switch':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Switch Node</Badge>
      case 'validation':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Validation Node</Badge>
      default:
        return <Badge>{nodeType}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Unity Nodes Dashboard</h1>
          <p className="text-slate-300">Manage your Unity Node licenses and track your MNT rewards</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="web3-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Licenses</CardTitle>
                <Key className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.licenses.total.toLocaleString()}</div>
                <p className="text-xs text-slate-400">
                  {stats.licenses.available} available
                </p>
              </CardContent>
            </Card>

            <Card className="web3-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Active Nodes</CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.network.activeNodes.toLocaleString()}</div>
                <p className="text-xs text-slate-400">
                  {stats.network.totalUsers.toLocaleString()} total users
                </p>
              </CardContent>
            </Card>

            <Card className="web3-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Minutes Farmed</CardTitle>
                <Clock className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.network.totalMinutesFarmed.toLocaleString()}</div>
                <p className="text-xs text-slate-400">
                  Network total
                </p>
              </CardContent>
            </Card>

            <Card className="web3-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">MNT Distributed</CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.network.totalMntDistributed.toLocaleString()}</div>
                <p className="text-xs text-slate-400">
                  ${stats.network.averageRewardPerUser} avg per user
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* License Generation */}
        <Card className="web3-card mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-400" />
              Generate New License
            </CardTitle>
            <CardDescription className="text-slate-400">
              Create a new Unity Node license to start farming MNT rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedNodeType} onValueChange={setSelectedNodeType}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Select node type (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="switch">Switch Node (50,000 MNT stake)</SelectItem>
                  <SelectItem value="validation">Validation Node (10,000 MNT stake)</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={generateLicense} 
                disabled={generating}
                className="web3-button"
              >
                {generating ? "Generating..." : "Generate License"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Licenses Table */}
        <Card className="web3-card">
          <CardHeader>
            <CardTitle className="text-white">All Licenses</CardTitle>
            <CardDescription className="text-slate-400">
              View and manage all Unity Node licenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate-300">License Key</TableHead>
                    <TableHead className="text-slate-300">Type</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Stake Amount</TableHead>
                    <TableHead className="text-slate-300">Generated</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licenses.map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-mono text-sm text-white">
                        {license.licenseKey}
                      </TableCell>
                      <TableCell>
                        {getNodeTypeBadge(license.nodeType)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(license.status)}
                      </TableCell>
                      <TableCell className="text-white">
                        {license.stakeAmount.toLocaleString()} MNT
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {license.generatedAt 
                          ? new Date(license.generatedAt).toLocaleDateString()
                          : '-'
                        }
                      </TableCell>
                      <TableCell>
                        {license.status === 'generated' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(license.licenseKey)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
