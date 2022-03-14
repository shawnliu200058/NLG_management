<template>
  <div class="container">
    <el-table :data="listData" :border="isBorder" style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- :name 的作用是为不同的插槽配置名字，即具名插槽
            :row 的作用是将子组件的数据传给父组件，即作用域插槽 -->
            <slot :name="propItem.prop" :row="scope.row">
              <!-- 插槽默认显示内容 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'

import { IPropItem } from './type'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<IPropItem[]>,
      required: true
    },
    isBorder: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang='less' scoped>
</style>