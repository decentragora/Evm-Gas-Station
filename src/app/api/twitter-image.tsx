import { ImageResponse } from '@vercel/og';
import '@fontsource-variable/space-grotesk';

export const runtime = "edge"

export default async function handler() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(0deg, #1a2d62 20%, #7368CD 100%)',
        fontSize: 60,
        letterSpacing: -2,
        fontWeight: 700,
        fontFamily: 'Space Grotesk',
        textAlign: 'center',
        gap: 40,
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          fontFamily: 'Space Grotesk',
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(201,51,198,1) 100%)',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent',
          ...({ '-webkit-background-clip': 'text' } as any),
        }}
      >
        EVM Gas Station
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 400,
          fontFamily: 'Poppins',
          backgroundImage: 'linear-gradient(90deg, rgba(201,51,198,1) 0%, rgba(255,255,255,1) 100%)',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent',
          ...({ '-webkit-background-clip': 'text' } as any),
        }}
      >
        Your One-Stop Shop for EVM Gas Prices
      </div>

      <div
        style={{
          fontSize: 20,
          fontFamily: 'Space Grotesk',
          fontWeight: 400,
          letterSpacing: 1,
          backgroundImage: 'linear-gradient(90deg, rgba(213,39,39,1) 0%, rgba(201,184,51,1) 100%)',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent',
          ...({ '-webkit-background-clip': 'text' } as any),
        }}
      >
        Ethereum • Polygon • BSC • Optimism • Arbitrum • xDai • Fantom • Avalanche • And more!
      </div>

    </div>
  );
}
