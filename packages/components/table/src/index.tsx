import {defineComponent, PropType} from '@vue/composition-api'
import type {HeaderListProps, RewriteTableProps, TablePageProps} from '@packages/components/table/types/index'
import {getUuid, columnProp, getTreeNode, headerProp} from '@packages/utils/tools'
// import {resizeTaleHeight, allowDrop, nodeDragEnd, treeProps, treeNode} from '@packages/components/table/hooks'

import DinertRecuveTableColumn from './recuve-table-column'


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
    data() {
        return {
            onlyClass: ''
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
                {/* {
                    this.$scopedSlots['header-title']
        && <header class={'dinert-table-headerTitle'} ref={el => {this.headerTitleRef = el}}>
            {this.$scopedSlots['header-title']?.('header-title')}
        </header>
                }
                {
                    isHeader
            && <header class={'dinert-table-header'} ref={el => {this.headerRef = el}}>
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
                                    return <el-button {...{
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
                                v-slots={
                                    {
                                        default: () => (
                                            <ul class="el-popover-classify">
                                                <el-tree
                                                    ref={this.selectTableRef}
                                                    draggable
                                                    data={this.tableColumns}
                                                    default-expand-all
                                                    default-checked-keys={this.defaultCheckedKeys}
                                                    show-checkbox
                                                    node-key={'prop'}
                                                    props={treeProps}
                                                    allow-drop={allowDrop}
                                                    onCheckChange={(data: Node, checked: boolean, childChecked: boolean) => this.checkTree(data, checked, childChecked)}
                                                    onNodeDragEnd={(currentNode: Node, targetNode: Node) => {
                                                        const currentNodeSort = currentNode.data.sort
                                                        const targetNodeSort = targetNode.data.sort
                                                        currentNode.data.sort = targetNodeSort
                                                        targetNode.data.sort = currentNodeSort
                                                        nodeDragEnd(currentNode, targetNode, this.selectTableRef)
                                                    }
                                                    }
                                                    v-slots={
                                                        {
                                                            default: ({data}: {data: Node}) => (
                                                                <div class="text-dot tree-item">
                                                                    <el-tooltip content={data.label}
                                                                        placement={'top'}
                                                                        disabled={data.label && data.label.length < 8}
                                                                        v-slots={
                                                                            {
                                                                                default: () => (<span>{ data.label }</span>)
                                                                            }
                                                                        }
                                                                    >
                                                                    </el-tooltip>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                >
                                                </el-tree>
                                            </ul>
                                        ),
                                        reference: () => (
                                            <el-button type={!this.isAllData ? 'primary' : ''}>
                                                分类显示<el-icon><ArrowDown/></el-icon>
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
        && <header class={'dinert-table-headerFooter'} ref={el => {this.headerFooterRef = el}}>
            {this.$scopedSlots['header-footer']?.('header-footer')}
        </header>
                } */}

                <div ref={'bodyRef'} class="dinert-table-body">

                    <el-table
                        height={'100%'}
                        border={true}
                        attrs={{
                            ...this.table
                        }}
                        ref={'tableRef'}
                        row-key={this.table?.rowKey}
                        v-slots={{
                            empty: slots['table-empty'] ? (() => slots['table-empty']?.('table-empty')) : null,
                            append: slots['table-append'] ? (() => slots['table-append']?.('table-append')) : null
                        }}
                        on={this.table.on}
                    >
                        {
                            this.table?.rowSelection && <el-table-column width="60" align="center" type="selection" {...this.table.rowSelection}></el-table-column>
                        }
                        {
                            this.table?.rowIndex && <el-table-column width="60" align="center" type="index" label="序号" {...this.table.rowIndex}></el-table-column>
                        }
                        <DinertRecuveTableColumn
                            table={this.table}
                            table-columns={this.table.tableColumns}
                            only-class={this.onlyClass}
                            popover-value={this.popoverValue}
                            defaultCheckedKeys={this.defaultCheckedKeys}
                            // onCheckedChange={(data: Node, checked: boolean, childChecked: boolean) => this.$emit('CheckedChange', data, checked, childChecked)}
                            scopedSlots={slots}

                        >
                        </DinertRecuveTableColumn>
                    </el-table>
                </div>

                {/* {this.isFooter && this.table?.data && this.table?.data.length !== 0 && <div class="dinert-table-footer" ref={el => {this.footerRef = el}} >
                    <el-pagination
                        model:current-page={1}
                        model:page-size={15}
                        pageSizes={[15, 30, 50, 70, 100]}
                        default-page-size={15}
                        layout={'total, sizes, prev, pager, next, jumper'}
                        total={100}
                        attrs={{...this.table.pagination}}
                        onSizeChange={(val: number) => this.$emit('SizeChange', val)}
                        onCurrentChange={(val: number) => this.$emit('CurrentChange', val)}
                    >

                    </el-pagination>
                </div>
                } */}
            </section>
        )
    }
})
