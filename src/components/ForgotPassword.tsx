'use client'

import Link from 'next/link'

export default function ForgotPassword() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
          Reset your password
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter your email to receive a reset link
        </p>
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Forgot password functionality is not yet implemented.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Please contact your administrator or try logging in again.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 px-6 py-2 bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-600 text-white font-medium rounded-md transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </>
  )
}
