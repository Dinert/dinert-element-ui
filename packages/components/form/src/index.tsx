import {defineComponent, PropType} from '@vue/composition-api'
import {CustomFormItemProps, RewriteFormProps} from '../types'
import {dataTransformRod, getUuid} from '@packages/utils/tools'
import {customPlaceholder, formItemSlot, getSpanValue, getTooltipValue, renderSlot, valueMouseEnter} from '../utils'

import CustomInput from './input'

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
            <el-form attrs={{
                inline: true,
                ...this.form
            }}
            class={[this.formClass, this.packUp ? '' : 'packUp', 'dinert-form'].join(' ')}
            key={this.form.key}
            >
                <el-row
                    attrs={{...this.form.row}}
                    class="el-form-left"
                >
                    {
                        this.formItemMap.map((item: CustomFormItemProps) => {
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
                                    attrs={{
                                        // xl: 3, // ≥1920px
                                        // lg: 4, // ≥1200px
                                        // md: 8, // ≥992px
                                        // sm: 12, // ≥768px
                                        // xs: 24, // <768px
                                        ...this.form.colLayout,
                                        ...item.colLayout
                                    }}
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
                                    >
                                        <dinert-tooltip key={item.key}
                                            content={String(getTooltipValue(this.form.model[item.key], item))}
                                            disabled={valDisabled}
                                            item={item}
                                            onLabelMouseEnter={(e: MouseEvent) => valueMouseEnter(e, item, this.form.model[item.key], this)}
                                            scopedSlots={{
                                                default: () => {

                                                    const scopedSlots: any = {}
                                                    let componentResult = <span>{dataTransformRod(getSpanValue(this.form.model[item.key], item))}</span>

                                                    if (this.$slots[formItemSlot(item.key)]) {
                                                        componentResult = (this.$scopedSlots[formItemSlot(item.key)]?.({...item, model: this.form.model}))
                                                    } else if (itemShowLabel || (formShowLabel && [true, undefined].includes(itemShowLabel))) {
                                                        return componentResult
                                                    } else if (['input', 'textarea'].includes(item.type)) {
                                                        // renderSlot(['prefix', 'suffix', 'prepend', 'append'], this, scopedSlots, item)
                                                        componentResult = (<CustomInput a={'11'}></CustomInput>)
                                                    }
                                                    // else if (['input-number'].includes(item.type)) {
                                                    //     renderSlot(['decrease-icon', 'increase-icon'], this, slots, item)
                                                    //     componentResult = (<CustomInputNumber form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomInputNumber>)
                                                    // } else if (['input-autocomplete'].includes(item.type)) {
                                                    //     renderSlot(['prefix', 'suffix', 'prepend', 'append', 'loading'], this, slots, item)
                                                    //     componentResult = (<CustomInputAutocomplete form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomInputAutocomplete>)
                                                    // } else if (['select'].includes(item.type)) {
                                                    //     renderSlot(['header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label'], this, slots, item)
                                                    //     componentResult = (<CustomSelect form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomSelect>)
                                                    // } else if (['select-v2'].includes(item.type)) {
                                                    //     renderSlot(['header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label'], this, slots, item)
                                                    //     componentResult = (<CustomSelectV2 form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomSelectV2>)
                                                    // } else if (['switch'].includes(item.type)) {
                                                    //     renderSlot(['active-action', 'inactive-action'], this, slots, item)
                                                    //     componentResult = (<CustomSwitch form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomSwitch>)
                                                    // } else if ([
                                                    //     'datetime',
                                                    //     'date',
                                                    //     'dates',
                                                    //     'week',
                                                    //     'month',
                                                    //     'year',
                                                    //     'years',
                                                    //     'datetimerange',
                                                    //     'daterange',
                                                    //     'monthrange',
                                                    //     'yearrange',
                                                    // ].includes(item.type)) {
                                                    //     renderSlot(['range-separator', 'prev-month', 'next-month', 'prev-year', 'next-year'], this, slots, item)
                                                    //     componentResult = (<CustomDate form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomDate>)
                                                    // } else if (['radio', 'radio-button'].includes(item.type)) {
                                                    //     componentResult = (<CustomRadio form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomRadio>)
                                                    // } else if (['tree-select'].includes(item.type)) {
                                                    //     renderSlot(['header', 'footer', 'prefix', 'empty', 'tag', 'loading', 'label'], this, slots, item)
                                                    //     componentResult = (<CustomSelectTree form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomSelectTree>)
                                                    // } else if (['rate'].includes(item.type)) {
                                                    //     componentResult = (<CustomRate form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomRate>)
                                                    // } else if (['checkbox', 'checkbox-button'].includes(item.type)) {
                                                    //     componentResult = (<CustomCheckbox form={this.form} formItem={item} v-slots={slots}
                                                    //         ref={el => this.setFormTypeRefs(item.key, el)}></CustomCheckbox>)
                                                    // } else if (['cascader'].includes(item.type)) {
                                                    //     renderSlot(['empty'], this, slots, item)
                                                    //     componentResult = (<CustomCascader ref={el => this.setFormTypeRefs(item.key, el)}
                                                    //         form={this.form} formItem={item} v-slots={slots}></CustomCascader>)
                                                    // } else if (['slider'].includes(item.type)) {
                                                    //     componentResult = (<CustomSlider ref={el => this.setFormTypeRefs(item.key, el)}
                                                    //         form={this.form} formItem={item} v-slots={slots}></CustomSlider>)
                                                    // } else if (['time-picker'].includes(item.type)) {
                                                    //     componentResult = (<CustomTimePicker ref={el => this.setFormTypeRefs(item.key, el)}
                                                    //         form={this.form} formItem={item} v-slots={slots}></CustomTimePicker>)
                                                    // } else if (['time-select'].includes(item.type)) {
                                                    //     componentResult = (<CustomTimeSelect ref={el => this.setFormTypeRefs(item.key, el)}
                                                    //         form={this.form} formItem={item} v-slots={slots}></CustomTimeSelect>)
                                                    // }

                                                    return componentResult
                                                }
                                            }}
                                        >

                                        </dinert-tooltip>

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
