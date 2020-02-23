import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    },
    {
      name: 'SVGrady',
      file: pkg.browser,
      format: 'umd'
    }
  ],
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    production && terser()
  ]
}
