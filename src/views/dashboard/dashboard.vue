<template>
  <div class="dashboard-editor-container">
    <panel-group
      v-if="orderList.length"
      v-bind="{ userCount, goodCount, orderCount, orderList }"
    ></panel-group>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart v-if="categoryList.length" :list-data="categoryList" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart
            v-if="categoryList.length && orderList.length"
            :list-data="{ categoryList, orderList }"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <div class="date-picker">
            <el-date-picker
              v-model="value2"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
              value-format="x"
            />
          </div>
          <line-chart v-if="categoryList.length" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import PanelGroup from './cpns/PanelGroup.vue'
import BarChart from '@/basic-ui/Chart/BarChart.vue'
import PieChart from '@/basic-ui/Chart/PieChart.vue'
import LineChart from '@/basic-ui/Chart/LineChart.vue'

import { usePublicStore } from '@/store'
import { useGoodStore } from '@/store/good/good'
import { useOrderStore } from '@/store/order/order'
import { useUserStore } from '@/store/user/user'

export default defineComponent({
  components: { PanelGroup, BarChart, PieChart, LineChart },
  setup() {
    const publicStore = usePublicStore()
    const goodStore = useGoodStore()
    const orderStore = useOrderStore()
    const userStore = useUserStore()
    // const pageName = 'category'

    // getPageData('category')
    const getPageData = (pageName: string, queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          limit: 10,
          ...queryInfo
        }
      })
    }

    const { categoryList, categoryCount, goodCount } = storeToRefs(goodStore)
    if (categoryCount.value === 0) getPageData('category')
    const { orderList, orderCount } = storeToRefs(orderStore)
    if (orderCount.value === 0) {
      getPageData('order')
      // orderList.value.forEach((item: any) => {
      //   console.log(item)
      // })
    }
    const { userCount } = storeToRefs(userStore)
    if (userCount.value === 0) getPageData('user')
    if (goodCount.value === 0) getPageData('good')

    const panelConfig = reactive({ userCount: userCount.value })
    // console.log(panelConfig)

    const value2 = ref('')

    const shortcuts = [
      {
        text: '最近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '最近一月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      }
    ]

    return {
      userCount,
      goodCount,
      orderCount,
      categoryList,
      orderList,
      value2,
      shortcuts
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

    .date-picker {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>