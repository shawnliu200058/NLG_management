<template>
  <div class="user">
    <el-card>
      <div class="search">
        <basic-form v-bind="searchFormConfig"></basic-form>
      </div>
    </el-card>

    <div class="content"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

import BasicForm, { IFormItem } from '@/basic-ui/Form'
import { searchFormConfig } from './config/search.config'
import router from '@/router/index'

export default defineComponent({
  components: {
    BasicForm
  },
  setup() {
    const formItems: IFormItem[] = [
      {
        type: 'input',
        label: '用户名'
      }
    ]

    return {
      searchFormConfig
    }
  }
})
</script>

<style lang='less' scoped>
</style>