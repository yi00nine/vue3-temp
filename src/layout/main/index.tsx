import { defineComponent } from "vue";
import styles from './styles.module.less'
import Header from '../header/index'
import Sidebar from '..//sidebar/index'
export default defineComponent({
  components:{Header,Sidebar},
  setup(){
    return () => (
      <div class={styles.main}>
        <div class={styles.sidebarWrapper}>
          <Sidebar></Sidebar>
        </div>
        <div class={styles.mainContent}>
          <Header></Header>
          <div class={styles.content}>
            <router-view></router-view>
          </div>
        </div>
      </div>
    )
  }
})