import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router/index'
import pinia from './store'
import './styles/base.less'
createApp(App).use(Antd).use(router).use(pinia).mount('#app')
