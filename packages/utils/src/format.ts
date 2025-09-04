import { format as formatDateFns } from "date-fns"

export const formatPrice = (price: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price)
}

export const formatDate = (
  date: Date | string,
  pattern = "MMM dd, yyyy"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return formatDateFns(dateObj, pattern)
}

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
}
