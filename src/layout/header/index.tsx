import { defineComponent } from "vue";
import styles from './styles.module.less'

export default defineComponent({
  setup(){
    return ()=>(
      <div class={styles.header}>
        <div class={styles.rightBox}>
          <div class={styles.help}>欢迎回来</div>
          <div class={styles.trim}></div>
          <a-dropdown>
            {{
              default:()=><span>zxb</span>,
              overlay:()=> 
              <a-menu>
                <a-menu-item>
                  <a-button type='link'>退出登陆</a-button>
                </a-menu-item>
                <a-menu-item>
                  <a-button type='link'>修改密码</a-button>
                </a-menu-item>
              </a-menu>
            }}
          </a-dropdown>
        </div>
        
      </div>
    )
  }
})