<template>
  <div id="bar-chart" :style="{ height: height, width: width }"></div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, onBeforeUnmount, reactive } from 'vue'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default defineComponent({
  props: {
    listData: {
      type: Object,
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
      var chartDom = document.getElementById('bar-chart')!
      myChart = echarts.init(chartDom, 'macarons')
      option && myChart.setOption(option)
    })

    const xAxisData = reactive<any>([])
    const seriesData = reactive<any>([])
    const initData = () => {
      console.log(props.listData)
      const { categoryList, orderList } = props.listData
      const categoryCount = categoryList.length
      for (let i = 0; i < categoryCount; i++) seriesData[i] = 0
      // console.log(seriesData)

      categoryList.forEach((categoryItem: any, index: number) => {
        xAxisData.push(categoryItem?.name)

        orderList.forEach((orderItem: any) => {
          // console.log(JSON.parse(item?.good_info))
          const orderGoods = JSON.parse(orderItem?.good_info)
          // orderGoods.forEach((goodItem: any) => {
          //   // console.log(item)
          //   if (goodItem?.category_id === categoryItem?.id) seriesData[index]++
          // })
          for (const goodItem of orderGoods) {
            if (goodItem?.category_id === categoryItem?.id) {
              seriesData[index]++
              break
            }
          }
        })
      })

      // console.log(seriesData)
      // console.log(xAxisData)
    }
    initData()

    var option: EChartsOption
    option = {
      title: {
        text: '不同类别的订单数量',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0
        },
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [
        {
          data: seriesData,
          type: 'bar'
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

<style lang='less' scoped>
</style>