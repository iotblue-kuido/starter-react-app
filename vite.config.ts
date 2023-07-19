import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		outDir: 'build',
		sourcemap: true,
	},
	optimizeDeps: {
		exclude: ['js-big-decimal'],
	},
});
