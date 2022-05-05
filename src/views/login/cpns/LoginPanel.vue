<template>
  <div class="login-panel">
    <h2 class="title">农乐购后台管理系统</h2>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="icon">
            <el-icon><avatar /></el-icon>账号登录
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <!-- <el-tab-pane name="phone">
        <template #label>
          <span class="icon">
            <el-icon><cellphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone />
      </el-tab-pane> -->
    </el-tabs>

    <div class="account-control">
      <el-checkbox-group v-model="isKeepPassword">
        <el-checkbox label="记住密码" />
      </el-checkbox-group>
      <!-- <el-link type="primary">忘记密码</el-link> -->
    </div>

    <el-button type="primary" class="login-btn" @click="loginClick" size="large"
      >立即登录</el-button
    >
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import LoginAccount from '@/views/login/cpns/LoginAccount.vue'
import LoginPhone from '@/views/login/cpns/LoginPhone.vue'

export default defineComponent({
  components: { LoginAccount, LoginPhone },
  setup() {
    const isKeepPassword = ref(['记住密码'])
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const currentTab = ref('account')

    const loginClick = () => {
      if (currentTab.value === 'account')
        accountRef.value?.loginAction(!!isKeepPassword.value.length)
    }

    return {
      isKeepPassword,
      accountRef,
      currentTab,
      loginClick
    }
  }
})
</script>

<style lang='less' scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>