import { defineStore } from 'pinia'

import { getPageListData } from '@/service/api/public'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userList: []
    }
  },
  actions: {
    async getPageListAction(payload: any) {
      const { type, queryInfo } = payload
      console.log(payload)
      const result = await getPageListData(type)
      this.userList = result.data
      console.log(result)
    },
    async getPageListByQuery(payload: any) {}
  }
})
