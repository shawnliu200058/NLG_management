// const categoryRoute = {
//   path: 'good-management/category',
//   name: 'Category',
//   component: () => import('@/views/main/good-manament/category.vue'),
//   meta: { title: '商品管理' }
// }

// const goodListRoute = {
//   path: 'good-management/good-list',
//   name: 'GoodList',
//   component: () => import('@/views/main/good-manament/good-list.vue')
// }

// export { categoryRoute, goodListRoute }
import { RouteLocationNormalizedLoaded } from 'vue-router'

import Layout from '@/layout/Layout.vue'

const GoodManagementRoute = {
  path: '/good-management',
  name: 'GoodManagement',
  component: Layout,
  meta: { title: '商品管理' },
  children: [
    {
      path: 'audit',
      name: 'Audit',
      component: () => import('@/views/good-manament/audit.vue'),
      meta: { title: '审核管理' }
    },
    {
      path: 'category',
      name: 'Category',
      component: () => import('@/views/good-manament/category.vue'),
      meta: { title: '分类管理' }
    },
    {
      path: 'good-list',
      name: 'GoodList',
      component: () => import('@/views/good-manament/good-list.vue'),
      meta: { title: '商品列表' }
    },
    {
      path: 'good-detail/:id',
      name: 'GoodDetail',
      component: () => import('@/views/good-manament/good-detail.vue'),
      props: (route: RouteLocationNormalizedLoaded) => ({
        ...route.query,
        ...route.params
      }), //可以运用props结合扩展运算符获取参数
      meta: { title: '商品详情' }
    }
  ]
}

export default GoodManagementRoute
