import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        server: {
            hmr: {
                clientPort: 443
            },
            strictPort: true,
            host: true,
            // Add the host both ways to be safe
            origin: "https://devserver-preview--thermvisia.netlify.app",
            allowedHosts: ["devserver-preview--thermvisia.netlify.app", ".netlify.app"]
        }
    },
    integrations: [react()],
    adapter: netlify()
});
