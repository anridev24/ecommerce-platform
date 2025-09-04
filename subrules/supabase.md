# Supabase Development Rules

These rules must be followed when working with Supabase in this project.

## Security First Principles

1. **Never expose service key** - Use anon key in client, service key only in secure server environments
2. **Implement Row Level Security (RLS)** - Enable RLS on all tables, no exceptions
3. **Use @supabase/ssr for Next.js** - Proper server-side auth handling and cookie management
4. **Validate all inputs** - Never trust client data, validate on server and database level
5. **Use security definer functions** - For operations requiring elevated privileges

## Row Level Security (RLS) Best Practices

6. **Wrap auth functions in SELECT** - Use `(SELECT auth.uid())` instead of `auth.uid()` for better performance
7. **Index policy columns** - Create indexes on columns used in RLS policies
8. **Minimize policy complexity** - Simple policies perform better than complex ones
9. **Use policy templates** - Consistent patterns for common access patterns
10. **Test policies thoroughly** - Verify access control with different user contexts

## Authentication Patterns

11. **Use createServerClient for SSR** - Proper server-side auth in Next.js
12. **Implement proper session refresh** - Handle token refresh in middleware
13. **Secure cookie configuration** - Use secure, httpOnly, sameSite settings
14. **Handle auth state changes** - Listen for auth events and update UI accordingly
15. **Implement proper logout** - Clear sessions and redirect appropriately

## Database Design

16. **Use foreign key constraints** - Maintain referential integrity
17. **Implement soft deletes** - Use deleted_at columns instead of hard deletes
18. **Version sensitive data** - Track changes to important entities
19. **Use appropriate column types** - UUID for IDs, timestamp with timezone for dates
20. **Normalize data structure** - Avoid redundancy while maintaining query performance

## Edge Functions

21. **Keep functions lightweight** - Minimize dependencies and execution time
22. **Handle errors gracefully** - Return proper HTTP status codes and error messages
23. **Use environment variables** - Never hardcode sensitive configuration
24. **Implement proper CORS** - Configure allowed origins appropriately
25. **Cache responses when possible** - Use appropriate cache headers

## Realtime Subscriptions

26. **Subscribe to specific changes** - Use filters to reduce unnecessary updates
27. **Handle connection states** - Manage online/offline scenarios
28. **Unsubscribe properly** - Clean up subscriptions to prevent memory leaks
29. **Use channels strategically** - Group related subscriptions
30. **Implement reconnection logic** - Handle network interruptions gracefully

## Storage Policies

31. **Implement storage RLS** - Secure file access with proper policies
32. **Validate file types** - Restrict allowed file extensions and MIME types
33. **Set file size limits** - Prevent abuse with appropriate size restrictions
34. **Use organized folder structure** - Group files logically (user-id/type/file)
35. **Handle file cleanup** - Remove orphaned files when records are deleted

## Query Optimization

36. **Use select() to limit columns** - Only fetch required data
37. **Implement pagination** - Use limit() and offset() or cursor-based pagination
38. **Use single() for unique results** - Better performance than limiting to 1
39. **Batch related queries** - Reduce round trips with joins or multiple selects
40. **Cache expensive queries** - Use appropriate caching strategies

## Error Handling

41. **Use structured error responses** - Consistent error format across application
42. **Log errors appropriately** - Capture context without exposing sensitive data
43. **Handle network failures** - Implement retry logic with exponential backoff
44. **Validate data at boundaries** - Check data integrity at API boundaries
45. **Use TypeScript for type safety** - Generate types from database schema

## Performance Patterns

### Optimal RLS Policy Pattern

```sql
-- Good: Wrapped auth function with index
CREATE POLICY "Users can view own orders" ON orders
FOR SELECT USING ((SELECT auth.uid()) = user_id);

-- Create index for policy column
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

### Server-Side Client Pattern

```typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### Edge Function Template

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    // Your function logic here

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
```

### Realtime Subscription Pattern

```typescript
const subscription = supabase
  .channel("orders")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "orders",
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      // Handle new order
    }
  )
  .subscribe()

// Cleanup
return () => {
  subscription.unsubscribe()
}
```

## Migration Best Practices

46. **Version migrations incrementally** - Small, focused changes
47. **Test migrations on staging** - Verify before production deployment
48. **Backup before major changes** - Always have rollback capability
49. **Use transactions for complex migrations** - Ensure atomicity
50. **Document migration rationale** - Explain why changes were made

## Monitoring and Debugging

51. **Monitor query performance** - Use Supabase dashboard insights
52. **Set up alerts for errors** - Proactive error monitoring
53. **Log authentication events** - Track security-related activities
54. **Monitor storage usage** - Prevent unexpected costs
55. **Use explain analyze** - Profile slow queries and optimize

## Development Workflow

56. **Use local development** - Supabase CLI for local environment
57. **Sync schema changes** - Use migrations for database changes
58. **Test with realistic data** - Use representative dataset sizes
59. **Version control migrations** - Track all schema changes in git
60. **Deploy incrementally** - Stage changes before production
