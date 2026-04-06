import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from the backend API!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
}
