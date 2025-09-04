# Monorepo Guide

## Workspace Organization Principles

### Directory Structure Logic
- **`apps/`**: End-user applications that can be deployed independently
- **`packages/`**: Reusable code shared across applications or other packages
- **Root Level**: Monorepo configuration, documentation, and global tooling

### Package Naming Conventions
- All shared packages use the `@ecommerce/` namespace
- Package names reflect their primary responsibility
- Names are lowercase with hyphens for multi-word packages
- Avoid abbreviations unless universally understood

## Inter-Package Dependencies Rules

### Dependency Direction
- Applications depend on packages, never the reverse
- Packages can depend on other packages following the hierarchy
- No circular dependencies allowed between packages
- Core packages (types, config) have minimal external dependencies

### Import Patterns
- Always import from package entry points, never internal files
- Use TypeScript path mapping for clean imports
- Prefer named imports over default imports for tree shaking
- Group imports by source: React, external packages, internal packages

### Dependency Management
- Shared dependencies are hoisted to the root workspace
- Package-specific dependencies remain in individual package.json files
- Peer dependencies are used when the consuming package should control versions
- Development dependencies are typically in the root for consistency

## Shared vs Application-Specific Code Boundaries

### When to Create Shared Code
- Logic used by multiple applications
- Common UI components with similar styling
- Business rules that must remain consistent
- Utility functions that could benefit other areas

### When to Keep Code Application-Specific
- Application-unique business logic
- Page-specific components and layouts
- Application-specific configuration
- Features that are unlikely to be reused

### Moving Code Between Boundaries
- Start application-specific, move to shared when second use case emerges
- Generalize interfaces when moving to shared packages
- Maintain backward compatibility when possible
- Update all consumers when breaking changes are necessary

## Turborepo Task Orchestration Patterns

### Task Dependencies
- Build tasks depend on building upstream packages first
- Lint and type-check tasks can run in parallel
- Development tasks are persistent and don't depend on others
- Clean tasks don't cache and run independently

### Caching Strategy
- Build outputs are cached based on input hashes
- Development tasks are never cached for live reloading
- Lint and type-check results are cached for performance
- Cache is invalidated when dependencies change

### Parallel Execution
- Independent tasks run in parallel by default
- Dependent tasks wait for prerequisites to complete
- Resource-intensive tasks are throttled appropriately
- Development servers run concurrently for all applications

## Build Optimization Strategies

### Incremental Builds
- Only rebuild packages when their inputs change
- Dependency graph determines build order automatically
- Unchanged packages use cached build artifacts
- Remote caching can be enabled for team collaboration

### Bundle Analysis
- Shared dependencies reduce duplication across applications
- Tree shaking eliminates unused exports
- Dynamic imports enable code splitting
- Bundle analyzer helps identify optimization opportunities

### Development Performance
- Watch mode rebuilds only changed packages
- Hot module replacement works across package boundaries
- TypeScript project references enable incremental compilation
- Selective task execution based on changed files

## Version Management Approach

### Versioning Strategy
- All packages use semantic versioning
- Coordinated releases for breaking changes
- Independent versioning for feature additions
- Lockfile ensures reproducible builds across environments

### Release Process
- Automated changelog generation from commit messages
- Version bumping coordinated across dependent packages
- Pre-release versions for testing breaking changes
- Tagged releases for production deployments

### Dependency Updates
- Regular updates scheduled for security patches
- Major version updates planned and tested thoroughly
- Automated tools suggest available updates
- Breaking changes are communicated clearly

## Workspace Commands

### Development Workflow
- Start all applications simultaneously for full-stack development
- Run specific applications for focused development
- Execute tasks across all packages or filtered subsets
- Watch mode for shared package changes

### Build and Test
- Build entire workspace with dependency resolution
- Run tests with coverage across all packages
- Lint entire codebase with consistent rules
- Type check all packages with shared configuration

### Maintenance Tasks
- Clean all build artifacts and caches
- Update dependencies with conflict resolution
- Format code across entire workspace
- Validate workspace integrity and dependencies