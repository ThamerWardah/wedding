import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

// Path to store the JSON file
const dataFilePath = path.join(process.cwd(), 'data', 'rsvps.json')

// Helper function to ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(dataFilePath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Helper function to read existing RSVPs
function readRSVPs() {
  ensureDataDirectory()

  if (!fs.existsSync(dataFilePath)) {
    return []
  }

  try {
    const fileData = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(fileData)
  } catch (error) {
    console.error('Error reading RSVPs file:', error)
    return []
  }
}

// Helper function to write RSVPs
function writeRSVPs(rsvps) {
  ensureDataDirectory()
  fs.writeFileSync(dataFilePath, JSON.stringify(rsvps, null, 2))
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.attending) {
      return NextResponse.json(
        { error: 'Name and attendance are required' },
        { status: 400 },
      )
    }

    // Ensure guests is a number
    let guestsCount = 0
    if (body.attending === 'yes') {
      guestsCount = typeof body.guests === 'number' ? body.guests : 1
    }

    const rsvp = {
      id: Date.now().toString(),
      name: body.name.trim(),
      email: body.email?.trim() || '',
      attending: body.attending,
      guests: guestsCount,
      message: body.message?.trim() || '',
      timestamp: new Date().toISOString(),
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    }

    // Read existing data
    const existingData = readRSVPs()

    // Add new RSVP
    existingData.push(rsvp)

    // Save to file
    writeRSVPs(existingData)

    return NextResponse.json({
      success: true,
      id: rsvp.id,
      message: 'RSVP submitted successfully',
    })
  } catch (error) {
    console.error('Error saving RSVP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const rsvps = readRSVPs()

    // Sort by timestamp (newest first)
    const sortedRSVPs = rsvps.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

    return NextResponse.json(sortedRSVPs)
  } catch (error) {
    console.error('Error reading RSVPs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
