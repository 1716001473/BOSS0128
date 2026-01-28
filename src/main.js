/**
 * 应用入口文件
 * 初始化 Vue 应用和 Pinia 状态管理
 */
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

export function createApp() {
    const app = createSSRApp(App)
    const pinia = createPinia()

    app.use(pinia)

    return {
        app,
        pinia
    }
}
