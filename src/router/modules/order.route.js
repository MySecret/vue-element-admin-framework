/*
 * @Author: your name
 * @Date: 2021-06-24 09:18:31
 * @LastEditTime: 2021-06-24 09:22:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\router\modules\order.route.js
 */
/*
 * @Author: your name
 * @Date: 2021-05-05 18:13:29
 * @LastEditTime: 2021-06-22 13:24:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\router\modules\system.route.js
 */


import Layout from '@/layout'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export var order = {
  path: '/order',
  component: Layout,
  redirect: '/order/salelist',
  name: 'order',
  meta: {
    title: '订单管理',
    icon: 'xitong',
  },
  children: [
    {
      path: 'salelist',
      name: 'order_salelist',
      meta: { title: '销售订单', icon: 'gengduo2' },
      component: () => import('@/views/order/salelist/index'),
    }
  ]
}
