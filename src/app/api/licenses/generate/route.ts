import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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

    // Check if user already has a generated license
    const existingLicense = await prisma.license.findFirst({
      where: {
        userId,
        status: 'generated'
      }
    })

    if (existingLicense) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User already has a generated license',
          data: existingLicense
        },
        { status: 409 }
      )
    }

    // Find an available license
    const where: any = { status: 'available' }
    if (nodeType) {
      where.nodeType = nodeType
    }

    const availableLicense = await prisma.license.findFirst({
      where,
      orderBy: {
        createdAt: 'asc' // FIFO order
      }
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
