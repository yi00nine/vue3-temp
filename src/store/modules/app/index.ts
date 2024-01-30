import { defineStore } from 'pinia'

export default defineStore('appStore', {
  state: () => ({
    menuCollapse: false,
    navbar: true,
    menuWidth: 220
  })
})
