import DTable from './src/index.vue'

const install = (Vue) => {
  Vue.component(DTable.name, DTable)
}

export {
  DTable
}

export default install