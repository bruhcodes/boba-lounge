# 🚀 Deploying The BOBA Lounge

Follow these steps to host your app for free.

## 1. Backend (API Server) on [Render.com](https://render.com)
1. **New > Web Service**
2. Connect your GitHub repo: `bruhcodes/boba-lounge`
3. **Settings:**
   - **Name:** `boba-lounge-api`
   - **Root Directory:** `artifacts/api-server`
   - **Runtime:** `Node`
   - **Build Command:** `pnpm build`
   - **Start Command:** `pnpm start`
4. **Environment Variables:**
   - `PORT`: `3013`
   - `SUPABASE_URL`: `https://czeymwcgxtgjgxhmmqxm.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6ZXltd2NneHRnamd4aG1tcXhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQ4OTc3MCwiZXhwIjoyMDkxMDY1NzcwfQ.XBlBmraggUxMioM44nzINfANMat_G8GEt_I3YR32wEo`
   - `ADMIN_PASSWORD`: `BobaAdmin2026!`
   - `VAPID_PUBLIC_KEY`: `BA-IIi1sNNEchWwJFlDf02f0gp_W3Yn92zU1BlfIIjN6tTuWBfIaIIrBwBSbcyt3AwkLJpzSEXLhO-gFSt3l1Es`
   - `VAPID_PRIVATE_KEY`: `87kiJWeWO1o7I_DVmtgYX5OPtEmGkTJEX4dxOUYFK60`
   - `VAPID_SUBJECT`: `mailto:admin@bobalounge.com`

---

## 2. Frontend (PWA) on [Netlify.com](https://netlify.com)
1. **Add new site > Import from existing project**
2. Connect your GitHub repo: `bruhcodes/boba-lounge`
3. **Settings:**
   - **Base directory:** `artifacts/punch-card`
   - **Build command:** `pnpm build`
   - **Publish directory:** `artifacts/punch-card/dist`
4. **Environment Variables:**
   - `VITE_API_BASE_URL`: (Once Render is done, paste your Render URL here, e.g. `https://boba-lounge-api.onrender.com`)
   - `VITE_VAPID_PUBLIC_KEY`: `BA-IIi1sNNEchWwJFlDf02f0gp_W3Yn92zU1BlfIIjN6tTuWBfIaIIrBwBSbcyt3AwkLJpzSEXLhO-gFSt3l1Es`

---

## ✅ Final Steps
1. Once Netlify is live, open your new website!
2. Go to the Admin section, log in with `BobaAdmin2026!`.
3. Test a scan and enjoy your automated loyalty system!
