// rollup.v1.config.js

export default {
    input: 'src/v1/index.js',
    output: [
      {
        file: 'dist/v1/quarkfx.js',
        format: 'umd',
        name: 'quarkfx'
      }
    ]
  };