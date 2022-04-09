<template>
  <div class="container">
    <el-form :model="form" label-width="120px" ref="formRef" :rules="rules">
      <el-form-item label="通告标题" required prop="title">
        <el-col :span="16">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="通告内容" required prop="content">
        <!-- <el-input v-model="form.desc" type="textarea" /> -->
        <basic-editor
          v-if="announcement.hasOwnProperty('content')"
          v-model="form.content"
          ref="editorRef"
        ></basic-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
        <el-button @click="resetForm(formRef)">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'

import BasicEditor from '@/basic-ui/Editor'

import { useAnnouncementStore } from '@/store/announcement/announcement'

import { getAnnouncement } from '@/service/api/announcement/announcement'

export default defineComponent({
  components: {
    BasicEditor
  },
  setup() {
    const form = reactive({
      title: '',
      content: ''
    })

    const titleRule = [
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
    const validateContent = (rule: any, value: any, callback: any) => {
      // console.log(value)
      var re = new RegExp('<[^<>]+>', 'g')
      var text = value.replace(re, '')
      // console.log(text)
      if (text.length < 10) {
        callback(new Error('内容长度不能少于 10 个字符'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      title: titleRule,
      content: [{ validator: validateContent, trigger: 'blur' }]
    })

    const announcementStore = useAnnouncementStore()
    // 控制内容回显
    const { announcement } = storeToRefs(announcementStore)
    getAnnouncement().then((res) => {
      announcementStore.setContent(res.data)
      const { title, content } = res.data
      form.title = title
      form.content = content
    })

    const formRef = ref<FormInstance>()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
          announcementStore.create(form)
          ElNotification({
            title: '提示',
            message: '保存成功',
            type: 'success'
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    const editorRef = ref<InstanceType<typeof BasicEditor>>()
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
      // console.log(editorRef.value)
      editorRef.value!.clearFields()
    }

    return {
      form,
      formRef,
      editorRef,
      announcement,
      rules,
      submitForm,
      resetForm
    }
  }
})
</script>

<style lang='less' scoped>
.container {
  padding-right: 20px;
}
</style>