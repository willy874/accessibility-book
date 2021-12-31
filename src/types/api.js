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
 * @typedef {Object} LineLoginRequestParam
 * @property {string} code
 * @property {string} return_url
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
/**
 * @typedef {Object} UserModel
 * @property {string} email
 * @property {string} first_name
 * @property {boolean} is_authorized
 * @property {boolean} is_password_set
 * @property {string} last_name
 * @property {number} pk
 * @property {string} username
 */
/**
 * @typedef {Object} HistoryRequestParam
 * @property {JSON} payload
 * @property {number} chapter
 */
/**
 * @typedef {Object} HistoryCreateResponse
 * @property {number} id
 * @property {JSON} payload
 * @property {number} user
 * @property {number} chapter
 */
/**
 * @typedef {Object} HistoryModel
 */
/**
 * @typedef {Object} RegisterRequestParam
 * @property {string} username
 * @property {string} password1
 * @property {string} password2
 * @property {string} email
 */
/**
 * @typedef {Object} BookMarkRequestParam
 * @property {JSON} payload
 * @property {number} chapter
 */
/**
 * @typedef {Object} BookMarkModel
 * @property {number} id
 * @property {JSON} payload
 * @property {number} user
 * @property {number} chapter
 */
