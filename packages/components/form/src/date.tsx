import {defineComponent, PropType} from '@vue/composition-api'
import {customPlaceholder} from '../utils'


import type {RewriteFormProps, CustomFormItemProps} from '@packages/components/form/types'


const datePickerPlaceholder = (_label: string, item: any) => {
    const type = item.type
    if (['week'].includes(type)) {
        return '周'
    } else if (['month', 'monthrange'].includes(type)) {
        return '月份'
    } else if (['year', 'yearrange'].includes(type)) {
        return '年份'
    }
    return '时间'
}

const customValuFormat = (options: any): string => {
    if (['datetime', 'datetimerange'].includes(options.type)) {
        return 'yyyy-MM-dd HH:mm:ss'
    } else if (options.type === 'year') {
        return 'yyyy'
    } else if (['month', 'monthrange'].includes(options.type)) {
        return 'yyyy-MM'
    } else if (['date', 'daterange', 'dates'].includes(options.type)) {
        return 'yyyy-MM-dd'
    }
    return ''
}
export default defineComponent({
    name: 'dinert-date',
    props: {
        form: {
            type: Object as PropType<RewriteFormProps>,
            default: () => ({})
        },
        formItem: {
            type: Object as PropType<CustomFormItemProps>,
            default: () => ({})
        },
    },
    computed: {
        options() {
            const options = this.formItem.options || {}
            options.type = this.formItem.type
            options.defaultTime = options.defaultTime || (['datetimerange'].includes(options.type) ? ['00:00:00', '23:59:59'] : options.defaultTime)
            return options
        }
    },
    render() {

        return (
            <el-date-picker
                v-model={this.form.model[this.formItem.key]}
                clearable
                startPlaceholder={customPlaceholder(
                    datePickerPlaceholder(typeof this.options.label === 'function' ? this.options.label(this.form.model) : this.options.label, this.options), 'input', '开始')}
                endPlaceholder={customPlaceholder(
                    datePickerPlaceholder(typeof this.options.label === 'function' ? this.options.label(this.form.model) : this.options.label, this.options), 'input', '结束')}
                unlink-panels={true}
                value-format={customValuFormat(this.options)}
                format={this.options.type === 'week' ? 'yyyy第WW周' : this.options.format}
                attrs={{...this.options}}
                on={{...this.options.on}}
                ref={'datePickerRef'}
            >
                {this.$scopedSlots['range-separator'] && (<template slot="range-separator">{this.$scopedSlots['range-separator'](this.formItem)}</template>)}
            </el-date-picker>

        )
    }
})

