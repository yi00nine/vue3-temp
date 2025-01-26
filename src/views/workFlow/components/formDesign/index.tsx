import { defineComponent, ref, computed, watch } from 'vue'
import { Layout, Tooltip, Modal } from 'ant-design-vue'

import { VueDraggable } from 'vue-draggable-plus'
import { baseComponents } from '@/views/workFlow/common/form/componentConfigExport'
const { Sider, Content } = Layout
import styles from './styles.module.less'
import Icon from '@/components/Icon'
import { useFormSettingsStore } from '@/store/modules/design'
import { storeToRefs } from 'pinia'
import FormDesignRender from '@/views/workFlow/common/form/formDesignRender'
import FormComponentConfig from '@/views/workFlow/common/form/FormComponentConfig'
import { isEmptyObject } from '@/utils'
import { FormItem } from '@/store/modules/design'
import FormRender from '../../common/form/FormRender'
const formSettingsStore = useFormSettingsStore()
const { design } = storeToRefs(formSettingsStore)

const isStart = ref(false)
// todo
const formValue = ref<any>({})

const isModalVisible = ref(false)
const clone = (element: Record<'name' | 'id', string>) => {
  const getId = () => {
    return (
      'field' +
      (Math.floor(Math.random() * (99999 - 10000)) + 10000).toString() +
      new Date().getTime().toString().substring(5)
    )
  }
  element.id = getId()
  return JSON.parse(JSON.stringify(element))
}

const handleSelectFormItem = (item: FormItem) => {
  formSettingsStore.selectFormItem = item
}

const selectFormItem = computed(() => {
  return formSettingsStore.selectFormItem
})

export default defineComponent({
  name: 'FormDesign',
  setup() {
    return () => (
      <Layout class={styles.layout}>
        <Sider width={300} class={styles.componentsSider}>
          <div class={styles.componentsSiderContent}>
            <div class={styles.componentsNav}>组件库</div>
            <div>
              {baseComponents.map((group, i) => (
                <div class={styles.components} key={i}>
                  <p class={styles.componentsTitle}>{group.name}</p>
                  <div>
                    <VueDraggable
                      class={styles.drag}
                      ghostClass="ghost"
                      v-model={group.components}
                      sort={false}
                      clone={clone}
                      group={{ name: 'form', pull: 'clone', put: false }}
                      onStart={() => (isStart.value = true)}
                      onEnd={() => (isStart.value = false)}
                    >
                      {group.components.map((component, index) => {
                        return (
                          <div class={styles.dragItem} key={index}>
                            <Icon
                              class={styles.dragItemIcon}
                              name={component.icon}
                            />
                            <span>{component.title}</span>
                          </div>
                        )
                      })}
                    </VueDraggable>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Sider>

        <Content style="min-width: 400px; background: #fff">
          <div class={styles.toolNav}>
            <div class={styles.toolNavItem}>
              <Tooltip title="撤销">
                <div class={styles.icon}>
                  <Icon name="UndoOutlined" />
                </div>
              </Tooltip>
              <Tooltip title="恢复">
                <div class={styles.icon}>
                  <Icon name="RedoOutlined" />
                </div>
              </Tooltip>
            </div>
            <div class={styles.toolNavItem}>
              <Tooltip title="预览表单">
                <div
                  class={styles.icon}
                  onClick={() => (isModalVisible.value = true)}
                >
                  <Icon name="EyeOutlined" />
                </div>
              </Tooltip>
              <Tooltip title="移动端">
                <div class={styles.icon}>
                  <Icon name="MobileOutlined" />
                </div>
              </Tooltip>
              <Tooltip title="pc端">
                <div class={styles.icon}>
                  <Icon name="WindowsOutlined" />
                </div>
              </Tooltip>
            </div>
          </div>
          <div class={styles.workForm}>
            <div class={styles.form}>
              {!isStart.value && design.value.formItems.length === 0 && (
                <div class={styles.tip}> 👈 请在左侧选择控件并拖至此处</div>
              )}
            </div>
            <VueDraggable
              class={styles.dragForm}
              v-model={design.value.formItems}
              animation={300}
              group="form"
              ghostClass="ghost"
            >
              {design.value.formItems.map((item, index) => {
                return (
                  <div
                    class={styles.formItem}
                    key={item.id}
                    onClick={() => handleSelectFormItem(item)}
                  >
                    <div class={styles.formItemHeader}>
                      <p>
                        {item.props.required && <span>*</span>}
                        {item.title}
                      </p>
                      <div class={styles.formItemOption}>
                        <Icon name="DeleteOutlined" />
                      </div>
                      <FormDesignRender config={item} />
                    </div>
                  </div>
                )
              })}
            </VueDraggable>
          </div>
        </Content>

        <Sider width={300} style="background: #fff">
          {isEmptyObject(selectFormItem.value) ? (
            <div class={styles.rightTip}>😀 选中控件后在这里进行编辑</div>
          ) : (
            <div class={styles.rightContent}>
              <FormComponentConfig />
            </div>
          )}
        </Sider>

        <Modal
          title="表单预览"
          visible={isModalVisible.value}
          onCancel={() => (isModalVisible.value = false)}
          footer={null}
        >
          <FormRender
            v-model:value={formValue.value}
            forms={design.value.formItems}
          ></FormRender>
        </Modal>
      </Layout>
    )
  }
})
