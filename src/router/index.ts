import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Login from '../views/login/Login.vue'
import Layout from '@/layout/Layout.vue'
import DashBoard from '@/views/dashboard/dashboard.vue'
import GoodManagementRoute from './modules/good-management'
import UserManagementRoute from './modules/user-management'

import localCache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'DashBoard',
        component: DashBoard,
        meta: {
          title: '首页'
        }
      }
    ]
  },
  GoodManagementRoute,
  UserManagementRoute,
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/error-page/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  console.log(to.path)
  if (to.path !== '/login') {
    const token = localCache.getToken()
    if (!token) return '/login'
  }
})

export default router
