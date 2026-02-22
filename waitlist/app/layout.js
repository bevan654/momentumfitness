import './globals.css';

export const metadata = {
  title: 'Momentum Fitness | The All-in-One Fitness Platform',
  description:
    'Workouts, nutrition, recovery, supplements, strength ranking, and social — all in one premium platform. Join the beta waitlist.',
  openGraph: {
    title: 'Momentum Fitness | The All-in-One Fitness Platform',
    description:
      'Stop switching between 5 fitness apps. Join the beta waitlist for the all-in-one fitness platform.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#07070A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased min-h-screen selection:bg-electric/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
