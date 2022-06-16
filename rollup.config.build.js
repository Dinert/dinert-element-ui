
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'


const path = require('path')
const resolveDir = dir => path.join(__dirname, dir)
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'dinert-element-ui',
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    vue({
      style: {
        postcssPlugins: [
          autoprefixer(),
        ]
      }
    }),
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    alias({
      entries:[
        {find: '@', replacement: resolveDir('src')},
      ]
    }),
    postcss({
      plugins: [
        autoprefixer(),
      ]
    }),
    terser()
  ],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
    'vue',
    'echarts',
    'element-ui'
  ],
}