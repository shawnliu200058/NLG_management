<template>
  <div class="login">
    <login-panel/>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { ref } from 'vue'

import LoginPanel from './cpns/LoginPanel.vue'

export default defineComponent({
  components: { LoginPanel },
  setup() {
    const count = ref(0)
    return {
      count,
    }
  },
})
</script>

<style lang='less' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.svg");
}
</style>