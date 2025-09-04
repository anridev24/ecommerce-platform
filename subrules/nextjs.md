# Next.js 15 Development Rules

These rules must be followed when working with Next.js in this project.

## Core Next.js 15 Principles

1. **Use Server Components by default** - Only add 'use client' when necessary for interactivity
2. **Fetch data in Server Components** - Use async/await directly, leverage automatic deduplication
3. **Configure caching strategically** - Use `cache: 'force-cache'` (default), `no-store`, or `revalidate` options
4. **Implement Suspense boundaries** - Wrap async components for better loading UX
5. **Use App Router file conventions** - page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx

## Request and Data Handling

6. **Access request data properly** - Use `headers()`, `cookies()`, and `params` (await them in components)
7. **Handle dynamic routes correctly** - Always await `params` prop in dynamic route components
8. **Optimize Client Components** - Use `'use client'` only at boundaries, pass data from Server Components
9. **Implement proper error boundaries** - Use error.tsx files for route-level error handling
10. **Use Link prefetching wisely** - Control prefetch behavior with prefetch prop (auto/true/false)

## Performance and Streaming

11. **Implement streaming patterns** - Use React 18 Suspense for progressive page loading
12. **Optimize bundle splitting** - Use dynamic imports for heavy components
13. **Configure ISR appropriately** - Use `revalidate` for time-based regeneration
14. **Implement proper loading states** - Use loading.tsx files and Suspense boundaries

## Partial Prerendering (PPR)

15. **Use PPR for hybrid pages** - Combine static shell with dynamic content
16. **Mark dynamic segments correctly** - Use Suspense boundaries to define dynamic regions
17. **Optimize for Core Web Vitals** - PPR improves LCP and FCP metrics

## Caching Strategy

18. **Understand fetch cache behavior** - Default `force-cache`, use `no-store` for dynamic data
19. **Use unstable_cache for custom functions** - Cache expensive computations
20. **Implement proper cache invalidation** - Use tags and revalidation paths appropriately

## Server Actions

21. **Use Server Actions for mutations** - Replace API routes for form submissions
22. **Implement proper error handling** - Return structured responses from Server Actions
23. **Validate input in Server Actions** - Never trust client data
24. **Use progressive enhancement** - Forms should work without JavaScript

## Development Best Practices

25. **Test Server and Client Components separately** - Different testing strategies
26. **Use TypeScript strictly** - Leverage Next.js built-in TypeScript support
27. **Optimize images and fonts** - Use next/image and next/font
28. **Implement proper SEO** - Use metadata API for dynamic meta tags

## File Conventions

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx           # Home page
├── loading.tsx        # Loading UI
├── error.tsx          # Error UI
├── not-found.tsx      # 404 page
├── global-error.tsx   # Global error boundary
└── [slug]/
    ├── page.tsx       # Dynamic route
    └── layout.tsx     # Nested layout
```

## Common Patterns

### Server Component with Data Fetching

```tsx
async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails product={product} />
    </Suspense>
  )
}
```

### Client Component Boundary

```tsx
'use client'

import { useState } from 'react'

export function InteractiveComponent({ data }: { data: ServerData }) {
  const [state, setState] = useState(data.initialValue)

  return (
    // Interactive UI here
  )
}
```

### Server Action

```tsx
async function createProduct(formData: FormData) {
  "use server"

  const name = formData.get("name") as string

  // Validate input
  if (!name) {
    return { error: "Name is required" }
  }

  // Perform mutation
  const product = await db.product.create({ data: { name } })

  // Revalidate cache
  revalidatePath("/products")

  return { success: true, product }
}
```
