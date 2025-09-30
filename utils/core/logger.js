/**
 * @fileoverview Sistema de logging centralizado con diferentes niveles
 * @module Logger
 */

export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  SUCCESS: 2,
  WARNING: 3,
  ERROR: 4
}

class LoggerClass {
  constructor() {
    this.level = LogLevel.ERROR // Solo mostrar errores
    this.enableTimestamp = true
    this.enableStackTrace = false
  }

  setLevel(level) {
    this.level = level
  }

  setTimestamp(enabled) {
    this.enableTimestamp = enabled
  }

  setStackTrace(enabled) {
    this.enableStackTrace = enabled
  }

  _formatMessage(level, message, emoji) {
    const timestamp = this.enableTimestamp ? `[${new Date().toISOString()}]` : ''
    const levelText = `[${level}]`
    return `${emoji} ${timestamp} ${levelText} ${message}`
  }

  _log(level, levelNum, emoji, message, ...args) {
    if (levelNum < this.level) return

    const formattedMessage = this._formatMessage(level, message, emoji)

    if (levelNum >= LogLevel.ERROR) {
      console.error(formattedMessage, ...args)
      if (this.enableStackTrace) console.trace()
    } else if (levelNum >= LogLevel.WARNING) {
      console.warn(formattedMessage, ...args)
    } else {
      console.log(formattedMessage, ...args)
    }
  }

  debug(message, ...args) {
    this._log('DEBUG', LogLevel.DEBUG, '🔍', message, ...args)
  }

  info(message, ...args) {
    this._log('INFO', LogLevel.INFO, 'ℹ️', message, ...args)
  }

  success(message, ...args) {
    this._log('SUCCESS', LogLevel.SUCCESS, '✅', message, ...args)
  }

  warning(message, ...args) {
    this._log('WARNING', LogLevel.WARNING, '⚠️', message, ...args)
  }

  error(message, ...args) {
    this._log('ERROR', LogLevel.ERROR, '❌', message, ...args)
  }

  group(label) {
    console.group(`📂 ${label}`)
  }

  groupEnd() {
    console.groupEnd()
  }

  table(data) {
    console.table(data)
  }

  time(label) {
    console.time(label)
  }

  timeEnd(label) {
    console.timeEnd(label)
  }
}

// Exportar instancia única
export const Logger = new LoggerClass()
