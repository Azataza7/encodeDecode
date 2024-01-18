'use client';

import { Inter } from 'next/font/google'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
      </html>
    </QueryClientProvider>
  )
}
