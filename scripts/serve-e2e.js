import path from 'path'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import vue from 'rollup-plugin-vue'

export default {
  input: './example-e2e/main.js',
  output: {
    file: './example-e2e/app.js',
    format: 'iife',
    name: 'app',
    sourcemap: true,
  },
  plugins: [
    alias({
      resolve: ['.vue', '.js'],
      entries: [
        {
          find: '~',
          replacement: path.join(__dirname, '..', '/src'),
        },
      ],
    }),
    vue({
      css: true,
      needMap: false, // https://github.com/vuejs/rollup-plugin-vue/issues/238
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'preventAssignment': true,
    }),
    resolve({
      module: true,
      jsnext: true,
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    }),
    serve({
      contentBase: path.join(__dirname, '..', 'example-e2e'),
      host: 'localhost',
      port: 8080,
    }),
    livereload({
      verbose: true,
      watch: path.join(__dirname, '..', 'example-e2e'),
    }),
  ],
}
