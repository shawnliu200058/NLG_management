<template>
  <div class="category-list">
    <el-card>
      <basic-table
        :list-data="categoryList"
        :prop-list="categoryPropList"
        :show-index-column="false"
      >
        <template #headerHandler>
          <el-button type="primary">新建分类</el-button>
        </template>
        <template #goods="scope">
          {{ scope.row.goods[0].id ? scope.row.goods.length : 0 }}
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
            icon="Edit"
            circle
            @click="handleEditData(scope.row)"
          />
          <el-button type="danger" icon="Delete" circle />
        </template>
      </basic-table>
    </el-card>

    <page-modal
      :modal-config="categoryModalConfig"
      :default-info="defaultInfo"
      page-name="user"
      title="编辑分类"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'

import BasicTable from '@/basic-ui/Table'
import PageModal from '@/components/page-modal/page-modal.vue'

import { usePublicStore } from '@/store'
import { useGoodStore } from '@/store/good/good'

import { categoryPropList } from './config/content.config'
import { categoryModalConfig } from './config/modal.config'

import {
  handleEditData,
  defaultInfo,
  pageModalRef
} from '@/hooks/use-page-modal'

export default defineComponent({
  components: {
    BasicTable,
    PageModal
  },
  setup() {
    const handleClick = () => {
      console.log('click')
    }

    const publicStore = usePublicStore()
    const goodStore = useGoodStore()

    const getPageData = (queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName: 'category',
        queryInfo: {
          offset: 0,
          limit: 10,
          ...queryInfo
        }
      })
    }

    const { categoryList, categoryCount } = storeToRefs(goodStore)
    if (!categoryCount.value) getPageData()

    return {
      handleClick,
      categoryList,
      categoryPropList,
      categoryModalConfig,
      handleEditData,
      defaultInfo,
      pageModalRef
    }
  }
})
</script>

<style lang='less' scoped>
</style>