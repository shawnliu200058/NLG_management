<template>
  <div class="user">
    <el-card>
      <page-search
        :search-form-config="searchFormConfig"
        @queryBtnClick="handleQueryClick"
      />
    </el-card>

    <div class="content">
      <el-card>
        <basic-table :list-data="userList" :prop-list="propList">
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
          <template #operation>
            <el-button type="primary" icon="Edit" circle />
            <el-button type="danger" icon="Delete" circle />
          </template>
        </basic-table>
      </el-card>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/store/user/user'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig, propList } from './config/content.config'
import PageSearch from '@/components/page-search/page-search.vue'
import BasicTable from '@/basic-ui/Table'

export default defineComponent({
  components: {
    PageSearch,
    BasicTable
  },
  setup() {
    const userStore = useUserStore()

    const getPageData = (queryInfo: any = {}) => {
      userStore.getPageListAction({
        type: 'user',
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo
        }
      })
    }

    // 首次进入页面获取用户列表
    getPageData()
    const { userList } = storeToRefs(userStore)

    // 模糊搜索获取用户列表
    const handleQueryClick = (queryInfo: any = {}) => {
      getPageData(queryInfo)
    }

    return {
      searchFormConfig,
      userList,
      propList,
      handleQueryClick
    }
  }
})
</script>

<style lang='less' scoped>
.content {
  border-top: 20px solid #f5f5f5;
}
</style>