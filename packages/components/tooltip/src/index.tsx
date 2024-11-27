import {defineComponent} from '@vue/composition-api'

import '@packages/assets/scss/dinert-tooltip.scss'

const getValue = (content?: string, _this?: any) => {
    if (_this.item && _this.item.options) {
        if (_this.item.type === 'select') {
            const options = _this.item.options.options
            if (options && options.length) {
                const index = options.findIndex((item: any) => item.value === content)
                if (index !== -1) {
                    return (options[index]).label
                }
            }
        }
    }

    return content
}

export default defineComponent({
    name: 'DinertTooltip',
    data() {
        return {
        }
    },

    render() {
        const scopedSlots = this.$scopedSlots
        const attrs = this.$attrs
        return (
            <el-tooltip key={this.$attrs.disabled}
                disabled={this.$attrs.disabled}
                content={this.$attrs.content}
                attrs={{...this.$attrs}}
            >
                <span class="dinert-tooltip">
                    <span class="text-tooltip">{ getValue(attrs.content as string, this) }</span>
                    <span class="label-text" onMouseenter={(e: MouseEvent) => {this.$emit('LabelMouseEnter', e)}}>
                        {scopedSlots.defaultBefore && scopedSlots.defaultBefore(attrs)}
                        {scopedSlots.default ? scopedSlots.default(attrs) : getValue(attrs.content as string, this)}
                        {scopedSlots.defaultAfter && scopedSlots.defaultAfter(attrs)}
                    </span>
                </span>
            </el-tooltip>
        )
    }
})
