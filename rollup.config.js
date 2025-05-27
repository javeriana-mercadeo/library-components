import alias from '@rollup/plugin-alias'
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import { fileURLToPath } from 'url'

// Solo si sigues en .js modo ESM:
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  input: 'build/script.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'DMPA'
  },
  plugins: [
    alias({
      entries: [
        { find: '@general', replacement: path.resolve(__dirname, 'app/library/_general') },
        { find: '@styles', replacement: path.resolve(__dirname, 'styles') }
      ]
    }),
    postcss({
      extract: true, // Extrae el CSS en un archivo separado
      minimize: false, // Puedes poner true para minificar
      sourceMap: false,
      use: ['sass'] // Le dices que compile Sass
    })
  ]
}
