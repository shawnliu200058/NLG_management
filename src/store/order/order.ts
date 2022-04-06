import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      orderList: [],
      orderCount: 0
    }
  }
})
