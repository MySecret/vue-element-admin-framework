/*
 * @Author: your name
 * @Date: 2021-05-21 08:30:38
 * @LastEditTime: 2021-05-24 15:49:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\router\modules\basedate.route.js
 */
import Layout from '@/layout'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export var basedata = {
  path: '/basedata',
  component: Layout,
  redirect: '/basedata/bomlist',
  name: 'basedata',
  meta: {
    title: 'basedata',
    icon: 'basedata' ,
  },
  children: [
    
    {
      path: 'bomlist',
      name: 'basedata_list',
      meta: { title: 'basedata_list', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/list/index'),
    },
    {
      path: 'process',
      name: 'basedata_process',
      meta: { title: 'basedata_process', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/process/index'),
    },
    {
      path: 'routing',
      name: 'basedata_routing',
      meta: { title: 'basedata_routing', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/routing/index'),
    },
    {
      path: 'bom',
      name: 'bom',
      meta: { title: 'bom', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/bom'),
    },
    {
      path: 'warehouse',
      name: 'warehouse',
      meta: { title: 'warehouse', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/warehouse'),
    },
    {
      path: 'storesite',
      name: 'storesite',
      meta: { title: 'storesite', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/storesite'),
    },
    {
      path: 'customer',
      name: 'customer',
      meta: { title: 'customer', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/customer/index'),
    }, 
    {
      path: 'customerType',
      name: 'customer_type',
      meta: { title: 'customer_type', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/customerType/index'),
    }, {
      path: 'supplier',
      name: 'supplier',
      meta: { title: 'supplier', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/supplier'),
    },
    {
      path: 'supplierType',
      name: 'supplier_type',
      meta: { title: 'supplier_type', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/supplierType'),
    },
    {
      path: 'defective',
      name: 'defective',
      meta: { title: 'defective', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/defective'),
    },
    {
      path: 'log',
      name: 'basedata_log',
      hidden: true,
      meta: { title: 'basedata_log', icon: 'gengduo2' },
      component: () => import('@/views/baseDataManage/log/index'),
    },
  ]
}
