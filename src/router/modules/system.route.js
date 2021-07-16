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

export var system = {
  path: '/system',
  component: Layout,
  redirect: '/system/organ',
  name: 'system',
  meta: {
    title: 'system',
    icon: 'xitong',
  },
  children: [
    {
      path: 'organ',
      name: 'organ',
      meta: { title: 'organ', icon: 'gengduo2' },
      component: () => import('@/views/systemManage/organ/index'),
    },
    {
      path: 'user',
      name: 'user',
      meta: { title: 'user', icon: 'gengduo2' },
      component: () => import('@/views/systemManage/user/index'),
    },
    {
      path: 'role',
      name: 'role',
      meta: { title: 'role', icon: 'gengduo2' },
      component: () => import('@/views/systemManage/role/index'),
    },
    {
      path: 'company',
      name: 'company',
      meta: { title: 'company', icon: 'gengduo2' },
      component: () => import('@/views/systemManage/company/index'),
    },
    {
      path: 'log',
      name: 'log',
      meta: { title: 'log', icon: 'gengduo2' },
      component: () => import('@/views/systemManage/log/index'),
    },
    {
      path: 'setting',
      name: 'setting',
      meta: { title: '系统设置', icon: 'gengduo2' },
      component: () => import('@/views/systemManage/setting/index'),
    },
    {
      path: 'msgtemplate',
      name: 'msgtemplate',
      meta: { title: 'msgtemplate', icon: 'gengduo2' },
      component: () => import('@/views/systemManage/msgtemplate/index'),
    },
  ]
}
