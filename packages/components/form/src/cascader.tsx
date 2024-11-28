import {defineComponent, PropType} from '@vue/composition-api'

import type {RewriteFormProps, CustomFormItemProps} from '@packages/components/form/types'

export default defineComponent({
    name: 'dinert-cascader',
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
            const options = this.formItem.options || {
                options: [],
                props: {
                    children: 'children',
                    value: 'value',
                    label: 'label',
                    expandTrigger: 'hover'
                }
            }
            return options
        }
    },
    render() {
        return (
            <div>
                <el-cascader
                    v-model={this.form.model[this.formItem.key]}
                    attrs={{
                        clearable: true,
                        ...this.options,
                        props: {
                            expandTrigger: 'hover',
                            ...this.options.props
                        }
                    }}
                    on={this.options.on}
                    key={this.formItem.key}
                    ref={'cascaderRef'}
                >
                </el-cascader>
            </div>
        )
    }
})

