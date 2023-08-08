import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		outDir: 'build',
		sourcemap: true,
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},
	optimizeDeps: {
		exclude: ['js-big-decimal'],
		include: ['linked-dep']
	},
});
