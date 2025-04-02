

# TimePicker 时间选择器

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
                        label: '默认',
                        type: 'time-picker',
                        options: {
                        }
                    },
                    name2: {
                        label: '禁用',
                        type: 'time-picker',
                        options: {
                            disabled: true,
                        }
                    },
                    name3: {
                        label: '固定时间点',
                        type: 'time-picker',
                        options: {
                           'picker-options': {
                                start: '08:30',
                                step: '00:15',
                                end: '18:30'
                            }
                        }
                    },
                    name4: {
                        label: '范围选择',
                        type: 'time-picker',
                        options: {
                             'is-range': true,
                            'range-separator': '至',
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间'
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


