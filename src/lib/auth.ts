export function getToken(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/yourpost-token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export function getEmail(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/yourpost-email=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const padded = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getUserRole(): string {
  const token = getToken();
  if (!token) return 'user';
  const payload = decodeJwtPayload(token);
  if (!payload) return 'user';
  return typeof payload.role === 'string' ? payload.role : 'user';
}

export function isAdmin(): boolean {
  return getUserRole() === 'admin';
}

export function isAuthenticated(): boolean {
  return getToken() !== '';
}

export function setAuthCookies(token: string, email: string, maxAge: number): void {
  document.cookie = `yourpost-token=${encodeURIComponent(token)}; path=/; max-age=${maxAge}`;
  document.cookie = `yourpost-email=${encodeURIComponent(email)}; path=/; max-age=${maxAge}`;
}

export function clearAuthCookies(): void {
  document.cookie = 'yourpost-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'yourpost-email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
