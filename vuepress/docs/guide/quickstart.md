
# 快速开始

本节将介绍如何在项目中使用 <el-link type="primary" :underline="false" href="https://github.com/Dinert/dinert-element-ui">Dinert Element UI</el-link>


  <el-button type="primary" size="small" icon="el-icon-link" target="_blank">
    在线演示
  </el-button>

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.js
import Vue from 'vue'
import '@dinert/element-ui/style'
import DinertComponents from '@dinert/element-ui'
import ElementUI from 'element-ui'


Vue.use(ElementUI)
Vue.use(DinertComponents)
```

### 手动导入

> App.vue
>
```html
<!-- <template>
  <dinert-table-page>

  </dinert-table-page>
</template>
<script setup lang="ts">
  import { DinertTablePage } from '@dinert/element-plus'
  import '@dinert/element-plus/style'

  export default {
    components: { DinertTablePage },
  }
</script> -->
```