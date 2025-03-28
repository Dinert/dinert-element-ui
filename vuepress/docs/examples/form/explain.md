

<style>

    .el-form.dinert-form{
        background-color: transparent;
    }
</style>

<script setup>
    let arr  = ['input' ,
                'select' ,
                'textarea' ,
                'input-number' ,
                'input-autocomplete'
                , 'switch'
                , 'datetime'
                , 'date'
                , 'week'
                , 'month'
                , 'year'
                , 'datetimerange'
                , 'daterange'
                , 'monthrange'
                , 'custom' , 'radio' , 'tree-select' , 'radio-button'
                , 'rate'
                , 'checkbox'
                , 'cascader'].join("' | '")
                arr = "'" + arr + "'"
    const colLayout = "{ xl: 'number', lg: 'number', md: 'number', sm: 'number', xs: 'number' }"
</script>


## 属性
| 属性名 | 说明                                             | 类型    | 默认值 |
| ------ | ------------------------------------------------ | ------- | ------ |
| search | 是否显示右侧的查询和重置按钮                     | Boolean | true   |
| class  | 值为near时在查询栏中使用，值为dialog在弹窗中使用 | String  | 一     |
| form   | [详细请参阅下面form属性](#form-属性)             | Object  | 一     |


## form 属性
| 属性名       | 说明                                                                                   | 类型                                                                                           | 默认值 |
| ------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| formItem     | 表单组件列表对象，[详细请参阅下面formItem属性](#formitem-属性)                         | <dinert-api-typing type="object" details="{[key: string]: FormItemProps}"></dinert-api-typing> | \{\}   |
| colLayout    | 每个表单组件列表布局                                                                   | <dinert-api-typing type="object" :details="colLayout"/>                                        | 一     |
| row          | 表单组件的row                                                                          | object                                                                                         | 一     |
| showLabel    | 是否显示所有表单组件的值，优先formItem下的showLabel                                    | boolean                                                                                        | 一     |
| vif          | 是否渲染所有表单组件，优先formItem下的vif                                              | <dinert-api-typing type="enmu" details="'boolean' \| (model) => boolean"></dinert-api-typing>  | 一     |
| required     | 是否验证每个表单组件是否必填                                                           | boolean                                                                                        | 一     |
| packUp       | 第一次加载是否默认展开超出的组件                                                       | boolean                                                                                        | true   |
| enterSearch  | 是否开启回车搜索，仅支持input的组件                                                                       | boolean                                                                                        | true   |
| searchButton | 自定义搜索按钮的属性继承自button，message为内容                                        | [ButtonProps](https://element-plus.org/en-US/component/button.html#button-attributes)          | 一     |
| resetButton  | 自定义重置按钮的属性继承自button，message为内容                                        | [ButtonProps](https://element-plus.org/en-US/component/button.html#button-attributÏes)         | 一     |
| ......       | [更多配置，请参考](https://element-plus.org/zh-CN/component/form.html#form-attributes) | 一                                                                                             | 一     |

## formItem 属性
| 属性名    | 说明                                                                                       | 类型                                                                                          | 默认值 |
| --------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------ |
| type      | 表单组件类型                                                                               | <dinert-api-typing type="enmu" :details="arr"></dinert-api-typing>                            | 一     |
| show      | 是否显示该表单组件                                                                         | <dinert-api-typing type="enmu" details="'boolean' \| (model) => boolean"></dinert-api-typing> | 一     |
| vif       | 是否渲染该表单组件                                                                         | <dinert-api-typing type="enmu" details="'boolean' \| (model) => boolean"></dinert-api-typing> | 一     |
| label     | 表单组件的名称                                                                             | <dinert-api-typing type="enmu" details="'string' \| (model) => boolean"></dinert-api-typing>  | 一     |
| sort      | 表单组件的列的排序，数值越小组件越靠前                                                     | Number                                                                                        | 一     |
| options   | 组件的参数，比如组件类型type是input，那options里面的内容就是Input的属性和方法              | Object                                                                                        | 一     |
| showLabel | 是否直接显示当前表单组件的值                                                               | <dinert-api-typing type="enmu" details="'boolean' \| (model) => boolean"></dinert-api-typing> | 一     |
| colLayout | 当前表单组件列表布局                                                                       | <dinert-api-typing type="object" :details="colLayout"></dinert-api-typing>                    | \{  \} |
| required  | 是否必填                                                                                   | Boolean                                                                                       | 一     |
| ......    | [更多配置，请参考](https://element-plus.org/zh-CN/component/form.html#formitem-attributes) | 一                                                                                            | 一     |

## 事件
| 事件名    | 说明           | 类型                                                                   |
| --------- | -------------- | ---------------------------------------------------------------------- |
| search-fn | 点击查询时触发 | <dinert-api-typing type="Function" details="(value: number) => void"/> |
| reset-fn  | 点击重置时触发 | <dinert-api-typing type="Function" details="(value: number) => void"/> |
| un-fold   | 点击更多时触发 | <dinert-api-typing type="Function" details="() => void"/>              |

## 插槽

| 插槽名                 | 说明                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------ |
| formItem_[key]         | formItem_是固定的，key里面的值取决于form中的formItem的key，自定义组件                |
| formItem_after_[key]   | formItem_after_是固定的，key里面的值取决于form中的formItem的key，自定义组件后的内容  |
| formItem_before_[key]  | formItem_before_是固定的，key里面的值取决于form中的formItem的key，自定义组件前的内容 |
| form_search            | 自定义查询栏                                                                         |
| form_search_operations | 自定义查询栏后面的信息                                                               |

