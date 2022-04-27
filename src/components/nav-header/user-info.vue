<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <span :style="{ 'margin-right': '10px' }">{{ name }}</span>
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>个人中心</el-dropdown-item>
          <!-- <el-dropdown-item>系统管理</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import router from '@/router/index'
import localCache from '@/utils/cache'
import { useLoginStore } from '@/store/login/login'

export default defineComponent({
  setup() {
    const { adminInfo } = storeToRefs(useLoginStore())
    const name = computed(() => adminInfo.value.name)

    const handleExitClick = () => {
      localCache.removeToken()
      router.push('/login')
    }

    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style lang='less' scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>