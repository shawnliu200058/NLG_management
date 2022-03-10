<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    return {
      count
    }
  }
})
</script>

<style lang='less' scoped>
.app {
  height: 100%;
}
</style>
