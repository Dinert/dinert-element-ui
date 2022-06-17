<template>
  <div class="d-table">
    <div class="d-table-header" v-if="showHeader">
      <div class="d-table-header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="d-table-header-right">
        <el-button-group>
          <el-button :type="isAllData ? 'primary' : 'default'" @click="allShow"
            >全部显示
          </el-button>
          <el-popover :teleported="false">
            <template #reference>
              <el-button :type="!isAllData ? 'primary' : undefined">
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
            <recuve-table-column :tableColumn="column" :key="column.prop">
              <template slot-scope="scope">
                <slot v-bind="scope"></slot>
              </template>
            </recuve-table-column>
          </template>
        </template>
        <template v-else>
          <template v-for="column in tableColumns">
            <recuve-table-column :tableColumn="column" :key="column.prop">
              <template slot-scope="scope">
                <slot v-bind="scope" :name="columnProp(scope.prop)"></slot>
              </template>
            </recuve-table-column>
          </template>
        </template>
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
  background-color: var(--el-bg-color);
  border-radius: var(--el-bg-radius);
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

    .el-pagination {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>