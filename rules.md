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

## Technology-Specific Rules

**When working with Next.js**, always reference and follow **`subrules/nextjs.md`** for comprehensive Next.js 15 best practices including Server Components, App Router, caching strategies, and performance patterns.

**When working with Supabase**, always reference and follow **`subrules/supabase.md`** for comprehensive Supabase best practices including RLS optimization, authentication patterns, Edge Functions, and security guidelines.

**When designing database schemas**, always reference and follow **`subrules/database.md`** for comprehensive ecommerce database design patterns including table structures, relationships, indexing strategies, and data integrity rules.

## MCP In-Memoria Rules

1. **Always check learning status first** - Use `get_learning_status` before starting complex tasks
2. **Auto-learn when needed** - Use `auto_learn_if_needed` if intelligence is missing or stale
3. **Use semantic search** - Leverage `search_codebase` for finding code by meaning, not just keywords
4. **Get pattern recommendations** - Use `get_pattern_recommendations` before implementing new features
5. **Contribute insights back** - Use `contribute_insights` to help improve the knowledge base

## Development Workflow Rules

1. **Read documentation first** - Always check existing docs before starting work
2. **Plan before coding** - Use TodoWrite tool for complex tasks
3. **Check intelligence status** - Use MCP In-Memoria tools to understand codebase context
4. **Test in both apps** - When changing shared packages
5. **Build incrementally** - Shared packages first, then applications
6. **Update relevant documentation** - After making significant changes
