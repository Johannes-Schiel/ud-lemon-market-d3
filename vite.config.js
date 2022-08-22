import { defineConfig } from 'vitest/config';

export default ({ mode }) => {
	require('dotenv').config({ path: `./.env` });

	return defineConfig({
		test: {
			include: ['**/js/*.test.js'],
			globals: true,
			reporters: 'verbose',
		},
		root: 'src',
		build: {
			emptyOutDir: true,
			outDir: '../dist',
		},
	});
};
