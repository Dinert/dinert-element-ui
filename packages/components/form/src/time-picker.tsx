import {defineComponent, PropType} from '@vue/composition-api'


import type {RewriteFormProps, CustomFormItemProps} from '@packages/components/form/types'


export default defineComponent({
    name: 'dinert-slider',
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
            return options
        }
    },
    render() {
        if (this.formItem.type === 'time-picker') {
            return (
                <el-time-picker
                    v-model={this.form.model[this.formItem.key]}
                    startPlaceholder={'请选择开始时间'}
                    endPlaceholder={'请选择结束时间'}
                    attrs={{...this.options}}
                    on={{...this.options.on}}
                    ref={'timePickerRef'}
                >
                </el-time-picker>)
        }

        return (
            <el-time-select
                v-model={this.form.model[this.formItem.key]}
                attrs={{...this.options}}
                on={this.options.on}
                ref={'timePickerRef'}
            >
            </el-time-select>
        )
    }
})

