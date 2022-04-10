<template>
  <div id="main" style="width: 600px; height: 400px"></div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  setup() {
    type EChartsOption = echarts.EChartsOption

    onMounted(() => {
      var chartDom = document.getElementById('main')!
      var myChart = echarts.init(chartDom)
      option && myChart.setOption(option)
    })

    var option: EChartsOption
    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }

    return {}
  }
})
</script>

<style lang='less' scoped>
</style>