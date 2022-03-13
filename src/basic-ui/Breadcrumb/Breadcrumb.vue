<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' ||
            index == levelList.length - 1 ||
            item.children
          "
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item.path)">{{
          item.meta.title
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'

import pathToRegexp from 'path-to-regexp'

import router from '@/router'
import { IMatchedItem } from './type'

export default defineComponent({
  setup() {
    const route = useRoute()
    let levelList = ref([])

    const getBreadCrumb = () => {
      let matched: any = route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]
      // console.log(isMain(first))

      if (!isDashBoard(first)) {
        matched = [
          { path: '/dashboard', components: {}, meta: { title: '首页' } }
        ].concat(matched)
        // console.log(matched)
      }

      levelList.value = matched.filter(
        (item: IMatchedItem) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }

    const isDashBoard = (route: RouteLocationMatched) => {
      const name = (route && route.name) as string
      console.log(name)
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'DashBoard'.toLocaleLowerCase()
    }

    watch(route, () => {
      getBreadCrumb()
    })

    const pathCompile = (path: string) => {
      const { params } = route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    }

    const handleLink = (path: string) => {
      router.push(path)
      // const { redirect, path } = item
      // if (redirect) {
      //   router.push(redirect)
      //   return
      // }
      // console.log(path)
      // router.push(pathCompile(path))
    }

    getBreadCrumb()

    return {
      route,
      levelList,
      handleLink
    }
  }
})
</script>

<style lang='less' scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>