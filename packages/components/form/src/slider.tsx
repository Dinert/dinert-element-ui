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
        return (
            <el-slider
                v-model={this.form.model[this.formItem.key]}
                attrs={{...this.options}}
                on={this.options.on}
            >
            </el-slider>
        )
    }
})

