

# slider 滑块

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
                        type: 'slider',
                        options: {
                        }
                    },
                    name4: {
                        label: '禁用',
                        type: 'slider',
                        options: {
                            disabled: true,
                        }
                    },
                    name3: {
                        label: '自定义初始值',
                        type: 'slider',
                        options: {

                        }
                    },
                    name2: {
                        label: '格式化tooltip',
                        type: 'slider',
                        options: {
                            'format-tooltip': (val) =>  {
                                return val / 100;
                            }
                        },
                    },
                    name5: {
                        label: '展示标记',
                        type:'slider',
                        options: {
                            range: true,
                            marks: {
                                    0: '0°C',
                                    8: '8°C',
                                    37: '37°C',
                                    50: {
                                        style: {
                                        color: '#1989FA'
                                        },
                                        label: this.$createElement('strong', '50%')
                                    },
                            }
                        }
                    },
                    name6: {
                        label: '带有输入框',
                        type:'slider',
                        options: {
                            showInput: true,
                        }
                    }
                },
                model: {
                    name4: 80,
                    name3: 30,
                    name5: [30, 60],
                }
            },
        }
    }
}
</script>
```
:::


