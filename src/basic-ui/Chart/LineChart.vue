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
        data: [
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
          '星期日'
        ]
      },
      yAxis: [
        { name: '订单数', type: 'value', interval: 5, position: 'left' },
        {
          type: 'value',
          position: 'right',
          name: '销售额',
          interval: 50,
          axisLabel: {
            formatter: '￥{value}'
          }
        }
      ],
      series: [
        {
          data: [12, 13, 10, 13, 19, 13, 12],
          type: 'line'
        },
        {
          data: [50, 100, 150, 200, 250, 300, 350],
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
