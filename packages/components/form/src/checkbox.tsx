import {defineComponent, PropType} from '@vue/composition-api'

import type {RewriteFormProps, CustomFormItemProps} from '@packages/components/form/types'

export default defineComponent({
    name: 'dinert-checkbox',
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
    created() {
        if (typeof this.form.model[this.formItem.key] === 'undefined') {
            this.$set(this.form.model, this.formItem.key, [])
        }
    },
    computed: {
        options() {
            const options = this.formItem.options || {}
            return options
        }
    },
    render() {
        const options = this.options?.options || []
        return (
            <el-checkbox-group v-model={this.form.model[this.formItem.key]}
                attrs ={{...this.options}}
                on={{...this.options.on}}
            >
                {
                    options.map(item => {
                        if (this.formItem.type === 'checkbox-button') {
                            return (<el-checkbox-button
                                attrs={item}
                                label={item[this.options.value || 'value']}
                            >
                                {item[this.options.label || 'label']}
                            </el-checkbox-button>)
                        }
                        return (<el-checkbox
                            attrs={item}
                            label={item[this.options.value || 'value']}
                            border={item.border === undefined ? this.options.border : item.border}
                        >
                            {item[this.options.label || 'label']}
                        </el-checkbox>)
                    })
                }
            </el-checkbox-group>

        )
    }
})

