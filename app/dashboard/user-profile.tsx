'use client'

import { useUser } from '@clerk/nextjs'

export function UserProfile() {
  const { user, isLoaded } = useUser()

  console.log(user, isLoaded)

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg className="animate-spin w-6 h-6 text-[#6c47ff]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }

  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((n) => n![0])
    .join('')
    .toUpperCase() || user?.emailAddresses[0]?.emailAddress[0].toUpperCase()

  const fields = [
    { label: 'User ID', value: user?.id ?? '—', mono: true },
    { label: 'Email', value: user?.emailAddresses[0]?.emailAddress ?? '—', mono: false },
    { label: 'First name', value: user?.firstName ?? '—', mono: false },
    { label: 'Last name', value: user?.lastName ?? '—', mono: false },
    {
      label: 'Created',
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '—',
      mono: false,
    },
  ]

  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.firstName ?? 'User'}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#6c47ff]/10 border border-[#6c47ff]/20 flex items-center justify-center text-[#6c47ff] font-bold text-lg">
            {initials}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {user?.firstName ? `Welcome back, ${user.firstName}` : 'Your Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Fetched client-side with{' '}
            <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 text-xs">useUser()</code>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Authenticated
          </span>
        </div>

        <dl>
          {fields.map((f, i) => (
            <div
              key={f.label}
              className={`grid grid-cols-[140px_1fr] gap-4 px-5 py-3.5 ${
                i < fields.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <dt className="text-xs font-medium text-gray-400 pt-0.5">{f.label}</dt>
              <dd className={`text-sm text-gray-900 break-all ${f.mono ? 'font-mono text-xs text-gray-600' : ''}`}>
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}
