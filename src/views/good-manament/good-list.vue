<template>
  <div class="category-list">
    <el-card>
      <basic-table
        :list-data="list"
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
          <el-button
            type="danger"
            icon="Delete"
            circle
            @click="handleDelClick(scope.row)"
          />
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

import { goodPropList } from './config/content.config'

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
          ...queryInfo
        }
      })
    }

    const { goodList, goodCount } = storeToRefs(goodStore)
    if (goodCount.value === 0) getPageData()

    let list = reactive<any>([])
    watch(
      goodList,
      (newVal) => {
        // console.log(newVal)
        list.length = 0
        newVal.forEach((item: any) => {
          list.push(item)
        })
        // console.log(list)
      },
      { deep: true, immediate: true }
    )
    // el-select的值发生变化时触发
    const selectionChange = (id: any) => {
      // console.log(id)
      if (id) {
        list.length = 0
        goodList.value.forEach((item: any) => {
          if (id === item.category_id) list.push(item)
        })
      } else {
        goodList.value.forEach((item: any) => {
          list.push(item)
        })
      }
      // console.log(list)
    }

    const delAction = (item?: any) => {
      publicStore.delPageDataAction({
        pageName,
        id: item.id
      })
    }

    const handleDelClick = (item: any) => {
      // console.log(item)
      msgConfirm('商品', delAction, item)
    }

    return {
      goodList,
      list,
      goodPropList,
      pageInfo,
      goodCount,
      selectionChange,
      handleNewData,
      handleEditData,
      handleDelClick,
      defaultInfo,
      pageModalRef
    }
  }
})
</script>

<style lang='less' scoped>
</style>