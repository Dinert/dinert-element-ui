<template>
  <el-form
    v-bind="{
      inline: true,
      ...form,
    }"
    :class="{ packUp: !packUp }"
    class="d-form"
  >
    <el-row v-bind="{ gutter: 20, ...row }" class="el-form-left">
      <el-col
        v-bind="colLayout"
        v-for="(item, key) in formItem"
        :class="[item.type, key]"
        :key="key"
      >
        <el-form-item
          v-bind="{
            key: key,
            prop: key,
            ...item,
          }"
          :ref="key"
        >
          <template #label>
            <d-overflow-tooltip
              :content="item['label']"
              :disabled="labelDisabled"
              @label-mouse-enter="labelMouseEnter"
            >
            </d-overflow-tooltip>
          </template>
          <d-overflow-tooltip
            :content="String(form.model[key] || '')"
            :disabled="valueDisabled"
            @label-mouse-enter="valueMouseEnter($event, item)"
          >
            <template v-if="['input', 'textarea'].includes(item.type)">
              <el-input
                clearable
                v-model="form.model[key]"
                v-bind="{ placeholder: '请输入' + item.label, ...item.options }"
                v-on="item.options && { ...item.options.on }"
              ></el-input>
            </template>
            <template v-if="['input-number'].includes(item.type)">
              <el-input-number
                clearable
                v-model="form.model[key]"
                v-bind="{ placeholder: '请输入' + item.label, ...item.options }"
                v-on="item.options && { ...item.options.on }"
              ></el-input-number>
            </template>
            <template v-else-if="['select'].includes(item.type)">
              <el-select
                clearable
                v-model="form.model[key]"
                v-bind="{ placeholder: '请选择' + item.label, ...item.options }"
                v-on="item.options && { ...item.options.on }"
              >
                <el-option
                  v-for="options in item.options.options"
                  v-bind="{
                    value: options.value,
                    label: options.label,
                  }"
                  :key="options.value"
                  v-on="item.options && { ...options.on }"
                >
                  <slot
                    :name="item.type + firstUpperCase(key)"
                    :options="options"
                  ></slot>
                </el-option>
              </el-select>
            </template>
            <template
              v-else-if="
                [
                  'datetime',
                  'date',
                  'week',
                  'month',
                  'year',
                  'datetimerange',
                  'daterange',
                  'monthrange',
                  'yearrange',
                ].includes(item.type)
              "
            >
              <el-date-picker
                clearable
                v-model="form.model[key]"
                v-bind="{
                  placeholder:
                    '请选择' + datePickerPlaceholder(item.label, item),
                  startPlaceholder:
                    '开始' + datePickerPlaceholder(item.label, item),
                  endPlaceholder:
                    '结束' + datePickerPlaceholder(item.label, item),
                  'unlink-panels': true,
                  ...item.options,
                }"
                v-on="item.options && { ...item.options.on }"
              >
              </el-date-picker>
            </template>
          </d-overflow-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="el-form-right" v-if="isSearch">
      <el-button
        type="text"
        v-if="isArrow"
        @click="unfold"
        class="el-form-right-operation"
      >
        <svg class="ali-icon" aria-hidden="true" style="margin-right: 3px">
          <use
            :xlink:href="packUp ? `#icon-arrow-up` : `#icon-arrow-down`"
          ></use>
        </svg>
        {{ packUp ? "收起" : "展开" }}
      </el-button>
      <slot name="search"></slot>
    </el-row>
  </el-form>
</template>

<script>
import DOverflowTooltip from "@packages/d-overflow-tooltip";
import { firstUpperCase, windowResize } from "@/utils/tools";

export default {
  name: "DForm",
  props: {
    formItem: {
      type: Object,
      default: () => {},
    },
    form: {
      type: Object,
      default: () => {
        return {
          model: {},
        };
      },
    },
    row: {
      type: Object,
      default: () => {},
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 3, // ≥1920px
          lg: 4, // ≥1200px
          md: 8, // ≥992px
          sm: 12, // ≥768px
          xs: 24, // <768px
        };
      },
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    DOverflowTooltip,
  },
  created() {},
  mounted() {
    windowResize(() => {
      const elFormLeft = document.querySelector(".el-form-left");
      const clientHeight = elFormLeft.clientHeight;
      if (clientHeight > this.elFormHeight) {
        this.isArrow = true;
      } else {
        if (!this.packUp) {
          this.packUp = true;
        }
        this.isArrow = false;
      }
    });
  },
  data() {
    return {
      packUp: true,
      isArrow: false,
      elFormHeight: 60,
      labelDisabled: true,
      valueDisabled: true,
    };
  },
  methods: {
    firstUpperCase,
    // 获取显示的tooltip值
    getTooltipValue(value, form) {
      const type = form.type;
      const options = form.options;
      if (["input"].includes(type)) {
        return value;
      } else if (["select"].includes(type)) {
        let item = options.filter((item) => item.value === value)[0];
        return item && item.label;
      }
    },
    changeValue(obj, name, value) {
      obj[name] = Number(value);
    },

    // 展开还是收起状态
    unfold() {
      if (this.packUp) {
        this.packUp = false;
      } else {
        this.packUp = true;
      }
    },

    // 添加options属性
    addAttribute(formItem) {
      if(!formItem.options) {
        formItem.options = {
          on: {}
        }
      }
      return formItem
    },

    // 是否显示标签
    labelMouseEnter(e) {
      const el = e.target.parentElement.parentElement;
      const labelEl = window.getComputedStyle(el, null);
      const labelWidth =
        parseInt(labelEl.getPropertyValue("max-width")) -
        parseInt(labelEl.getPropertyValue("padding-right"));
      const tooltipWidth = e.target.previousElementSibling.offsetWidth;
      if (tooltipWidth >= labelWidth) {
        this.labelDisabled = false;
      } else {
        this.labelDisabled = true;
      }
    },

    // 是否显示值
    valueMouseEnter(e, item) {
      const el = e.target.parentElement.querySelector(".el-input__inner");
      const timer = [
        "datetime",
        "date",
        "week",
        "month",
        "year",
        "datetimerange",
        "daterange",
        "monthrange",
        "yearrange",
      ];
      if (el && !timer.includes(item.type)) {
        const inputEl = window.getComputedStyle(el, null);
        const textWidth =
          e.target.offsetWidth -
          parseInt(inputEl.getPropertyValue("padding-right")) -
          parseInt(inputEl.getPropertyValue("padding-left"));
        const tooltipWidth = e.target.previousElementSibling.offsetWidth;
        if (tooltipWidth >= textWidth) {
          this.valueDisabled = false;
        } else {
          this.valueDisabled = true;
        }
      }
    },

    // 更改日期组件显示的placeholder
    datePickerPlaceholder(label, item) {
      const type = item.type;
      if (["week"].includes(type)) {
        return "周";
      } else if (["month", "monthrange"].includes(type)) {
        return "月份";
      } else if (["year", "yearrange"].includes(type)) {
        return "年份";
      }
      return "时间";
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 16px 16px 0;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  min-height: 50px;

  &.packUp {
    max-height: 50px;
  }

  .el-form-left {
    flex: 1;

    .el-col {
      &.datetimerange {
        min-width: 450px;
      }

      &.date {
        min-width: 210px;
      }
      &.year {
        min-width: 160px;
      }

      &.month {
        min-width: 190px;
      }

      &.select {
        min-width: 230px;
      }

      &.input {
        min-width: 230px;
      }
    }
  }

  .el-form-right {
    margin-left: 20px;
    min-width: 150px;
    display: flex;
    justify-content: flex-end;

    .el-form-right-operation {
      &.el-button.is-text {
        background-color: unset;
        padding-right: 0;
      }
    }
    ::v-deep .el-button {
      height: 40px;
    }
  }

  .el-form-item {
    width: 100%;
    margin-bottom: 18px;
    display: flex;
    position: relative;

    ::v-deep .el-input-number {
      width: 100%;
      .el-input__inner {
        text-align: left;
      }
    }

    ::v-deep .el-form-item__content {
      flex: 1;
    }

    ::v-deep .el-tooltip__trigger {
      width: 100%;
    }

    ::v-deep .el-date-editor {
      width: 100%;

      .el-input__wrapper {
        width: 100%;
        box-sizing: border-box;
      }
    }

    ::v-deep .el-input__inner {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    ::v-deep .el-form-item__label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 80px;

      .el-tooltip {
        display: inline;

        .label-text {
          display: inline;
        }
      }
    }
  }

  .el-select {
    width: 100%;
  }

  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>