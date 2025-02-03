import { defineConfig } from "vite";

export default defineConfig({
    appType: 'mpa',
    root: 'src'
});

// Single Page Application (SPA) -> 404 redirect / url
// Multi Page Application (MPA) -> disable 404 redirect