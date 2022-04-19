/**
 * @typedef {string | number | boolean | null} JsonValue
 */
/**
 * @typedef {{ [key: string]: JsonValue | JsonValue[] | JsonData}} JsonData
 */
/**
 * @typedef {{ [key: string]: string | string[] }} StringData
 */
/**
 * @template K,T
 * @typedef {{ [P in keyof K]: T }} GenericsData
 */
/**
 * @typedef {Object} AppInfo
 * @property {boolean} isApp
 * @property {string} merchant
 * @property {string} version
 * @property {string} platform
 */
/**
 * @typedef {Object} SelectData
 * @property {string|number} id
 * @property {string} text
 * @property {*} value
 */
