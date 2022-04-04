import { defineStore } from 'pinia'
import {
  getPageListData,
  createPageData,
  editPageData,
  delPageData
} from '@/service/api/public'

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
    async createPageDataAction(payload: any): Promise<any> {
      console.log(payload)
      const { pageName, newData } = payload
      const result = await createPageData(pageName, newData)
      const { insertId } = result.data
      // console.log(result)

      // this.getPageListAction({
      //   pageName,
      //   queryInfo: {
      //     offset: 0,
      //     limit: 10
      //   }
      // })

      return insertId
    },
    async editPageDataAction(payload: any) {
      // console.log(payload)
      const { pageName, editData, id } = payload
      const result = await editPageData(pageName, id, editData)
      // console.log(result)

      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          limit: 10
        }
      })
    },
    async delPageDataAction(payload: any) {
      console.log(payload)
      const { pageName, id } = payload
      const result = await delPageData(pageName, id)
      // console.log(result)

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
