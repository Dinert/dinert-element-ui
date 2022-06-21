<template>
  <el-table-column v-bind="filterColumn(tableColumn)">
    <template  v-if="tableColumn.type !== 'selection'">
        <template slot-scope="scope" >
        <slot v-bind="scope" :data="tableColumn" :prop="tableColumn.prop">{{
          scope.row[tableColumn.prop]
        }}</slot>
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
  },
  data() {
    return {};
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
  },
};
</script>

<style lang="scss" scoped>
</style>