import fs from 'fs'
import path from 'path'

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// Simple logger utility
class Logger {
  constructor() {
    this.logFile = path.join(logsDir, 'app.log')
    this.errorFile = path.join(logsDir, 'error.log')
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString()
    const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaStr}\n`
  }

  writeToFile(filename, content) {
    try {
      fs.appendFileSync(filename, content)
    } catch (error) {
      console.error('Failed to write to log file:', error.message)
    }
  }

  info(message, meta = {}) {
    const logMessage = this.formatMessage('info', message, meta)
    console.log(logMessage.trim())
    this.writeToFile(this.logFile, logMessage)
  }

  error(message, meta = {}) {
    const logMessage = this.formatMessage('error', message, meta)
    console.error(logMessage.trim())
    this.writeToFile(this.errorFile, logMessage)
    this.writeToFile(this.logFile, logMessage)
  }

  warn(message, meta = {}) {
    const logMessage = this.formatMessage('warn', message, meta)
    console.warn(logMessage.trim())
    this.writeToFile(this.logFile, logMessage)
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      const logMessage = this.formatMessage('debug', message, meta)
      console.log(logMessage.trim())
      this.writeToFile(this.logFile, logMessage)
    }
  }
}

export const logger = new Logger()