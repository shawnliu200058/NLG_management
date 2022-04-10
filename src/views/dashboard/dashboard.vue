<template>
  <div class="dashboard-editor-container">
    <panel-group></panel-group>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart v-if="categoryList.length" :list-data="categoryList" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'

import PanelGroup from './cpns/PanelGroup.vue'
import BarChart from '@/basic-ui/Chart/BarChart.vue'
import PieChart from '@/basic-ui/Chart/PieChart.vue'

import { usePublicStore } from '@/store'
import { useGoodStore } from '@/store/good/good'

export default defineComponent({
  components: { PanelGroup, BarChart, PieChart },
  setup() {
    const publicStore = usePublicStore()
    const goodStore = useGoodStore()
    const pageName = 'category'

    const getPageData = (queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          limit: 10,
          ...queryInfo
        }
      })
    }

    const { categoryList, categoryCount } = storeToRefs(goodStore)
    if (categoryCount.value === 0) getPageData()
    // onMounted(() => {
    //   console.log(categoryList.value)
    // })

    return {
      categoryList
    }
  }
})
</script>

<style lang='scss' scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>