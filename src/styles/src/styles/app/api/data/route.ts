import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hola, este es un dato interno', timestamp: new Date().toISOString() })
}
