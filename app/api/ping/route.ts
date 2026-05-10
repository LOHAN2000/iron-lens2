import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { status: 'ok', message: 'Iron-Lens Server is Awake' },
    { status: 200 }
  );
}