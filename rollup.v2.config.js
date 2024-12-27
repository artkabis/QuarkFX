// rollup.v2.config.js
export default {
    input: 'src/v2/index.js',
    output: [
      {
        file: 'dist/v2/quarkfx.js',
        format: 'esm'
      }
    ]
  };