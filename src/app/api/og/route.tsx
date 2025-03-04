import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Configure options for the OG response
export const contentType = 'image/png';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'CodePulse';

  try {
    // Load the font
    const fontData = await fetch(
      new URL("../../../assets/fonts/Inter_24pt-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // Generate the image
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#111827',
            color: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.25 17.75L4.75 12L9.25 6.25M4.75 12H19.25"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                marginLeft: '10px',
              }}
            >
              CodePulse
            </span>
          </div>
          
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '20px',
              maxWidth: '90%',
              wordBreak: 'break-word'
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1F2937',
              padding: '16px',
              borderRadius: '8px',
              marginTop: '20px',
              width: '80%',
            }}
          >
            <div
              style={{
                fontSize: 24,
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                <path
                  d="M7 8h10M7 12h10M7 16h10"
                  stroke="#60A5FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              View full code snippet
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );

    // Add cache control headers to prevent caching issues on social platforms
    const headers = new Headers(imageResponse.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Content-Type', 'image/png');
    
    // Return the response with the added headers
    return new Response(imageResponse.body, { 
      status: imageResponse.status, 
      headers
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // If there's an error, return a fallback image or an error message
    return new Response('Failed to generate image', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
