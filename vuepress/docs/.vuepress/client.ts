import { defineClientConfig } from 'vuepress/client'
// import VueCompositionAPI from '@vue/composition-api'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // app.use(VueCompositionAPI)
  },
  setup() {},
  rootComponents: [],
})