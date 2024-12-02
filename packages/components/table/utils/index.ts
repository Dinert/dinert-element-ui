

import type {RewriteTableColumnCtx, SelectTable, RewriteTableProps} from '../types/index'

interface Node{
    checked: boolean
    data: any
    level: any
    parent: any
}

export const allShow = (selectTable: any, tableColumns: RewriteTableColumnCtx[]) => {
    selectTable?.setCheckedNodes(tableColumns)
}

export const checkTree = (data: Node, checked: boolean, childChecked: boolean) => {
    data.checked = childChecked || checked
}

export const treeNode = async (selectTable: any, treeData2: any, _this) => {

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < treeData2.length; i++) {
        if (treeData2[i].checked === undefined) {
            _this.$set(treeData2[i], 'checked', true)
            await selectTable?.setChecked(treeData2[i].prop, true)
        } else if (treeData2[i].checked !== undefined) {
            await selectTable?.setChecked(treeData2[i].prop, treeData2[i].checked)
        }
        if (treeData2[i].children && treeData2[i].children.length) {
            treeNode(selectTable, treeData2[i].children, _this)
        }
    }
}


export const allowDrop = (draggingNode: Node, dropNode: Node, type) => {
    if (draggingNode.level === dropNode.level) {
        if (draggingNode.parent === dropNode.parent) {
            return type === 'prev' || type === 'next'
        } else {
            return false
        }
    } else {
        // 不同级进行处理
        return false
    }
}

export const nodeDragEnd = async (currentNode: Node, targetNode: Node, selectTable: SelectTable, _this) => {
    treeNode(selectTable, [currentNode.data], _this)
}

export const resizeTaleHeight = (table: any, header: any, body: any, footer: any, tableProps: RewriteTableProps) => {
    if (!tableProps.height) {

        if (body && body.parentElement && body.parentElement.parentElement) {
            body.parentElement.parentElement.style.height = '100%'
        }

        const bodyPPT = (body && parseInt(window.getComputedStyle(body.parentElement, null).paddingTop))
        const bodyPPB = (body && parseInt(window.getComputedStyle(body.parentElement, null).paddingBottom))

        const headerH = (header && header.offsetHeight) || 0
        const headerMT = (header && parseInt(window.getComputedStyle(header, null).marginTop)) || 0
        const headerBT = (header && parseInt(window.getComputedStyle(header, null).marginBottom)) || 0

        const headerFooter = table && table.headerFooter
        const headerFooterH = (headerFooter && headerFooter.offsetHeight) || 0

        const footerH = (footer && footer.offsetHeight) || 0
        const footerMT = (footer && parseInt(window.getComputedStyle(footer, null).marginTop)) || 0
        const bodyCurrentH = body && body.parentElement && (body.parentElement.offsetHeight - headerH - headerFooterH - footerH - footerMT - headerMT - bodyPPT - bodyPPB)

        const tableHeaderH = (body && body.querySelector('.el-table__header-wrapper table').offsetHeight) || 0
        const tableBodyH = (body && body.querySelector('.el-table__body-wrapper table').offsetHeight) || 0


        const isXOverflow = (body && (body.querySelector('.el-table__body-wrapper.is-scrolling-left')
         || body.querySelector('.el-table__body-wrapper.is-scrolling-right')
         || body.querySelector('.el-table__body-wrapper.is-scrolling-middle')))
        const xOverflowH = isXOverflow ? 17 : 0

        // 当表格头和表格内容大于
        if (body) {
            if ((tableHeaderH + tableBodyH + headerBT) > bodyCurrentH || (tableProps.data && tableProps.data.length === 0)) {
                body.style.height = '0px'
                body.style.flex = '1'
                if (body.parentElement && body.parentElement.parentElement) {
                    body.parentElement.parentElement.style.height = '100%'
                }
            } else {
                body.style.height = (tableBodyH + tableHeaderH + 1 + xOverflowH) + 'px'
                body.style.flex = 'unset'

                if (body.parentElement && body.parentElement.parentElement) {
                    body.parentElement.parentElement.style.height = 'auto'
                }

            }
        }
    }
}

export const treeProps = {
    children: 'children',
    label: 'label',
    class: (data: any) => {
        const hide = (typeof data.show === 'function' ? data.show(data) === false : data.show === false) || data.setting || ['index', 'selection'].includes(data.type) || ['selection'].includes(data.prop) ? 'hide' : ''
        return hide
    }
}
