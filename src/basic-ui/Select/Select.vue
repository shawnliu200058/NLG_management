<template>
  <div>
    <el-select
      v-model="value"
      placeholder="选择商品分类"
      @change="selectChange"
      clearable
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        :disabled="item.disabled"
      />
    </el-select>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { usePublicStore } from '@/store'
import { useGoodStore } from '@/store/good/good'

export default defineComponent({
  emits: ['selectionChange'],
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const value = ref('')

    const publicStore = usePublicStore()

    const getPageData = (queryInfo: any = {}) => {
      publicStore.getPageListAction({
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          limit: 10,
          ...queryInfo
        }
      })
    }

    let options = reactive<any>([])
    if (props.pageName === 'category') {
      const goodStore = useGoodStore()
      const { categoryCount, categoryList } = storeToRefs(goodStore)
      if (categoryCount.value === 0) getPageData()
      options = categoryList
    }

    const selectChange = (value: any) => {
      emit('selectionChange', value)
    }

    return {
      value,
      options,
      selectChange
    }
  }
})
</script>

<style lang='less' scoped>
</style>