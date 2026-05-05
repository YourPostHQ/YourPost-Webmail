import type { Metadata } from 'next'
import { AuthLayout } from '@/components/AuthLayout'

export const metadata: Metadata = {
  title: {
    default: 'YourPost Webmail',
    template: '%s · YourPost Webmail',
  },
}

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>
}
