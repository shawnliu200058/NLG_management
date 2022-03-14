import { defineStore } from 'pinia'

import { getPageListData } from '@/service/api/public'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userList: []
    }
  },
  actions: {
    async getPageListAction(type: string) {
      const result = await getPageListData(type)
      this.userList = result.data
      console.log(result)
    }
  }
})
