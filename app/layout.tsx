import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Mentor | Launch Countdown Timer',
  description: "We're launching soon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
