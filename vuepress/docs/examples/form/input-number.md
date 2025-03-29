

# 数字输入框

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
                    num: {
                        label: '数量',
                        type: 'input-number',
                    },
                    num2: {
                        label: '按钮位置',
                        type: 'input-number',
                        options: {
                            controlsPosition: 'right',
                            on: {
                                change: (value) => {
                                    console.log('change', value)
                                }
                            }
                        },
                    },
                    num3: {
                        label: '精度',
                        type: 'input-number',
                        options: {
                            precision: 2,
                            step: 0.1,
                            max: 10,
                            on: {
                                change: (value) => {
                                    console.log('change', value)
                                }
                            }

                        },
                    },
                    num4: {
                        label: '禁用',
                        type: 'input-number',
                        options: {
                            disabled: true,

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


