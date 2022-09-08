<template>
  <el-table-column v-bind="filterColumn(tableColumn)">
    <template slot-scope="scope">
      <slot v-bind="scope" :data="tableColumn" :prop="tableColumn.prop">{{
        (tableColumn.formatter && tableColumn.formatter(scope, tableColumn, scope.row[tableColumn.prop])) || scope.row[tableColumn.prop]
      }}</slot>
    </template>
      <template slot="header" slot-scope="scope">
        <span>{{header(scope)}}</span>
        <span v-if="showSetting(tableColumn.setting)">
          <el-popover trigger="hover" placement="bottom-end">
            <svg slot="reference" class="ali-icon operations icon-setting" aria-hidden="true">
              <use
                :xlink:href="`#icon-setting`"
              ></use>
            </svg>
            <ul class="el-popover-classify">
              <li><el-link class="allSelect" :underline="false" type="primary" @click="allShow">全选</el-link></li>
              <li v-for="column in table.tableColumn" :key="column.prop">
                <template v-if="!column.setting && column.type !== 'selection' && column.type !== 'index'">
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
    onlyClass: {
      type: String
    },
    tableColumn: {
      type: Object,
      default: () => {},
    },
    table: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      settingValue: false
    };
  },
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

    // 分类选择
   async checkboxChange() {
      await this.$emit('checkbox-change')
      // 手动触发mouseenter事件
      const dom = document.querySelector('.' + this.onlyClass + ' .ali-icon.operations.icon-setting')
      dom.dispatchEvent(new Event( 'mouseenter' ));
   },

   // 全选
   allShow() {
    this.$emit('all-show')
   },

   // 是否显示操作按钮
   showSetting(setting) {
      return setting && !this.table.children
   },
  }
};
</script>

<style lang="scss" scoped>
.icon-setting{
  position: absolute; 
  right: 19px; 
  top: 4px; 
  cursor: pointer;
}
.allSelect{
  display: block; 
  border-bottom: 1px solid #dee0e7;
  line-height: 31px; 
  margin-bottom: 8px;
}
.el-popover-classify{
  min-width: 120px;
  li{
        line-height: 22px;
        &:first-child{
          &:hover{
            background-color: unset;
          }
        }
        label{
          display: block;
        }
        &:hover{
          background-color: rgba(#409EFF, .1);
        }
  }
}
</style>