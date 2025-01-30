import prettier from 'prettier/standalone'
import parserHtml from 'prettier/plugins/html'
import parserPostcss from 'prettier/plugins/postcss' // Para CSS y SCSS
import parserBabel from 'prettier/plugins/babel' // Para JavaScript

const prettierFormat = (code, type) => {
  const parsers = {
    html: [parserHtml],
    css: [parserPostcss],
    scss: [parserPostcss],
    js: [parserBabel]
  }

  if (!parsers[type]) {
    throw new Error(`Tipo de parser no soportado: ${type}`)
  }

  return prettier.format(code, {
    parser: type,
    plugins: parsers[type],
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    arrowParens: 'avoid',
    endOfLine: 'lf',
    bracketSpacing: true,
    bracketSameLine: true,
    proseWrap: 'always',
    quoteProps: 'as-needed',
    printWidth: 140
  })
}

export { prettierFormat }
