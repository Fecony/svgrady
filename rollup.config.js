import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import banner from 'rollup-plugin-banner'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

const output = production
  ? [
      {
        name: pkg.name,
        exports: 'named',
        file: `dist/${pkg.name}.min.js`,
        format: 'umd',
        sourcemap: true
      },
      {
        name: pkg.name,
        exports: 'named',
        file: `dist/${pkg.name}.cjs.min.js`,
        format: 'cjs',
        sourcemap: true
      },
      {
        name: pkg.name,
        exports: 'named',
        file: `dist/${pkg.name}.esm.js`,
        format: 'es',
        sourcemap: true
      }
    ]
  : [
      {
        name: pkg.name,
        exports: 'named',
        file: `dist/${pkg.name}.js`,
        format: 'umd',
        sourcemap: true
      },
      {
        name: pkg.name,
        exports: 'named',
        file: `dist/${pkg.name}.cjs.js`,
        format: 'cjs',
        sourcemap: true
      },
      {
        name: pkg.name,
        exports: 'named',
        file: `dist/${pkg.name}.esm.js`,
        format: 'es',
        sourcemap: true
      }
    ]

const watch = {
  include: ['src/**'],
  exclude: ['node_modules/**']
}

const plugins = [
  resolve(),
  typescript({
    useTsconfigDeclarationDir: true,
    typescript: require('typescript')
  }),
  commonjs({
    include: 'node_modules/**'
  }),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js', '.ts']
  }),
  production && terser(),
  banner('<%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>')
]

export default {
  input: 'src/index.ts',
  output,
  watch,
  plugins
}
