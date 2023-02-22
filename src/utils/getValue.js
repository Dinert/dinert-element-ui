// 获取form表单的值
export const getFormValue = (formItem) => {
  let result = {}
  for(const prop in formItem) {
     if(typeof formItem[prop].value === 'undefined') {
      result[prop] = ''
     }else {
      result[prop] = formItem[prop].value
     }
  }
  return result
}



// 根据dom的元素获取数值
export function getPropertyValue(el, value) {
  return window.getComputedStyle(el, null).getPropertyValue(`${value}`).trim();
}