

# rate 评分

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
                        label: '评分',
                        type: 'rate',
                        options: {
                            colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
                        }
                    },
                    name2: {
                        label: '辅助文字',
                        type: 'rate',
                        options: {
                            showText: true
                        }
                    },
                    name3: {
                        label: '只读',
                        type: 'rate',
                        options: {
                            disabled: true,
                            showScore: true,
                        }
                    }

                },
                model: {
                    name3: 3.7
                }
            },
        }
    }
}
</script>
```
:::

