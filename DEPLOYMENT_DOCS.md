# Railway Deployment & Troubleshooting Guide

This document summarizes the technical fixes and configurations implemented to successfully deploy the Medusa backend to Railway.

## 🚀 Recent Fixes & Implementation

### 1. Build Optimization (The "Build Timeout" Fix)
*   **Problem:** Railway's default build process was timing out or running out of memory when compiling the Medusa Admin.
*   **Fix:** Created a custom `Dockerfile`.
*   **Why:** A Dockerfile allows us to install dependencies and run the build process in a controlled environment. We used `node:20-alpine` for a smaller footprint and `yarn build` to pre-compile the admin dashboard before the server starts.

### 2. Admin Dashboard Stability
*   **Problem:** The admin panel was causing Out of Memory (OOM) crashes and "Index.html not found" errors.
*   **Fixes:** 
    *   Re-enabled the admin in `medusa-config.ts` after optimizing memory.
    *   Explicitly defined the `backendUrl` for the admin to use your Railway domain. This ensures the dashboard knows exactly where to send API requests once it's live.
    *   Ensured `yarn build` (which runs `medusa build`) is part of the deployment flow so that the static admin files are generated correctly.

### 3. Database & Seeding Automation
*   **Problem:** The store would crash if the database was empty or if the seed script ran twice.
*   **Fixes:**
    *   **Auto-Migrations:** Added `npx medusa db:migrate` to the startup command. This ensures your database structure is always up to date whenever you deploy.
    *   **Smart Seeding:** Configured the seeding logic to be more resilient. We initially setup seeding to create default regions and products, then moved away from running it on every startup once the database was populated to prevent "duplicate key" errors.

### 4. Environment Connectivity
*   **Problem:** The frontend (Netlify) couldn't talk to the backend due to security (CORS) blocks.
*   **Fix:** Updated `medusa-config.ts` to dynamically accept `STORE_CORS` from environment variables.
*   **Why:** This allows you to securely link your Netlify URL without hardcoding it into the codebase, keeping your app flexible.

---

## 🛠 Key Files Reference
*   **[Dockerfile](./Dockerfile):** Handles the installation and pre-build process.
*   **[medusa-config.ts](./medusa-config.ts):** Configured for production CORS and Admin settings.
*   **[package.json](./package.json):** Updated scripts to support the build/start lifecycle.

## 💡 Troubleshooting
Whenever you push changes to GitHub, Railway will use the `Dockerfile` to rebuild everything. 

**Common Error: "Could not find index.html in the admin build directory"**
*   **Cause:** The build step likely failed or were purged due to memory limits.
*   **Solution:** Go to your Railway dashboard and perform a **"Redeploy"** with **"Clear Cache"**. This forces a clean build of all assets.
