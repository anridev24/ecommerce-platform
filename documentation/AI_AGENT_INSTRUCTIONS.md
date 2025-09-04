# AI Agent Instructions

## How to Navigate the Codebase

### Project Structure Overview
- **Root Directory**: Contains monorepo configuration, documentation, and global tooling
- **`apps/` Directory**: Two Next.js applications (store and admin) for end users
- **`packages/` Directory**: Shared code organized by domain (ui, utils, types, config)
- **Documentation**: Complete project context and patterns in the `documentation/` folder

### Reading the Codebase Effectively
- Start with PROJECT_OVERVIEW.md to understand business context and goals
- Review ARCHITECTURE.md to understand system design and component relationships
- Check DOMAIN_MODELS.md to understand business entities and their relationships
- Examine package.json files to understand dependencies and available scripts

### Finding Relevant Code
- Look in shared packages first before creating application-specific implementations
- Check the types package to understand data structures before implementing features
- Review existing components in the UI package for reusable patterns
- Examine utility functions in the utils package for common operations

## When to Use Shared Packages vs App-Specific Code

### Use Shared Packages When
- The functionality will be used by both store and admin applications
- The code represents core business logic that should be consistent
- The component or utility is generic enough to be reusable
- The feature requires consistent styling and behavior across applications

### Use App-Specific Code When
- The functionality is unique to one application's user experience
- The component is highly specialized for a specific page or workflow
- The business logic is specific to customer-facing or admin-only operations
- The implementation details differ significantly between applications

### Migration Between Boundaries
- Start with app-specific code and extract to shared packages when reuse emerges
- Generalize interfaces and APIs when moving code to shared packages
- Maintain backward compatibility when possible during extraction
- Update all consumers simultaneously when making breaking changes

## Import Resolution Patterns

### Package Import Strategy
- Always import from package entry points (index.js/ts files)
- Never import directly from internal package files
- Use TypeScript path mapping for clean import statements
- Group imports by source: React, external packages, internal packages

### Dependency Direction Rules
- Applications can import from any shared package
- Shared packages can import from other shared packages following the hierarchy
- The types package should have no dependencies on other internal packages
- The config package should only have development-time dependencies

### Example Import Patterns
- From types package: Import domain models and interfaces
- From utils package: Import validation, formatting, and API client functions
- From UI package: Import reusable components and styling utilities
- From config package: Import shared configurations in build scripts

## Type Safety Requirements

### TypeScript Configuration
- Use strict mode TypeScript throughout the entire codebase
- Ensure all packages have proper TypeScript configuration
- Maintain type safety across package boundaries through proper exports
- Use generic types for flexible component and function APIs

### Type Definition Strategy
- Define all domain models in the types package for consistency
- Use utility types for transformations and derived types
- Implement type guards for runtime type checking when necessary
- Provide comprehensive type definitions for component props and function parameters

### Error Prevention
- Never use the `any` type without proper justification and documentation
- Implement proper error boundaries with typed error handling
- Use discriminated unions for complex state management
- Validate external data with type-safe validation schemas

## Testing Requirements Before Changes

### Pre-Implementation Testing
- Run type checking across all packages before making changes
- Ensure all existing tests pass before implementing new functionality
- Build all packages and applications to verify compatibility
- Test hot reloading and development server startup

### During Implementation Testing
- Test changes in isolation within the specific package being modified
- Verify that changes work correctly in both applications when applicable
- Ensure TypeScript compilation succeeds with no warnings or errors
- Test responsive design and accessibility requirements

### Pre-Commit Testing
- Run the full test suite across all packages and applications
- Verify build processes complete successfully for production deployments
- Check that code formatting and linting rules are followed
- Validate that no new console warnings or errors are introduced

## Documentation Update Triggers

### When to Update Documentation
- Adding new shared packages or significantly changing existing package APIs
- Implementing new architectural patterns or changing existing ones
- Making technology decisions that affect the entire monorepo
- Adding new development workflows or changing existing processes

### Documentation Standards
- Update relevant documentation files when making significant changes
- Ensure consistency between code changes and documentation
- Include rationale for architectural decisions and trade-offs
- Keep documentation focused on patterns and logic rather than code examples

### Communication Strategy
- Document breaking changes and migration paths clearly
- Update task guidelines when new development patterns emerge
- Revise domain models documentation when business rules change
- Maintain accuracy in technology decisions when tools are upgraded

## Code Style Adherence Rules

### Formatting and Linting
- Use Prettier for automatic code formatting across all files
- Follow ESLint rules configured for the project
- Maintain consistent naming conventions across packages and applications
- Use TypeScript strict mode to enforce type safety standards

### Component Development
- Follow the established component hierarchy (atoms, molecules, organisms)
- Use composition patterns rather than inheritance for component reusability
- Implement proper prop interfaces with documentation comments
- Include accessibility attributes and considerations in all UI components

### State Management
- Use appropriate state management patterns for different types of state
- Keep state as close to usage as possible while allowing for necessary sharing
- Implement proper cleanup in useEffect hooks to prevent memory leaks
- Follow established patterns for API integration and error handling

## Common Task Templates

### Adding a New Feature
1. Review PROJECT_OVERVIEW.md and DOMAIN_MODELS.md for context
2. Identify which packages and applications will be affected
3. Plan the implementation approach using DEVELOPMENT_PATTERNS.md guidelines
4. Implement shared functionality first, then application-specific features
5. Test across both applications and all relevant packages
6. Update documentation if architectural patterns change

### Creating a New Shared Component
1. Evaluate reusability requirements across applications
2. Design a flexible API that accommodates different use cases
3. Implement the component in the UI package with proper TypeScript types
4. Add comprehensive prop documentation and usage examples
5. Test the component in both applications with different configurations
6. Export the component from the package entry point

### Modifying Domain Models
1. Assess the impact on all packages and applications
2. Plan backward compatibility and migration strategies
3. Update type definitions in the types package first
4. Modify related utilities and validation functions
5. Update components and applications that use the modified models
6. Ensure all type checking passes across the entire monorepo

### Performance Optimization
1. Identify bottlenecks through profiling and measurement
2. Determine if optimizations belong in shared packages or applications
3. Implement changes incrementally with continuous measurement
4. Test performance across different devices and network conditions
5. Validate that optimizations don't negatively impact functionality
6. Document optimization strategies for future reference

## Error Handling and Recovery

### Error Identification Process
- Use browser developer tools and React developer tools for debugging
- Check TypeScript compiler output for type-related issues
- Review console errors and network requests for runtime problems
- Test across different browsers and devices for compatibility issues

### Resolution Strategy
- Fix issues at the appropriate level (shared package vs application code)
- Ensure fixes don't introduce regressions in other parts of the system
- Add appropriate tests to prevent similar issues from recurring
- Document complex debugging processes for future reference

### Quality Assurance
- Test fixes across all affected packages and applications
- Verify that error boundaries handle failures gracefully
- Ensure user experience remains smooth during error conditions
- Validate that fixes work correctly across different usage scenarios