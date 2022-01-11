/**
 * @typedef {{ [field: string]: string[] }} ErrorResult
 */
/**
 * @typedef {Object} ValidateOptionBase
 * @property {string} message
 */
/**
 * @template P
 * @typedef {Required<P & ValidateOptionBase>} ValidateOption
 */
/**
 * @callback ValidateHandle
 * @param {unknown} value
 * @param {Required<ValidateOptionBase>} option
 * @returns {string|string[]|null}
 */
