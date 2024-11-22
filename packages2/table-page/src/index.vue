
<template>
    <section class="dinert-table-page">
        <!-- eslint-disable-next-line vue/no-unusedinert-refs -->
        <dinert-form v-if="showSearch" ref="searchForm"
            v-bind="{
                formItem,
                disabled,
                form: {
                    ...form
                },
                colLayout
            }"
            v-on="{
                'un-fold': unFold
            }"
        >
            <template #search>
                <slot name="search"></slot>
            </template>

            <template v-for="(item, key) in formItem" #[key]="scope">
                <slot :name="key" v-bind="scope"></slot>
            </template>
        </dinert-form>
        <dinert-table
            ref="table"
            v-bind="{table, pagination, tableSlot: true, disabled, showHeader, showFooter}"
            v-on="{
                'size-change': sizeChange,
                'current-change': currentChange,
                'checkbox-change': checkboxChange,
                'drag-end': dragEnd
            }"
        >
            <template #header-left>
                <slot name="header-left"></slot>
            </template>


            <template #default="scope">
                <template v-if="tableSlot">
                    <slot v-bind="scope" :name="columnProp(scope.prop)"></slot>
                </template>
                <template v-else>
                    <slot v-bind="scope"></slot>
                </template>
            </template>
        </dinert-table>
    </section>
</template>
<script>
import DinertForm from '@packages/form'
import DinertTable from '@packages/table'

export default {
    name: 'DinertTablePage',
    props: {
        // form表单的配置
        formItem: {
            type: Object,
            default: () => ({}),
        },

        // 表格的数据
        table: {
            type: Object,
            default: () => ({}),
        },

        tableSlot: {
            type: Boolean,
        },

        // 分页
        pagination: {
            type: Object,
            default: () => ({}),
        },

        // form表单
        form: {
            type: Object,
            default: () => ({}),
        },

        // form表单
        colLayout: {
            type: Object,
            default: () => ({}),
        },

        disabled: {
            type: Boolean,
        },

        showHeader: {
            type: Boolean,
            default: true
        },

        showSearch: {
            type: Boolean,
            default: true
        },

        showFooter: {
            type: Boolean,
            default: true
        }
    },
    components: {
        DinertForm,
        DinertTable,
    },
    data() {
        return {
            formValue: {},
            defaultValue: {},
        }
    },
    methods: {
        columnProp(prop) {
            return 'column_' + prop.split('.').join('_')
        },
        sizeChange(value) {
            this.$emit('size-change', value)
        },
        currentChange(value) {
            this.$emit('current-change', value)
        },

        checkboxChange(checked, column, copyTableColumn) {
            this.$emit('checkbox-change', checked, column, copyTableColumn)
        },

        dragEnd(event, copyTableColumn) {
            this.$emit('drag-end', event, copyTableColumn)
        },

        // 展开收起的回调
        unFold() {
            const timer = setTimeout(() => {
                this.$refs.table.resize()
                this.table.key = !this.table.key
                clearTimeout(timer)
            }, 300)
        }
    },
}
</script>


<style lang="scss" scoped>
.dinert-table-page {
  display: flex;
  flex-direction: column;
  &.near{
    ::v-deep{
      .el-form-left {
        flex: unset;
        .el-col{
          width: auto;
        }
      }
      .el-form-right{
        min-width: auto;
      }
    }
  }
  &.maxWidthAuto{
    ::v-deep{
      .el-form .el-form-item .el-form-item__label{
        max-width: unset;
      }
    }
  }
  .dinert-form{
    max-height: 300px;
  }
  .dinert-table {
    flex: 1;
    height: 0;
  }
}
</style>
