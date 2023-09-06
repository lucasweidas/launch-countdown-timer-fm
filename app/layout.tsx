import './globals.css';
import type { Metadata } from 'next';
import { Red_Hat_Text } from 'next/font/google';

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
});

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
      <body
        className={`${redHatText.className} min-h-screen bg-hero bg-no-repeat xl:bg-hero-size`}
      >
        {children}
      </body>
    </html>
  );
}
