import {defineComponent, PropType} from '@vue/composition-api'
import type {HeaderListProps, RewriteTableProps, TablePageProps} from '@packages/components/table/types/index'
import {getUuid, columnProp, getTreeNode, headerProp} from '@packages/utils/tools'
import {resizeTaleHeight, allowDrop, nodeDragEnd, treeProps, treeNode} from '@packages/components/table/utils'

import DinertRecuveTableColumn from './recuve-table-column'
import lodash from 'lodash'

import '@packages/assets/scss/dinert-table.scss'


export default defineComponent({
    name: 'dinert-table',
    props: {
        table: {
            type: Object as PropType<RewriteTableProps>,
            default: () => ({})
        },
        header: {
            type: [Object, Boolean] as PropType<HeaderListProps | boolean>,
            default: true
        },
        footer: {
            type: Boolean,
            default: true
        },
        tableSlot: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        this.$nextTick(() => {
            const timer = setTimeout(() => {
                this.resizeTaleHeightFn()
                clearTimeout(timer)
            }, 100)
        })

        this.windowResize = lodash.debounce(() => {
            this.resizeTaleHeightFn()
        }, 100)

        window.addEventListener('resize', this.windowResize, true)
    },

    unmounted() {
        window.removeEventListener('resize', this.windowResize, true)
    },
    data() {
        return {
            onlyClass: 'table_' + getUuid(),
            isAllData: false,
            windowResize: () => ({}),
            popoverValue: false
        }
    },
    computed: {
        headerList() {

            if (typeof this.header === 'boolean') {
                return this.header
            }
            const result: Array<TablePageProps['header']> = []
            // eslint-disable-next-line max-statements
            Object.keys(this.header).forEach(key => {
                const tempObj = this.header[key]
                if (key === 'add') {
                    tempObj.icon = tempObj.icon || 'el-icon-plus'
                    tempObj.type = 'primary'
                    tempObj.message = tempObj.message || '新增'
                } else if (key === 'delete') {
                    tempObj.icon = tempObj.icon || 'el-icon-delete'
                    tempObj.plain = tempObj.plain === undefined ? 'plain' : tempObj.plain
                    tempObj.type = tempObj.type === undefined ? 'danger' : tempObj.type
                    tempObj.message = tempObj.message || '删除'
                } else if (key === 'download') {
                    tempObj.icon = tempObj.icon || 'el-icon-download'
                    tempObj.plain = tempObj.plain === undefined ? 'plain' : tempObj.plain
                    tempObj.type = 'primary'
                    tempObj.message = tempObj.message || '下载'
                } else if (key === 'upload') {
                    tempObj.icon = tempObj.icon || 'el-icon-upload2'
                    tempObj.plain = tempObj.plain === undefined ? 'plain' : tempObj.plain
                    tempObj.type = 'primary'
                    tempObj.message = tempObj.message || '上传'
                } else if (key === 'select') {
                    tempObj.icon = tempObj.icon || 'el-icon-check'
                    tempObj.plain = tempObj.plain === undefined ? 'plain' : tempObj.plain
                    tempObj.message = tempObj.message || '全选'

                } else if (key === 'close') {
                    tempObj.icon = tempObj.icon || 'el-icon-close'
                    tempObj.plain = tempObj.plain === undefined ? 'plain' : tempObj.plain
                    tempObj.message = tempObj.message || '取消全选'

                } else if (key === 'down') {
                    tempObj.icon = tempObj.icon || 'el-icon-arrow-down'
                    tempObj.plain = tempObj.plain === undefined ? 'plain' : tempObj.plain
                    tempObj.message = tempObj.message || '展开'

                } else if (key === 'up') {
                    tempObj.icon = tempObj.icon || 'el-icon-arrow-up'
                    tempObj.plain = tempObj.plain === undefined ? 'plain' : tempObj.plain
                    tempObj.message = tempObj.message || '收起'
                }

                result.push({
                    key: key,
                    ...tempObj,
                    type: tempObj.type || 'default',
                })
            })

            result.sort((a: any, b: any) => {
                return (a.sort || Infinity) - (b.sort || Infinity)
            })
            return result
        },
        getSetting() {
            return getTreeNode(this.tableColumns, 'setting', [true], 'setting').length === 0
            && this.table?.setting !== false
        },
        tableColumns() {
            const result = this.table.tableColumns || []
            function sortRecuve(columns) {
                columns.sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity))
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < columns.length; i++) {
                    const item = columns[i]
                    if (item.children && item.children.length) {
                        sortRecuve(item.children)
                    }
                }
            }
            sortRecuve(result)
            return result
        },
    },
    methods: {


        checkTree(data: any, checked: boolean, childChecked: boolean) {
            const newChecked = childChecked || checked
            this.$set(data, 'checked', newChecked)
            this.$emit('checked-change', data, checked, childChecked)
            setTimeout(() => {
                this.resizeTaleHeightFn()
            }, 100)
        },

        resizeTaleHeightFn() {
            resizeTaleHeight(
                this.$refs.tableRef,
                this.$refs.headerRef,
                this.$refs.bodyRef,
                this.$refs.footerRef,
                this.table
            )
            this.$nextTick(() => {
                (this.$refs.tableRef as any)?.doLayout()
            })
        },
        isAllChecked(tableColumns) {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < tableColumns.length; i++) {
                const item = tableColumns[i]
                if (item.checked === false) {
                    return false
                }
                if (item.children && item.children.length) {
                    return this.isAllChecked(item.children)
                }
            }
            return true
        }
    },
    watch: {
        tableColumns: {
            handler() {
                this.$nextTick(() => {
                    this.isAllData = this.isAllChecked(this.tableColumns)
                })
            },
            deep: true
        },
        'table.key': {
            handler() {
                this.$nextTick(async () => {
                    await treeNode(this.$refs.selectTableRef, this.table.tableColumns, this)
                    this.resizeTaleHeightFn()
                })
            },
            immediate: true
        }
    },

    render() {
        const slots = this.tableSlot ? this.$scopedSlots : {
            ...this.$scopedSlots,
            default: (scope: any) => this.$scopedSlots[scope.prop && columnProp(scope.prop)]?.(scope),
            header: (scope: any) => this.$scopedSlots[scope.prop && headerProp(scope.prop)]?.(scope)
        }
        const headerList = typeof this.headerList !== 'boolean' ? this.headerList as HeaderListProps[] : []

        const isHeader = (this.header && headerList.length) || (this.getSetting && this.header)

        return (
            <section class={'dinert-table'}>
                {
                    this.$scopedSlots['header-title']
        && <header class={'dinert-table-headerTitle'} ref="headerTitleRef">
            {this.$scopedSlots['header-title']?.('header-title')}
        </header>
                }
                {
                    isHeader
            && <header class={'dinert-table-header'} ref={'headerRef'}>
                {
                    <div class="dinert-table-header-left">
                        {
                            headerList.map((item: HeaderListProps) => {
                                if (this.$scopedSlots['header_left_' + (item as any).key]) {
                                    return this.$scopedSlots['header_left_' + (item as any).key]?.(item)
                                }

                                if ((typeof item.show !== 'function' && [true, undefined].includes(item.show))
                                    || (typeof item.show === 'function' && [true, undefined].includes(item.show(item)))
                                ) {
                                    return <el-button attrs={{
                                        ...item,
                                        type: item.type || 'primary',
                                    }} onClick={() => item.click && item.click(item)}>{item.message}</el-button>
                                }
                                return null
                            })
                        }
                    </div>
                }
                {
                    this.getSetting
                    && <div class={'dinert-table-header-right'}>
                        <el-button-group>
                            <el-button type={this.isAllData ? 'primary' : 'default'}
                            >全部显示
                            </el-button>
                            <el-popover teleported={false}
                                scopedSlots={
                                    {
                                        default: () => (
                                            <ul class="el-popover-classify">
                                                <el-tree
                                                    ref={'selectTableRef'}
                                                    draggable
                                                    data={this.tableColumns}
                                                    default-expand-all
                                                    show-checkbox
                                                    node-key={'prop'}
                                                    props={treeProps}
                                                    allow-drop={allowDrop}
                                                    on={{
                                                        'check-change': (data: any, checked: boolean, childChecked: boolean) => this.checkTree(data, checked, childChecked),
                                                        'node-drag-end': (currentNode: any, targetNode: any) => {
                                                            const currentNodeSort = currentNode.data.sort
                                                            const targetNodeSort = targetNode.data.sort
                                                            currentNode.data.sort = targetNodeSort
                                                            targetNode.data.sort = currentNodeSort
                                                            nodeDragEnd(currentNode, targetNode, (this.$refs as any).selectTableRef, this)
                                                        }
                                                    }}
                                                    scopedSlots={{
                                                        default: node => {
                                                            const data = node.data
                                                            return (<div class="text-dot tree-item">
                                                                <el-tooltip content={data.label}
                                                                    placement={'top'}
                                                                    disabled={data.label && data.label.length < 8}
                                                                >
                                                                    <span>{ data.label }</span>
                                                                </el-tooltip>
                                                            </div>)
                                                        }
                                                    }}
                                                >
                                                </el-tree>
                                            </ul>
                                        ),
                                        reference: () => (
                                            <el-button type={!this.isAllData ? 'primary' : ''}>
                                                分类显示<i class="el-icon-arrow-down"></i>
                                            </el-button>
                                        )
                                    }

                                }
                            >
                            </el-popover>
                        </el-button-group>
                    </div>
                }
            </header>
                }

                {
                    this.$scopedSlots['header-footer']
        && <header class={'dinert-table-headerFooter'} ref={'headerFooterRef'}>
            {this.$scopedSlots['header-footer']?.('header-footer')}
        </header>
                }
                <div ref={'bodyRef'} class="dinert-table-body">
                    <el-table
                        height={'100%'}
                        border={true}
                        attrs={this.table}
                        ref={'tableRef'}
                        row-key={this.table?.rowKey}
                        scopedSlots={{
                            empty: slots['table-empty'] ? (() => slots['table-empty']?.('table-empty')) : null,
                            append: slots['table-append'] ? (() => slots['table-append']?.('table-append')) : null
                        }}
                        on={this.table.on}
                    >
                        {
                            this.table?.rowSelection && <el-table-column width="60" align="center" type="selection" key={Math.random()} attrs={this.table.rowSelection} scopedSlots={{
                                default: slots.column_rowSelection ? scope => slots.column_rowSelection?.(scope) : null,
                                header: slots.column_header_rowSelection ? scope => slots.column_header_rowSelection?.(scope) : null,
                            }}></el-table-column>
                        }
                        {
                            this.table?.rowIndex && <el-table-column key={Math.random()} width="60" align="center" type="index" label="序号" attrs={this.table.rowIndex} scopedSlots={{
                                default: slots.column_rowIndex ? scope => slots.column_rowIndex?.(scope) : null,
                                header: slots.column_header_rowIndex ? scope => slots.column_header_rowIndex?.(scope) : null,
                            }}>
                            </el-table-column>
                        }
                        {
                            this.tableColumns.map(tableColumn => {
                                return (<DinertRecuveTableColumn
                                    table={this.table}
                                    table-column={tableColumn}
                                    only-class={this.onlyClass}
                                    key={Math.random()}
                                    on={{
                                        'checked-change': (data, checked, childChecked) => {
                                            this.resizeTaleHeightFn()
                                            this.$emit('CheckedChange', data, checked, childChecked)
                                        }
                                    }}
                                    scopedSlots={slots}
                                >
                                </DinertRecuveTableColumn>)
                            })
                        }

                    </el-table>
                </div>

                {this.footer && this.table?.data && this.table?.data.length !== 0 && <div class="dinert-table-footer" ref={'footerRef'}>
                    <el-pagination
                        current-page={1}
                        page-size={15}
                        pageSizes={[15, 30, 50, 70, 100]}
                        default-page-size={15}
                        layout={'total, sizes, prev, pager, next, jumper'}
                        total={100}
                        attrs={{...this.table.pagination}}
                        on={{
                            'size-change': (val: number) => this.$emit('size-change', val),
                            'current-change': (val: number) => this.$emit('current-change', val),
                            ...this.table?.pagination?.on
                        }}
                    >
                    </el-pagination>
                </div>
                }
            </section>
        )
    }
})
