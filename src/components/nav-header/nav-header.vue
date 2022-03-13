<template>
  <div class="nav-header">
    <div class="folder">
      <el-icon :size="20" @click="handleFoldClick">
        <fold v-if="isFold" />
        <expand v-else />
      </el-icon>
    </div>
    <div class="content">
      <basic-breadcrumb></basic-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import UserInfo from './user-info.vue'
import BasicBreadcrumb from '@/basic-ui/Breadcrumb'

export default defineComponent({
  emits: ['foldChange'],
  components: { UserInfo, BasicBreadcrumb },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style lang='less' scoped>
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;

  .folder {
    padding-top: 3px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px 0 0;
  }
}
</style>