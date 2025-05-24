import { NextResponse } from 'next/server';

const API_KEY = '06e401f5-fe18-4fb8-b2d0-6deca0054fa1';
const API_URL = 'https://cms-tau-wheat.vercel.app/api/content';

export const dynamic = 'force-dynamic'; // Disable caching for this route

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');

  if (apiKey !== API_KEY) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
  }

  try {
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
} 