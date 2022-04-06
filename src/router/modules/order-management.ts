import Layout from '@/layout/Layout.vue'

const OrderdManagementRoute = {
  path: '/order-management',
  name: 'OrderManagement',
  component: Layout,
  meta: { title: '订单管理' },
  children: [
    {
      path: 'order-list',
      name: 'OrderList',
      component: () => import('@/views/order-management/order-list.vue'),
      meta: { title: '订单列表' }
    }
  ]
}

export default OrderdManagementRoute
