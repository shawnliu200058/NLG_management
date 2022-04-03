import { defineStore } from 'pinia'
import { getPageListData } from '@/service/api/public'
import { editPageData } from '@/service/api/public'

import { useLoginStore } from './login/login'
import { useUserStore } from './user/user'
import { useGoodStore } from './good/good'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const usePublicStore = defineStore('public', {
  state: () => {
    return {}
  },
  actions: {
    async getPageListAction(payload: any) {
      // console.log(payload)
      const { pageName, queryInfo } = payload
      const result = await getPageListData(pageName, queryInfo)
      console.log(result)
      if (pageName === 'user') useUserStore().userList = result.data
      else if (pageName === 'category')
        useGoodStore().categoryList = result.data
      else if (pageName === 'good') useGoodStore().goodList = result.data
    },
    async editPageDataAction(payload: any) {
      console.log(payload)
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

export function setupStore() {
  const login = useLoginStore()
  login.loadLocalData()
}

// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
