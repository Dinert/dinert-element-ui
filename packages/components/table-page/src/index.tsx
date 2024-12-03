import {defineComponent, PropType} from '@vue/composition-api'

import DinertTable from '@packages/components/table'
import DinertForm from '@packages/components/form'

import type {RewriteTableProps, HeaderListProps} from '@packages/components/table/types/index'
import type {RewriteFormProps} from '@packages/components/form/types'

import '@packages/assets/scss/dinert-table-page.scss'


export default defineComponent({
    name: 'dinert-table-page',
    props: {
        form: {
            type: Object as PropType<RewriteFormProps>,
            default: () => ({})
        },
        table: {
            type: Object as PropType<RewriteTableProps>,
            default: () => ({})
        },
        search: {
            type: Boolean,
            default: true
        },
        footer: {
            type: Boolean,
            default: true
        },
        header: {
            type: [Object, Boolean] as PropType<HeaderListProps | boolean>,
            default: true
        },
        tableSlot: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            timer: null as any
        }
    },
    methods: {
        onUnFold() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.timer = setTimeout(() => {
                (this.$refs.tableRef as any)?.resizeTaleHeightFn()
                clearTimeout(this.timer)
                this.timer = null
            }, 300)
        }

    },
    render() {
        const slots = this.tableSlot ? this.$scopedSlots : {
            ...this.$scopedSlots,
            default: (scope: any) => this.$scopedSlots[(scope.prop)]?.(scope)
        }

        return (
            <section class={['dinert-table-page', this.search ? 'search' : '']} ref={'tablePageDom'}>
                {this.search
                && <DinertForm
                    form={this.form}
                    class="near"
                    scopedSlots={slots}
                    on={{
                        'search-fn': () => this.$emit('search-fn'),
                        'reset-fn': () => this.$emit('reset-fn'),
                        'un-fold': () => this.onUnFold()
                    }}
                    ref={'formRef'}></DinertForm>
                }
                <DinertTable
                    ref={'tableRef'}
                    table={this.table}
                    header={this.header}
                    footer={this.footer}
                    tableSlot={this.tableSlot}
                    scopedSlots={slots}
                    on={{
                        'size-change': (val: number) => this.$emit('size-change', val),
                        'current-change': (val: number) => this.$emit('current-change', val),
                        'checked-change': (data: Node, checked: boolean, childChecked: boolean) => this.$emit('checked-change', data, checked, childChecked)
                    }}
                >
                </DinertTable>
            </section>
        )
    }
})
