import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router/index'
import pinia from './store'
import i18n from './locale'
import './styles/base.less'
import './styles/index.css'
createApp(App).use(Antd).use(router).use(pinia).use(i18n).mount('#app')
