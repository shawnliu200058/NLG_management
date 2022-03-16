<template>
  <div class="user-list">
    <el-card>
      <page-search
        :search-form-config="searchFormConfig"
        @queryBtnClick="handleQueryClick"
      />
    </el-card>

    <div class="content">
      <el-card>
        <basic-table
          :list-data="userList"
          :prop-list="propList"
          :show-index-column="false"
        >
          <template #headerHandler>
            <el-button type="primary">新建用户</el-button>
          </template>
          <template #gender="scope">
            {{ scope.row.gender ? '女' : '男' }}
          </template>
          <template #avatarUrl="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.avatarUrl"
              fit="cover"
              :preview-src-list="[scope.row.avatarUrl]"
            ></el-image>
          </template>
          <template #createdAt="scope">
            {{ $filters.formatTime(scope.row.createdAt) }}
          </template>
          <template #updatedAt="scope">
            {{ $filters.formatTime(scope.row.uodatedAt) }}
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
    </div>

    <page-modal
      :modal-config="modalConfig"
      :default-info="defaultInfo"
      page-name="user"
      title="编辑用户"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { usePublicStore } from '@/store'
import { useUserStore } from '@/store/user/user'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig, propList } from './config/content.config'
import { modalConfig } from './config/modal.config'

import PageSearch from '@/components/page-search/page-search.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import BasicTable from '@/basic-ui/Table'

import {
  handleEditData,
  defaultInfo,
  pageModalRef
} from '@/hooks/use-page-modal'

export default defineComponent({
  components: {
    PageSearch,
    PageModal,
    BasicTable
  },
  setup() {
    const publicStore = usePublicStore()
    const userStore = useUserStore()

    const getPageData = (queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName: 'user',
        queryInfo: {
          offset: 0,
          limit: 10,
          ...queryInfo
        }
      })
    }

    // 首次进入页面获取用户列表
    const { userList, userCount } = storeToRefs(userStore)
    if (!userCount.value) getPageData()

    // 模糊搜索获取用户列表
    const handleQueryClick = (queryInfo: any = {}) => {
      getPageData(queryInfo)
    }

    return {
      searchFormConfig,
      modalConfig,
      userList,
      propList,
      handleQueryClick,
      handleEditData,
      defaultInfo,
      pageModalRef
    }
  }
})
</script>

<style lang='less' scoped>
.content {
  border-top: 20px solid #f5f5f5;
}
</style>