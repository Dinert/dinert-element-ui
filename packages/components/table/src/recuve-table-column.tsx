import {defineComponent, PropType} from '@vue/composition-api'

import {getPropByPath, dataTransformRod} from '@packages/utils/tools'
import {RecuveTableColumnProps, RewriteTableColumnCtx, RewriteTableProps} from '../types'
import {MessageBox} from 'element-ui'


const filterColumn = (column: any) => {
    const obj: any = {}
    for (const prop in column) {
        if (prop !== 'children') {
            obj[prop] = column[prop]
        }
    }
    return obj
}

const mapWidth: Record<string, any> = {
    index: 60,
    selection: 40,
    expand: 40
}


export default defineComponent({
    name: 'dinert-recuve-table-column',
    props: {
        onlyClass: {
            type: String,
            default: ''
        },
        popoverValue: {
            type: Boolean,
            default: false
        },
        table: {
            type: Object as PropType<RewriteTableProps>,
        },
        tableColumn: {
            type: Object as PropType<RewriteTableColumnCtx>,
            default: () => ({})
        },
        defaultCheckedKeys: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        getTableColumn() {
            const item = this.tableColumn
            let show = typeof item.show === 'function' ? item.show(item) : item.show
            show = show === undefined || show === true
            const checked = item.checked === undefined || item.checked === true
            const custom = !['index', 'selection', 'expand'].includes((item.type as string))
            const fixed = item.prop === 'operations' && item.fixed === undefined ? 'right' : item.fixed
            const showOverflowTooltip = item.showOverflowTooltip === undefined && item.prop !== 'operations' ? true : item.showOverflowTooltip
            const className = `${item.prop || ''} ${item.className || ''} ${item.setting ? 'setting' : ''}`
            let align = item.prop === 'operations' && item.align === undefined ? 'center' : item.align
            let width = item.prop === 'operations' && item.width === undefined ? 200 : item.width
            width = width === undefined && mapWidth[item.type || ''] ? mapWidth[item.type || ''] : width
            const noChildItem = filterColumn(item)
            const propLowerCase = item.prop?.toLocaleLowerCase()
            if (propLowerCase?.includes('time') || propLowerCase?.includes('date')) {
                width = width ? width : 170
            } else if (propLowerCase?.includes('status') || propLowerCase?.includes('state')) {
                width = width ? width : 100
                align = item.align || 'center'
            }
            return {
                ...item,
                show,
                checked,
                custom,
                fixed,
                showOverflowTooltip,
                className,
                align,
                width,
                noChildItem,
                propLowerCase,
            }
        },

    },
    methods: {
        getColumnOperations(column: RewriteTableColumnCtx, _this: any, {
            scope,
        }) {
            const columnOperations = this.getTableColumn.operations || {}
            const result: any[] = []
            Object.keys((columnOperations)).forEach(key => {
                const tempObj = columnOperations[key]
                if ((typeof tempObj.show !== 'function' && [true, undefined].includes(tempObj.show))
                    || (typeof tempObj.show === 'function' && [true, undefined].includes(tempObj.show(scope, column, tempObj)))
                ) {
                    result.push({
                        key: key,
                        ...tempObj,
                    })
                }
            })

            result.sort((a: any, b: any) => {
                return (a.sort || Infinity) - (b.sort || Infinity)
            })
            return result
        },

        getDefaultOperations(defaultFunctions, tableColumn, scope) {
            const result: any[] = []
            defaultFunctions.forEach((item: any) => {
                const message = typeof item.message === 'function' ? item.message(scope, tableColumn, item) : item.message

                let buttonCom = (<el-link underline={false} attrs={{
                    ...item,
                    type: item.key === 'delete' ? 'danger' : item.type || 'primary',
                }}
                on={{
                    click: () => {
                        if (item.second === 'messageBox' || item.key === 'delete') {
                            return MessageBox({
                                title: '警告',
                                message: `是否${message}该条数据？`,
                                type: 'warning',
                                showCancelButton: true,
                                cancelButtonText: '取消',
                                beforeClose(action, instance, done) {
                                    done()
                                },
                                ...item.messageBox
                            }).then(() => {
                                return item.click && item.click(scope, tableColumn, item)
                            }).catch(() => null)
                        }
                        return item.click && item.click(scope, tableColumn, item)
                    }
                }}
                key={(item).key}>
                    {message}
                </el-link>)

                if (item.second === true) {
                    buttonCom = (
                        <el-popconfirm title={`是否${message}该数据？`} attrs={{...item.confirm}}
                            onConfirm={() => item.click && item.click(scope, tableColumn, item)}
                            scopedSlots={{
                                reference: () => {
                                    return (<el-link underline={false} attrs={{
                                        ...item,
                                        type: item.key === 'delete' ? 'danger' : item.type || 'primary',
                                    }}
                                    key={item.key}>
                                        {message}
                                    </el-link>)
                                }
                            }}>

                        </el-popconfirm>
                    )
                }

                result.push(buttonCom)
            })
            return result
        },
        getSeniorFunctions(seniorFunctions, tableColumn, scope, operationsLen, maxOperations) {
            const result: any[] = []
            if (seniorFunctions.length && operationsLen > maxOperations) {
                result.push(
                    <el-popover
                        placement="bottom"
                        trigger="hover"
                        width={'auto'}
                        popper-class="more-operations"
                        scopedSlots={{
                            reference: () => (<el-button type="text">更多<i class="el-icon-arrow-down"></i></el-button>),
                            default: () => {
                                return seniorFunctions.map(item => {
                                    const message = typeof item.message === 'function' ? item.message(scope, tableColumn, item) : item.message
                                    return (
                                        <div class="more-operations-item" on={{
                                            click: () => {
                                                if (item.key === 'delete' || item.second) {
                                                    return MessageBox({
                                                        title: '警告',
                                                        message: `是否${item.message}该条数据？`,
                                                        type: 'warning',
                                                        showCancelButton: true,
                                                        cancelButtonText: '取消',
                                                        beforeClose(action, instance, done) {
                                                            done()
                                                        },
                                                        ...item.messageBox
                                                    }).then(() => {
                                                        return item.click && item.click(scope, tableColumn, item)
                                                    }).catch(() => null)
                                                }
                                                return item.click && item.click(scope, tableColumn, item)
                                            }
                                        }}>
                                            <el-button type="text">{message}</el-button>
                                        </div>
                                    )
                                })
                            }
                        }}
                    >
                    </el-popover>
                )
            }

            return result
        }
    },
    render() {
        const scopedSlots = this.$scopedSlots
        const defaultSlot = scopedSlots.default
        const headerSlot = scopedSlots.header
        const tableColumn = this.getTableColumn
        if (!tableColumn.show && !tableColumn.checked) {
            return null
        }
        return (
            <el-table-column
                attrs={{...this.tableColumn}}
                key={tableColumn.prop}
                fixed={tableColumn.fixed}
                show-overflow-tooltip={tableColumn.showOverflowTooltip}
                className={tableColumn.className}
                width={tableColumn.width}
                align={tableColumn.align}
                on={tableColumn.on}
                scopedSlots={{
                    default: (scope: any) => {
                        const deepValue = getPropByPath(scope.row, tableColumn.prop || '')
                        const value = dataTransformRod(deepValue, this.table?.errData)

                        const slotValue = defaultSlot?.({...scope, prop: tableColumn.prop})
                        if (slotValue) {
                            return (<div class="cell-item">{ defaultSlot?.({...scope, prop: tableColumn.prop})}</div>)
                        } else if (typeof tableColumn.formatter === 'function') {
                            const htmlValue = tableColumn.formatter(scope, (tableColumn as any), deepValue, scope.$index, this.table?.errData)
                            return (<div class="cell-item" domPropsInnerHTML={htmlValue}></div>)
                        }

                        const columnOperations = this.getColumnOperations(tableColumn as any, this, {
                            scope,
                        }) as any
                        let maxOperations = tableColumn.maxOperations || 3
                        const operationsLen = columnOperations.length
                        maxOperations = operationsLen > maxOperations ? maxOperations - 1 : maxOperations
                        const defaultFunctions = columnOperations.slice(0, maxOperations)

                        const getDefaultOperations = this.getDefaultOperations(defaultFunctions, tableColumn, scope)
                        const seniorFunctions = columnOperations.slice(maxOperations, columnOperations.length)
                        const getSeniorFunctions = this.getSeniorFunctions(seniorFunctions, tableColumn, scope, operationsLen, maxOperations)
                        const operationsArr = [...getDefaultOperations, ...getSeniorFunctions]
                        if (operationsLen) {
                            return (operationsArr)
                        }


                        return (<div class="cell-item"><div class="cell-item-text">{value}</div></div>)
                    },
                    header: (scope: any) => {
                        const slotValue = headerSlot?.({...scope, data: tableColumn, prop: tableColumn.prop})
                        if (headerSlot) {
                            return ([<span>{slotValue ? headerSlot?.({...scope, data: tableColumn, prop: tableColumn.prop}) : scope.column.label}</span>])
                        } else {
                            return ([<span>{scope.column.label}</span>])
                        }
                    }
                }}
            >
                {
                    tableColumn.children && tableColumn.children.map(item => {
                        return (<dinert-recuve-table-column table={this.table}
                            key={item.prop}
                            tableColumn={item}
                            popover-value={this.popoverValue}
                            only-class={this.onlyClass}
                            scopedSlots={scopedSlots}
                        >
                        </dinert-recuve-table-column>)
                    })
                }
            </el-table-column>
        )
    }
})
