/**
 * @typedef {{ [field: string]: string[] | null }} ErrorResult
 */
/**
 * @typedef {Object} ValidateOptionBase
 * @property {string} message
 */
/**
 * @template P
 * @typedef {Partial<P & ValidateOptionBase>} ValidateOption
 */
/**
 * @callback ValidateHandle
 * @param {unknown} value
 * @param {Required<ValidateOptionBase>} option
 * @returns {Promise<string|string[]|null>}
 */
