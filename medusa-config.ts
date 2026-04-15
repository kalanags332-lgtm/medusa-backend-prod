import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  admin: {
    disable: false,
    backendUrl: process.env.MEDUSA_BACKEND_URL || (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : undefined),
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,http://localhost:5173",
      adminCors: process.env.ADMIN_CORS || "http://localhost:5173,http://localhost:9000,https://clothstore-backend-service-production.up.railway.app",
      authCors: process.env.AUTH_CORS || "http://localhost:5173,http://localhost:9000,http://localhost:8000,https://clothstore-backend-service-production.up.railway.app",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
