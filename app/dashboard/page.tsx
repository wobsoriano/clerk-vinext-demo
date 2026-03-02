import { auth, clerkClient } from '@clerk/nextjs/server'
import Link from 'next/link'
import { UserProfile } from './user-profile'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await (await clerkClient()).users.getUser(userId!)

  const rawUser = user
    ? {
        id: user.id,
        emailAddresses: user.emailAddresses.map((e) => e.emailAddress),
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
      }
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-10">
          <Link href="/" className="hover:text-gray-600 transition-colors">home</Link>
          <span>/</span>
          <span className="text-gray-600">dashboard</span>
        </div>

        <UserProfile />

        <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden mt-6">
          <summary className="px-5 py-4 flex items-center justify-between cursor-pointer select-none list-none">
            <h2 className="text-sm font-semibold text-gray-900">Raw user object</h2>
            <span className="text-xs text-gray-400 font-mono group-open:hidden">expand</span>
            <span className="text-xs text-gray-400 font-mono hidden group-open:block">collapse</span>
          </summary>
          <div className="border-t border-gray-50">
            <pre className="px-5 py-4 text-xs font-mono text-gray-600 overflow-auto max-h-80 leading-relaxed">
              {JSON.stringify(rawUser, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  )
}
