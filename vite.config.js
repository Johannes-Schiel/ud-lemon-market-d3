import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		// vite config
		define: {
			LEMON_MARKET_KEY: env.VITE_LEMON_MARKET_KEY,
		},
		root: 'src',
		build: {
			emptyOutDir: true,
			outDir: '../dist',
		},
	};
});
