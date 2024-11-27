
import {
    Autocomplete,
    Cascader,
    Checkbox,
    DatePicker,
Input,
InputNumber,
Radio,
Rate,
Select,
Slider,
Switch,
TimePicker,
TimeSelect,
Tree
} from 'element-ui'

// import {EpPropFinalized, EpProp} from 'element-plus/es/utils'


type CommonFn = 'onChange' | 'onClear' | 'onBlur' | 'onFocus'


export type RewriteInputProps = Partial<InstanceType<typeof Input>>

export type RewriteTextareaProps = Partial<InstanceType<typeof Input>>

export type RewriteSelectProps<O = any[]> = Partial<InstanceType<typeof Select>>

export type RewriteCascaderProps<O = any[]> = Partial<InstanceType<typeof Cascader>>

export type RewriteAutocompleteProps = Partial<InstanceType<typeof Autocomplete>>

export type RewriteInputNumberProps = Partial<InstanceType<typeof InputNumber>>

export type RewriteSwitchProps = Partial<InstanceType<typeof Switch>>

export type RewriteDatePickerProps = Partial<InstanceType<typeof DatePicker>>

export type RewriteRadioGroupProps<O = any[]> = Partial<InstanceType<typeof Radio>>

export type RewriteCheckboxGroupProps<O = any[]> = Partial<InstanceType<typeof Checkbox>>

export type RewriteTreeSelectProps<O = any[]> = Partial<InstanceType<typeof Tree>>


export type RewriteRewriteRateProps<O = any[]> = Partial<InstanceType<typeof Rate>>
export type RewriteSliderProps = Partial<InstanceType<typeof Slider>>
export type RewriteTimePickerProps = Partial<InstanceType<typeof TimePicker>>
export type RewriteTimeSelectProps = Partial<InstanceType<typeof TimeSelect>>