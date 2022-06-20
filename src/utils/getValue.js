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



// 获取root的颜色值
export function getPropertyValue(value) { 
  const el = document.documentElement;
  return getComputedStyle(el).getPropertyValue(`${value}`).trim();
}