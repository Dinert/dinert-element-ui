<template>
  <div class="d-table">
    <div class="d-table-header" v-if="showHeader">
      <div class="d-table-header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="d-table-header-right">
        <el-button-group>
          <el-button :type="isAllData ? 'primary' : 'default'" @click="allShow" :disabled="disabled"
            >全部显示
          </el-button>
          <el-popover trigger="hover">
            <template>
              <el-button
                :type="!isAllData ? 'primary' : undefined"
                slot="reference"
                :disabled="disabled"
              >
                分类显示
                <i class="el-icon-arrow-down"></i>
              </el-button>
            </template>
            <ul class="el-popover-classify">
              <li v-for="column in table.tableColumn" :key="column.prop">
                <el-checkbox-group
                  v-model="classfiyData"
                  @change="checkboxGroupChange"
                >
                  <el-checkbox
                    :label="column.label"
                    :name="column.prop"
                    :disabled="column.disabled"
                  />
                </el-checkbox-group>
              </li>
            </ul>
          </el-popover>
        </el-button-group>
      </div>
    </div>
    <div class="d-table-body">
      <el-table
        v-bind="{
          data: [],
          height: '100%',
          border: true,
          showHeader: true,
          key: false,
          ...table,
        }"
        v-on="{ ...table.on }"
      >
        <template v-if="tableSlot">
          <template v-for="column in tableColumns">
            <template v-if="column.type !== 'selection'">
              <recuve-table-column :tableColumn="column" :key="column.prop">
                <template slot-scope="scope">
                  <slot v-bind="scope"></slot>
                </template>
              </recuve-table-column>
            </template>
            <template v-else>
              <el-table-column
                v-bind="column"
                :key="column.type"
              ></el-table-column>
            </template>
          </template>
        </template>
        <template v-else>
          <template v-for="column in tableColumns">
            <template v-if="column.type !== 'selection'">
              <recuve-table-column :tableColumn="column" :key="column.prop">
                <template slot-scope="scope">
                  <slot v-bind="scope" :name="columnProp(scope.prop)"></slot>
                </template>
              </recuve-table-column>
            </template>
            <template v-else>
              <el-table-column
                v-bind="column"
                :key="column.type"
              ></el-table-column>
            </template>
          </template>
        </template>
      </el-table>
    </div>
    <div class="d-table-footer" v-if="showFooter && isTableData">
      <el-pagination
        v-bind="{
          disabled: disabled,
          currentPage: 1,
          pageSize: 15,
          pageSizes: [15, 30, 50, 70, 100],
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          total: 100,
          ...pagination,
        }"
        v-on="{
          'size-change': sizeChange,
          'current-change': currentChange,
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
          on: {},
          tableColumn: [],
        };
      },
    },
    tableSlot: {
      type: Boolean,
    },


    disabled: {
      type: Boolean,
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
  created() {
    this.getClassfiyData();
    this.filterTableColumns();
  },
  data() {
    return {
      classfiyData: [],
      tableColumns: [],
    };
  },
  computed: {
    isAllData() {
      return this.table.tableColumn.length === this.tableColumns.length;
    },
    isTableData() {
      return this.table.data && this.table.data.length;
    },
  },
  components: {
    RecuveTableColumn: () =>
      import("./recuve-table-column.vue").then(
        (component) => component.default
      ),
  },
  methods: {
    // sizeChange
    sizeChange(value) {
      this.$emit("size-change", value);
    },

    // currentChange
    currentChange(value) {
      this.$emit("current-change", value);
    },

    // column的prop
    columnProp(prop) {
      return "column_" + prop;
    },

    // 过滤表格的数据
    filterTableColumns() {
      this.tableColumns = this.table.tableColumn.filter((item) => {
        if (this.classfiyData.includes(item.label)) {
          return item;
        }
      });
      this.table.key = !this.table.key;
    },

    // 过滤显示
    checkboxGroupChange() {
      this.filterTableColumns();
    },

    // 全部显示
    allShow() {
      this.classfiyData = [];
      this.getClassfiyData();
    },
    // 分类显示
    getClassfiyData() {
      for (const prop of this.table.tableColumn) {
        this.classfiyData.push(prop.label);
      }
      this.table.key = !this.table.key;
    },
  },
};
</script>

<style lang="scss" scoped>
.d-table {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-sizing: border-box;

  .d-table-header {
    text-align: right;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;

    ::v-deep(.el-popover) {
      .el-popover-classify li .el-checkbox {
        width: 100%;
        line-height: 24px;
        height: 24px;
      }
    }

    .d-table-header-left {
    }
  }

  .d-table-body {
    flex: 1;
    height: 0;

    .el-table {
      ::v-deep(.cell > div) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .d-table-footer {
    display: flex;
    margin-top: 16px;

    .el-pagination {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>