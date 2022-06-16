<template>
  <div class="d-table">
    <div class="d-table-header" v-if="showHeader">
      <div class="d-table-header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="d-table-header-right"></div>
    </div>
    <div class="d-table-body">
      <el-table
        v-bind="{
          data: [],
          height: '100%',
          border: true,
          showHeader: true,
          ...table,
        }"
        v-on="{ ...table.on }"
      >
        
      </el-table>
    </div>
    <div class="d-table-footer" v-if="showFooter">
      <el-pagination
        v-bind="{
          currentPage: 1,
          pageSize: 15,
          pageSizes: [15, 30, 50, 70, 100],
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          total: 100,
          ...pagination,
        }"
        v-on="{
          sizeChange,
          currentChange,
          ...pagination.on,
        }"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "DTable",
  props: {
    // 表格头控制栏
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 表格尾部
    showFooter: {
      type: Boolean,
      default: true,
    },
    table: {
      type: Object,
      default: () => {
        return {
          on: {}
        }
      }
    },

    // 分页
    pagination: {
      type: Object,
      default: () => {
        return {
          on: {},
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    sizeChange() {},
    currentChange() {},
  },
};
</script>

<style lang="scss" scoped>
</style>