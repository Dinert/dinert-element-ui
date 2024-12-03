import {RewriteFormProps} from '@packages/components'
import {RewriteTableProps} from '@packages/components/table/types'
import {dataTransformRod, getUuid} from '@packages/utils/tools'
import lodash from 'lodash'
export default {

    created() {
        this.initTablePageParams()
    },
    data() {
        return {
            defaultTablePageOptions: {
                table: {
                    rowKey: () => 'id',
                    className: 'table_page' + getUuid(),
                    tableColumns: [],
                    data: [],
                    key: true,
                    border: true,
                    pagination: {
                        total: 0,
                        currentPage: 1,
                        pageSize: 10,
                        pageSizes: [10, 20, 30, 50, 100],
                    },
                    on: {
                        'selection-change': data => {
                            this.selectTableData = data
                        }
                    }
                } as Partial<RewriteTableProps<any>>,
                form: {
                    model: {},
                    formItem: {}
                } as Partial<RewriteFormProps<any, any>>,
                footer: false,
                search: false
            },
            firstTablePageOptions: {},
            table: {
                rowKey: 'id',
                errData: '-',
                tableColumns: [],
                data: [],
                key: true,
                pagination: {}
            } as Partial<RewriteTableProps<any>>,
            form: {model: {}, formItem: {}} as Partial<RewriteFormProps<any, any>>,
            params: {},
            oldParams: {},
            selectTableData: [], // 选中表格的数据
            ids: [] as string[]
        }
    },
    computed: {
        isSelectTableData() {
            return this.selectTableData.length > 0
        }
    },
    methods: {

        initTablePageParams() {
            const table = lodash.defaultsDeep(lodash.cloneDeep(this.table), this.defaultTablePageOptions.table)
            this.firstTablePageOptions.table = lodash.cloneDeep(table)
            this.table = table

            const form = lodash.defaultsDeep(lodash.cloneDeep(this.form), this.defaultTablePageOptions.form)
            this.firstTablePageOptions.form = lodash.cloneDeep(form)
            this.form = form
        },


        search(options = {name: 'search'}) {
            for (const prop in this.form.model) {
                if ([null, undefined, ''].includes(this.form.value.model[prop])) {
                    delete this.form.model[prop]
                }
            }
            return this.getTableData(options)
        },


        // 重置查询
        resetSearch(options = {name: 'reset'}) {
            this.resetParams()
            this.search(options)
        },

        resetParams() {
            if (lodash.isEmpty(this.firstTablePageOptions.form?.model)) { // 判断查询的默认参数是否为空
                for (const prop in this.form.model) {
                    delete this.form.model[prop]
                }
            } else {
                for (const prop in this.form.model) {
                    delete this.form.model[prop]
                }
                for (const prop in this.firstTablePageOptions.form?.model) {
                    this.$set(this.form.model, prop, this.firstTablePageOptions.form?.model[prop])
                }
            }
        },

        getAjaxTableDataParams(options = {}) {
            this.params = this.getTableParams(options)

            const isSame = lodash.isEqual(this.params, this.oldParams) // 判断当前提交的参数和上一次提交的参数是否相同


            if (options.name === 'search') {
                if (!isSame) {
                    this.$set(this.table.pagination, 'currentPage', 1)
                    this.params = this.getTableParams(options)
                }

                this.oldParams = lodash.cloneDeep(this.params)
            } else if (options.name === 'reset') {
                this.resetPagination()
                this.params = this.getTableParams(options)

                this.oldParams = lodash.cloneDeep(this.params)
            } else if (options.name === 'delete') {
                if (this.table.data && this.table.data.length) {
                    if (this.table.data.length === 1 && (this.table as any).pagination.currentPage > 1) {
                        this.$set(this.table.pagination, 'currentPage', (this.table.pagination as any).currentPage - 1)

                        this.params = this.getTableParams(options)
                    }
                }
            } else if (['current', 'size', 'reset'].includes(options.name || '')) {
                this.oldParams = lodash.cloneDeep(this.params)
            }

            if (!['size', 'current'].includes(options.name || '') || !this.table.rowKey) {
                this.selecTableDatas = []
            }

            return this.params
        },

        async getTableData(options) {
            const res = await this.ajaxTableData(options)
            this.changeTableData(res)

            typeof this.ajaxTableDataAfter === 'function' && this.ajaxTableDataAfter(res)

            this.$set(table, 'key', !this.table.key)
            return res
        },

        // 请求
        ajaxTableData(options) {
            return new Promise(resolve => {
                resolve(this.getAjaxTableDataParams(options))
            })
        },

        changeTableData(res) {
            if (res && res.data && res.data.length) {
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].index = i + 1 + (res.pageNum as number) * (res.pageSize as number)
                }
                this.$set(this.table, 'data', res.data)
                this.$set(this.table.pagination, 'total', res.total)
            }
        },


        // 根据key获取表格中的数据
        getTableDataKeys(key: string = 'id') {
            this.ids = lodash.map(this.table.data || [], key)
            return this.ids
        },

        // 重置分页参数
        resetPagination() {
            this.$set(this.table, 'pagination', {...this.defaultTablePageOptions.table.pagination})
        },

        ajaxTableDataAfter(res) {},

        getTableParams(options) {
            return {}
        },

        sizeChange(size: number) {
            const pageSize = this.table.pagination.pageSize
            this.$set(this.table.pagination, 'pageSize', size)
            const pagination = this.table.pagination···
            if ((pageSize as any) > size
                || (pagination.currentPage as any) <= Math.ceil((pagination.total as any) / (pagination.pageSize as any))) {
                this.search({name: 'size', pageSize: size})
            }

        },

        currentChange(currentPage: number) {
            this.$set(this.table.pagination, 'currentPage', currentPage)
            this.search({name: 'current', currentPage})
        }

    },
}
