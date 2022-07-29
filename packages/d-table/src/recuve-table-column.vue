<template>
  <el-table-column v-bind="filterColumn(tableColumn)">
    <template slot-scope="scope">
      <slot v-bind="scope" :data="tableColumn" :prop="tableColumn.prop">{{
        (tableColumn.formatter && tableColumn.formatter(scope, tableColumn, scope.row[tableColumn.prop])) || scope.row[tableColumn.prop]
      }}</slot>
    </template>
      <template slot="header" slot-scope="scope">
        <span>{{header(scope)}}</span>
        <span v-if="scope.column.property === 'operations' && !table.children">
          <el-popover trigger="hover" placement="bottom-end">
            <svg slot="reference" class="ali-icon" aria-hidden="true" style="position: absolute; right: 19px; top: 4px; cursor: pointer;">
              <use
                :xlink:href="`#icon-setting`"
              ></use>
            </svg>
            <ul class="el-popover-classify">
              <li v-for="column in table.tableColumn" :key="column.prop">
                <template v-if="column.prop !== 'operations' && column.type !== 'selection' && column.type !== 'index'">
                    <el-checkbox
                      :label="column.label"
                      :name="column.prop"
                      v-model="column.checkbox.checked"
                      v-bind="column.checkbox"
                      @change="checkboxChange"
                    />
                </template>
              </li>
            </ul>
          </el-popover>
        </span>
      </template>
    <template v-if="tableColumn.children && tableColumn.children.length">
      <template v-for="item in tableColumn.children">
        <recuve-table-column :key="item.prop" :tableColumn="item">
          <template slot-scope="scope">
            <slot v-bind="scope"></slot>
          </template>
        </recuve-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "RecuveTableColumn",
  props: {
    tableColumn: {
      type: Object,
      default: () => {},
    },
    table: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      popoverModel: false
    };
  },
  computed: {},
  methods: {
    filterColumn(column) {
      const obj = {};
      for (const prop in column) {
        if (prop !== "children") {
          obj[prop] = column[prop];
        }
      }
      return obj;
    },
    header(scope){
      return scope.column.label;
    },
   checkboxChange() {
    this.$emit('checkbox-change')
   }
  },
  watch: {
    'table.key': {
      handler() {
        console.log('aa')
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
    .el-popover-classify li{
      line-height: 22px;
      label{
        display: block;
      }
      &:hover{
        background-color: rgba(#409EFF, .1);
      }
    }
</style>