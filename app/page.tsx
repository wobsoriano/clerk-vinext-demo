import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-xs font-medium mb-8 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          Next.js · Clerk · Cloudflare Workers
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Clerk authentication on{' '}
          <span className="text-[#6c47ff]">Cloudflare Workers</span>
        </h1>

        <p className="text-gray-500 leading-relaxed mb-10">
          A minimal example of <span className="font-medium text-gray-700">@clerk/nextjs</span> running
          inside <span className="font-medium text-gray-700">vinext</span> — the Next.js App Router API
          reimplemented on Vite and deployed globally on Cloudflare Workers.
        </p>

        <div className="flex gap-3">
          {userId ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-[#6c47ff] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#5a3dd4] transition-colors"
            >
              Go to Dashboard
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 bg-[#6c47ff] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#5a3dd4] transition-colors"
              >
                Get started
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
