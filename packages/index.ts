
import Plugin from '@vue/composition-api'
import * as components from './components/index'
export * from './components/index'
import {App} from '@vue/composition-api'
const myPlugin: typeof Plugin = {
    install: (app: Partial<App>) => {
        for (const name in components) {
            app.use && app.use(components[name])
        }
    }
}

export default myPlugin
