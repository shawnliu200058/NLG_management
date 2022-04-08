<template>
  <div class="container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="通告标题">
        <el-col :span="16">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="通告内容">
        <!-- <el-input v-model="form.desc" type="textarea" /> -->
        <basic-editor></basic-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'

import BasicEditor from '@/basic-ui/Editor'

export default defineComponent({
  components: {
    BasicEditor
  },
  setup() {
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })

    const onSubmit = () => {}

    return {
      form,
      onSubmit
    }
  }
})
</script>

<style lang='less' scoped>
.container {
  padding-right: 20px;
}
</style>