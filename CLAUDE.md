# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 MANDATORY: Execute Development Rules

**FIRST AND ALWAYS**: Execute all rules defined in `rules.md` - These are strict development rules that must be followed at all times without exception.

## 🚨 CRITICAL: Always Reference Documentation

**Before making ANY changes**, ALWAYS read the comprehensive documentation in `documentation/`:

- `PROJECT_OVERVIEW.md` - Business context and goals
- `ARCHITECTURE.md` - System design and patterns
- `DOMAIN_MODELS.md` - Business entities and relationships
- `DEVELOPMENT_PATTERNS.md` - Code organization and best practices
- `TASK_GUIDELINES.md` - Step-by-step workflow guidance
- `AI_AGENT_INSTRUCTIONS.md` - Specific AI development guidance

**After making ANY significant changes**, you MUST update the relevant documentation files to keep them in sync with the codebase.

## Essential Commands

**Development:**

- `pnpm dev` - Run both store and admin apps in parallel
- `pnpm dev --filter=store` - Run only the customer store app
- `pnpm dev --filter=admin` - Run only the admin panel app
- `pnpm dev --filter="@ecommerce/*"` - Run development for all shared packages

**Building:**

- `pnpm build` - Build all apps and packages (shared packages build first due to dependencies)
- `pnpm build --filter="@ecommerce/*"` - Build only shared packages
- `pnpm build --filter="./apps/*"` - Build only applications

**Code Quality:**

- `pnpm lint` - Lint entire monorepo
- `pnpm type-check` - TypeScript checking across all packages
- `pnpm format` - Format all code with Prettier
- `pnpm clean` - Clean all build artifacts and turbo cache
- `pnpm format-file <file>` - Format a specific file
- `pnpm lint-file <file>` - Lint a specific file

## Architecture Overview

This is a **Turborepo monorepo** with two Next.js 14+ applications sharing common packages. The architecture follows a strict dependency hierarchy:

### Dependency Hierarchy (bottom-up)

1. **@ecommerce/types** - Domain models (Product, User, Order, Cart) and common interfaces
2. **@ecommerce/config** - Shared ESLint, Prettier, and TypeScript configurations
3. **@ecommerce/utils** - Utility functions for formatting, validation, and API clients
4. **@ecommerce/ui** - Reusable shadcn/ui components with Tailwind CSS
5. **Applications** - Store (customer-facing) and Admin (management interface)

### Critical Architectural Rules

- **Never create circular dependencies** between packages
- **Always import from package entry points** (index.js/ts), not internal files
- **Shared packages must build before applications** (handled by Turborepo)
- **Types package is the foundation** - defines domain models used everywhere
- **UI package depends on utils and types** for consistent component APIs

### Monorepo Structure

- `apps/store/` - Customer-facing Next.js app (product browsing, cart, checkout)
- `apps/admin/` - Admin Next.js app (product/order/customer management)
- `packages/types/src/` - Domain models: product.ts, user.ts, order.ts, common.ts
- `packages/ui/src/` - Shared components built with shadcn/ui and Tailwind
- `packages/utils/src/` - Shared utilities: format.ts, validation.ts, api.ts
- `packages/config/` - Shared configurations for ESLint, Prettier, TypeScript

### Next.js App Architecture

Both apps use **Next.js 14+ App Router** with:

- `src/app/` - App Router pages and layouts
- `src/components/ui/` - App-specific shadcn/ui components
- `src/lib/utils.ts` - App-specific utility functions

### Key Development Patterns

**When to use shared vs app-specific code:**

- **Shared packages**: Logic used by both apps, consistent business rules, reusable components
- **App-specific**: Unique user experiences, specialized pages, app-specific business logic

**Import patterns:**

```typescript
// Correct - from package entry points
import { Product, User } from "@ecommerce/types"
import { formatPrice } from "@ecommerce/utils"
import { Button } from "@ecommerce/ui"

// Wrong - don't import from internal files
import { Product } from "@ecommerce/types/src/product"
```

**Working with packages:**

- **Modify types first** when changing domain models - other packages depend on these
- **Test in both apps** when changing shared packages
- **Build packages** (`pnpm build --filter="@ecommerce/*"`) before building apps when making changes

## Domain Model Context

The ecommerce domain centers around:

- **Products** with variants, inventory, and SEO metadata
- **Users** with roles (customer/admin/staff) and multiple addresses
- **Orders** with status workflows (pending → confirmed → shipped → delivered)
- **Carts** for session-based shopping before checkout

These models are defined in `@ecommerce/types` and used throughout both applications.

## Development Workflow

1. **ALWAYS start by reading `documentation/`** - Contains comprehensive patterns, guidelines, and architectural decisions
2. **Reference `TASK_GUIDELINES.md`** for specific workflows (adding features, creating components, etc.)
3. **Follow `DEVELOPMENT_PATTERNS.md`** for code organization and best practices
4. **Start with types** when adding new features that span multiple packages
5. **Build incrementally** - shared packages first, then applications
6. **Test across both apps** when modifying shared code
7. **Use Turborepo filtering** to work on specific parts of the monorepo efficiently
8. **Update documentation** after any significant architectural changes or new patterns

## Documentation Maintenance Rules

**MANDATORY**: After every significant change, update the relevant documentation:

- **New features**: Update `DOMAIN_MODELS.md` if business logic changes
- **Architecture changes**: Update `ARCHITECTURE.md` and `DEVELOPMENT_PATTERNS.md`
- **New patterns**: Update `DEVELOPMENT_PATTERNS.md` and `TASK_GUIDELINES.md`
- **Technology changes**: Update `TECHNOLOGY_DECISIONS.md`
- **Process changes**: Update `AI_AGENT_INSTRUCTIONS.md`
