<template>
  <div class="page-search">
    <basic-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </basic-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import BasicForm from '@/basic-ui/Form'

export default defineComponent({
  components: {
    BasicForm
  },
  props: {
    searchFormConfig: {
      type: true,
      required: true
    }
  },
  emits: ['queryBtnClick'],
  setup(props, { emit }) {
    // formData 中的属性由 searchFormConfig 动态决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) formOriginData[item.field] = ''
    // 动态设置属性名
    const formData = ref(formOriginData)

    // 当用户点击重置
    const handleResetClick = () => {
      // 如果写成 formData.value = formOriginData 会导致无法响应式更新
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style lang='less' scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>