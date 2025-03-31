

# date 日期选择器

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
                    hours: {
                        label: '小时',
                        type: 'datetime',
                    },
                    hours2: {
                        label: '小时双选',
                        type: 'datetimerange',
                    },
                    day: {
                        label: '天',
                        type: 'date',
                    },
                    day2: {
                        label: '天双选',
                        type: 'daterange',
                    },
                    day3: {
                        label: '多个天',
                        type: 'dates',
                    },
                    week: {
                        label: '周',
                        type: 'week',
                    },
                    month: {
                        label: '月',
                        type: 'month',
                    },
                    month2: {
                        label: '月双选',
                        type: 'monthrange',
                    },
                    year: {
                        label: '年',
                        type: 'year',
                    },
                    years: {
                        label: '多个年份',
                        type: 'years',
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



