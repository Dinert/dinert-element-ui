import {defineComponent, PropType} from '@vue/composition-api'
import type {RewriteFormProps, CustomFormItemProps} from '@packages/components/form/types'


export default defineComponent({
    name: 'dinert-radio',
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
        const options = this.options.options || []

        return (
            <el-radio-group v-model={this.form.model[this.formItem.key]}
                attrs ={this.options}
                on={this.options.on}
            >
                {
                    options.map(item => {
                        if (this.formItem.type === 'radio-button') {
                            return (<el-radio-button
                                attrs={item}
                                value={item[this.options.value || 'value']}
                            >
                                {item[this.options.label || 'label']}
                            </el-radio-button>)
                        }
                        return (<el-radio
                            attrs={item}
                            value={item[this.options.value || 'value']}
                        >
                            {item[this.options.label || 'label']}
                        </el-radio>)
                    })
                }

            </el-radio-group>
        )
    }
})

