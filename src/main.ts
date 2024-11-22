import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import Packages from '../packages/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 启用 Vue3 Composition API
Vue.use(VueCompositionAPI)
Vue.use(ElementUI)
Vue.use(Packages)

new Vue({
    render: h => h(App)
}).$mount('#app')
