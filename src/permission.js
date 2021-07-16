/*
 * @Author: your name
 * @Date: 2021-04-22 13:57:05
 * @LastEditTime: 2021-07-07 11:07:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\permission.js
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getUserId } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const hasUserId = getUserId()
  let defaultPage = [];
  function getDefaultPage(route) {
    defaultPage.push(route.path);
    if (route.children && route.children.length > 0) {
      getDefaultPage(route.children[0]);
    }
  }
  if (hasToken && hasUserId) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      getDefaultPage(store.getters.addRoutes[0]);
      next({ path: defaultPage.join("/") })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 判断是否获取了动态路由
      const hasRoutes = store.getters.addRoutes && store.getters.addRoutes.length > 0
      if (hasRoutes) {
        next()
      } else {
        try {
          // get user info
          // note: modules是动态路由的信息
          const modules = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', modules)
          if (!accessRoutes.length) {
            throw "该账号没有模块权限"
          }
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          getDefaultPage(accessRoutes[0]);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          if (from.path === "/login") {
            next({ path: defaultPage.join("/"), replace: true })
          } else {
            next({ ...to, replace: true })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          //next(`/login?redirect=${to.path}`)
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
