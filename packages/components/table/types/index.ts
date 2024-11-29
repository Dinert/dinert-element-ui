import {Table, TableColumn, Pagination, Button, Popconfirm, MessageBox} from 'element-ui'

export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
}

export interface ScopeProps<T = any> {
    $index: number
    cellIndex: number
    column: RewriteTableColumnCtx<T>
    row: T
    store: InstanceType<typeof Table>
    _self: any
}

export interface OperationsProps<T = any> extends Partial<InstanceType<typeof Button>>{
    message?: string | ((scope: ScopeProps<T>, column: RewriteTableColumnCtx<T>, item: OperationsProps<T>) => void)
    show?: boolean | ((scope: ScopeProps<T>, column: RewriteTableColumnCtx<T>, item: OperationsProps<T>) => boolean)
    click?: (scope: ScopeProps<T>, column: RewriteTableColumnCtx<T>, item: OperationsProps<T>) => void
    sort?: number
    confirm?: Partial<InstanceType<typeof Popconfirm>>
    key?: string
    second?: boolean | 'messageBox'
    messageBox?: Partial<typeof MessageBox>
}

export interface RewriteTableColumnCtx<T=any> extends Omit<Partial<InstanceType<typeof TableColumn>>, 'children' | 'formatter'>{
    type?: 'default' | 'selection' | 'index' | 'expand'
    checked?: boolean
    show?: boolean | ((column: RewriteTableColumnCtx<T>) => boolean)
    formatter?: (scope: ScopeProps<T>, column: InstanceType<typeof TableColumn>, cellValue: any, index: number, errData?: string) => any
    setting?: boolean
    maxOperations?: number
    operations?: Record<string, OperationsProps<T>>
    sort?: number
    children?: Array<RewriteTableColumnCtx<T>>
    on?: Record<string, (scope: ScopeProps<T>, column: RewriteTableColumnCtx<T>, cellValue: any, index: number, errData?: string) => void>
}


export interface RecuveTableColumnProps<T = any>{
    onlyClass?: string
    popoverValue?: boolean
    table: RewriteTableProps
    children?: Array<RewriteTableColumnCtx<T>>
    defaultCheckedKeys?: any[]
}

// type TableFnProps = Partial<Pick<InstanceType<typeof Table>, 'onSelect' | 'onExpand-change' | 'onCurrent-change' | 'onSelect-all' | 'onSelection-change' | 'onCell-mouse-enter' | 'onCell-mouse-leave' | 'onCell-contextmenu' | 'onCell-click' | 'onCell-dblclick' | 'onRow-click' | 'onRow-contextmenu' | 'onRow-dblclick' | 'onHeader-click' | 'onHeader-contextmenu' | 'onSort-change' | 'onFilter-change' | 'onHeader-dragend'>>

export interface RewriteTableProps<T = any> extends InstanceType<typeof Table> {
    tableColumns: Array<RewriteTableColumnCtx<T>>
    errData?: string
    setting?: boolean
    key?: any
    rowIndex?: RewriteTableColumnCtx<T>
    rowSelection?: RewriteTableColumnCtx<T>
    class?: string
    pagination: RewritePaginationProps
    on?: Record<string, () => void>
}

export type RewritePaginationProps = Partial<InstanceType<typeof Pagination>>

export interface HeaderListProps extends Partial<InstanceType<typeof Button>>{
    message?: string
    click?: (item: HeaderListProps) => void
    sort?: number
    show?: boolean | ((item: HeaderListProps) => boolean)
    key?: string
}


export interface TablePageProps<T = any>{
    header?: boolean | {[key: string]: HeaderListProps}
    table: RewriteTableProps<T>
    footer?: boolean
    tableSlot?: boolean
}


export type SelectTable = {setChecked: (num: any) => void, getCheckedKeys: () => void, setCheckedNodes: () => void} | null


