import {defineComponent, PropType} from '@vue/composition-api'

import {getPropByPath, dataTransformRod} from '@packages/utils/tools'
import {RecuveTableColumnProps, RewriteTableColumnCtx, RewriteTableProps} from '../types'


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
        tableColumns: {
            type: Array as PropType<RewriteTableColumnCtx[]>,
            default: () => ([])
        },
        defaultCheckedKeys: {
            type: Array,
            default: () => ([])
        }
    },
    render() {
        const scopedSlots = this.$scopedSlots
        const defaultSlot = scopedSlots.default
        const headerSlot = scopedSlots.header
        console.log(this.tableColumns, 'this.tableColumns')
        return (
            <template>{
                this.tableColumns && this.tableColumns.map(item => {
                    console.log(item, 'itemmm')
                    let show = typeof item.show === 'function' ? item.show(item) : item.show
                    show = show === undefined || show === true
                    const checked = item.checked === undefined || item.checked === true
                    const custom = !['index', 'selection', 'expand'].includes((item.type as string))
                    const fixed = item.prop === 'operations' && item.fixed === undefined ? 'right' : item.fixed
                    const showOverflowTooltip = item.showOverflowTooltip === undefined && item.prop !== 'operations' ? true : item.showOverflowTooltip
                    const className = `${item.prop || ''} ${item.className || ''} ${item.setting ? 'setting' : ''}`
                    let align = item.prop === 'operations' && item.align === undefined ? 'center' : item.align
                    let width = item.prop === 'operations' && item.width === undefined ? 200 : item.width
                    const formatter = item.formatter && typeof item.formatter === 'function'
                    const noChildItem = filterColumn(item)
                    const propLowerCase = item.prop?.toLocaleLowerCase()
                    if (propLowerCase?.includes('time') || propLowerCase?.includes('date')) {
                        width = width ? width : 170
                    } else if (propLowerCase?.includes('status') || propLowerCase?.includes('state')) {
                        width = width ? width : 100
                        align = item.align || 'center'
                    }

                    if (show && checked && custom) {
                        return (
                            <el-table-column
                                attrs={{...noChildItem}}
                                key={item.prop}
                                // fixed={fixed}
                                // show-overflow-tooltip={showOverflowTooltip}
                                // className={className}
                                // width={width}
                                // align={align}
                                scopedSlots={{
                                    default: (scope: any) => {
                                        const deepValue = getPropByPath(scope.row, item.prop || '')
                                        const value = dataTransformRod(deepValue, this.table?.errData)

                                        const slotValue = defaultSlot?.({...scope, prop: item.prop})

                                        if (formatter) {
                                            let htmlValue = item.formatter && item.formatter(scope, (item as any), deepValue, scope.$index, this.table?.errData)
                                            htmlValue = dataTransformRod(htmlValue, this.table?.errData)
                                            return ([slotValue
                                                ? <div class="cell-item">{ defaultSlot?.({...scope, prop: item.prop})}</div>
                                                : <div class="cell-item" domPropsInnerHTML={htmlValue}></div>,])
                                        }
                                        {/* <div class="cell-item">
                                                    {this.moreRender(item, this, {
                                                        value,
                                                        scope,
                                                        isSlotValue,
                                                        slotValue
                                                    })}
                                                </div> */}
                                    },
                                    header: (scope: any) => {
                                        const slotValue = headerSlot?.({...scope, data: item, prop: item.prop})
                                        if (headerSlot) {
                                            return ([<span>{slotValue ? headerSlot?.({...scope, data: item, prop: item.prop}) : scope.column.label}</span>])
                                        } else {
                                            return ([<span>{scope.column.label}</span>])
                                        }
                                    }

                                }}
                            >
                                <dinert-recuve-table-column table={this.table}
                                    key={item.prop}
                                    tableColumns={item.children}
                                    popover-value={this.popoverValue}
                                    only-class={this.onlyClass}
                                    scopedSlots={scopedSlots}
                                >
                                </dinert-recuve-table-column>
                            </el-table-column>
                        )
                    }
                    else if (show && checked) {
                        const align = item.align === undefined ? 'center' : 'left'
                        const width = item.width === undefined ? mapWidth[item.type || ''] || 60 : item.width

                        return (<el-table-column
                            attrs={{...item}}
                            key={item.prop}
                            fixed={fixed}
                            align={align}
                            reserve-selection={item.reserveSelection}
                            width={width}
                        >
                        </el-table-column>)
                    }
                    return null
                })
            }
            </template>
        )
    }
})
