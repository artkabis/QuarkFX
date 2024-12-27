import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'quarkfx',
      plugins: [terser()]
    }
  ],
  plugins: [babel({ babelHelpers: 'bundled' })]
};