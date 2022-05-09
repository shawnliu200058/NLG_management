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
          v-model:page="pageInfo"
          :total-count="userCount"
        >
          <!-- <template #headerHandler>
            <el-button type="primary" @click="handleNewData"
              >新建用户</el-button
            >
          </template> -->
          <template #gender="scope">
            {{ scope.row.gender ? '女' : '男' }}
          </template>
          <template #avatarUrl="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.avatarUrl"
              fit="cover"
            >
              <template #error>
                <div class="image-slot">
                  <img
                    src="@/assets/img/mmexport02d1443711db4c6508cc18aca6ebf25f.png"
                  />
                </div> </template
            ></el-image>
          </template>
          <template #createdAt="scope">
            {{ $filters.formatTime(scope.row.createdAt) }}
          </template>
          <template #updatedAt="scope">
            {{ $filters.formatTime(scope.row.uodatedAt) }}
          </template>
          <template #operation="scope">
            <!-- <el-button
              type="primary"
              icon="Edit"
              circle
              @click="handleEditData(scope.row)"
            /> -->
            <el-button type="primary" icon="Notebook" circle />
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
import { defineComponent, reactive, watch } from 'vue'
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
  handleNewData,
  handleEditData,
  defaultInfo,
  pageModalRef
} from '@/hooks/use-page-modal'
import msgConfirm from '@/hooks/use-msg-confirm'

export default defineComponent({
  components: {
    PageSearch,
    PageModal,
    BasicTable
  },
  setup() {
    const publicStore = usePublicStore()
    const userStore = useUserStore()
    const pageName = 'user'
    const defaultAvatar =
      '@/assets/img/mmexport02d1443711db4c6508cc18aca6ebf25f.png'

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

    // 首次进入页面获取用户列表
    const { userList, userCount } = storeToRefs(userStore)
    if (userCount.value === 0) getPageData()

    // 模糊搜索获取用户列表
    const handleQueryClick = (queryInfo: any = {}) => {
      getPageData(queryInfo)
    }

    const delAction = (item?: any) => {
      publicStore.delPageDataAction({
        pageName,
        id: item.id
      })
    }

    const handleDelClick = (item: any) => {
      // console.log(item)
      msgConfirm('是否删除该用户', delAction, item)
    }

    return {
      searchFormConfig,
      modalConfig,
      pageInfo,
      userCount,
      userList,
      propList,
      handleQueryClick,
      handleNewData,
      handleEditData,
      handleDelClick,
      defaultInfo,
      pageModalRef,
      defaultAvatar
    }
  }
})
</script>

<style lang='less' scoped>
.content {
  border-top: 20px solid #f5f5f5;
}
</style>