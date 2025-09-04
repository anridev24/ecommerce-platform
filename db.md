# Database Schema Plan

Comprehensive database schema for ecommerce platform to be implemented with Supabase.

## Authentication Strategy

### Using Supabase Auth for Both Customers and Admins

- Single `auth.users` table for all users
- Role-based access control using `role` field in profiles table
- Customers: email/password or magic link authentication
- Admins: same auth system with elevated role permissions
- Guest checkout supported with session-based cart

## Database Tables

### 1. Profiles Table (extends auth.users)

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role VARCHAR(20) DEFAULT 'customer', -- 'customer', 'admin', 'staff'
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Categories Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id), -- For subcategories
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  sku VARCHAR(100) UNIQUE NOT NULL,
  barcode VARCHAR(100), -- GTIN/UPC/EAN (optional)
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2), -- For discounts
  cost DECIMAL(10,2), -- Wholesale price
  category_id UUID REFERENCES categories(id),
  brand VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'draft', 'archived'
  featured BOOLEAN DEFAULT false,

  -- Physical attributes
  weight DECIMAL(8,3), -- in kg
  width DECIMAL(8,2), -- in cm
  height DECIMAL(8,2), -- in cm
  depth DECIMAL(8,2), -- in cm

  -- Inventory
  stock_quantity INTEGER DEFAULT 0,
  track_inventory BOOLEAN DEFAULT true,
  allow_backorder BOOLEAN DEFAULT false,

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT,

  -- Media
  images JSONB, -- Array of image URLs
  thumbnail_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Product Variants Table (Optional - for size/color combinations)

```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL, -- e.g., "Large Blue"
  options JSONB, -- {size: "L", color: "Blue"}
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  weight DECIMAL(8,3),
  barcode VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Addresses Table

```sql
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
  phone VARCHAR(20),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6. Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id), -- Nullable for guest orders
  order_number VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL, -- For guest orders and notifications
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'

  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,

  -- Address snapshots (store at time of order)
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,

  -- Payment
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7. Order Items Table

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id), -- Optional
  product_name VARCHAR(255) NOT NULL, -- Snapshot at purchase time
  product_price DECIMAL(10,2) NOT NULL, -- Price at purchase time
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8. Cart Items Table (Session-based)

```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255), -- For guest users
  user_id UUID REFERENCES auth.users(id), -- For logged-in users
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id), -- Optional
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Either session_id OR user_id must be present
  CHECK ((session_id IS NOT NULL AND user_id IS NULL) OR (session_id IS NULL AND user_id IS NOT NULL))
);
```

## Row Level Security (RLS) Policies

### Customer Access

- View all active products and categories
- Manage their own profile and addresses
- View their own orders and cart items
- Create new orders

### Admin Access

- Full CRUD operations on all tables
- View all customer data
- Manage inventory and orders
- Access analytics and reports

### Implementation Notes

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Example policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

## Required Indexes

```sql
-- Product search and filtering
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_sku ON products(sku);

-- Order management
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Cart performance
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_session_id ON cart_items(session_id);

-- Address lookup
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
```

## Implementation Considerations

1. **Authentication Flow**
   - Use Supabase Auth for all users
   - Implement role-based middleware for admin access
   - Support guest checkout with session management

2. **Data Management**
   - Store historical data in orders (product names, prices)
   - Implement soft deletes for important records
   - Use JSONB for flexible attributes and address snapshots

3. **Performance**
   - Implement proper indexing strategy
   - Use database triggers for automatic timestamps
   - Consider materialized views for reporting

4. **Security**
   - Enable RLS on all tables
   - Validate all inputs at application and database level
   - Implement audit logging for sensitive operations

5. **Features Supported**
   - Multi-level categories (parent/child relationships)
   - Product variants (optional)
   - Guest and registered user checkout
   - Order tracking and status management
   - Inventory management
   - SEO optimization with meta fields
