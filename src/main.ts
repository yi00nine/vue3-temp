import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router/index'
import './styles/base.less'
createApp(App).use(Antd).use(router).mount('#app')
