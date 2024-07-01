import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import {
  getPageListData,
  createPageData,
  editPageData,
  delPageData
} from '@/service/api/public'

import { useLoginStore } from './login/login'
import { useUserStore } from './user/user'
import { useGoodStore } from './good/good'
import { useOrderStore } from './order/order'

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
      // console.log(queryInfo)

      const result = await getPageListData(pageName, queryInfo)
      console.log(result)
      const { list, totalCount } = result.data[`${pageName}List`]

      if (pageName === 'user') {
        // useUserStore().userList = list
        // useUserStore().userCount = totalCount
        useUserStore().$patch({
          userList: list,
          userCount: totalCount
        })
      } else if (pageName === 'category') {
        useGoodStore().$patch({
          categoryList: list,
          categoryCount: totalCount
        })
        // useGoodStore().categoryList = list
        // useGoodStore().categoryCount = totalCount
      } else if (pageName === 'good') {
        useGoodStore().goodList = list
        useGoodStore().goodCount = totalCount
      } else if (pageName === 'order') {
        useOrderStore().orderList = list
        useOrderStore().orderCount = totalCount
      }
    },
    async createPageDataAction(payload: any): Promise<any> {
      // console.log(payload)
      const { pageName, newData } = payload
      const result = await createPageData(pageName, newData)
      const { insertId } = result.data
      // console.log(result)

      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          limit: 10
        }
      })

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
