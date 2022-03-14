<template>
  <div class="user">
    <el-card>
      <page-search :search-form-config="searchFormConfig" />
    </el-card>

    <div class="content">
      <el-card>
        <basic-table :list-data="userList" :prop-list="propList">
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
        </basic-table>
      </el-card>
      <!-- <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="openid" label="openid" width="180" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="gender" label="性别">
          <template #default="scope">{{
            scope.row.gender ? '女' : '男'
          }}</template>
        </el-table-column>
        <el-table-column prop="avatarUrl" label="头像">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.avatarUrl"
                fit="cover"
                :preview-src-list="[scope.row.avatarUrl]"
              ></el-image>
            </div>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/store/user/user'

import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search/page-search.vue'
import BasicTable from '@/basic-ui/Table'

export default defineComponent({
  components: {
    PageSearch,
    BasicTable
  },
  setup() {
    const userStore = useUserStore()
    userStore.getPageListAction('user')
    const { userList } = storeToRefs(userStore)

    const propList = [
      { prop: 'id', label: 'id', minWidth: '100' },
      { prop: 'nickName', label: '昵称', minWidth: '100' },
      { prop: 'gender', label: '性别', minWidth: '100' },
      { prop: 'avatarUrl', label: '头像', minWidth: '100' },
      { prop: 'createdAt', label: '创建时间', minWidth: '100' },
      { prop: 'updatedAt', label: '更新时间', minWidth: '100' }
    ]

    return {
      searchFormConfig,
      userList,
      propList
    }
  }
})
</script>

<style lang='less' scoped>
.content {
  border-top: 20px solid #f5f5f5;
}
</style>