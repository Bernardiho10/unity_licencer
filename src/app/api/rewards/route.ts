import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const period = searchParams.get('period') || 'monthly'

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user's rewards
    const rewards = await prisma.reward.findMany({
      where: {
        userId,
        period: period
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate totals
    const totalMinutesFarmed = rewards.reduce((sum, reward) => sum + (reward.minutesFarmed || 0), 0)
    const totalMntEarned = rewards.reduce((sum, reward) => sum + (reward.mntEarned || 0), 0)

    // Mock data for demonstration (in production, this would come from actual call data)
    const mockStats = {
      today: {
        minutesFarmed: Math.floor(Math.random() * 50) + 10,
        mntEarned: Math.floor(Math.random() * 5) + 1,
        calls: Math.floor(Math.random() * 20) + 5
      },
      thisWeek: {
        minutesFarmed: Math.floor(Math.random() * 300) + 100,
        mntEarned: Math.floor(Math.random() * 30) + 10,
        calls: Math.floor(Math.random() * 100) + 50
      },
      thisMonth: {
        minutesFarmed: Math.floor(Math.random() * 1200) + 500,
        mntEarned: Math.floor(Math.random() * 120) + 50,
        calls: Math.floor(Math.random() * 400) + 200
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        rewards,
        totals: {
          minutesFarmed: totalMinutesFarmed,
          mntEarned: totalMntEarned
        },
        stats: mockStats,
        period
      }
    })
  } catch (error) {
    console.error('Error fetching rewards:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rewards' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, minutesFarmed, mntEarned, period = 'monthly' } = body

    if (!userId || !minutesFarmed || !mntEarned) {
      return NextResponse.json(
        { success: false, error: 'User ID, minutes farmed, and MNT earned are required' },
        { status: 400 }
      )
    }

    const reward = await prisma.reward.create({
      data: {
        userId,
        amount: mntEarned,
        type: 'mining',
        status: 'confirmed',
        period,
        minutesFarmed,
        mntEarned
      }
    })

    return NextResponse.json({
      success: true,
      data: reward,
      message: 'Reward recorded successfully'
    })
  } catch (error) {
    console.error('Error creating reward:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create reward' },
      { status: 500 }
    )
  }
}
