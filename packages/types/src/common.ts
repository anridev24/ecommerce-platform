export interface SEOMetadata {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ApiError {
  message: string
  code?: string
  field?: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: ApiError
  success: boolean
}

export type LoadingState = "idle" | "loading" | "success" | "error"

export interface FilterOptions {
  category?: string[]
  priceRange?: {
    min: number
    max: number
  }
  tags?: string[]
  inStock?: boolean
}

export interface SearchParams extends PaginationParams {
  query?: string
  filters?: FilterOptions
}
