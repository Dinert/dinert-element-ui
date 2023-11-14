import DinertTable from '@packages/table'
import DinertForm from '@packages/form'
import DinertOverflowTooltip from '@packages/overflow-tooltip'
import DinertTablePage from '@packages/table-page'
import DinertDialog from '@packages/dialog'
import {filterNullStrUndefind} from '@/utils/tools'
import {getFormValue} from '@/utils/getValue'

const components = [
    DinertTable,
    DinertForm,
    DinertOverflowTooltip,
    DinertTablePage,
    DinertDialog,
]


export default {
    install: function install(Vue) {
        components.forEach(component => {
            Vue.component(component.name, component)
        })
    },
    DinertTable,
    DinertForm,
    DinertOverflowTooltip,
    DinertTablePage,
    getFormValue,
    DinertDialog,
    filterNullStrUndefind
}


