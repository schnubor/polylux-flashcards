import './globals.css'

// Types
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Polylux Flashcards',
  description: 'Deine Flashcards für die Polylux Prüfung',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
