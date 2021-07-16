/*
 * @Author: your name
 * @Date: 2021-04-22 13:57:06
 * @LastEditTime: 2021-07-15 17:34:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\store\modules\permission.js
 */
import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
const loadView = (view) => { // 路由异步懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}
/**
    * @description: 递归生成路由
    * @param {*} modules
    * @return {*}
    */
function assistFunc(modules, basePath = "") {
  var routes = [];
  for (var i = 0; i < modules.length; i++) {
    var module = modules[i], route = {};
    route.path = module.module_path;
    if (module.module_component == "layout") {
      route.component = Layout
    } else {
      route.component = loadView(module.module_component);
    }
    route.name = module.route_name;
    route.meta = {
      title: module.module_name,
      icon: module.module_icon
    }
    if (module.listRoleModule && module.listRoleModule.length > 0) {
      if (basePath) {
        route.redirect = basePath + route.path + "/" + module.listRoleModule[0].module_path;//模块重定向
      } else {
        route.redirect = module.module_path + "/" + module.listRoleModule[0].module_path;//模块重定向
      }
      route.children = assistFunc(module.listRoleModule, basePath + route.path + "/");
    }
    routes.push(route);
  }
  return routes;
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
function generateFlatRoutes(accessRoutes) {
  let flatRoutes = [];

  for (let item of accessRoutes) {
    let childrenFflatRoutes = [];
    if (item.children && item.children.length > 0) {
      childrenFflatRoutes = castToFlatRoute(item.children, "");
    }

    // 一级路由是布局路由,需要处理的只是其子路由数据
    flatRoutes.push({
      name: item.name,
      path: item.path,
      meta: item.meta,
      component: item.component,
      redirect: item.redirect,
      children: childrenFflatRoutes
    });
  }

  return flatRoutes;
}
/**
 * 将子路由转换为扁平化路由数组（仅一级）
 * @param {待转换的子路由数组} routes
 * @param {父级路由路径} parentPath
 */
function castToFlatRoute(routes, parentPath, flatRoutes = []) {
  for (let item of routes) {
    if (item.children && item.children.length > 0) {
      if (item.redirect && item.redirect !== 'noRedirect') {
        flatRoutes.push({
          name: item.name,
          path: (parentPath + "/" + item.path).substring(1),
          redirect: item.redirect,
          meta: item.meta
        });
      }
      castToFlatRoute(item.children, parentPath + "/" + item.path, flatRoutes);
    } else {
      flatRoutes.push({
        name: item.name,
        path: (parentPath + "/" + item.path).substring(1),
        component: item.component,
        meta: item.meta
      });
    }
  }

  return flatRoutes;
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  /**
   * @description: 动态生成路由对象
   * @param {*} commit
   * @param {*} routes
   * @return {*}
   */
  generateRoutes({ commit }, modules) {
    return new Promise(resolve => {
      let accessedRoutes = assistFunc(modules);
      let readRoutes = generateFlatRoutes(accessedRoutes);
      commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)
      resolve(readRoutes)
    })
  },
  // generateRoutes({ commit }, roles) {
  //   return new Promise(resolve => {
  //     let accessedRoutes
  //     if (roles.includes('admin')) {
  //       accessedRoutes = asyncRoutes || []
  //     } else {
  //       accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  //     }
  //     commit('SET_ROUTES', accessedRoutes)
  //     resolve(accessedRoutes)
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}