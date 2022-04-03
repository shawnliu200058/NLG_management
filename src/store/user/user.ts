import { defineStore } from 'pinia'

import { getPageListData, editPageData } from '@/service/api/public'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userList: []
    }
  },
  getters: {
    userCount(state) {
      return state.userList.length
    }
  },
  actions: {
    async getPageListAction(payload: any) {
      const { pageName, queryInfo } = payload
      console.log(payload)
      const result = await getPageListData(pageName, queryInfo)
      this.userList = result.data
      console.log(result)
    },
    async editPageDataAction(payload: any) {
      const { pageName, editData, id } = payload
      const result = await editPageData(pageName, id, editData)
      console.log(result)

      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          limit: 10
        }
      })
    }
  }
})
