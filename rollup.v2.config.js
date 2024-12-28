import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/v2/index.js',
  output: [
    {
      file: 'dist/v2/quarkfx.js',
      format: 'umd',
      name: 'quarkfx'
    },
    {
      file: 'dist/v2/quarkfx.min.js',
      format: 'umd',
      name: 'quarkfx',
      plugins: [terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        },
        mangle: {
          properties: {
            regex: /^_/ // Mangle private methods only
          }
        }
      })]
    },
    {
      file: 'dist/v2/quarkfx.esm.js',
      format: 'es',
      plugins: [terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true
        }
      })]
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: [
              'last 2 versions',
              'not dead'
            ]
          }
        }]
      ]
    })
  ]
};