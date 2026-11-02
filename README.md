# Soni's Sweet 16 Magical Birthday Adventure 🪆🎂

An interactive birthday adventure game celebrating Soni My Doll's 16th birthday, created with love by Mannu 🐻.

---

## 🚀 How to Deploy on GitHub Pages (Fixing Blank White Page)

If your website shows a blank white page on GitHub Pages, it is because **GitHub Pages is serving the raw uncompiled TypeScript source files (`/src/main.tsx`) instead of the compiled production build in the `dist` folder**.

Choose **any one** of the simple methods below:

### Method 1: Using GitHub Actions (Recommended & Automatic)
1. Push this entire project to your GitHub repository.
2. In your repository on GitHub, click **Settings** (tab at the top).
3. On the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Source**, change the dropdown from **"Deploy from a branch"** to **"GitHub Actions"**.
5. That's it! GitHub will automatically run the included `.github/workflows/deploy.yml` workflow, compile the app, and publish it live without any blank screen.

---

### Method 2: One-Command Deploy via Terminal (`npm run deploy`)
1. In your terminal inside this project folder, run:
   ```bash
   npm run deploy
   ```
2. This runs `npm run build` and automatically pushes the compiled `dist` folder to a `gh-pages` branch on your GitHub repo.
3. In GitHub repo **Settings** > **Pages**, ensure the Source branch is set to **`gh-pages`** and folder to **`/ (root)`**.

---

### Method 3: Deploying from the `dist` Folder Directly
If you prefer to manually upload files or deploy from the `main` branch:
1. Run `npm run build`.
2. Move the contents of the `dist/` folder (`index.html`, `404.html`, `.nojekyll`, and the `assets/` folder) directly to the root of your repository or into a `/docs` folder.
3. In GitHub repo **Settings** > **Pages**, select that branch and folder.

---

### 💻 Local Development
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```
