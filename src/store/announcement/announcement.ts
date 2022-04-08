import { defineStore } from 'pinia'

import { createPageData } from '@/service/api/public'

export const useAnnouncementStore = defineStore('announcement', {
  state: () => {
    return {
      announcement: {}
    }
  },
  actions: {
    async create(payload: any) {
      console.log(payload)
    }
  }
})
