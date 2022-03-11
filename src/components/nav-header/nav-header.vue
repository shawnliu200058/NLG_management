<template>
  <div class="nav-header">
    <div class="folder">
      <el-icon :size="20" @click="handleFoldClick">
        <fold v-if="isFold" />
        <expand v-else />
      </el-icon>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChange'],
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
  .folder {
    cursor: pointer;
  }
}
</style>