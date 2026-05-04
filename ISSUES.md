# YourPost Webmail Issues

This file tracks known issues and bugs in the YourPost Webmail frontend.

## Completed

### 1. JWT Auth Integration ✅
- **Location**: `src/lib/auth.ts`, `src/lib/api.ts`, `src/components/LoginPage.tsx`
- **Implementation**:
  - `getUserRole()` decodes JWT payload via base64url to extract `role` claim
  - `setAuthCookies()` / `clearAuthCookies()` helpers consolidate cookie management
  - All API calls pass `Authorization: Bearer <token>` header via `authHeaders()`
  - Login stores token in cookie; role is read directly from the JWT on each page load

### 2. Registration Endpoint ✅
- **Location**: `src/lib/api.ts`
- **Description**: `register()` calls `POST /api/v1/users` (admin-only); first user gets `role: admin`.

### 3. RBAC UI ✅
- **Location**: `src/lib/auth.ts`, `src/app/(app)/admin/page.tsx`
- **Description**: `isAdmin()` gates admin page; non-admins are redirected to `/inbox`.

### 4. Admin Panel ✅
- **Location**: `src/app/(app)/admin/page.tsx`
- **Features**:
  - List users with role badge, quota, and active status
  - Create user form (email, password, role selector)
  - Deactivate / Reactivate buttons

### 5. Missing API Functions ✅
- **Location**: `src/lib/api.ts`
- **Added**: `sendMessage`, `deleteMessage`, `updateUser`, `deactivateUser`

### 6. Theme Toggle / Public Homepage / Layout ✅
- Separated public and authenticated layouts; theme-aware SVG logo.

## Open Items

### 7. Token Refresh
- **Status**: Open
- **Description**: Tokens expire after 24h; there is no silent refresh. User must re-login.
- **Fix Needed**: Detect 401 responses in `api.ts` and redirect to `/login`.

### 8. Send Email UI
- **Status**: Open
- **Description**: `sendMessage` API function exists but no compose UI in the webmail.
- **Fix Needed**: Add compose modal or page at `(app)/compose`.

### 9. Unread Count / Badge
- **Status**: Open
- **Description**: `Message.seen` is returned by the API but not shown in the folder list.

### 10. Forgot Password
- **Status**: Open
- **Description**: `/forgot-password` page exists but has no backend endpoint.

---

**Last Updated**: 2026-05-04
