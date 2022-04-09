<template>
  <div>
    <panel-group></panel-group>
    <basic-chart></basic-chart>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

import PanelGroup from './cpns/PanelGroup.vue'
import BasicChart from '@/basic-ui/Chart'

export default defineComponent({
  components: { PanelGroup, BasicChart },
  setup() {
    return {}
  }
})
</script>

<style lang='less' scoped>
</style>