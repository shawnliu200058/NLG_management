import { defineStore } from 'pinia'

import {
  createAnnouncement,
  getAnnouncement
} from '@/service/api/announcement/announcement'
import { IAnnouncementState } from './type'

export const useAnnouncementStore = defineStore('announcement', {
  state: () => {
    return {
      announcement: <IAnnouncementState>{}
    }
  },
  actions: {
    async create(payload: any) {
      // console.log(payload)
      await createAnnouncement(payload)
      // 直接等于 payload 会指向其引用
      this.announcement = { ...payload }
    },
    async setContent(payload: any) {
      this.announcement = { ...payload }
    }
  }
})
