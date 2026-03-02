import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Clerk × vinext',
  description: 'Next.js App Router on Cloudflare Workers with Clerk authentication',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
          <header className="fixed top-0 inset-x-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-1.5 font-semibold text-sm">
                <span className="text-[#6c47ff]">clerk</span>
                <span className="text-gray-300">×</span>
                <span className="text-gray-900">vinext</span>
              </Link>

              <nav className="flex items-center gap-5">
                <Show when="signed-in">
                  <Link
                    href="/dashboard"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <UserButton />
                </Show>
                <Show when="signed-out">
                  <SignInButton>
                    <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="text-sm bg-[#6c47ff] text-white rounded-full px-4 py-1.5 hover:bg-[#5a3dd4] transition-colors cursor-pointer font-medium">
                      Sign up
                    </button>
                  </SignUpButton>
                </Show>
              </nav>
            </div>
          </header>

          <div className="pt-14">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
