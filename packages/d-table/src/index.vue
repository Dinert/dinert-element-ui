<template>
    <div class="d-table" :class="onlyClass">
        <div v-if="showHeader" ref="header"
            class="d-table-header"
        >
            <div class="d-table-header-left">
                <slot name="header-left"></slot>
            </div>
            <div v-if="table.children" class="d-table-header-right">
                <el-button-group>
                    <el-button :type="isAllData ? 'primary' : 'default'" :disabled="disabled"
                        @click="allShow"
                    >全部显示
                    </el-button>
                    <el-popover trigger="hover">
                        <template>
                            <el-button
                                slot="reference"
                                :type="!isAllData ? 'primary' : undefined"
                                :disabled="disabled"
                                :style="{
                                    'border-top-left-radius': 0,
                                    'border-bottom-left-radius': 0
                                }"
                            >
                                分类显示
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                        </template>
                        <ul class="el-popover-classify">
                            <draggable v-model="copyTableColumn" @end="dragEnd($event, copyTableColumn)">
                                <li v-for="column in copyTableColumn" :key="column.prop">
                                    <template v-if="column.prop !== 'operations' && column.type !== 'selection' && column.type !== 'index'">
                                        <el-checkbox
                                            v-model="column.checkbox.checked"
                                            :class="['el-popover-classify-li', column.prop]"
                                            :label="column.label"
                                            :name="column.prop"
                                            v-bind="column.checkbox"
                                            @change="checkboxChange($event, column, copyTableColumn)"
                                        />
                                    </template>
                                </li>
                            </draggable>
                        </ul>
                    </el-popover>
                </el-button-group>
            </div>
        </div>
        <div ref="headerFooter" class="d-table-headerFooter">
            <slot name="header-footer"></slot>
        </div>
        <div ref="body" class="d-table-body">
            <el-table
                v-bind="{
                    data: [],
                    border: true,
                    showHeader: true,
                    key: false,
                    height: '100%',
                    ...table,
                }"
                v-on="{...table.on}"
            >
                <template v-if="tableSlot">
                    <template v-for="column in tableColumns">
                        <template v-if="column.type !== 'selection'">
                            <recuve-table-column :key="column.prop" :popover-value="popoverValue"
                                :only-class="onlyClass" :table-column="column"
                                :table="table" @checkbox-change="checkboxChange"
                                @all-show="allShow" @drag-end="dragEnd"
                            >
                                <template slot-scope="scope">
                                    <slot v-bind="scope"></slot>
                                </template>
                            </recuve-table-column>
                        </template>
                        <template v-else>
                            <el-table-column
                                v-bind="column"
                                :key="column.type"
                            />
                        </template>
                    </template>
                </template>
                <template v-else>
                    <template v-for="column in tableColumns">
                        <template v-if="column.type !== 'selection'">
                            <recuve-table-column :key="column.prop" :popover-value="popoverValue"
                                :only-class="onlyClass" :table-column="column"
                                :table="table" @checkbox-change="checkboxChange"
                                @all-show="allShow" @drag-end="dragEnd"
                            >
                                <template slot-scope="scope">
                                    <slot v-bind="scope" :name="columnProp(scope.prop)"></slot>
                                </template>
                            </recuve-table-column>
                        </template>
                        <template v-else>
                            <el-table-column
                                v-bind="column"
                                :key="column.type"
                            />
                        </template>
                    </template>
                </template>
            </el-table>
        </div>
        <div v-if="showFooter && isTableData" ref="footer"
            class="d-table-footer"
        >
            <el-pagination
                v-bind="{
                    disabled: disabled,
                    currentPage: 1,
                    pageSize: 15,
                    pageSizes: [10, 30, 50, 70, 100],
                    background: true,
                    layout: 'total, sizes, prev, pager, next, jumper',
                    total: 100,
                    ...pagination,
                }"
                v-on="{
                    'size-change': sizeChange,
                    'current-change': currentChange,
                    ...pagination.on,
                }"
            />
        </div>
    </div>
</template>

<script>
import {windowResize, getUuid} from '@/utils/tools.js'
import _ from 'lodash'

export default {
    name: "DTable",
    props: {
        // 表格头控制栏
        showHeader: {
            type: Boolean,
            default: true,
        },
        // 表格尾部
        showFooter: {
            type: Boolean,
            default: true,
        },
        table: {
            type: Object,
            default: () => {
                return {
                    on: {},
                    tableColumn: [],
                };
            },
        },
        tableSlot: {
            type: Boolean,
        },

        disabled: {
            type: Boolean,
        },

        // 分页
        pagination: {
            type: Object,
            default: () => {
                return {
                    on: {},
                };
            },
        },
    },
    created() {
        this.onlyClass = 'table_' + getUuid()

        this.initCheckedbox();
        this.copyTableColumn = _.cloneDeep(this.table.tableColumn)
        this.filterTableColumns();
    },

    async mounted(){
        this.$nextTick(() => {
            let timer = setTimeout(() => {
                this.resize()
                clearTimeout(timer)
            }, 100)
        })


        windowResize(() => {
            this.resize()
        }, 100)
    },


    data() {
        return {
            tableColumns: [],
            onlyClass: '',
            copyTableColumn: [],
            popoverValue: false
        };
    },
    computed: {
        isAllData() {
            return this.table.tableColumn.length === this.tableColumns.length;
        },
        isTableData() {
            return this.table.data && this.table.data.length;
        },
    },
    components: {
        RecuveTableColumn: () =>
            import("./recuve-table-column.vue").then(
                (component) => component.default
            ),
    },
    methods: {
        // sizeChange
        sizeChange(value) {
            this.$emit("size-change", value);
        },

        // currentChange
        currentChange(value) {
            this.$emit("current-change", value);
        },

        // column的prop
        columnProp(prop) {
            return "column_" + prop.split('.').join('_');
        },

        // 过滤表格的数据
        filterTableColumns() {
            this.tableColumns = this.table.tableColumn.filter((item) => {
                if (item.checkbox && item.checkbox.checked) {
                    return item;
                }
            });
        },

        // 选中变化的值
        checkboxChange(item, column, copyTableColumn) {
            this.table.tableColumn = copyTableColumn
            this.filterTableColumns()
            this.$emit('checkbox-change', item, column, copyTableColumn)
            this.showPoperValue()
        },

        // 全部显示
        allShow() {
            for(let i = 0; i < this.copyTableColumn.length; i ++) {
                this.copyTableColumn[i]['checkbox'].checked = true
            }
            this.table.tableColumn = this.copyTableColumn
            this.filterTableColumns()
            this.showPoperValue()
        },

        // 分类显示
        initCheckedbox() {
            for(let i = 0; i < this.table.tableColumn.length; i ++) {
                let item = this.table.tableColumn[i]
                if(item.checkbox === undefined) {
                    this.table.tableColumn[i]['checkbox'] = {
                        checked: true
                    }
                }else if(item.checkbox.checked === undefined) {
                    this.table.tableColumn[i]['checkbox'].checked = true
                }
            }
        },

        dragEnd(event, copyTableColumn) {
            this.table.tableColumn = copyTableColumn
            this.showPoperValue()
            this.$emit('drag-end', event, copyTableColumn)
        },

        // 重新显示弹窗
        showPoperValue() {
            this.popoverValue = false
            this.table.key = !this.table.key

            // 手动触发mouseenter事件
            let timer = setTimeout(() => {
                this.popoverValue = true
                clearTimeout(timer)
            })
        },


        // 通过计算去自适应表格的高度
        resize() {
            if(!this.table.height) {
                const body = this.$refs.body
                const bodyPPT = (body && parseInt(window.getComputedStyle(body.parentElement, null).paddingTop))
                const bodyPPB = (body && parseInt(window.getComputedStyle(body.parentElement, null).paddingBottom))

                const header = this.$refs.header
                const headerH = (header && header.offsetHeight) || 0
                const headerMT = (header && parseInt(window.getComputedStyle(header, null).marginTop)) || 0

                const headerFooter = this.$refs.headerFooter
                const headerFooterH = (headerFooter && headerFooter.offsetHeight) || 0


                const footer = this.$refs.footer
                const footerH = (footer && footer.offsetHeight) || 0
                const footerMT = (footer && parseInt(window.getComputedStyle(footer, null).marginTop)) || 0
                const bodyCurrentH = body && body.parentElement && (body.parentElement.offsetHeight - headerH - headerFooterH - footerH - footerMT - headerMT - bodyPPT - bodyPPB)

                const tableHeaderH = (body && body.querySelector('.el-table__header-wrapper table').offsetHeight) || 0
                const tableBodyH = (body && body.querySelector('.el-table__body-wrapper table').offsetHeight) || 0

                const isXOverflow = (body && body.querySelector('.el-table__body-wrapper.is-scrolling-left'))
                const xOverflowH = isXOverflow ? 17 : 0

                // 当表格头和表格内容大于
                if(body) {
                    if((tableHeaderH + tableBodyH) >  bodyCurrentH || (this.table.data && this.table.data.length === 0)) {
                        body.style.height = '0px'
                        body.style.flex = '1'
                    }else {
                        body.style.height = (tableBodyH + tableHeaderH + 1 + xOverflowH) + 'px'
                        body.style.flex = 'unset'
                    }
                }
            }

        }

    },
    watch: {
        'table.key': {
            handler() {
                setTimeout(() => {
                    this.resize()
                })
            },
            deep: true,
        },
        'table.data': {
            handler() {
                setTimeout(() => {
                    this.resize()
                })
            },
            deep: true,
        },
        'table.tableColumn'() {

            this.initCheckedbox();
            this.copyTableColumn = _.cloneDeep(this.table.tableColumn)
            this.filterTableColumns();
        }
    }
};
</script>

<style lang="scss" scoped>
.d-table {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-sizing: border-box;

  .d-table-header {
    text-align: right;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;

    ::v-deep(.el-popover) {
      .el-popover-classify li .el-checkbox {
        width: 100%;
        line-height: 24px;
        height: 24px;
      }
    }

    .d-table-header-left {
    }
  }

  .d-table-body {


    .el-table {
      ::v-deep(.cell > div) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .d-table-footer {
    display: flex;
    margin-top: 16px;

    .el-pagination {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

    .el-popover-classify li{
      line-height: 22px;
      label{
        display: block;
      }
      &:hover{
        background-color: rgba(#409EFF, .1);
      }
    }
</style>