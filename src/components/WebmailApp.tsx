'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getFolders, getMessages, getMessage, Folder, Message, MessageDetail } from '@/lib/api'
import { getEmail, clearAuthCookies } from '@/lib/auth'

export default function WebmailApp() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

  // Get email from cookie on mount
  useEffect(() => {
    const userEmail = getEmail()
    if (!userEmail) {
      router.push('/login')
      return
    }
    setEmail(userEmail)
    loadFolders(userEmail)
  }, [])

  async function loadFolders(userEmail: string) {
    try {
      const data = await getFolders(userEmail)
      setFolders(data)
      if (data.length > 0 && !selectedFolder) {
        setSelectedFolder(data[0])
      }
    } catch (err) {
      console.error('Failed to load folders', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedFolder) {
      loadMessages(selectedFolder.name)
    }
  }, [selectedFolder])

  async function loadMessages(folderName: string) {
    try {
      const data = await getMessages(email, folderName)
      setMessages(data)
      setSelectedMessage(null)
    } catch (err) {
      console.error('Failed to load messages', err)
    }
  }

  async function handleSelectMessage(messageId: number) {
    try {
      const data = await getMessage(email, messageId)
      setSelectedMessage(data)
    } catch (err) {
      console.error('Failed to load message', err)
    }
  }

  function handleLogout() {
    clearAuthCookies()
    router.push('/')
  }

  // Determine selected folder from URL path
  useEffect(() => {
    if (folders.length > 0 && pathname) {
      const pathParts = pathname.split('/').filter(Boolean)
      if (pathParts.length >= 1) {
        const folderName = pathParts[0]
        const folder = folders.find(f => 
          f.name.toLowerCase() === folderName.toLowerCase() || 
          (folderName === 'inbox' && f.name.toLowerCase() === 'inbox')
        )
        if (folder) {
          setSelectedFolder(folder)
        } else if (!selectedFolder) {
          setSelectedFolder(folders[0])
        }
      }
    }
  }, [folders, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Folder List */}
          <div className="w-64 bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Folders</h2>
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => {
                    setSelectedFolder(folder)
                    setSelectedMessage(null)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
                    selectedFolder?.id === folder.id
                      ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {folder.name}
                </button>
              ))}
            </div>
          </div>

          {/* Message List */}
          <div className="w-96 bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">
                {selectedFolder?.name || 'Messages'}
              </h2>
              {messages.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No messages</p>
              ) : (
                messages.map(message => (
                  <button
                    key={message.id}
                    onClick={() => handleSelectMessage(message.id)}
                    className={`w-full text-left p-3 rounded-md mb-2 border ${
                      selectedMessage?.id === message.id
                        ? 'border-zinc-500 bg-zinc-50 dark:bg-zinc-800'
                        : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                    }`}
                  >
                    <p className="font-medium text-sm text-zinc-900 dark:text-white truncate">
                      {message.from}
                    </p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 truncate">
                      {message.subject}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {new Date(message.date).toLocaleDateString()}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="flex-1 bg-white dark:bg-zinc-800 overflow-y-auto">
            {selectedMessage ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{email}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-md text-zinc-700 dark:text-zinc-200 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  <p><strong>From:</strong> {selectedMessage.from}</p>
                  <p><strong>To:</strong> {selectedMessage.to}</p>
                  <p><strong>Date:</strong> {new Date(selectedMessage.date).toLocaleString()}</p>
                </div>
                <hr className="border-zinc-200 dark:border-zinc-700 my-4" />
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                    {selectedMessage.body}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500 dark:text-zinc-400">
                Select a message to read
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
