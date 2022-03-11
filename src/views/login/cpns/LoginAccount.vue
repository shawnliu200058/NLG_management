<template>
  <div>
    <div class="login-account">
      <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
        <el-form-item label="账号" prop="name">
          <el-input v-model="account.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="account.password" show-password />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm } from 'element-plus'

import localCache from '@/utils/cache'
import rules from '../config/rule'

export default defineComponent({
  setup() {
    const account = reactive({
      // 若存在则从本地内存取，否则赋值空字符串
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    const router = useRouter()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
          }
          router.push({
            name: 'Main'
          })
        }
      })
    }

    return {
      account,
      formRef,
      loginAction,
      rules
    }
  }
})
</script>

<style lang='less' scoped>
</style>