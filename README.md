# YourPost App

**Universal email client** for YourPost mail server - runs as a web app (Next.js) and native desktop app (Tauri).

[![License: AGPLv3](https://img.shields.io/badge/License-AGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com)
[![Tauri](https://img.shields.io/badge/Tauri-1.0-orange.svg)](https://tauri.app)

## 🌐 Domain Structure

- **yourpost.io** - Open source code and documentation
  - [GitHub Organization](https://github.com/YourPostHQ)
  - [Documentation](https://yourpost.io/docs)
  
- **yourpost.app** - Production deployment instance
  - Mail server backend (Zig)
  - API services
  - Web app frontend (this repo)
  - Admin dashboard

## ✨ Features

- **Modern Email UI** - Clean, responsive email interface
- **JWT Authentication** - Secure login with role-based access control (RBAC)
- **Admin Panel** - User management with role assignment and quota control
- **Multi-Folder Support** - Inbox, Sent, Drafts, Trash, and custom folders
- **Email Composition** - Rich email composer with attachment support
- **Dark Mode** - Automatic and manual theme switching
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **E2E Testing** - Playwright test suite for critical user flows
- **Cloudflare Ready** - Deployable to Cloudflare Pages
- **Tauri Desktop App** - Native desktop app for Windows, macOS, and Linux

## 📁 Project Structure

```
yourpost-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── forgot-password/   # Password recovery
│   │   ├── (app)/             # Authenticated routes
│   │   │   ├── inbox/         # Inbox view
│   │   │   ├── sent/          # Sent mail
│   │   │   └── admin/         # Admin panel
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Header.tsx         # App header
│   │   ├── Footer.tsx         # App footer
│   │   ├── LoginPage.tsx      # Login form
│   │   └── ...                # Other components
│   └── lib/                   # Utility libraries
│       ├── api.ts             # API client functions
│       ├── auth.ts            # Authentication helpers
│       └── ...                # Other utilities
├── public/                     # Static assets
├── e2e/                        # Playwright E2E tests
├── src-tauri/                   # Tauri desktop app (coming soon)
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── wrangler.toml               # Cloudflare Pages config
└── package.json                # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- **A running YourPost backend server** - this webmail is a pure frontend that connects to the backend API (see [YourPost Server README](../yourpost/README.md))
- **No local database or mail storage** - everything is handled by the backend

### 1. Install Dependencies

```bash
cd /root/yourpost-workspace/yourpost-app
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the project root:

```env
# YourPost API endpoint
NEXT_PUBLIC_API_URL=http://localhost:9000

# Optional: Custom port for development
# PORT=3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | YourPost backend API URL | `http://localhost:9000` |
| `PORT` | Development server port | `3000` |

### API Integration

The webmail connects to the YourPost backend via RESTful API:

- **Authentication**: `POST /api/v1/auth/login`
- **User Registration**: `POST /api/v1/users`
- **List Messages**: `GET /api/v1/mailboxes/{email}/messages`
- **Send Email**: `POST /api/v1/mailboxes/{email}/send`
- **Delete Message**: `DELETE /api/v1/mailboxes/{email}/messages/{id}`

See the [YourPost API Documentation](../yourpost/docs/API.md) for complete reference.

## 🧪 Testing

### E2E Tests with Playwright

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

Current test coverage:
- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ Load folders after login
- ✅ Authentication redirects

## 👥 User Roles

### Admin
- Full access to all features
- User management (create, deactivate, update)
- Role assignment
- Quota management

### User
- Access own mailbox
- Send and receive emails
- Manage folders
- Update personal settings

## 🎨 Theming

The webmail supports both light and dark modes:

- **Automatic**: Follows system preference
- **Manual**: Toggle via theme switch in header
- **Persistent**: Choice saved in localStorage

## 📦 Deployment

### Cloudflare Pages (Recommended)

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set environment variables in Cloudflare dashboard
4. Deploy!

Configuration is in `wrangler.toml`:

```toml
name = "yourpost-app"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"

[build.environment]
NODE_VERSION = "18"

[assets]
directory = "out"

[[routes]]
pattern = "yourpost.app"
zone_name = "yourpost.app"
```

**Production URL**: https://yourpost.app

### Tauri Desktop App (Coming Soon)

```bash
# Install Tauri CLI
cargo install tauri-cli

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## 🔒 Security

- **JWT Authentication**: Tokens stored in HTTP-only cookies
- **Role-Based Access**: Admin and user role separation
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Secure Headers**: Configured via Next.js headers API
- **Input Validation**: Client and server-side validation

## 🐛 Known Issues

See [ISSUES.md](ISSUES.md) for current bugs and planned features.

**Current Open Items:**
- Token refresh mechanism (manual re-login required after 24h)
- Compose email UI (API function exists, UI pending)
- Unread count/badge in folder list

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](../yourpost/CONTRIBUTING.md).

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- TypeScript strict mode enabled
- ESLint configuration provided
- Prettier for code formatting
- Component naming: PascalCase
- Files: kebab-case

## 📄 License

This project is licensed under the AGPLv3 License - see the [LICENSE](../yourpost/LICENSE) file in the root YourPost repository for details.

## 🔗 Related Projects

- **[YourPost Server](../yourpost/)** - The backend mail server (Zig)
- **[YourPost Documentation](../yourpost-docs/)** - Documentation website (Next.js)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YourPostHQ/YourPost-App/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YourPostHQ/YourPost-App/discussions)
- **Documentation**: [YourPost Docs](https://yourpost.org/docs)

---

Made with ❤️ by the YourPost team
