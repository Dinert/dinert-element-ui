

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
<!--
## 不同布局的组件
:::demo

Form/basic/dialog
:::

## 显示值
:::demo

Form/basic/show-value
:::

## 显示组件
:::demo

Form/basic/linkage
:::

## 全局组件的显示
:::demo

Form/basic/linkage-global
:::

## 禁用组件
:::demo

Form/basic/disabled
:::

## 组件排序
:::demo

Form/basic/sort
:::

## 自定义组件
:::demo

Form/basic/custom
:::

## 验证
:::demo

Form/basic/vaildate
::: -->


[explain](./explain.md)