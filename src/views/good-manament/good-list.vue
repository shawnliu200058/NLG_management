<template>
  <div class="category-list">
    <el-card>
      <basic-table
        :list-data="goodList"
        :prop-list="goodPropList"
        :show-index-column="false"
        v-model:page="pageInfo"
        :total-count="goodCount"
      >
        <template #headerHandler>
          <basic-select
            page-name="category"
            @selection-change="selectionChange"
          />
        </template>

        <template #price="scope">
          {{ scope.row.price.toFixed(2) }}
        </template>
        <template #displayPicUrl="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.displayPicUrl"
            fit="cover"
          ></el-image>
        </template>

        <template #createdAt="scope">
          {{ $filters.formatTime(scope.row.createdAt) }}
        </template>

        <template #operation="scope">
          <el-button type="text" @click="goGoodDetail(scope.row.id)"
            >详情</el-button
          >
          <el-button type="text" @click="handleGoodStatus(scope.row)">{{
            scope.row.status ? '下架' : '上架'
          }}</el-button>
          <!-- <el-button
            type="danger"
            icon="Delete"
            circle
            @click="handleDelClick(scope.row)"
          /> -->
          <el-button type="text" @click="handleDelClick(scope.row)"
            >删除</el-button
          >
        </template>
      </basic-table>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'

import BasicTable from '@/basic-ui/Table'
import BasicSelect from '@/basic-ui/Select'
import PageModal from '@/components/page-modal/page-modal.vue'

import { usePublicStore } from '@/store'
import { useGoodStore } from '@/store/good/good'
import { changeGoodStatus } from '@/service/api/good/good'

import { goodPropList } from './config/content.config'

import router from '@/router/index'

import {
  handleNewData,
  handleEditData,
  defaultInfo,
  pageModalRef
} from '@/hooks/use-page-modal'
import msgConfirm from '@/hooks/use-msg-confirm'

export default defineComponent({
  components: {
    BasicTable,
    BasicSelect,
    PageModal
  },
  setup() {
    const publicStore = usePublicStore()
    const goodStore = useGoodStore()

    const pageName = 'good'
    const pageInfo = reactive({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    // console.log(pageInfo)

    const getPageData = (queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName,
        queryInfo: {
          offset: (pageInfo.currentPage - 1) * pageInfo.pageSize,
          limit: pageInfo.pageSize,
          // 其他查询条件
          ...queryInfo
        }
      })
    }

    const { goodList, goodCount } = storeToRefs(goodStore)
    getPageData()

    // el-select的值发生变化时触发
    const selectionChange = (id: any) => {
      // console.log(id)
      getPageData({ categoryId: id })
    }

    const handleGoodStatus = (goodInfo: any) => {
      // console.log(goodInfo.id, goodInfo.status)
      const { status } = goodInfo
      if (status) {
        msgConfirm('是否下架该商品', changeStatus, goodInfo, '下架')
      } else {
        msgConfirm('是否上架该商品', changeStatus, goodInfo, '上架')
      }
    }

    const changeStatus = (goodInfo: any) => {
      // console.log(goodInfo.id, goodInfo.status)
      const { id, status } = goodInfo
      changeGoodStatus(id, status).then((res) => {
        getPageData()
      })
    }

    // let list = reactive<any>([])
    // watch(
    //   goodList,
    //   (newVal) => {
    //     // console.log(newVal)
    //     list.length = 0
    //     newVal.forEach((item: any) => {
    //       list.push(item)
    //     })
    //     // console.log(list)
    //   },
    //   { deep: true, immediate: true }
    // )
    // // el-select的值发生变化时触发
    // const selectionChange = (id: any) => {
    //   console.log(id)
    //   if (id) {
    //     list.length = 0
    //     goodList.value.forEach((item: any) => {
    //       if (id === item.category_id) list.push(item)
    //     })
    //   } else {
    //     goodList.value.forEach((item: any) => {
    //       list.push(item)
    //     })
    //   }
    //   // console.log(list)
    // }

    const delAction = (item?: any) => {
      publicStore.delPageDataAction({
        pageName,
        id: item.id
      })
    }

    const handleDelClick = (item: any) => {
      // console.log(item)
      msgConfirm('是否删除该商品', delAction, item)
    }

    const goGoodDetail = (goodId: number) => {
      const { currentPage, pageSize } = pageInfo
      router.push({
        path: 'good-detail/' + goodId,
        query: { currentPage, pageSize }
      })
    }

    return {
      goodList,
      goodPropList,
      pageInfo,
      goodCount,
      selectionChange,
      handleNewData,
      handleEditData,
      handleDelClick,
      handleGoodStatus,
      goGoodDetail
    }
  }
})
</script>

<style lang='less' scoped>
</style>