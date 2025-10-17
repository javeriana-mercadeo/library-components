const prettierFormat = async (code, type) => {
  // Para JSON, usar JSON.stringify nativo ya que es más confiable
  if (type === 'json') {
    try {
      const parsed = JSON.parse(code)
      return JSON.stringify(parsed, null, 2)
    } catch (error) {
      // Si no se puede parsear como JSON, devolver el código original
      return code
    }
  }

  try {
    // Importaciones dinámicas para evitar problemas en build time
    const [prettier, parserHtml, parserPostcss, parserBabel, prettierPluginEstree] = await Promise.all([
      import('prettier/standalone'),
      import('prettier/plugins/html'),
      import('prettier/plugins/postcss'),
      import('prettier/plugins/babel'),
      import('prettier/plugins/estree')
    ])

    const parsers = {
      html: [parserHtml.default],
      css: [parserPostcss.default],
      scss: [parserPostcss.default],
      js: [parserBabel.default, prettierPluginEstree.default]
    }

    if (!parsers[type]) {
      throw new Error(`Tipo de parser no soportado: ${type}`)
    }

    return await prettier.default.format(code, {
      parser: type === 'js' ? 'babel' : type,
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
      printWidth: 100,
      htmlWhitespaceSensitivity: 'ignore'
    })
  } catch (error) {
    console.error('Error al formatear código con Prettier:', error)
    // Si falla el formateo, devolver el código original
    return code
  }
}

export { prettierFormat }
