// this was added in order to resolve the issue with router
// when I use 'element' in Route Object, it was throwing an error


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs/promises';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
        exclude: [],
    },
    esbuildOptions: {
        plugins: [
            {
                name: 'load-js-files-as-tsx',
                setup(build) {
                    build.onLoad(
                        { filter: /src\\.*\.ts$/ },
                        async (args) => ({
                            loader: 'jsx',
                            contents: await fs.readFile(args.path, 'utf8'),
                        })
                    );
                },
            },
        ],
    },
})
