'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'

const logoFilledSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M2 11.25C2 8.35051 4.01472 6 6.5 6C8.98528 6 11 8.35051 11 11.25V20H4.23256C2.99955 20 2 18.8339 2 17.3953V11.25Z" fill="currentColor"/><path opacity="0.8" d="M11 11.25V20H14H19.7931C21.0119 20 22 18.8473 22 17.4253V11.25C22 8.35051 19.9853 6 17.5 6H6.5C8.98528 6 11 8.35051 11 11.25Z" fill="currentColor"/><path d="M9.5 20V22C9.5 22.4142 9.83579 22.75 10.25 22.75C10.6642 22.75 11 22.4142 11 22V20H9.5Z" fill="currentColor"/><path d="M15 20H13.5V22C13.5 22.4142 13.8358 22.75 14.25 22.75C14.6642 22.75 15 22.4142 15 22V20Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H8C8.41421 15.25 8.75 15.5858 8.75 16C8.75 16.4142 8.41421 16.75 8 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.3846 6.58471L17.6407 6.53344C18.0564 6.45022 18.4863 6.48995 18.8814 6.64813C19.5717 6.92453 20.3266 6.97616 21.0458 6.79618L21.1073 6.7808C21.6309 6.64975 22 6.16299 22 5.60336V3.47284C22 2.73503 21.3358 2.19145 20.6454 2.36421C20.249 2.46342 19.8329 2.43496 19.4523 2.28261L19.3793 2.25335C18.7422 1.99828 18.0491 1.93421 17.3787 2.06841L16.93 2.15824C16.3901 2.26632 16 2.75722 16 3.32846V10.2807C16 10.678 16.31 11 16.6923 11C17.0747 11 17.3846 10.678 17.3846 10.2807V6.58471Z" fill="currentColor"/></svg>'

const logoOutlinedSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M10.5 22V20M14.5 22V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 20V20.75H11.75V20H11ZM14 19.25C13.5858 19.25 13.25 19.5858 13.25 20C13.25 20.4142 13.5858 20.75 14 20.75V19.25ZM17.5 5.25C17.0858 5.25 16.75 5.58579 16.75 6C16.75 6.41421 17.0858 6.75 17.5 6.75V5.25ZM7 5.25C6.58579 5.25 6.25 5.58579 6.25 6C6.25 6.41421 6.58579 6.75 7 6.75V5.25ZM9 19.25C8.58579 19.25 8.25 19.5858 8.25 20C8.25 20.4142 8.58579 20.75 9 20.75V19.25ZM15 20.75C15.4142 20.75 15.75 20.4142 15.75 20C15.75 19.5858 15.4142 19.25 15 19.25V20.75ZM10.25 11.25V20H11.75V11.25H10.25ZM11 19.25H4.23256V20.75H11V19.25ZM2.75 17.3953V11.25H1.25V17.3953H2.75ZM4.23256 19.25C3.51806 19.25 2.75 18.5323 2.75 17.3953H1.25C1.25 19.1354 2.48104 20.75 4.23256 20.75V19.25ZM6.5 6.75C8.46677 6.75 10.25 8.65209 10.25 11.25H11.75C11.75 8.04892 9.50379 5.25 6.5 5.25V6.75ZM6.5 5.25C3.49621 5.25 1.25 8.04892 1.25 11.25H2.75C2.75 8.65209 4.53323 6.75 6.5 6.75V5.25ZM21.25 11.25V17.4253H22.75V11.25H21.25ZM19.7931 19.25H14V20.75H19.7931V19.25ZM21.25 17.4253C21.25 18.5457 20.4934 19.25 19.7931 19.25V20.75C21.5305 20.75 22.75 19.1488 22.75 17.4253H21.25ZM22.75 11.25C22.75 8.04892 20.5038 5.25 17.5 5.25V6.75C19.4668 6.75 21.25 8.65209 21.25 11.25H22.75ZM7 6.75H18V5.25H7V6.75ZM9 20.75H15V19.25H9V20.75Z" fill="currentColor"/><path d="M5 16H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path opacity="0.5" d="M16 9.88432V5.41121M16 5.41121V2.63519C16 2.39905 16.1676 2.19612 16.3994 2.15144L16.8855 2.05779C17.4738 1.94443 18.0821 1.99855 18.6412 2.214L18.7203 2.24451C19.2746 2.4581 19.8807 2.498 20.4582 2.35891C20.7343 2.2924 21 2.50168 21 2.78573V5.00723C21 5.2442 20.8376 5.45031 20.6073 5.5058L20.5407 5.52184C19.9095 5.67387 19.247 5.63026 18.6412 5.39679C18.0821 5.18135 17.4738 5.12722 16.8855 5.24058L16 5.41121Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - App */}
          <Link href="/" className="flex items-center space-x-2">
            <span 
              className="w-7 h-7 text-zinc-900 dark:text-white" 
              dangerouslySetInnerHTML={{ __html: theme === 'light' ? logoOutlinedSvg : logoFilledSvg }} 
            />
            <span className="font-bold text-xl text-zinc-900 dark:text-white">YourPost</span>
            <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">App</span>
          </Link>

          {/* Center - Login/Register */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Login
            </Link>
            <Link href="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up Free
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Self-hosted Link */}
            <a
              href="https://yourpost.io"
              className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Self-hosted?
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                  </g>
                </svg>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h16M4 12h16M4 19h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/login" className="block py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
              Login
            </Link>
            <Link href="/register" className="block py-2 text-sm bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 inline-block">
              Sign Up Free
            </Link>
            <a
              href="https://yourpost.io"
              className="block py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Self-hosted?
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
