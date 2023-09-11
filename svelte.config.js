import { vitePreprocess } from "@sveltejs/kit/vite";
//import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
  })
  },

  preprocess: [vitePreprocess({}), preprocess({
    scss: {
      prependData: `@import './src/style/app.scss';`
    }
  })],
};

export default config;
