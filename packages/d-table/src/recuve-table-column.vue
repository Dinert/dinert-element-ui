<template>
  <el-table-column v-bind="filterColumn(tableColumn)">
    <template slot-scope="scope">
      <slot v-bind="scope" :data="tableColumn" :prop="tableColumn.prop">{{
        (tableColumn.formatter && tableColumn.formatter(scope, tableColumn, getPropByPath(scope.row, tableColumn.prop))) || getPropByPath(scope.row, tableColumn.prop)
      }}</slot>
    </template>
      <template slot="header" slot-scope="scope">
        <span>{{header(scope)}}</span>
        <span v-if="showSetting(tableColumn.setting)">
          <el-popover placement="bottom-end" :value="popoverValue">
            <svg slot="reference" class="ali-icon operations icon-setting" aria-hidden="true">
              <use
                :xlink:href="`#icon-setting`"
              ></use>
            </svg>
            <ul class="el-popover-classify">
              <li><el-link class="allSelect" :underline="false" type="primary" @click="allShow">全选</el-link></li>
              <draggable v-model="copyTableColumn" @end="dragEnd">
                <li v-for="column in copyTableColumn" :key="column.prop">
                    <template v-if="!column.setting && column.type !== 'selection' && column.type !== 'index'">
                        <el-checkbox
                        :label="column.label"
                        :name="column.prop"
                        v-model="column.checkbox.checked"
                        v-bind="column.checkbox"
                        @change="checkboxChange($event, column)"
                        />
                    </template>
                </li>
              </draggable>
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
import _ from 'lodash'
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
    },
    popoverValue: {
      type: Boolean,
    }
  },
  created() {
    this.copyTableColumn = _.cloneDeep(this.table.tableColumn) 
  },
  data() {
    return {
      settingValue: false,
      copyTableColumn: []
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
   async checkboxChange(checked, column) {
      await this.$emit('checkbox-change', checked, column, this.copyTableColumn)

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

   getPropByPath(obj, path) {
      let tempObj = obj;
      path = path.replace(/\[(\w+)\]/g, '.$1');
      path = path.replace(/^\./, '');

      let keyArr = path.split('.');
      let i = 0;
      for (let len = keyArr.length; i < len - 1; ++i) {
          if (!tempObj) break;
          let key = keyArr[i];
          if (key in tempObj) {
              tempObj = tempObj[key];
          } else {
              return null
              //break;
          }
      }
      return tempObj ? tempObj[keyArr[i]] : null
   },

   dragEnd(event) { // 拖拽完成排序
    this.$emit('drag-end', event, this.copyTableColumn)
   }
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