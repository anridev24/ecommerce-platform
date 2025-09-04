// Export shared configuration utilities
export const config = {
  app: {
    name: "Ecommerce Platform",
    version: "1.0.0",
  },
  api: {
    baseUrl: process.env.API_BASE_URL || "http://localhost:3001",
  },
}
