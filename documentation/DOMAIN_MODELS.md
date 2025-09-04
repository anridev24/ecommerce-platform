# Domain Models

## Core Business Entities

### Product Entity

- **Primary Purpose**: Represents sellable items in the catalog
- **Key Attributes**: Name, description, pricing, media assets, categorization
- **Variants Support**: Multiple configurations of the same product (size, color, material)
- **Inventory Tracking**: Stock levels, low stock alerts, backorder management
- **SEO Integration**: Metadata for search optimization and social sharing

### User Entity

- **Multi-Role Design**: Supports customers, administrators, and staff members
- **Profile Management**: Personal information, contact details, preferences
- **Address Management**: Multiple shipping and billing addresses per user
- **Authentication State**: Email verification, active status, role-based permissions
- **Extensibility**: Avatar support and future profile enhancements

### Order Entity

- **Lifecycle Management**: Tracks orders from creation through fulfillment
- **Status Separation**: Independent payment, fulfillment, and overall order status
- **Address Binding**: Captures shipping and billing addresses at order time
- **Item Details**: Product variants, quantities, pricing at purchase time
- **Financial Tracking**: Subtotals, taxes, shipping, discounts, and final totals

### Cart Entity

- **Session-Based**: Temporary collection of items before checkout
- **Real-Time Calculations**: Automatic subtotal and tax calculations
- **Persistence Options**: Guest carts and user-associated carts
- **Integration Ready**: Designed for easy checkout conversion

## Entity Relationships and Constraints

### Product Relationships

- Products belong to categories in a hierarchical structure
- Products can have multiple variants with individual pricing and inventory
- Products maintain SEO metadata for search and social optimization
- Categories can have parent-child relationships for nested organization

### User Relationships

- Users can have multiple addresses with type designation (shipping/billing)
- Users can have multiple orders associated with their account
- Address information is captured in orders for historical accuracy
- User roles determine application access and capabilities

### Order Relationships

- Orders belong to users (or guest sessions for guest checkout)
- Orders contain multiple order items referencing products and variants
- Orders capture address information separately from user addresses
- Order items maintain pricing information as of purchase time

## Business Rules and Invariants

### Product Rules

- Products must have at least one image for display
- Products with variants require all variants to have SKUs
- Products cannot be deleted if referenced by existing orders
- Inventory tracking is optional but recommended for physical products

### Order Rules

- Orders cannot be modified after payment confirmation
- Order total must equal sum of items plus tax and shipping minus discounts
- Shipping address is required for physical products
- Order status changes follow defined workflows only

### User Rules

- Email addresses must be unique across all users
- Users must have at least one address before checkout
- Address information is validated against regional formats
- User roles cannot be downgraded without proper authorization

## State Transitions

### Order Status Flow

- **Pending**: Initial order creation, payment processing
- **Confirmed**: Payment successful, ready for fulfillment
- **Processing**: Order being prepared, items allocated
- **Shipped**: Order dispatched, tracking information available
- **Delivered**: Order received by customer, transaction complete
- **Cancelled**: Order cancelled before shipment, refund initiated
- **Refunded**: Payment returned to customer, order closed

### Payment Status Flow

- **Pending**: Payment authorization in progress
- **Paid**: Payment successfully captured
- **Partially Paid**: Partial payment received (installments/store credit)
- **Refunded**: Payment returned to customer
- **Failed**: Payment processing unsuccessful

### Fulfillment Status Flow

- **Unfulfilled**: No items shipped
- **Partially Fulfilled**: Some items shipped, others pending
- **Fulfilled**: All items shipped
- **Cancelled**: Fulfillment cancelled, inventory restored

## Data Validation Rules

### Product Validation

- Names must be unique within a category
- Prices must be positive numbers with appropriate decimal precision
- SKUs must be unique across all variants
- Images must be valid URLs or file references

### User Validation

- Email addresses must pass RFC-compliant validation
- Phone numbers must match regional formatting requirements
- Passwords must meet security complexity requirements
- Addresses must include all required fields for the region

### Order Validation

- Order totals must be recalculated and verified before confirmation
- Item quantities must be positive integers
- Shipping methods must be valid for the destination
- Discount codes must be valid and within usage limits

## Common Query Patterns

### Product Queries

- Filter by category, price range, availability, and tags
- Search by name, description, and keyword tags
- Sort by price, popularity, creation date, and relevance
- Paginate results for large catalogs

### Order Queries

- Filter by status, date range, customer, and fulfillment state
- Search by order number, customer information, and product
- Sort by creation date, total amount, and status priority
- Aggregate for reporting and analytics

### User Queries

- Search by email, name, and contact information
- Filter by role, active status, and registration date
- Sort by activity, order history, and account creation
- Paginate for administrative interfaces

## Future Model Extensions

### Enhanced Product Features

- Product bundles and kits with component relationships
- Subscription products with recurring billing cycles
- Digital products with download and licensing management
- Product recommendations based on purchase history

### Advanced User Features

- Wishlist functionality with sharing capabilities
- Loyalty program integration with points and rewards
- Social features with reviews and ratings
- Multiple payment methods with preferences

### Extended Order Features

- Split shipping with multiple delivery addresses
- Partial refunds and exchange processing
- Installment payments and payment plans
- Order scheduling and recurring orders
