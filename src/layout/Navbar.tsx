import { defineComponent, reactive } from 'vue'
import { TranslationOutlined } from '@ant-design/icons-vue'
import styles from './styles.module.less'
import { layoutStyleConfig, ApplicationInfo } from '../types/constants'
import useLocale from '@/hooks/locale'
import trans from '../assets/zhongwen.png'
import sun from '../assets/Sunny.png'
import moon from '../assets/yueliang.png'
import fullScreen from '../assets/quanping.png'
import setting from '../assets/shezhi.png'

export default defineComponent({
  components: { TranslationOutlined },
  setup() {
    const Icon = ({ url }) => {
      return <img src={url} alt="" />
    }
    const { changeLocale } = useLocale()
    const handleLocaleChange = (locale: string) => {
      changeLocale(locale)
    }
    return () => (
      <div
        class={styles.navbar}
        style={{
          height: layoutStyleConfig.navbarHeight + 'px'
        }}
      >
        <a-space>
          <a-typography>
            <a-typography-title level={3}>
              {ApplicationInfo.appTitle}
            </a-typography-title>
          </a-typography>
        </a-space>
        <a-space>
          <a-dropdown>
            {{
              default: () => (
                <a-button shape="circle">
                  {{ icon: () => <Icon url={trans}></Icon> }}
                </a-button>
              ),
              overlay: () => (
                <a-menu>
                  <a-menu-item onClick={() => handleLocaleChange('zh-CN')}>
                    <div>中文</div>
                  </a-menu-item>
                  <a-menu-item onClick={() => handleLocaleChange('en-US')}>
                    <div>英文</div>
                  </a-menu-item>
                </a-menu>
              )
            }}
          </a-dropdown>
          <a-button shape="circle">
            {{ icon: () => <Icon url={sun}></Icon> }}
          </a-button>
          <a-button shape="circle">
            {{ icon: () => <Icon url={moon}></Icon> }}
          </a-button>
          <a-button shape="circle">
            {{ icon: () => <Icon url={fullScreen}></Icon> }}
          </a-button>
          <a-button shape="circle">
            {{ icon: () => <Icon url={setting}></Icon> }}
          </a-button>
        </a-space>
      </div>
    )
  }
})
