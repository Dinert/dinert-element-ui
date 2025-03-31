

# radio 单选框

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
                        label: '单选',
                        type: 'radio',
                        options: {
                            options: [
                                {label: '上海', value: 'shanghai'},
                                {label: '北京', value: 'beijing'},
                                {label: '广州', value: 'guangzhou'},
                                {label: '深圳', value: 'shenzhen'},
                            ]
                        }
                    },
                    name2: {
                        label: '按钮单选',
                        type: 'radio-button',
                        options: {
                            options: [
                                {label: '上海', value: 'shanghai'},
                                {label: '北京', value: 'beijing'},
                                {label: '广州', value: 'guangzhou'},
                                {label: '深圳', value: 'shenzhen'},
                            ]
                        }
                    },
                    name3: {
                        label: '按钮单选',
                        type: 'radio',
                        options: {
                            border: true,
                            options: [
                                {label: '上海', value: 'shanghai', disabled: true},
                                {label: '北京', value: 'beijing', border: false,},
                                {label: '广州', value: 'guangzhou'},
                                {label: '深圳', value: 'shenzhen'},
                            ]
                        }
                    }

                },
                model: {
                    name2: 'guangzhou'
                }
            },
        }
    }
}
</script>
```
:::

