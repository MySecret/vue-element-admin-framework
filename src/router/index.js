/*
 * @Author: your name
 * @Date: 2021-05-14 15:46:49
 * @LastEditTime: 2021-06-03 09:31:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\router\index.js
 * hidden:是否在菜单中隐藏此项
 *  * meta:{
 * title:标题名称，用户菜单
 * icon:菜单icon
 * noCache:是否需要保留组件在内存中，保留则切换页面，再次回来还是显示之前的状态
 * activeMenu:用于标识选中的菜单
 * affix:固定页面与tagview中
 * breadcrumb:是否在面包屑导航中显示
 * }
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () =>
      import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
    import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
    import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
    import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () =>
      import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', affix: false }
  }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router