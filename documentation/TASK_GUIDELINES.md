# Task Guidelines

## Adding New Features Workflow

### Feature Planning Phase

- Identify which applications will be affected by the new feature
- Determine if any shared packages need new functionality
- Plan the data models and API integration points needed
- Consider the user experience across both store and admin interfaces

### Implementation Approach

- Start with domain models and types in the types package
- Add utility functions to the utils package as needed
- Create shared components in the UI package for reusable elements
- Implement application-specific logic in the respective app directories

### Integration Strategy

- Build features incrementally with working intermediate states
- Test integration between shared packages and applications continuously
- Validate that changes work across both applications when applicable
- Ensure consistent behavior and styling between store and admin interfaces

## Creating Shared Components Process

### Component Design Decision

- Evaluate if the component will be used by multiple applications
- Consider if the component represents reusable business logic or just UI
- Determine the level of customization needed across different usage contexts
- Plan the component API for flexibility without overengineering

### Implementation Steps

- Create the component in the UI package with proper TypeScript types
- Design a flexible props interface that accommodates different use cases
- Include proper documentation comments for the component API
- Add the component to the UI package exports for consumption

### Testing and Validation

- Test the component in isolation with various prop combinations
- Validate the component works correctly in both applications
- Ensure accessibility standards are met with proper ARIA attributes
- Verify the component follows the established design system patterns

## Adding New Packages Steps

### Package Creation Decision

- Identify a clear domain of responsibility for the new package
- Ensure the package has multiple consumers or clear growth potential
- Consider the dependency graph and avoid creating circular dependencies
- Plan the package API to be stable and well-defined

### Package Setup Process

- Create the package directory structure following established conventions
- Configure package.json with proper metadata, scripts, and dependencies
- Set up TypeScript configuration inheriting from the shared config
- Add appropriate build and development scripts using the established patterns

### Integration with Monorepo

- Add the package to the workspace configuration
- Update the root TypeScript configuration to include the new package
- Ensure the package builds correctly in the dependency order
- Update documentation to reflect the new package and its purpose

## Modifying Domain Models Impact

### Change Impact Assessment

- Identify all packages and applications that use the modified models
- Plan the migration strategy for existing data and interfaces
- Consider backward compatibility requirements and versioning implications
- Evaluate the impact on API contracts and external integrations

### Implementation Strategy

- Start with the types package to define the new model structure
- Update utility functions that work with the modified models
- Modify shared components that display or interact with the data
- Update application code to handle the new model structure

### Validation Process

- Ensure type checking passes across all packages and applications
- Verify that existing functionality continues to work as expected
- Test data transformation and validation with the new model structure
- Update any mock data or test fixtures to match the new models

## Performance Optimization Approach

### Performance Analysis

- Identify performance bottlenecks through profiling and monitoring
- Analyze bundle sizes and loading characteristics of both applications
- Evaluate runtime performance of critical user interactions
- Consider the impact of shared package changes on overall performance

### Optimization Strategy

- Implement optimizations in shared packages when they benefit multiple applications
- Use React performance tools to optimize component rendering
- Apply code splitting strategies at appropriate boundaries
- Optimize asset loading and caching strategies

### Measurement and Validation

- Measure performance improvements with concrete metrics
- Test performance across different devices and network conditions
- Validate that optimizations don't negatively impact functionality
- Monitor performance in production after deployment

## Debugging Strategies

### Issue Identification

- Reproduce issues consistently across different environments
- Identify whether issues are in shared packages or application-specific code
- Use browser developer tools and React developer tools effectively
- Check for console errors, network issues, and state management problems

### Debugging Approach

- Start debugging at the highest level and work down through the stack
- Use TypeScript compiler errors to identify type-related issues
- Leverage the monorepo structure to isolate issues to specific packages
- Test changes in isolation before integrating with the full application

### Resolution Process

- Fix issues at the appropriate level (shared package vs application code)
- Ensure fixes don't introduce regressions in other parts of the system
- Add tests to prevent similar issues from recurring
- Document any complex debugging processes for future reference

## Common Pitfalls to Avoid

### Monorepo-Specific Issues

- Don't create circular dependencies between packages
- Avoid importing internal files from packages, use entry points instead
- Don't duplicate shared logic across applications instead of extracting to packages
- Avoid inconsistent dependency versions across packages

### React and TypeScript Issues

- Don't ignore TypeScript compiler warnings and errors
- Avoid using any types without proper justification
- Don't create memory leaks with improper cleanup in useEffect hooks
- Avoid unnecessary re-renders through proper memoization and dependency arrays

### Architecture Violations

- Don't put business logic in UI components, extract to appropriate packages
- Avoid tight coupling between applications and shared packages
- Don't bypass the established patterns for state management and API integration
- Avoid creating shared components that are too specific to one application

### Development Process Issues

- Don't skip testing changes across both applications when modifying shared code
- Avoid committing code that breaks the build or type checking
- Don't ignore code quality tools and their warnings
- Avoid making large changes without proper planning and incremental implementation

## Quality Assurance Checklist

### Before Implementation

- Review the feature requirements and technical approach
- Plan the changes across the appropriate packages and applications
- Consider the impact on existing functionality and user experience
- Validate that the approach follows established patterns and conventions

### During Implementation

- Test changes continuously during development
- Ensure type safety is maintained throughout the implementation
- Follow the established code formatting and style guidelines
- Write appropriate tests for new functionality and changed behavior

### Before Completion

- Run all tests and ensure they pass consistently
- Validate that both applications build and run correctly
- Test the changes across different scenarios and edge cases
- Review the changes for code quality and maintainability
