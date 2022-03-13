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

import Layout from '@/layout/Layout.vue'

const GoodManagementRoute = {
  path: '/good-management',
  name: 'GoodManagement',
  component: Layout,
  meta: { title: '商品管理' },
  children: [
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
    }
  ]
}

export default GoodManagementRoute
