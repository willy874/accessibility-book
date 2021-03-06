/**
 * @template T
 * @typedef {Object} ResponseCollection
 * @property {number} count
 * @property {string} next
 * @property {string} previous
 * @property {Array<T>} results
 */
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
 * @property {number|null} sort_no
 */
/**
 * @typedef {Object} BookModel
 * @property {string} id
 * @property {ChapterIndex[]} chapter_set
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
 * @property {number} id
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
 * @property {number} id
 * @property {JSON} payload
 * @property {number} user
 * @property {number} chapter
 * @property {string} chapter_name
 * @property {string[]} tag
 * @property {number} last_modified
 */
/**
 * @typedef {Object} UserUpdateRequestParam
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} [email]
 * @property {Blob} photo
 */
/**
 * @typedef {Object} PasswordRegisterRequestParam
 * @property {string} new_password1
 * @property {string} new_password2
 */
/**
 * @typedef {Object} PasswordChangeRequestParam
 * @property {string} new_password1
 * @property {string} new_password2
 * @property {string} old_password
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
/**
 * @typedef {Object} MenuModel
 * @property {string} label
 * @property {number} sort
 * @property {string} uuid
 * @property {string} targetUrl
 * @property {string[]} targetTag
 * @property {string} type
 * @property {Array<MenuModel>} [child]
 * @property {boolean} is_filter
 */
/**
 * @typedef {Object} NewsModel
 * @property {number} id
 * @property {string} content
 * @property {string} created
 * @property {string} name
 * @property {string} publish_date
 */
/**
 * @typedef {Object} SiteConf
 * @property {string} domain
 * @property {string} favicon
 * @property {string} logo1
 * @property {string} logo2
 * @property {string} site_name
 * @property {string} about
 */
/**
 * @typedef {Object} SearchModel
 * @property {string} id
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
