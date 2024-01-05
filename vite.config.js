import { resolve } from 'path';

export default {
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                menu: resolve(__dirname, 'menu/index.html'),
            },
        },
        sourcemap: true,
        minify: false,
        outDir: 'dist',
    },
    base: '/roundedtoken-JSFE2023Q4/coffee-house/dist/',
};
