<!-- <template>
  <div class="page-content">
    <el-card>
      <basic-table :list-data="userList" v-bind="contentTableConfig">
        <template #headerHandler>
          <el-button type="primary" size="medium">新建用户</el-button>
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
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/store/user/user'

import PageSearch from '@/components/page-search/page-search.vue'
import BasicTable from '@/basic-ui/Table'

export default defineComponent({
  components: {
    PageSearch,
    BasicTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    }
  },
  setup() {}
})
</script>

<style lang='less' scoped>
.content {
  border-top: 20px solid #f5f5f5;
}
</style> -->