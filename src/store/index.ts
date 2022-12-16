import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: ''
  }),
  actions: {
    async login(data: any) {
      // todo
    }
  }
})
