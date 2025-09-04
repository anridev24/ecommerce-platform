import { SEOMetadata } from "./common"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  images: ProductImage[]
  category: Category
  tags: string[]
  variants: ProductVariant[]
  inventory: Inventory
  seo: SEOMetadata
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  sku: string
  inventory: number
  options: VariantOption[]
  isActive: boolean
}

export interface VariantOption {
  name: string
  value: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  isActive: boolean
}

export interface Inventory {
  trackInventory: boolean
  quantity: number
  lowStockThreshold: number
  allowBackorders: boolean
}
