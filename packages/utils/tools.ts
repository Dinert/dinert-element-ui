
// 浏览器的各种存储
export const storage = (name: 'localStorage' | 'sessionStorage', key: string, value?: any) => {
    if (key === 'remove') {
        return (window as any)[name].removeItem(`dinert-zhdd-${value}`)
    } else if (key === 'clear') {
        return (window as any)[name].clear()
    } else if (value) {
        return (window as any)[name].setItem(`dinert-zhdd-${key}`, JSON.stringify(value))
    } else {
        return JSON.parse((window as any)[name].getItem(`dinert-zhdd-${key}`))
    }
}

// 首字母大写
export const firstUpperCase = (str: string) => {
    str = String(str)
    return str.replace(/^\S/, s => s.toUpperCase())
}

// 重写判断类型
export const type = (type: any) => {
    return Object.prototype.toString
        .call(type)
        .split(' ')[1]
        .split(']')[0]
        .toLocaleLowerCase()
}

// 生成唯一ID
export const getUuid = (): string => {
    const s: any[] = []
    const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((+s[19] & 0x3) | 0x8, 1)
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
export const getPropByPath = (obj: any, path: string) => {
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

export const dataTransformRod = (data: any, errData: any = '-') => {
    return [null, undefined, ''].includes(data) ? errData : data
}

function findNode(tree) {
    // 如果当前节点为目标节点，返回 true
    if (tree.checked === false) {
        return true
    }

    // 遍历当前节点的所有子节点
    if (tree.children && tree.children.length > 0) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < tree.children.length; i++) {
        // 对每个子节点递归执行查找过程
            const found = findNode(tree.children[i])
            if (found) {
                // 如果找到了目标节点，直接返回 true，结束递归
                return true
            }
        }
    }
    // 如果所有子节点都不是目标节点，返回 false
    return false
}


// 获取树指定的所有节点
export const getTreeNode = <T = any>(treeData: any, name: string, value: any, key: string): T[] => {
    const result: T[] = []

    // eslint-disable-next-line consistent-return
    const treeNode = (treeData2: any) => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < treeData2.length; i++) {
            const isFlag = findNode(treeData2[i])


            if (value.includes(treeData2[i][name]) && !isFlag && treeData2[i][key]) {
                result.push(treeData2[i][key])
            }
            if (treeData2[i].children && treeData2[i].children.length) {
                treeNode(treeData2[i].children)
            }
        }

    }
    treeNode(treeData)
    return result
}

// 树转扁平
export function convertToFlat<T = any>(data: T[], children: string = 'children', parentId: any = null): T[] {
    return data.reduce((acc: any, curr: any) => {
        acc.push({...curr, parentId})
        if (curr[children] && curr[children].length) {
            acc = acc.concat(convertToFlat(curr[children], children, curr.id))
        }
        return acc
    }, [])
}

// 格式化手机号
export function formatPhone(value: string): string {
    if (!/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(value)
  || value.length !== 11) {
        return value
    } else {
        const mobile = value.replace(/^(.{3})(.*)(.{4})/, '$1-$2-$3')
        return mobile
    }
}

// 下载文件
export const downFile = (response: any): any => {
    const content = response.data
    // blob内容是json，不下载
    if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
        return response
    }
    const data = new Blob([content], {
        type: response.headers['content-type']
    })
    const downloadUrl = window.URL.createObjectURL(data)

    if (response.config.headers.prohibitDownload) {
        return downloadUrl
    }
    const anchor = document.createElement('a')
    anchor.href = downloadUrl
    let filename = response.headers['content-disposition'].split('=')[1]
    filename = filename.split(';')[0]
    anchor.download = decodeURIComponent(filename)
    anchor.target = '_blank'
    anchor.click()
    window.URL.revokeObjectURL((data as any))
    return true
}

// 转化数组为字符串
export const formatterArray = (cellValue: any) => {
    if (cellValue instanceof Array) {
        const joinValue = cellValue.join(',')
        return joinValue || '-'
    } else if (cellValue) {
        return cellValue
    } else {
        return '-'
    }
}


export const columnProp = (prop: string) => {
    return 'column_' + prop.split('.').join('_')
}

export const headerProp = (prop: string) => {
    return 'column_header_' + prop.split('.').join('_')
}

export const isSlotsValue = (slot: any) => {
    return slot && slot[0] && slot[0].children
}
