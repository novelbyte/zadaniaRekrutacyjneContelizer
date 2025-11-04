import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Zadania Rekrutacyjne Contelizer',
  description: 'Word shuffle, PESEL validator, GoREST demo'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        {children}
      </body>
    </html>
  );
}
