import {defineComponent, PropType} from '@vue/composition-api'

import type {RewriteFormProps, CustomFormItemProps} from '@packages/components/form/types'
import {Input} from 'element-ui'
// import {PropType} from 'vue'

export default defineComponent({
    name: 'dinert-input',
    props: {
        // form: {
        //     type: Object as PropType<RewriteFormProps>,
        //     default: () => ({})
        // },
        // formItem: {
        //     type: Object as PropType<CustomFormItemProps>,
        //     default: () => ({})
        // },
        a: {
            type: String,
            default: '123'
        }
    },
    data() {
        return {
            inputRef: null as InstanceType<typeof Input> | null
        }
    },
    mounted() {
        this.inputRef = this.$refs.inputRef as InstanceType<typeof Input>
    },
    computed: {
        options() {
            const options = this.formItem.options || {}
            options.type = this.formItem.type === 'textarea' ? this.formItem.type : options.type
            return options
        }
    },
    render() {
        return (
            <el-input
                ref={'inputRef'}
                v-model={this.form.model[this.formItem.key]}
                clearable
                show-word-limit={this.options.showWordLimit === undefined ? true : this.options.showWordLimit}
                onBlur={e => {this.form.model[this.formItem.key] = e.target.value.trim()}}
                attrs={{...this.options}}
            >
            </el-input>
        )
    }
})

