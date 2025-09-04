# Ecommerce Database Schema Rules

These rules must be followed when designing and implementing database schemas for ecommerce applications.

## Core Database Design Principles

1. **Normalize to Third Normal Form (3NF)** - Ecommerce is purely transactional and must support constant concurrent updates
2. **Design for data integrity** - Use foreign key constraints to maintain referential integrity
3. **Plan for scalability** - Design schema to accommodate growth in data volume and user traffic
4. **Optimize for performance** - Balance normalization with query performance needs
5. **Implement proper indexing** - Create indexes on frequently queried columns

## Essential Ecommerce Tables

### Users/Customers Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  sku VARCHAR(100) UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Categories Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Addresses Table

```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- 'shipping' or 'billing'
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(255),
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address_id UUID REFERENCES addresses(id),
  billing_address_id UUID REFERENCES addresses(id),
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Order Items Table

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL, -- Store at purchase time
  product_price DECIMAL(10,2) NOT NULL, -- Store price at purchase time
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Cart Items Table

```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

## Database Design Rules

### Data Integrity Rules

6. **Use UUIDs for primary keys** - Better for distributed systems and API security
7. **Store historical data in orders** - Capture product_name and product_price at purchase time
8. **Implement soft deletes** - Use deleted_at columns instead of hard deletes for important data
9. **Use appropriate data types** - DECIMAL for money, TIMESTAMPTZ for dates, UUID for IDs
10. **Enforce constraints** - Use NOT NULL, UNIQUE, and CHECK constraints appropriately

### Address Management Rules

11. **Separate addresses table** - Don't embed addresses in users table
12. **Support multiple addresses** - Users can have multiple shipping and billing addresses
13. **Store address snapshots** - Orders should reference addresses, not embed them
14. **Validate address data** - Implement proper validation for postal codes and countries
15. **Mark default addresses** - Allow users to set default shipping and billing addresses

### Order Management Rules

16. **Generate unique order numbers** - Use meaningful order numbers separate from UUIDs
17. **Track order status workflow** - pending → confirmed → processing → shipped → delivered
18. **Store payment information separately** - Keep sensitive payment data in secure tables
19. **Calculate totals dynamically** - Don't rely solely on stored totals, validate calculations
20. **Implement order item versioning** - Store product details at time of purchase

### Cart Management Rules

21. **Use session-based carts** - Cart items tied to user sessions or accounts
22. **Implement cart cleanup** - Remove old cart items periodically
23. **Handle product availability** - Check stock before allowing cart additions
24. **Calculate totals on-demand** - Don't store cart totals, calculate when needed
25. **Support guest checkout** - Allow cart functionality without account creation

### Performance Rules

26. **Index foreign keys** - Create indexes on all foreign key columns
27. **Index search columns** - Index columns used in WHERE clauses (email, sku, order_number)
28. **Use composite indexes** - For multi-column searches (user_id + product_id in cart_items)
29. **Implement database partitioning** - For large tables like orders and order_items
30. **Use materialized views** - For complex reporting queries that don't change frequently

### Security Rules

31. **Hash passwords properly** - Use bcrypt or similar for password hashing
32. **Protect sensitive data** - Encrypt PII and payment information
33. **Implement row-level security** - Users can only access their own data
34. **Log data changes** - Audit trail for important operations
35. **Validate all inputs** - Never trust client-side data

## Advanced Schema Patterns

### Product Variants Pattern

```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  attributes JSONB, -- Store variant attributes like size, color
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Inventory Tracking Pattern

```sql
CREATE TABLE inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  movement_type VARCHAR(20) NOT NULL, -- 'in', 'out', 'adjustment'
  quantity INTEGER NOT NULL,
  reference_type VARCHAR(50), -- 'order', 'restock', 'adjustment'
  reference_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Audit Trail Pattern

```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(50) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  old_values JSONB,
  new_values JSONB,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Required Indexes

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Product indexes
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_is_active ON products(is_active);

-- Address indexes
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_type ON addresses(type);

-- Order indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- Order item indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Cart indexes
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE UNIQUE INDEX idx_cart_items_user_product ON cart_items(user_id, product_id);
```

## Data Validation Rules

36. **Validate email formats** - Use proper email validation patterns
37. **Check price constraints** - Ensure prices are positive values
38. **Validate quantity limits** - Prevent negative quantities and unrealistic values
39. **Verify inventory levels** - Check stock before order completion
40. **Validate address completeness** - Ensure all required address fields are present
