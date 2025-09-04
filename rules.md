# Development Rules

This file contains strict development rules that must be followed at all times when working on this project.

## Code Quality Rules

1. **Always use TypeScript** - No JavaScript files allowed in the codebase
2. **Follow the established architecture** - Respect the monorepo structure and dependency hierarchy
3. **Import from package entry points only** - Never import from internal package files
4. **Run linting and type checking** - Before committing any changes
5. **Write tests for new features** - All new functionality must include appropriate tests

## Architecture Rules

1. **Never create circular dependencies** - Between packages or modules
2. **Shared packages must build first** - Before applications that depend on them
3. **Types package is the foundation** - Define domain models there first
4. **Use consistent naming conventions** - Follow the established patterns
5. **Document architectural changes** - Update relevant documentation files

## Git Rules

1. **Commit messages must be descriptive** - Explain what and why, not just what
2. **One feature per commit** - Keep commits focused and atomic
3. **Never commit secrets or keys** - Use environment variables instead
4. **Test before pushing** - Ensure all tests pass and builds succeed
5. **Update documentation with changes** - Keep docs in sync with code

## Next.js 15 Rules

1. **Use Server Components by default** - Only add 'use client' when necessary for interactivity
2. **Fetch data in Server Components** - Use async/await directly, leverage automatic deduplication
3. **Configure caching strategically** - Use `cache: 'force-cache'` (default), `no-store`, or `revalidate` options
4. **Implement Suspense boundaries** - Wrap async components for better loading UX
5. **Use App Router file conventions** - page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx
6. **Access request data properly** - Use `headers()`, `cookies()`, and `params` (await them in components)
7. **Handle dynamic routes correctly** - Always await `params` prop in dynamic route components
8. **Optimize Client Components** - Use `'use client'` only at boundaries, pass data from Server Components
9. **Implement proper error boundaries** - Use error.tsx files for route-level error handling
10. **Use Link prefetching wisely** - Control prefetch behavior with prefetch prop (auto/true/false)

## Development Workflow Rules

1. **Read documentation first** - Always check existing docs before starting work
2. **Plan before coding** - Use TodoWrite tool for complex tasks
3. **Test in both apps** - When changing shared packages
4. **Build incrementally** - Shared packages first, then applications
5. **Update relevant documentation** - After making significant changes
