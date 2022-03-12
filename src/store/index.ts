import { defineStore } from 'pinia'

import { useLoginStore } from './login/login'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
  // other options...
  state: () => {
    return {}
  },
  actions: {}
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
