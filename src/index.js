import DTable from '../packages/d-table'

const components = [DTable]
const install = (Vue) => {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

export {
  DTable
}

export default install // umd



