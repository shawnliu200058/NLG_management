import Layout from '@/layout/Layout.vue'

const UserManagementRoute = {
  path: '/user-management',
  name: 'UserManagement',
  component: Layout,
  meta: { title: '用户管理' },
  children: [
    {
      path: 'user-list',
      name: 'UserList',
      component: () => import('@/views/user-management/user-list.vue'),
      meta: { title: '用户列表' }
    }
  ]
}

export default UserManagementRoute
