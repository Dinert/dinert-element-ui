
// 首字母大写
export const firstUpperCase = str => {
    str = String(str)
    return str.replace(/^\S/, s => s.toUpperCase())
}

// 过滤参数
export const filterNullStrUndefind = formValue => {
    const tempObj = {}
    for (const prop in formValue) {
        const value = formValue[prop]
        if (!['', null, undefined].includes(value)) {
            tempObj[prop] = formValue[prop]
        }
    }
    return tempObj
}

// 生成唯一ID
export const getUuid = () => {
    const s = []
    const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    const uuid = s.join('')
    return uuid
}

/**
 *
 * @param {Object} obj
 * @param {String} path
 * @returns
 */
export const getPropByPath = (obj, path) => {
    let tempObj = obj
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')

    const keyArr = path.split('.')
    let i = 0
    for (let len = keyArr.length; i < len - 1; ++i) {
        // eslint-disable-next-line max-statements-per-line
        if (!tempObj) {break}
        const key = keyArr[i]
        if (key in tempObj) {
            tempObj = tempObj[key]
        } else {
            return null
            // break;
        }
    }
    return tempObj ? tempObj[keyArr[i]] : null
}

/**
 *
 */

export const escapeHTML = str => {
    // eslint-disable-next-line consistent-return
    return str.replace(/[<>& "]/g, match => {
        switch (match) {
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '&':
                return '&amp;'
            case ' ':
                return '&nbsp;'
            case '"':
                return '&quot;'
        }
    })
}
