

# 基础用法

## 查询栏

::: demo
```html
<template>
    <div class="basic">
        <dinert-form :form="form" class="near" @search-fn="search" @reset-fn="reset"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                formItem: {
                    name: {
                        label: '名称',
                        type: 'input',
                    },
                    status: {
                        label: '状态',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示当我的长度过长长长长长长', value: true},
                                {label: '隐藏', value: false},
                            ]
                        }
                    }
                },
                model: {

                }
            },
        }
    },
    methods: {
        search() {
            console.log('search', this.form.model)
        },
        reset() {
            console.log('reset')
        }
    }
}
</script>
```
:::


## 不同布局的组件
::: demo
```html

<template>
    <div class="basic">
        <dinert-form :form="form" class="dialog" @search-fn="search" @reset-fn="reset" :search="false"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                colLayout: {span: 24},
                labelWidth: '60px',
                formItem: {
                    name: {
                        label: '名称',
                        type: 'input',
                        options: {

                        }
                    },
                    name1: {
                        label: '名称1',
                        type: 'input',
                        colLayout: {span: 12},
                        options: {

                        }
                    },
                    name2: {
                        label: '名称2',
                        type: 'input',
                        colLayout: {span: 12},
                        options: {

                        }
                    },
                    status: {
                        label: '状态',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示当我的长度过长长长长长长', value: true},
                                {label: '隐藏', value: false},
                            ]
                        }
                    }
                },
                model: {

                }
            },
        }
    },
    methods: {
        search() {
            console.log('search', this.form.model)
        },
        reset() {
            console.log('reset')
        }
    }
}
</script>
```
:::


## 显示值
::: demo
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
                showLabel: true,
                formItem: {
                    name: {
                        label: '名称',
                        type: 'input',
                        showLabel: false,
                        options: {

                        }
                    },
                    name1: {
                        label: '无值的情况',
                        type: 'input',
                        options: {

                        }
                    },
                    name2: {
                        label: '有值的情况',
                        type: 'select',
                        options: {
                            options: [
                                {label: '启用', value: 1},
                                {label: '禁用', value: 0},
                            ]
                        }
                    },
                    name6: {
                        label: model => (model.name3 === 1 ? '动态label' : '动态label2'),
                        showLabel: false,
                        type: 'input',
                    },
                    name3: {
                        type: 'select',
                        label: '切换',
                        showLabel: false,
                        options: {
                            options: [
                                {label: '启用', value: 1},
                                {label: '禁用', value: 0},
                            ]
                        }
                    }

                },
                model: {
                    name: '值',
                    name2: 1,
                }
            },
        }
    },
    methods: {
        search() {
            console.log('search', this.form.model)
        },
        reset() {
            console.log('reset')
        }
    }
}
</script>
```
:::

## 显示组件
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
                    name1: {
                        label: '名称1',
                        type: 'input',
                        options: {

                        },
                        vif(model) {
                            return !!model.status
                        }
                    },
                    status: {
                        label: '状态',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示名称', value: true},
                                {label: '隐藏名称', value: false},
                            ]
                        }
                    },
                    name2: {
                        label: '名称2',
                        type: 'input',
                        options: {

                        },
                        show(model) {
                            return !!model.status2
                        }
                    },
                    status2: {
                        label: '状态',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示名称2', value: true},
                                {label: '隐藏名称2', value: false},
                            ]
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


## 全局组件的显示
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
                model: {

                },
                labelWidth: '60px',
                vif(model) {
                    return model.name === '111'
                },
                formItem: {
                    name: {
                        label: '名称',
                        type: 'input',
                        vif: true,
                        options: {
                            placeholder: '请输入111'
                        }
                    },
                    name1: {
                        label: '名称1',
                        type: 'input',
                        vif: true,
                        options: {

                        },

                    },

                    name2: {
                        label: '名称2',
                        type: 'input',
                        options: {

                        },

                    },
                    status2: {
                        label: '状态',
                        type: 'select',
                        options: {
                            options: [
                                {label: '显示名称2', value: true},
                                {label: '隐藏名称2', value: false},
                            ]
                        }
                    }
                },

            },
        }
    }
}
</script>
```
:::



## 禁用组件
::: demo

```html
<template>
    <div class="basic">
        <dinert-form :form="form" class="dialog" :search="false"/>
        <dinert-form :form="form2" class="dialog"
            :search="false"
        />
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                labelWidth: '60px',
                disabled: true,
                formItem: {
                    name: {
                        label: '名称',
                        type: 'input',
                        options: {
                        }
                    },
                    name1: {
                        label: '名称1',
                        type: 'input',
                        options: {
                            disabled: false,
                        }
                    },
                },
                model: {

                }
            },
            form2: {
                labelWidth: '60px',
                formItem: {
                    name: {
                        label: '名称',
                        type: 'input',
                        options: {
                            disabled: true,
                        }
                    },
                    name1: {
                        label: '名称1',
                        type: 'input',
                        options: {
                        }
                    },
                },
                model: {

                }
            }
        }
    },
}
</script>
```

:::


## 组件排序
:::demo

```html
<template>
    <div class="basic">
        <dinert-form :form="form" class="dialog"
            :search="false"
        />
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
                        name1: {
                            label: '名称1',
                            type: 'input',
                            options: {

                            }
                        },
                        name2: {
                            label: '排第一',
                            type: 'input',
                            sort: 1,
                            options: {

                            }
                        },
                        status: {
                            label: '排第二',
                            sort: 2,
                            type: 'select',
                            options: {
                                options: [
                                    {label: '显示当我的长度过长长长长长长', value: true},
                                    {label: '隐藏', value: false},
                                ]
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


## 自定义组件
::: demo
```html
<template>
    <div class="basic">
        <dinert-form :form="form" class="dialog"
            :search="false"
        >
            <template #formItem_name="formItem">
                <el-button type="primary">{{ formItem.label }}</el-button>
                {{ formItemFn(formItem) }}
            </template>

            <template #formItem_name1="formItem">
                <el-input v-model="formItem.model[formItem.key]" v-bind="formItem.options"
                    style="margin: 0 22px;width: 50%;"
                    clearable
                />
            </template>
            <template #formItem_after_name1="formItem">
                <el-button type="primary">{{ formItem.label }}</el-button>
            </template>
            <template #formItem_before_name1="formItem">
                <el-button type="primary">{{ formItem.label }}</el-button>
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

                        }
                    },
                    name1: {
                        label: '名称1',
                        type: 'input',
                        options: {

                        }
                    }
                },
                model: {

                }
            },
        }
    },
    methods: {
        formItemFn(formItem) {
            // console.log('自定义组件',formItem)
        }
    }
}
</script>
```
:::



## 表单验证
::: demo
```html
<template>
    <div class="basic">
        <dinert-form :form="form" class="dialog" :search="false" ref="formRef"/>
        <div style=" margin-bottom: 12px;text-align: center;">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button plain @click="reset">重置</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                labelWidth: 'auto',
                required: true,
                showLabel(model) {
                    return true
                },
                formItem: {
                    name: {
                        label: '必填',
                        type: 'input',
                        required: true,
                        showLabel: false,

                        options: {

                        }
                    },
                    name2: {
                        label: '必填',
                        type: 'select',
                        required: true,
                        showLabel: false,
                        options: {
                            options: [
                                {label: '显示当我的长度过长长长长长长', value: true},
                                {label: '隐藏', value: false},
                            ]
                        }
                    },
                    status: {
                        label: '选择',
                        type: 'select-v2',
                        showLabel(model) {
                            return model.name2
                        },
                        options: {
                            options: [
                                {label: '显示当我的长度过长长长长长长', value: true},
                                {label: '隐藏', value: false},
                            ]
                        }
                    }
                },
                model: {

                }
            },
        }
    },
    methods: {
        save() {

            this.$refs.formRef.$refs.formRef.validate((valid, obj) => {
                if (valid) {
                    console.log('保存', obj)
                } else {
                    console.log('校验失败', obj)
                }
            })
        },
        reset() {
            this.$refs.formRef.$refs.formRef.resetFields()
        }
    }
}
</script>
```
:::

## [属性](./explain.md)
