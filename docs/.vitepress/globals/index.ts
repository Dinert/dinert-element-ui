import {Plugin, App} from 'vue'

import * as components from './components/index'

const myPlugin: Plugin = {
    install: (app: App) => {
        for (const name in components) {
            app.use((components as any)[name])
        }
    }
}

export default myPlugin
