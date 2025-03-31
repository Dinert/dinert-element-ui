

# switch 开关

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
                        label: '开关',
                        type: 'switch',
                    },
                    name3: {
                        label: '开关2',
                        type: 'switch',
                        options: {
                            'active-text': "按月付费",
                            'inactive-text':"按年付费"
                        }
                    }
                },
                model: {
                    name3: true
                }
            },
        }
    }
}
</script>
```
:::



