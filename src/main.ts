import { createApp } from 'vue'
import store from './store/store'
import router from './router/router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import "element-plus/theme-chalk/el-message.css";
import './mock/mockServer.ts'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia()).use(store).use(router).use(ElementPlus).mount('#app')

for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}