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

        <template #operation="scope">
          <!-- <el-button
            type="primary"
            icon="Edit"
            circle
            @click="handleEditData(scope.row)"
          /> -->
          <el-button type="text" @click="handleGoodStatus(scope.row)"
            >通过</el-button
          >
          <!-- <el-button
            type="danger"
            icon="Delete"
            circle
            @click="handleDelClick(scope.row)"
          /> -->
          <el-button type="text" @click="handleDelClick(scope.row)"
            >拒绝</el-button
          >
        </template>
      </basic-table>
    </el-card>

    <!-- <page-modal
      :modal-config="categoryModalConfig"
      :default-info="defaultInfo"
      page-name="category"
      title="编辑分类"
      ref="pageModalRef"
    ></page-modal> -->
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
import { changeAuditStatus } from '@/service/api/good/good'

import { goodPropList } from '../config/content.config'

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

    const getPageData = (queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName,
        queryInfo: {
          offset: (pageInfo.currentPage - 1) * pageInfo.pageSize,
          limit: pageInfo.pageSize,
          auditStatus: 0,
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
        msgConfirm('是否审核通过', changeStatus, goodInfo, '操作')
      } else {
        msgConfirm('是否拒绝审核通过', changeStatus, goodInfo, '操作')
      }
    }

    const changeStatus = (goodInfo: any) => {
      // console.log(goodInfo.id, goodInfo.status)
      const { id, status } = goodInfo
      changeAuditStatus(id, status).then((res) => {
        console.log(res)
        // getPageData()
      })
    }

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
      defaultInfo,
      pageModalRef
    }
  }
})
</script>

<style lang='less' scoped>
</style>