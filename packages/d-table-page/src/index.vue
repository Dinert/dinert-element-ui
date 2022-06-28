
<template>
  <section class="d-table-page">
    <d-form
      ref="searchForm"
      v-bind="{
        formItem,
        disabled,
        form: {
          model: formValue,
          ...form
        },
        colLayout
      }"
      v-if="showSearch"
    >
      <template #search>
        <slot name="search">
          <el-button type="primary" @click="search(formValue)">查询</el-button>
          <el-button
            type="default"
            @click="reset(formValue, defaultValue, search)"
            >重置</el-button
          ></slot
        >
      </template>
    </d-form>
    <d-table
      v-bind="{ table, pagination, tableSlot: true, disabled, showHeader }"
      v-on="{
        'size-change': sizeChange,
        'current-change': currentChange,
      }"
    >
      <template #header-left>
        <slot name="header-left"></slot>
      </template>

      <template #default="scope">
        <template v-if="tableSlot">
          <slot v-bind="scope" :name="columnProp(scope.prop)"></slot>
        </template>
        <template v-else>
          <slot v-bind="scope"></slot>
        </template>
      </template>
    </d-table>
  </section>
</template>
<script>
import DForm from "@packages/d-form";
import DTable from "@packages/d-table";
import { getFormValue } from "@/utils/getValue";
import { filterNullStrUndefind } from "@/utils/tools";

export default {
  name: "DTablePage",
  props: {
    // form表单的配置
    formItem: {
      type: Object,
      default: () => {},
    },

    // 表格的数据
    table: {
      type: Object,
      default: () => {},
    },

    tableSlot: {
      type: Boolean,
    },

    // 是否显示操作
    isOperation: {
      type: Boolean,
      default: true,
    },

    // 分页
    pagination: {
      type: Object,
      default: () => {},
    },

    // form表单
    form: {
      type: Object,
      default: () => {},
    },

    // form表单
    colLayout: {
      type: Object,
      default: () => {},
    },

    disabled: {
      type: Boolean,
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  components: {
    DForm,
    DTable,
  },
  created() {
    this.formValue = getFormValue(this.formItem);
    this.defaultValue = getFormValue(this.formItem);
  },
  data() {
    return {
      formValue: {},
      defaultValue: {},
    };
  },
  methods: {
    columnProp(prop) {
      return "column_" + prop;
    },
    sizeChange(value) {
      this.$emit("size-change", value);
    },
    currentChange(value) {
      this.$emit("current-change", value);
    },
    search() {
      let tempObj = filterNullStrUndefind(this.formValue);
      this.$emit("search", tempObj);
    },
    reset(formValue, defaultValue, search) {
      for (const prop in defaultValue) {
        formValue[prop] = defaultValue[prop];
      }
      typeof search === "function" && search(formValue);
    },
  },
};
</script>


<style lang="scss" scoped>
.d-table-page {
  display: flex;
  flex-direction: column;
  .d-form{
    max-height: 300px;
  }
  .d-table {
    flex: 1;
    height: 0;
  }
}
</style>
