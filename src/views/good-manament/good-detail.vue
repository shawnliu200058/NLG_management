<template>
  <div>
    <el-card>
      <basic-table
        :list-data="goodList"
        :prop-list="basicPropList"
        :show-index-column="false"
        :show-select-column="false"
        :show-footer="false"
      >
        <template #headerHandler>
          <el-icon :size="16"><paperclip /></el-icon>
          <h5>基本信息</h5>
        </template>
        <template #displayPicUrl="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.displayPicUrl"
            fit="cover"
          ></el-image>
        </template>
        <template #price="scope"> ￥{{ scope.row.price.toFixed(2) }} </template>
        <template #createdAt="scope">
          {{ $filters.formatTime(scope.row.createdAt) }}
        </template>
      </basic-table>

      <basic-table
        :list-data="goodList"
        :prop-list="otherPropList"
        :show-index-column="false"
        :show-select-column="false"
        :show-footer="false"
      >
        <template #headerHandler>
          <el-icon :size="16"><paperclip /></el-icon>
          <h5>其它信息</h5>
        </template>
      </basic-table>

      <div class="header">
        <el-icon :size="16"><paperclip /></el-icon>
        <h5>商品详情图</h5>
      </div>
      <template v-for="item in detailPicList" :key="item.id">
        <el-image
          lazy
          style="width: 200px; height: 200px; padding: 10px"
          :src="item.url"
          fit="cover"
        ></el-image>
      </template>

      <!-- <basic-table
        :list-data="detailPicList"
        :prop-list="picPropList"
        :show-index-column="false"
        :show-select-column="false"
        :show-footer="false"
      >
        <template #url="scope">
          <el-image
            lazy
            style="width: 100px; height: 100px"
            :src="scope.row.url"
            fit="cover"
          ></el-image>
        </template>
      </basic-table> -->
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'

import { getPageListData } from '@/service/api/public'

import BasicTable from '@/basic-ui/Table'

import {
  basicPropList,
  otherPropList,
  picPropList
} from './config/content.config'

export default defineComponent({
  components: { BasicTable },
  setup() {
    const route = useRoute()
    // console.log(route.query)
    const pageName = 'good'
    const pageInfo: any = route.query

    let goodList = reactive<any>([])
    let detailPicList = reactive<any>([])

    const getPageData = (queryInfo: any = {}) => {
      getPageListData(pageName, {
        offset: (pageInfo!.currentPage - 1) * pageInfo!.pageSize,
        limit: pageInfo!.pageSize,
        ...queryInfo
      }).then((res) => {
        // console.log(res.data)
        const { list } = res.data.goodList
        const goodInfo = list.filter((item: any) => {
          return item.id == route.params.id
        })
        goodInfo.forEach((item: any) => {
          goodList.push(item)
          item!.detailPic.forEach((pic: any) => {
            detailPicList.push(pic)
          })
        })
        console.log(goodList)
        console.log(detailPicList)
      })
    }
    getPageData()

    return {
      goodList,
      detailPicList,
      basicPropList,
      otherPropList,
      picPropList
    }
  }
})
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 45px;
  padding-bottom: 10px;
  justify-content: flex-start;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    display: flex;
    // margin-right: 20px;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>