import {defineComponent, PropType} from '@vue/composition-api'
import {CustomFormItemProps, RewriteFormProps} from '../types'
import {getUuid} from '@packages/utils/tools'
import {customPlaceholder} from '../utils'

export default defineComponent({
    name: 'DinertForm',
    props: {
        form: {
            type: Object as PropType<RewriteFormProps>,
            default: () => ({})
        },
    },
    created() {
        this.packUp = this.form.packUp === undefined ? true : this.form.packUp
    },
    data() {
        return {
            formClass: 'form_' + getUuid(),
            packUp: false
        }
    },
    computed: {
        formItemMap() {
            const result: CustomFormItemProps[] = []
            Object.keys(this.form.formItem).forEach(key => {
                const value = this.form.formItem[key] as CustomFormItemProps
                result.push({
                    ...value,
                    key: key,
                })
            })

            result.sort((a: any, b: any) => {
                return (a.sort || Infinity) - (b.sort || Infinity)
            })
            return result
        }
    },
    render() {


        return (
            <el-form {...{
                inline: true,
                ...this.form
            }}
            class={[this.formClass, this.packUp ? '' : 'packUp', 'dinert-form'].join(' ')}
            key={this.form.key}
            >
                <el-row
                    {...this.form.row}
                    class="el-form-left"
                >
                    {
                        this.formItemMap.map((item: CustomFormItemProps, index: number) => {
                            const style: any = {}
                            let vif = typeof item.vif === 'function' ? item.vif(this.form.model) : item.vif
                            vif = vif === undefined ? typeof this.form.vif === 'function' ? this.form.vif(this.form.model) : vif : vif
                            vif = vif === undefined ? true : vif

                            let show = typeof item.show === 'function' ? item.show(this.form.model) : item.show
                            show = show === undefined ? true : show
                            item.options = {placeholder: customPlaceholder(typeof item.label === 'function' ? item.label(this.form.model) : item.label, item.type), ...item.options}

                            if (!show) {
                                style.display = 'none'
                            }
                            if (!vif) {
                                return null
                            }
                            const formShowLabel = typeof this.form.showLabel === 'function' ? this.form.showLabel(this.form.model) : this.form.showLabel
                            let itemShowLabel = typeof item.showLabel === 'function' ? item.showLabel(this.form.model) : item.showLabel
                            item.required = item.required === undefined ? item.required || this.form.required : item.required
                            itemShowLabel = itemShowLabel === undefined ? itemShowLabel || formShowLabel : itemShowLabel
                            item.required = itemShowLabel ? false : item.required

                            let rules = item.rules || []
                            rules = item.required ? [{required: true, trigger: ['blur', 'change'], message: customPlaceholder(typeof item.label === 'function' ? item.label(this.form.model) : item.label, item.type)}].concat(rules as any) : rules
                            rules = itemShowLabel ? [] : rules
                            const valDisabled = itemShowLabel ? true : item.tempValueDisabled

                            return (
                                <el-col
                                    style= {style}
                                    class={[item.type, item.key]}
                                    key={item.key}
                                    {
                                        ...{
                                            // xl: 3, // ≥1920px
                                            // lg: 4, // ≥1200px
                                            // md: 8, // ≥992px
                                            // sm: 12, // ≥768px
                                            // xs: 24, // <768px
                                            ...this.form.colLayout,
                                            ...item.colLayout
                                        }
                                    }
                                >
                                    <el-form-item
                                        key={item.key}
                                        prop={item.key}
                                        class={[item.labelWrap ? 'label-wrap' : '', itemShowLabel ? 'show-label' : '']}
                                        attrs={{
                                            ...item,
                                            label: typeof item.label === 'function' ? item.label(this.form.model) : item.label,
                                            rules: rules
                                        }}
                                        on={item.on}
                                    >
                                        <div slot="label">
                                            1213123
                                        </div>
                                    </el-form-item>
                                </el-col>
                            )

                        })
                    }
                </el-row>
            </el-form>
        )
    }
})
