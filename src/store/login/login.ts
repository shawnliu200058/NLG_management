import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import { accountLoginReq } from '@/service/api/login/login'
import { IAccount } from '@/service/api/login/type'
import { ILoginState } from './type'

import localCache from '@/utils/cache'
import router from '@/router/index'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      // 必须保证为 string 类型，若 token 不存在则负责空字符串
      token: (localCache.getToken() as string) ?? '',
      adminInfo: localCache.getCache('adminInfo') ?? {}
    }
  },
  actions: {
    async accountLoginAction(payload: IAccount) {
      console.log('执行登录操作', payload)
      const result = await accountLoginReq(payload)
      console.log(result)
      if (!result.data.errMsg) {
        const { id, name, token } = result.data
        // 保存 token
        this.$patch((state: ILoginState) => {
          state.token = token
          state.adminInfo = { id, name }
        })
        // this.token = token
        localCache.setToken(token)
        localCache.setCache('adminInfo', { id, name })
        // 跳到首页
        router.push('/dashboard')
      } else {
        ElMessage.error('用户名或密码错误')
      }
    },
    loadLocalData() {
      const token = localCache.getToken()
      const adminInfo = localCache.getCache('adminInfo')
      // 使用 $patch 可以在一次调用中更新多个状态属性，避免多次更新带来的性能消耗
      this.$patch((state: ILoginState) => {
        state.token = token ?? ''
        state.adminInfo = adminInfo
      })
    }
  }
})
