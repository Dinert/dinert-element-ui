  <template>
    <el-tooltip :content="content" placement="top" :disabled="disabled">
      <span>
        <span class="text-tooltip">{{ content }}</span>
        <span class="label-text" @mouseenter="labelMouseEnter($event)">
          <slot>{{ content }}</slot>
        </span>
      </span>
    </el-tooltip>
  </template>

  <script>
  export default {
    name: "DOverflowTooltip",
    props: {
      content: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {};
    },
    computed: {},
    methods: {
      // 超出宽度显示tooltip
      labelMouseEnter(e) {
        this.$emit("label-mouse-enter", e);
      },
    },
  };
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