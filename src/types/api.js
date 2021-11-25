/**
 * @typedef {Object} ChapterModel
 * @property {number} id
 * @property {number} no
 * @property {string} name
 * @property {string} content
 * @property {string} created
 * @property {string} book
 */
/**
 * @typedef {Object} LoginRequestParam
 * @property {string} username
 * @property {string} password
 */
/**
 * @typedef {Object} LoginResponseData
 * @property {string} key
 */
/**
 * @typedef {Object} ChapterIndex
 * @property {number} id
 * @property {string} name
 * @property {number} no
 */
/**
 * @typedef {Object} Publisher
 * @property {number} id
 * @property {string} name
 * @property {boolean} is_hide
 */
/**
 * @typedef {Object} Author
 * @property {number} id
 * @property {string} name
 * @property {boolean} is_hide
 */
/**
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} name
 */
/**
 * @typedef {Object} BookModel
 * @property {string} id
 * @property {ChapterIndex} chapter_set
 * @property {string} name
 * @property {null} cover
 * @property {boolean} is_hide
 * @property {string} publication_date
 * @property {string} isbn
 * @property {string} eisbn
 * @property {string} store_url
 * @property {string} created
 * @property {Publisher} publisher
 * @property {Author} author
 * @property {Tag[]} tag
 */
/**
 * @typedef {Object} TagModel
 * @property {string} id
 * @property {string} name
 */
