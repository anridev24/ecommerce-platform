# Ecommerce Platform

A modern ecommerce platform built with Next.js, TypeScript, and Tailwind CSS in a monorepo structure.

## Project Structure

```
ecommerce-platform/
├── apps/
│   ├── store/          # Customer-facing Next.js app
│   └── admin/          # Admin panel Next.js app
├── packages/
│   ├── ui/            # Shared UI components library
│   ├── config/        # Shared configurations
│   ├── utils/         # Shared utility functions
│   └── types/         # Shared TypeScript types
├── pnpm-workspace.yaml
├── package.json
├── turbo.json
└── README.md
```

## Tech Stack

- **Package Manager**: pnpm (workspaces)
- **Build Tool**: Turborepo
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Run both applications in development mode:

```bash
pnpm dev
```

Run individual applications:

```bash
# Store frontend
cd apps/store && pnpm dev

# Admin panel
cd apps/admin && pnpm dev
```

### Building

Build all applications and packages:

```bash
pnpm build
```

### Scripts

- `pnpm dev` - Run all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Check TypeScript types
- `pnpm clean` - Clean build artifacts

## Applications

### Store (Customer Frontend)

- Product catalog
- Shopping cart
- Checkout process
- User authentication
- Order tracking

### Admin Panel

- Dashboard with analytics
- Product management
- Order management
- Customer management
- Settings and configuration

## Shared Packages

### UI (`@ecommerce/ui`)

Shared UI components built with shadcn/ui and Tailwind CSS.

### Utils (`@ecommerce/utils`)

Common utility functions for formatting, validation, and API calls.

### Types (`@ecommerce/types`)

Shared TypeScript interfaces and types for the entire platform.

### Config (`@ecommerce/config`)

Shared configuration files for ESLint, Prettier, and TypeScript.
