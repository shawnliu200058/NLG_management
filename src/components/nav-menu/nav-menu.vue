<template>
  <div class="container">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3 + TS</span>
    </div>

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      router
      :collapse-transition="false"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/dashboard">
        <el-icon><house /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><notebook /></el-icon>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/content-management/announcement-management"
          >通告管理</el-menu-item
        >
        <el-menu-item index="2-2">轮播图管理</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/good-management">
        <template #title>
          <el-icon><goods /></el-icon>
          <span>商品管理</span>
        </template>

        <el-menu-item index="/good-management/category">分类管理</el-menu-item>

        <router-link :to="{ name: 'GoodList' }">
          <el-menu-item index="/good-management/good-list"
            >商品列表</el-menu-item
          >
        </router-link>
      </el-sub-menu>

      <el-sub-menu index="/user-management">
        <template #title>
          <el-icon><user /></el-icon>
          <span>用户管理</span>
        </template>

        <el-menu-item index="/user-management/user-list">用户列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="5">
        <template #title>
          <el-icon><list /></el-icon>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/order-management/order-list"
          >订单列表</el-menu-item
        >
      </el-sub-menu>

      <el-sub-menu index="6">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="6-1">修改密码</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isCollapse = ref(true)
    const handleOpen = (key: string, keyPath: string[]) => {
      // console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      // console.log(key, keyPath)
    }

    return {
      isCollapse,
      handleOpen,
      handleClose
    }
  }
})
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  background-color: #001529;

  .router-link-active {
    text-decoration: none;
    color: yellow;
  }
  a {
    text-decoration: none;
    color: white;
  }

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }
}
</style>