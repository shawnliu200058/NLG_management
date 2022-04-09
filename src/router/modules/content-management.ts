import Layout from '@/layout/Layout.vue'

const ContentManagementRoute = {
  path: '/content-management',
  name: 'ContentManagement',
  component: Layout,
  meta: { title: '内容管理' },
  children: [
    {
      path: 'announcement-management',
      name: 'AnnouncementManagement',
      component: () =>
        import('@/views/content-management/announcement-management.vue'),
      meta: { title: '通告管理' }
    }
    // {
    //   path: 'category',
    //   name: 'Category',
    //   component: () => import('@/views/good-manament/category.vue'),
    //   meta: { title: '分类管理' }
    // }
  ]
}

export default ContentManagementRoute
