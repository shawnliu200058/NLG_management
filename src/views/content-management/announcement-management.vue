<template>
  <div class="container">
    <el-form :model="form" label-width="120px" ref="formRef">
      <el-form-item label="通告标题" required prop="title" :rules="rule1">
        <el-col :span="16">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="通告内容" required prop="content" :rules="rule2">
        <!-- <el-input v-model="form.desc" type="textarea" /> -->
        <basic-editor v-model="form.content"></basic-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

import BasicEditor from '@/basic-ui/Editor'

import { useAnnouncementStore } from '@/store/announcement/announcement'

export default defineComponent({
  components: {
    BasicEditor
  },
  setup() {
    const form = reactive({
      title: '',
      content: ''
    })
    const rule1 = [
      {
        required: true,
        message: '标题不能为空',
        trigger: 'blur'
      },
      {
        min: 5,
        max: 20,
        message: '标题长度应在 5 到 20 个字符',
        trigger: 'blur'
      }
    ]
    const rule2 = [
      {
        required: true,
        message: '内容不能为空',
        trigger: 'blur'
      },
      {
        min: 10,
        message: '内容长度不能少于 10 个字符',
        trigger: 'blur'
      }
    ]

    const announcementStore = useAnnouncementStore()
    const formRef = ref<FormInstance>()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
          announcementStore.create(form)
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return {
      form,
      formRef,
      rule1,
      rule2,
      submitForm
    }
  }
})
</script>

<style lang='less' scoped>
.container {
  padding-right: 20px;
}
</style>