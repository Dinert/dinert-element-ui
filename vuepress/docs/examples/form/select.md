

# select 选择器

## 基础用法
:::demo
```html
<template>
    <div class="basic">
        <dinert-form :form="form" class="dialog" :search="false"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                labelWidth: 'auto',
                formItem: {
                    status: {
                        label: '默认',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示当我的长度过长长长长长长', value: true},
                                {label: '隐藏', value: false},
                            ]
                        }
                    },
                    status2: {
                        label: '多选搜索',
                        type: 'select',
                        options: {
                            multiple: true,
                            value: 'code',
                            filterable: true,
                            label: 'name',
                            options: [
                                {name: '显示当我的长度过长长长长长长长长长长长长长长长长长长', code: true},
                                {name: '隐藏11111111111111111111', code: false},
                            ]
                        }
                    },
                    status1: {
                        label: '值对象',
                        type: 'select',
                        options: {
                            value: 'code',
                            label: 'name',
                            valueKey: 'code',
                            options: [
                                {name: '显示当我的长度过长长长长长长', code: true},
                                {name: '隐藏', code: false},
                            ],
                            on: {
                                change: (value) => {
                                    console.log(value, 'value')
                                }
                            }

                        }
                    },
                    status3: {
                        label: '禁用',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示', value: true},
                                {label: '隐藏', value: false},
                            ],
                            disabled: true
                        }
                    },
                    status4: {
                        label: '值禁用',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示', value: true, disabled: true},
                                {label: '隐藏', value: false},
                            ],
                        }
                    },
                    status5: {
                        label: '多选显示Tag',
                        type: 'select',
                        options: {
                            'collapse-tags': true,
                            multiple: true,
                            multipleLimit: 3,
                            options: [
                                {label: 'Js', value: 1},
                                {label: 'Vue', value: 2},
                                {label: 'React', value: 3},
                                {label: 'Angular', value: 4},
                                {label: 'Ember', value: 5},
                                {label: 'Django', value: 6},
                                {label: 'Flask', value: 7},

                            ],
                        }
                    }
                },
                model: {

                }
            },
        }
    }
}
</script>
```
:::

## 使用插槽
:::demo
```html
<template>
    <div class="basic">
        <dinert-form :form="form" class="dialog"
            :search="false"
        >

            <template #formItem_name_prefix>
                <i class="el-icon-refresh"></i>
            </template>
            <template #formItem_name_empty>
                <div>
                    自定义空内容
                </div>
            </template>
        </dinert-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                labelWidth: 'auto',
                formItem: {
                    name: {
                        label: '名称',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示', value: true},
                                {label: '隐藏', value: false},
                            ]
                        }
                    },
                },
                model: {

                }
            },
        }
    }
}
</script>
```

:::



