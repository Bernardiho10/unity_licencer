import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Get license statistics
    const totalLicenses = await prisma.license.count()
    const availableLicenses = await prisma.license.count({
      where: { status: 'available' }
    })
    const generatedLicenses = await prisma.license.count({
      where: { status: 'generated' }
    })
    const usedLicenses = await prisma.license.count({
      where: { status: 'used' }
    })

    // Get node type breakdown
    const switchNodes = await prisma.license.count({
      where: { nodeType: 'switch' }
    })
    const validationNodes = await prisma.license.count({
      where: { nodeType: 'validation' }
    })

    // Get recent activity
    const recentGenerations = await prisma.license.count({
      where: {
        status: 'generated',
        generatedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    })

    // Mock network stats (in production, these would come from actual network data)
    const networkStats = {
      totalUsers: 34000000,
      activeNodes: generatedLicenses,
      totalMinutesFarmed: Math.floor(Math.random() * 1000000) + 500000,
      totalMntDistributed: Math.floor(Math.random() * 100000) + 50000,
      networkUptime: 99.9,
      averageRewardPerUser: 15.7
    }

    return NextResponse.json({
      success: true,
      data: {
        licenses: {
          total: totalLicenses,
          available: availableLicenses,
          generated: generatedLicenses,
          used: usedLicenses,
          breakdown: {
            switch: switchNodes,
            validation: validationNodes
          }
        },
        activity: {
          recentGenerations,
          last24Hours: recentGenerations
        },
        network: networkStats
      }
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
