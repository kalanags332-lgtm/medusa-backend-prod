"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
module.exports = (0, utils_1.defineConfig)({
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUU7QUFFakUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRTdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzVCLEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxXQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQy9JO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTtRQUNyQyxJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksNkNBQTZDO1lBQ2xGLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSwwR0FBMEc7WUFDL0ksUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLGdJQUFnSTtZQUNuSyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksYUFBYTtZQUNsRCxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksYUFBYTtTQUN6RDtLQUNGO0NBQ0YsQ0FBQyxDQUFBIn0=