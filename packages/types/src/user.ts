export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  emailVerified: boolean
  avatar?: string
  addresses: Address[]
  createdAt: Date
  updatedAt: Date
}

export type UserRole = "customer" | "admin" | "staff"

export interface Address {
  id: string
  type: AddressType
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  country: string
  postalCode: string
  phone?: string
  isDefault: boolean
}

export type AddressType = "shipping" | "billing"

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}
