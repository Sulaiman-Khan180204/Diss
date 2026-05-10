import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    optimizeDeps: {
        exclude: ['@xenova/transformers'],
    },
    build: {
        rollupOptions: {
            external: [],
        },
    },
    worker: {
        format: 'es',
    },
    server: {
        cors:true,
        hmr: {
            host: "cuddly-trout-g4vxgxgwg577cpwpp-5173.app.github.dev",
            clientPort: 443,
            protocol:'wss',
        },
        
    }

});