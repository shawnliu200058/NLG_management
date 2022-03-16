import { defineStore } from 'pinia'

export const useGoodStore = defineStore('good', {
  state: () => {
    return {
      categoryList: [],
      goodList: []
    }
  },
  getters: {
    categoryCount(state) {
      return state.categoryList.length
    }
  },
  actions: {}
})
