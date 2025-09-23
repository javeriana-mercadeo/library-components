/**
 * @fileoverview Sistema de validación robusto y extensible
 * @module Validators
 */

const ValidatorUtils = {
  required(value) {
    return value != null && value.toString().trim().length > 0
  },

  email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  emailStrict(value) {
    const strictEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return strictEmailRegex.test(value)
  },

  phone(value) {
    const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/
    return phoneRegex.test(value)
  },

  phoneInternational(value) {
    const intlPhoneRegex = /^\+?[1-9]\d{1,14}$/
    return intlPhoneRegex.test(value.replace(/[\s\-()]/g, ''))
  },

  document(value) {
    return /^\d{6,12}$/.test(value)
  },

  name(value) {
    return value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value)
  },

  firstName(value) {
    return this.name(value) && value.trim().split(/\s+/).length >= 1
  },

  lastName(value) {
    return this.name(value) && value.trim().split(/\s+/).length >= 1
  },

  fullName(value) {
    return this.name(value) && value.trim().split(/\s+/).length >= 2
  },

  password(value) {
    return value.length >= 8
  },

  passwordStrong(value) {
    const hasUpper = /[A-Z]/.test(value)
    const hasLower = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)
    const isLongEnough = value.length >= 8

    return isLongEnough && hasUpper && hasLower && hasNumber && hasSpecial
  },

  passwordMedium(value) {
    const hasUpper = /[A-Z]/.test(value)
    const hasLower = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const isLongEnough = value.length >= 6

    return isLongEnough && ((hasUpper && hasLower) || (hasNumber && (hasUpper || hasLower)))
  },

  url(value) {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },

  urlHttp(value) {
    try {
      const url = new URL(value)
      return ['http:', 'https:'].includes(url.protocol)
    } catch {
      return false
    }
  },

  number(value) {
    return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value)
  },

  integer(value) {
    return Number.isInteger(Number(value))
  },

  positive(value) {
    return this.number(value) && Number(value) > 0
  },

  negative(value) {
    return this.number(value) && Number(value) < 0
  },

  nonNegative(value) {
    return this.number(value) && Number(value) >= 0
  },

  range(value, min, max) {
    if (!this.number(value)) return false
    const num = Number(value)
    return num >= min && num <= max
  },

  minLength(value, min) {
    return value.toString().length >= min
  },

  maxLength(value, max) {
    return value.toString().length <= max
  },

  exactLength(value, length) {
    return value.toString().length === length
  },

  lengthRange(value, min, max) {
    const len = value.toString().length
    return len >= min && len <= max
  },

  alphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value)
  },

  alphabetic(value) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)
  },

  numeric(value) {
    return /^\d+$/.test(value)
  },

  slug(value) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
  },

  hexColor(value) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
  },

  ipAddress(value) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    return ipv4Regex.test(value) || ipv6Regex.test(value)
  },

  creditCard(value) {
    const cleaned = value.replace(/[\s-]/g, '')
    if (!/^\d{13,19}$/.test(cleaned)) return false

    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i])

      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  },

  date(value) {
    const date = new Date(value)
    return date instanceof Date && !isNaN(date.getTime())
  },

  dateAfter(value, afterDate) {
    const date = new Date(value)
    const after = new Date(afterDate)
    return this.date(value) && this.date(afterDate) && date > after
  },

  dateBefore(value, beforeDate) {
    const date = new Date(value)
    const before = new Date(beforeDate)
    return this.date(value) && this.date(beforeDate) && date < before
  },

  dateRange(value, startDate, endDate) {
    const date = new Date(value)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return this.date(value) && this.date(startDate) && this.date(endDate) && date >= start && date <= end
  },

  age(value, minAge = 0, maxAge = 150) {
    const birthDate = new Date(value)
    if (!this.date(value)) return false

    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age

    return actualAge >= minAge && actualAge <= maxAge
  },

  regex(value, pattern, flags = '') {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, flags)
    return regex.test(value)
  },

  oneOf(value, options) {
    return Array.isArray(options) && options.includes(value)
  },

  notOneOf(value, options) {
    return Array.isArray(options) && !options.includes(value)
  },

  array(value) {
    return Array.isArray(value)
  },

  arrayMinLength(value, min) {
    return this.array(value) && value.length >= min
  },

  arrayMaxLength(value, max) {
    return this.array(value) && value.length <= max
  },

  arrayUnique(value) {
    if (!this.array(value)) return false
    return new Set(value).size === value.length
  },

  object(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  },

  boolean(value) {
    return typeof value === 'boolean'
  },

  file(value) {
    return value instanceof File
  },

  fileSize(value, maxSizeBytes) {
    return this.file(value) && value.size <= maxSizeBytes
  },

  fileType(value, allowedTypes) {
    if (!this.file(value)) return false
    const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes]
    return types.includes(value.type)
  },

  fileExtension(value, allowedExtensions) {
    if (!this.file(value)) return false
    const extensions = Array.isArray(allowedExtensions) ? allowedExtensions : [allowedExtensions]
    const fileName = value.name.toLowerCase()
    return extensions.some(ext => fileName.endsWith(ext.toLowerCase()))
  },

  compose(...validators) {
    return value => {
      for (const validator of validators) {
        if (!validator(value)) return false
      }
      return true
    }
  },

  custom(validatorFn) {
    return validatorFn
  }
}

export { ValidatorUtils }
