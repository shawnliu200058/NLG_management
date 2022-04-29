<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="待审核" name="first">
      <wait-for-audit />
    </el-tab-pane>
    <el-tab-pane label="审核未通过" name="second">
      <audit-failed />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

import waitForAudit from '@/views/good-manament/cpns/wait-for-audit.vue'
import auditFailed from '@/views/good-manament/cpns/audit-failed.vue'

export default defineComponent({
  components: {
    waitForAudit,
    auditFailed
  },
  setup() {
    const activeName = ref('first')

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    return {
      activeName,
      handleClick
    }
  }
})
</script>

<style lang='less' scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>