import { getToken } from '@/lib/auth'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000'

export interface AuthResponse {
  token: string
  email: string
  role: string
}

export interface Folder {
  id: number
  name: string
}

export interface Message {
  id: number
  from: string
  subject: string
  date: string
  folder_id: number
  seen: boolean
}

export interface MessageDetail extends Message {
  body: string
  to: string
}

function authHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/v1/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Login failed')
  }
  return res.json()
}

export async function createUser(email: string, password: string, role: string = 'user'): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ email, password, role }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'User creation failed')
  }
}

export async function updateUser(email: string, updates: { role?: string; quota_bytes?: number; active?: boolean }): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/users/${encodeURIComponent(email)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(updates),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Update failed')
  }
}

export async function deactivateUser(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/users/${encodeURIComponent(email)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Deactivation failed')
  }
}

export async function getFolders(email: string): Promise<Folder[]> {
  const res = await fetch(`${API_BASE}/api/v1/mailboxes/${encodeURIComponent(email)}/folders`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to fetch folders')
  const data = await res.json()
  return data.folders || []
}

export async function getMessages(email: string, folderName: string): Promise<Message[]> {
  const res = await fetch(
    `${API_BASE}/api/v1/mailboxes/${encodeURIComponent(email)}/messages?folder=${encodeURIComponent(folderName)}`,
    { headers: authHeaders() },
  )
  if (!res.ok) throw new Error('Failed to fetch messages')
  const data = await res.json()
  return data.messages || []
}

export async function getMessage(email: string, messageId: number): Promise<MessageDetail> {
  const res = await fetch(
    `${API_BASE}/api/v1/mailboxes/${encodeURIComponent(email)}/messages/${messageId}`,
    { headers: authHeaders() },
  )
  if (!res.ok) throw new Error('Failed to fetch message')
  return res.json()
}

export async function sendMessage(email: string, to: string, subject: string, body: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/mailboxes/${encodeURIComponent(email)}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ to, subject, body }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Send failed')
  }
}

export async function deleteMessage(email: string, messageId: number): Promise<void> {
  const res = await fetch(
    `${API_BASE}/api/v1/mailboxes/${encodeURIComponent(email)}/messages/${messageId}`,
    { method: 'DELETE', headers: authHeaders() },
  )
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Delete failed')
  }
}
