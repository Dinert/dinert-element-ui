

# 输入框

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
                    name: {
                        label: '名称',
                        type: 'input',
                        options: {
                        }
                    },
                    name4: {
                        label: '禁用',
                        type: 'input',
                        options: {
                            disabled: true,
                        }
                    },
                    name3: {
                        label: '有限制字数的名称',
                        type: 'input',
                        options: {
                            maxlength: 10,
                            showWordLimit: true,
                        }
                    },
                    name2: {
                        label: '统计字数',
                        type: 'textarea',
                        options: {
                            showWordLimit: true, // 是否显示统计字数
                            minlength: 0,
                            maxlength: 30,
                            on: {
                                change: (value) => {
                                    console.log(value)
                                }
                            }
                        },
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

            <template #formItem_name_prepend>
                <i class="el-icon-refresh"></i>
            </template>
            <template #formItem_name_append>
                <i class="el-icon-refresh"></i>
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
                        type: 'input',
                        options: {
                            'suffix-icon': 'el-icon-date',
                            'prefix-icon': 'el-icon-refresh',
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



