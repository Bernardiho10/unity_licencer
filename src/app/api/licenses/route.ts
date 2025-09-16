import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const nodeType = searchParams.get('nodeType')
    const userId = searchParams.get('userId')

    const where: Record<string, string | undefined> = {}
    
    if (status) {
      where.status = status
    }
    
    if (nodeType) {
      where.nodeType = nodeType
    }
    
    if (userId) {
      where.userId = userId
    }

    const licenses = await prisma.license.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: licenses,
      count: licenses.length
    })
  } catch (error) {
    console.error('Error fetching licenses:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch licenses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, nodeType } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Find an available license
    const where: Record<string, string> = { status: 'available' }
    if (nodeType) {
      where.nodeType = nodeType
    }

    const availableLicense = await prisma.license.findFirst({
      where
    })

    if (!availableLicense) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No available licenses found',
          nodeType: nodeType || 'any'
        },
        { status: 404 }
      )
    }

    // Update the license to generated status
    const updatedLicense = await prisma.license.update({
      where: { id: availableLicense.id },
      data: {
        status: 'generated',
        userId,
        generatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedLicense,
      message: 'License generated successfully'
    })
  } catch (error) {
    console.error('Error generating license:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate license' },
      { status: 500 }
    )
  }
}
