import {defineComponent} from '@vue/composition-api'

export default defineComponent({
    name: 'DinertForm',
    props: {
        // form: {
        //     type: Object as PropType<RewriteFormProps>,
        //     default: () => ({})
        // },`
    },
    data() {
        return {
            name: '111'
        }
    },
    render() {
        return (
            <el-form>
                <el-form-item prop={'aa'}>
                    <el-input v-model={this.name}></el-input>
                    {this.name}
                </el-form-item>
            </el-form>
        )
    }
})
