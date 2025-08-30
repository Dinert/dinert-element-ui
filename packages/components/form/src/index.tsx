import {defineComponent, PropType} from '@vue/composition-api'
import {CustomFormItemProps, RewriteFormProps} from '../types'
import {dataTransformRod, getUuid} from '@packages/utils/tools'
import {customPlaceholder, formItemSlot, getSpanValue, getTooltipValue, renderSlot, valueMouseEnter} from '../utils'

import CustomInput from './input'
import CustomInputNumber from './input-number'
import CustomSelect from './select'
import CustomSwitch from './switch'
import CustomDate from './date'
import CustomRadio from './radio'
import CustomRate from './rate'
import CustomCheckbox from './checkbox'
import CustomCascader from './cascader'
import CustomSlider from './slider'
import CustomTimePicker from './time-picker'
import '@packages/assets/scss/dinert-form.scss'

import lodash from 'lodash'

export default defineComponent({
    name: 'DinertForm',
    props: {
        form: {
            type: Object as PropType<RewriteFormProps>,
            default: () => ({})
        },
        search: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.packUp = this.form.packUp === undefined ? true : this.form.packUp
    },
    mounted() {
        this.resizeForm()
        this.windowResize = lodash.debounce(() => {
            this.resizeForm()
        })
        window.addEventListener('resize', this.windowResize, true)
    },

    unmounted() {
        window.removeEventListener('resize', this.windowResize, true)
    },

    data() {
        return {
            windowResize: () => ({}),
            formClass: 'form_' + getUuid(),
            packUp: this.form.packUp === undefined,
            isArrow: false
        }
    },
    computed: {
        formItemMap() {
            const result: CustomFormItemProps[] = []
            Object.keys(this.form.formItem || {}).forEach(key => {
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
    methods: {
        resizeForm() {
            let elFormLeft = document.querySelectorAll(`.${this.formClass} .el-form-left > div`) as any
            if (elFormLeft[0]) {
                this.isArrow = false
                const firstTop = elFormLeft[0].getBoundingClientRect().top
                const lastTop = elFormLeft[elFormLeft.length - 1].getBoundingClientRect().top
                const isHeight = firstTop !== lastTop
                if (isHeight) {
                    this.isArrow = true
                } else {
                    if (!this.packUp) {
                        this.packUp = true
                    }
                    this.isArrow = false
                }
                elFormLeft = null

            }
        },
        unfold() {
            if (this.packUp) {
                this.packUp = false
            } else {
                this.packUp = true
            }

            this.$emit('un-fold', this.packUp)
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
            ref={'formRef'}
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
                                            on={{
                                                LabelMouseEnter: (e: MouseEvent) => {valueMouseEnter(e, item, this.form.model[item.key], this)}
                                            }}
                                            scopedSlots={{
                                                default: () => {
                                                    const scopedSlots: any = {}
                                                    let componentResult = <span>{dataTransformRod(getSpanValue(this.form.model[item.key], item))}</span>
                                                    if (this.$scopedSlots[formItemSlot(item.key)]) {
                                                        componentResult = (this.$scopedSlots[formItemSlot(item.key)]?.({...item, model: this.form.model}))
                                                    } else if (itemShowLabel || (formShowLabel && [true, undefined].includes(itemShowLabel))) {
                                                        return componentResult
                                                    } else if (['input', 'textarea'].includes(item.type)) {
                                                        renderSlot(['prefix', 'suffix', 'prepend', 'append'], this, scopedSlots, item)
                                                        componentResult = (<CustomInput ref={item.key + '_' + item.type} form={this.form} formItem={item} scopedSlots={scopedSlots}></CustomInput>)
                                                    } else if (['input-number'].includes(item.type)) {
                                                        componentResult = (<CustomInputNumber ref={item.key + '_' + item.type} form={this.form} formItem={item}></CustomInputNumber>)
                                                    } else if (['select'].includes(item.type)) {
                                                        renderSlot(['prefix', 'empty'], this, scopedSlots, item)
                                                        componentResult = (<CustomSelect ref={item.key + '_' + item.type} form={this.form} formItem={item} scopedSlots={scopedSlots}></CustomSelect>)
                                                    } else if (['switch'].includes(item.type)) {
                                                        componentResult = (<CustomSwitch ref={item.key + '_' + item.type} form={this.form} formItem={item}></CustomSwitch>)
                                                    } else if ([
                                                        'datetime',
                                                        'date',
                                                        'dates',
                                                        'week',
                                                        'month',
                                                        'months',
                                                        'year',
                                                        'years',
                                                        'datetimerange',
                                                        'daterange',
                                                        'monthrange',
                                                        'yearrange',
                                                    ].includes(item.type)) {
                                                        renderSlot(['range-separator'], this, scopedSlots, item)
                                                        componentResult = (<CustomDate ref={item.key + '_' + item.type} form={this.form} formItem={item} scopedSlots={scopedSlots}></CustomDate>)
                                                    } else if (['radio', 'radio-button'].includes(item.type)) {
                                                        componentResult = (<CustomRadio ref={item.key + '_' + item.type} form={this.form} formItem={item}></CustomRadio>)
                                                    } else if (['rate'].includes(item.type)) {
                                                        componentResult = (<CustomRate ref={item.key + '_' + item.type} form={this.form} formItem={item} ></CustomRate>)
                                                    } else if (['checkbox', 'checkbox-button'].includes(item.type)) {
                                                        componentResult = (<CustomCheckbox ref={item.key + '_' + item.type} form={this.form} formItem={item}></CustomCheckbox>)
                                                    } else if (['cascader'].includes(item.type)) {
                                                        componentResult = (<CustomCascader ref={item.key + '_' + item.type} form={this.form} formItem={item} ></CustomCascader>)
                                                    } else if (['slider'].includes(item.type)) {
                                                        componentResult = (<CustomSlider ref={item.key + '_' + item.type} form={this.form} formItem={item}></CustomSlider>)
                                                    } else if (['time-picker'].includes(item.type)) {
                                                        componentResult = (<CustomTimePicker ref={item.key + '_' + item.type} form={this.form} formItem={item}></CustomTimePicker>)
                                                    }

                                                    return componentResult
                                                },
                                                defaultAfter: () => this.$scopedSlots[formItemSlot('after_' + item.key)]?.({...item, model: this.form.model}),
                                                defaultBefore: () => this.$scopedSlots[formItemSlot('before_' + item.key)]?.({...item, model: this.form.model}),
                                            }}
                                        >
                                        </dinert-tooltip>

                                    </el-form-item>
                                </el-col>
                            )

                        })
                    }
                </el-row>
                {
                    this.search && <el-row class={['el-form-right', this.isArrow ? 'isArrow' : '']}>
                        {this.isArrow && <el-button class="el-form-right-operation" type="text" icon={this.packUp ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}
                            onClick={this.unfold}>
                            {this.packUp ? '收起' : '展开'}
                        </el-button>}
                        {(this.$scopedSlots.form_search && this.$scopedSlots.form_search('search'))
                            || <el-button type="primary"
                                attrs={{...this.form.searchButton}}
                                on={{click: () => this.$emit('search-fn')}}>
                                {'搜索'}</el-button>
                        }
                        {
                            (this.$scopedSlots.form_search && this.$scopedSlots.form_search('search'))
                                         || <el-button type="primary" plain
                                             attrs={{...this.form.resetButton}}
                                             on={{click: () => this.$emit('reset-fn')}}
                                         >{'重置'}</el-button>
                        }
                    </el-row>
                }
                {
                    this.$scopedSlots.form_search_operations && <el-row class={'el-form-right-after'}>{this.$scopedSlots.form_search_operations('search_operations')}</el-row>
                }
            </el-form>
        )
    }
})
