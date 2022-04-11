<template>
  <div id="line-chart" :style="{ height: height, width: width }" />
</template>

<script lang='ts'>
import { defineComponent, onMounted, onBeforeUnmount, reactive } from 'vue'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default defineComponent({
  props: {
    // listData: {
    //   type: Array,
    //   required: true
    // },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  setup(props) {
    type EChartsOption = echarts.EChartsOption

    var myChart: echarts.ECharts
    onMounted(() => {
      var chartDom = document.getElementById('line-chart')!
      myChart = echarts.init(chartDom, 'macarons')
      option && myChart.setOption(option)
    })

    var option = reactive<EChartsOption>({})
    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: [
        { name: '订单数', type: 'value', interval: 300, position: 'left' },
        {
          type: 'value',
          position: 'right',
          name: '销售额',
          axisLabel: {
            formatter: '￥{value}'
          }
        }
      ],
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        },
        {
          data: [100, 200, 300, 400, 500, 600, 700],
          type: 'line',
          yAxisIndex: 1
        }
      ]
    }

    // 自适应
    window.addEventListener('resize', () => {
      myChart.resize()
    })

    onBeforeUnmount(() => {
      myChart?.dispose()
    })

    return {}
  }
})
</script>
