import {defineComponent} from '@vue/composition-api'
import {getUuid} from '@packages/utils/tools'
import lodash from 'lodash'
import type {RewriteDialogProps, GETWH} from './type'
import '@packages/assets/scss/dinert-dialog.scss'
import '@packages/assets/fonts/iconfont.js'

const getWH = (options: RewriteDialogProps): GETWH => {
    const result: GETWH = {
        width: '65%',
        height: 'auto'
    }
    if (options.size === 'large') {
        result.width = 940
        result.height = 706
    } else if (options.size === 'small') {
        result.width = 482
        result.height = 362
    } else if (options.size === 'medium') {
        result.width = 720
        result.height = 440
    }

    result.width = options.width ? options.width : result.width
    result.height = options.height ? options.height : result.height
    result.height = String(result.height).replace('px', '') + 'px'

    return result
}


export default defineComponent({
    name: 'dinert-dialog',
    props: {
        value: {
            type: Boolean,
        }
    },
    data() {
        return {
            defaultAttrs: {
                title: '弹窗标题',
                closeOnClickModal: false,
                closeOnPressEscape: true,
                appendToBody: true,
                uuid: 'dialog_' + getUuid(),
            },
            visible: false,
            currentFullScreen: false
        }
    },
    methods: {
        fullToggle() {
            this.currentFullScreen = !this.currentFullScreen
        }
    },
    watch: {
        visible: {
            immediate: true,
            handler(val: boolean) {
                this.$emit('input', val)
            }
        },
        value: {
            immediate: true,
            handler(val: boolean) {
                this.visible = val
            }
        }
    },
    render() {
        const slots = this.$scopedSlots

        const attrs = lodash.defaultsDeep(lodash.cloneDeep({
            ...this.$attrs,
            class: this.$attrs.modalClass ? 'dialog_' + this.$attrs.modalClass : '',
            modalClass: `${this.uuid} el-overlay dinert-dialog ${this.$attrs.modalClass || ''}`,
            width: getWH(this.$attrs).width,
            style: {
                ...(this.$attrs?.style as any),
                height: this.currentFullScreen ? undefined : getWH(this.$attrs).height,
            },
            on: {
                ...this.$attrs.on,
                close: () => {
                    this.visible = false
                    this.$emit('close')
                }
            }
        }), this.defaultAttrs)

        return (
            <el-dialog attrs={this.$attrs}
                visible={this.visible}
                fullscreen={this.currentFullScreen}
                ref={'dialogRef'}
                on={attrs.on}
                scopedSlots={{
                    default: () => slots.default?.('default'),
                    title: () => {
                        return (
                            <span role="heading" class="el-dialog__title">
                                { slots.header?.('header') || attrs.title }
                            </span>
                        )
                    },
                    footer: slots.footer?.('footer') ? () => slots.footer?.('footer') : null,
                }}>

            </el-dialog>
        )
    }
})

