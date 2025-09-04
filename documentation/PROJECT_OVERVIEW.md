# Project Overview

## Purpose
This is a custom ecommerce platform built as a monorepo containing two main applications:
- Customer-facing storefront for browsing and purchasing products
- Administrative panel for managing the store operations

## Business Context
The platform follows modern ecommerce patterns supporting:
- Product catalog management with variants and inventory tracking
- Shopping cart and checkout functionality
- Order processing and fulfillment workflows
- Customer account management
- Administrative oversight and analytics

## Current Development Stage
**Foundation Complete**: The project has a fully established monorepo foundation with shared packages, build systems, and development tooling configured.

**Implementation Phase**: Core ecommerce functionality is ready to be built on top of the established architecture.

## Key Components
- **Store Application**: Customer-facing Next.js app for product browsing, cart management, and checkout
- **Admin Application**: Administrative Next.js app for managing products, orders, and customers
- **Shared Packages**: Reusable components, utilities, types, and configurations across applications

## Project Boundaries
- **In Scope**: Frontend applications, shared component library, type definitions, development tooling
- **Out of Scope Initially**: Backend API, database layer, authentication service, payment processing
- **Future Considerations**: API integration points are designed into the architecture

## Quality Standards
- Type safety enforced throughout with strict TypeScript
- Consistent code formatting with Prettier
- Linting rules enforce best practices
- Build optimization with Turborepo
- Component reusability through shared packages

## Success Criteria
- Fast development cycles with hot reloading
- Consistent UI/UX across both applications
- Easy maintenance through shared code
- Scalable architecture for future features
- Developer-friendly with comprehensive tooling

## Development Philosophy
- Shared-first approach for common functionality
- Type-driven development for reliability
- Component composition over inheritance
- Convention over configuration where possible
- Documentation as code for maintainability