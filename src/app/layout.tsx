import '../styles/index.css';
import ThemeProvider from '@components/ThemeProvider';
import Header from '@components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vite + React + TS',
  description: 'My App migrated from Vite to Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
