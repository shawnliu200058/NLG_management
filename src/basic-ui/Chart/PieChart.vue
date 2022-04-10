<template>
  <div id="main" :style="{ height: height, width: width }" />
</template>

<script lang='ts'>
import { defineComponent, onMounted, onBeforeUnmount, reactive } from 'vue'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
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
      default: '300px'
    }
  },
  setup(props) {
    type EChartsOption = echarts.EChartsOption

    var myChart: echarts.ECharts
    onMounted(() => {
      var chartDom = document.getElementById('main')!
      myChart = echarts.init(chartDom, 'macarons')
      option && myChart.setOption(option)
    })

    // console.log(props.listData)
    const legendData = reactive<any>([])
    const seriesData = reactive<any>([])
    const initData = () => {
      // console.log(props.listData)
      props.listData.forEach((item: any, index: number) => {
        legendData.push(item?.name)
        // rest 语法省略非必要的属性
        const { id, icon_url, ...rest } = item
        // console.log(rest)
        seriesData[index] = {
          ...rest,
          value: item.goods[0].id === null ? 0 : item?.goods.length,
          name: item?.name
        }
        delete seriesData[index].goods
      })
      // console.log(legendData)
      // console.log(seriesData)
    }
    initData()

    var option = reactive<EChartsOption>({})
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: legendData
      },
      series: [
        {
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: seriesData,
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ]
    }

    onBeforeUnmount(() => {
      myChart?.dispose()
    })

    return {}
  }
})
</script>
