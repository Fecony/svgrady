import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import {
  main,
  module,
  browser,
  dependencies,
  peerDependencies
} from './package.json'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      sourcemap: true,
      format: 'cjs'
    },
    {
      file: module,
      sourcemap: true,
      format: 'esm'
    },
    {
      name: 'SVGrady',
      sourcemap: true,
      file: browser,
      format: 'umd'
    }
  ],
  watch: {
    include: ['src/**'],
    exclude: ['node_modules/**']
  },
  external: [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {})
  ],
  plugins: [
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require('typescript')
    }),
    babel({ exclude: 'node_modules/**' }),
    production && terser()
  ]
}
