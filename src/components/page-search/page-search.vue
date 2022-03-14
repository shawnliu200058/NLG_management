<template>
  <div class="page-search">
    <basic-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh">重置</el-button>
          <el-button type="primary" icon="Search">搜索</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      address: '',
      createdAt: ''
    })

    return {
      formData
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