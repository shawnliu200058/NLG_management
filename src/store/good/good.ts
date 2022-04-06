import { defineStore } from 'pinia'

export const useGoodStore = defineStore('good', {
  state: () => {
    return {
      categoryList: [],
      categoryCount: 0,
      goodList: [],
      goodCount: 0
    }
  },
  // getters: {
  //   categoryCount(state) {
  //     return state.categoryList.length
  //   },
  //   goodsCount(state) {
  //     return state.goodList.length
  //   }
  // },
  actions: {}
})
