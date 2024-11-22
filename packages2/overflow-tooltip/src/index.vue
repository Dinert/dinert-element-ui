<template>
    <el-tooltip :content="content" placement="top"
        :disabled="disabled" v-bind="options"
    >
        <span>
            <span class="text-tooltip">{{ getValue(content) }}</span>
            <span class="label-text" @mouseenter="labelMouseEnter($event)">
                <slot>{{ content }}</slot>
            </span>
        </span>
    </el-tooltip>
</template>

  <script>
export default {
    name: 'DinertOverflowTooltip',
    props: {
        content: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: true,
        },
        item: {
            type: Object,
            default: () => ({})
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    computed: {},
    methods: {

        // 超出宽度显示tooltip
        labelMouseEnter(e) {
            this.$emit('label-mouse-enter', e)
        },

        getValue(content) {
            if (this.item.type === 'select') {
                const options = this.item.options.options
                if (options && options.length) {
                    const index = options.findIndex(item => item.value === content)
                    if (index !== -1) {
                        return options[index].label
                    }
                }
            }
            return content

        }
    },
}
  </script>

  <style lang="scss" scoped>
  .el-tooltip {
    display: block;
    height: 100%;

    .text-tooltip {
      position: absolute;
      left: -999999999999px;
    }
    .label-text {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      height: 100%;
    }
  }
  </style>
