import _ from 'lodash'

// 首字母大写
export const firstUpperCase = (str) => {
  str = String(str)
  return str.replace(/^\S/, s => s.toUpperCase())
}

export const filterNullStrUndefind = (formValue) => {
  let tempObj = {}
  for (const prop in formValue) {
    const value = formValue[prop]
    if (!['', null, undefined].includes(value)) {
      tempObj[prop] = formValue[prop]
    }
  }
  return tempObj
}

export const windowResize = (resize, delay = 0, immediate = true) => {
  if(typeof resize === 'function') {
    window.addEventListener('resize', _.debounce(resize, delay, immediate))
    resize()
  }
}