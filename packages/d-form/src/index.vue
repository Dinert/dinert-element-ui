<template>
  <el-form
    v-bind="{
      inline: true,
      ...form,
    }"
    ref="formRef"
    :class="{ packUp: !packUp }"
  >
    <el-row v-bind="{ gutter: 20, ...row }" class="el-form-left">
      <el-col
        v-bind="colLayout"
        v-for="(item, key, index) in formItem"
        :class="[item.type]"
      >
        <el-form-item
          v-bind="{
            key: key,
            prop: key,
            label: item.label,
            ref: setForm,
          }"
        >
          <template #label>
            <el-tooltip
              v-bind="{
                content: item['label'],
                placement: 'top',
                disabled: isDisabledLabel(item.label),
              }"
            >
              {{ item["label"] }}
            </el-tooltip>
          </template>
          <el-tooltip
            v-bind="{
              content: getTooltipValue(form.model[key], item),
              placement: 'top',
              disabled: !item.tooltip,
            }"
          >
            <div @mouseenter="mouseEnter(index, item)">
              <span class="temp-tooltip">{{
                getTooltipValue(form.model[key], item)
              }}</span>
              <template v-if="['input'].includes(item.type)">
                <el-input
                  clearable
                  v-model="form.model[key]"
                  v-bind="item"
                  v-on="{ ...item.on }"
                ></el-input>
              </template>
              <template v-else-if="['select'].includes(item.type)">
                <el-select
                  clearable
                  v-model="form.model[key]"
                  v-bind="item"
                  v-on="{ ...item.on }"
                >
                  <el-option
                    v-for="options in item.options"
                    v-bind="{
                      value: options.value,
                      label: options.label,
                    }"
                    v-on="{ ...item.on }"
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
                  v-bind="item"
                  v-on="{ ...item.on }"
                >
                </el-date-picker>
              </template>
            </div>
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="el-form-right">
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
export default {
  name: "menuController",
  props: {
    ref,
    formItem: {
      type: Object,
      default: () => {},
    },
    model: {
      type: Object,
      default: () => {},
    },
    form: {
      type: Object,
      default: () => {},
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
  components: {},
  created() {},
  mounted() {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>