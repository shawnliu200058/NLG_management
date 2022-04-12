<template>
  <div class="category-list">
    <el-card>
      <basic-table
        :list-data="orderList"
        :prop-list="orderPropList"
        :show-index-column="false"
        v-model:page="pageInfo"
        :total-count="orderCount"
      >
        <template #headerHandler>
          <el-button
            type="primary"
            :loading="downloadLoading"
            @click="handleDownload"
            ><el-icon style="padding-right: 10px"> <document /> </el-icon>导出
            Excel</el-button
          >
        </template>
        <template #total_price="scope">
          ￥{{ scope.row.total_price.toFixed(2) }}
        </template>
        <template #icon_url="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.icon_url"
            fit="cover"
            :preview-src-list="[scope.row.icon_url]"
          ></el-image>
        </template>
        <template #createdAt="scope">
          {{ $filters.formatTime(scope.row.createdAt) }}
        </template>
        <template #updatedAt="scope">
          {{ $filters.formatTime(scope.row.updatedAt) }}
        </template>
        <template #operation="scope">
          <el-button
            type="primary"
            icon="Notebook"
            circle
            @click="goOrderDetail(scope.row.id)"
          />
          <el-button
            type="danger"
            icon="Delete"
            circle
            @click="handleDelClick(scope.row)"
          />
        </template>
      </basic-table>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch, reactive } from 'vue'
import { storeToRefs } from 'pinia'

import BasicTable from '@/basic-ui/Table'
import PageModal from '@/components/page-modal/page-modal.vue'

import { usePublicStore } from '@/store'
import { useOrderStore } from '@/store/order/order'

import { orderPropList } from './config/content.config'

import router from '@/router/index'

// import { formatJson } from '@/utils'
import { ExcelService } from '@/utils/excel'
import { formatUtcString } from '@/utils/date-format'

import {
  handleNewData,
  defaultInfo,
  pageModalRef
} from '@/hooks/use-page-modal'
import msgConfirm from '@/hooks/use-msg-confirm'

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
    watch(pageInfo, () => getPageData())

    const getPageData = (queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName,
        queryInfo: {
          offset: (pageInfo.currentPage - 1) * pageInfo.pageSize,
          limit: pageInfo.pageSize,
          ...queryInfo
        }
      })
    }

    const { orderList, orderCount } = storeToRefs(orderStore)
    if (orderCount.value === 0) getPageData()

    const goOrderDetail = (orderId: number) => {
      router.push({ name: 'OrderDetail', query: { id: orderId } })
    }

    const delAction = (item?: any) => {
      publicStore.delPageDataAction({
        pageName,
        id: item.id
      })
    }

    const handleDelClick = (item: any) => {
      // console.log(item)
      msgConfirm('订单信息', delAction, item)
    }

    let downloadLoading = false
    const handleDownload = () => {
      downloadLoading = true
      // const tHeader = [
      //   'id',
      //   'orderID',
      //   'userName',
      //   'real_name',
      //   'total_price',
      //   'createdAt'
      // ]
      let dataList: Array<any> = []
      dataList.push([
        '编号',
        '订单编号',
        '用户账户',
        '收货人姓名',
        '订单金额',
        '创建时间'
      ])
      orderList.value.forEach((item) => {
        dataList.push([
          item['id'],
          item['orderID'],
          item['userName'],
          item['real_name'],
          item['total_price'],
          formatUtcString(item['createdAt'])
        ])
      })
      // console.log(dataList)
      new ExcelService().exportAsExcelFile(dataList, '订单表')
      downloadLoading = false
    }

    return {
      orderCount,
      orderList,
      orderPropList,
      pageInfo,
      goOrderDetail,
      handleDelClick,
      handleDownload,
      downloadLoading,
      defaultInfo
    }
  }
})
</script>

<style lang='less' scoped>
</style>