<template>
  <div class="category-list">
    <el-card>
      <basic-table
        :list-data="detailList"
        :prop-list="basicPropList"
        :show-index-column="false"
        :show-select-column="false"
        :show-footer="false"
      >
        <template #headerHandler>
          <el-icon :size="16"><paperclip /></el-icon>
          <h5>基本信息</h5>
        </template>
        <template #total_price="scope">
          ￥{{ scope.row.total_price.toFixed(2) }}
        </template>
        <template #createdAt="scope">
          {{ $filters.formatTime(scope.row.createdAt) }}
        </template>
      </basic-table>

      <basic-table
        :list-data="detailList"
        :prop-list="receiverPropList"
        :show-index-column="false"
        :show-footer="false"
        :show-select-column="false"
      >
        <template #headerHandler>
          <el-icon :size="16"><paperclip /></el-icon>
          <h5>收货人信息</h5>
        </template>
      </basic-table>

      <basic-table
        :list-data="goodList"
        :prop-list="goodPropList"
        :show-index-column="false"
        :show-select-column="false"
      >
        <template #headerHandler>
          <el-icon :size="16"><paperclip /></el-icon>
          <h5>商品信息</h5>
        </template>
        <template #displayPicUrl="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.displayPicUrl"
            fit="cover"
          ></el-image>
        </template>
        <template #price="scope">￥{{ scope.row.price.toFixed(2) }} </template>
        <template #subtotal="scope">￥{{ scope.row.subtotal }} </template>
        <template #footer>
          <div style="margin-right: 20px">合计：￥{{ totalPrice }}</div>
        </template>
      </basic-table>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import BasicTable from '@/basic-ui/Table'
import PageModal from '@/components/page-modal/page-modal.vue'

import { usePublicStore } from '@/store'
import { useOrderStore } from '@/store/order/order'

import {
  basicPropList,
  receiverPropList,
  goodPropList
} from './config/content.config'

import {
  handleNewData,
  defaultInfo,
  pageModalRef
} from '@/hooks/use-page-modal'
import msgConfirm from '@/hooks/use-msg-confirm'

import { getPageListData } from '@/service/api/public'

export default defineComponent({
  components: {
    BasicTable,
    PageModal
  },
  setup() {
    const publicStore = usePublicStore()
    const orderStore = useOrderStore()
    const pageName = 'order'

    const pageInfo = reactive({ currentPage: 1, pageSize: 10 })
    // watch(pageInfo, () => getPageData())

    const { orderCount } = storeToRefs(orderStore)

    const route = useRoute()
    // 基本、收货人信息列表
    const detailList = reactive<any>([])
    // 商品信息列表
    let goodList = reactive<any>([])
    // 订单总金额
    let totalPrice = ref(0)
    const getPageData = (queryInfo: any = {}) => {
      getPageListData(pageName, {
        offset: (pageInfo.currentPage - 1) * pageInfo.pageSize,
        limit: pageInfo.pageSize,
        ...queryInfo
      }).then((res) => {
        // console.log(res.data.orderList)
        const { list } = res.data.orderList
        for (const item of list) {
          if (item.id == route.query.id) {
            // console.log(item.total_price)
            totalPrice.value = item.total_price.toFixed(2)
            detailList.push(item)
            // console.log(JSON.parse(item.good_info))
            const goodInfo = JSON.parse(item.good_info)
            goodList.length = 0
            goodInfo.forEach((item: any) => {
              item.subtotal = (item.price * item.count).toFixed(2)
              // console.log(item.subtotal)
              goodList.push(item)
            })
            // console.log(goodList)
            break
          }
        }
      })
    }
    getPageData()

    return {
      orderCount,
      detailList,
      goodList,
      basicPropList,
      receiverPropList,
      goodPropList,
      totalPrice,
      pageModalRef
    }
  }
})
</script>

<style lang='less' scoped>
h5 {
  padding-left: 6px;
}
</style>