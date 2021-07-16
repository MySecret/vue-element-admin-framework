/*
 * @Author: your name
 * @Date: 2021-06-02 17:44:57
 * @LastEditTime: 2021-07-13 17:08:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\directives\action.js
 */
import Vue from 'vue'
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/vueComponent/ant-design-vue-pro/pull/53
 */
const action = Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    const actionName = binding.arg
    const permissionBtns = store.getters.permissionBtns || [];
    // const roles = store.getters.roles
    // const elVal = vnode.context.$route.meta.roles
    // const permissionId = elVal instanceof String && [elVal] || elVal
    // roles.forEach(p => {
    //   if (!permissionId.includes(p.modulecustomviewname)) {
    //     return
    //   }
    //   if (p.buttons && !p.buttons.some((button)=>{return button.buttoncode ==actionName})) {
    //     el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    //   }
    // })
    if (!permissionBtns.some(btn => { return btn.button_code === actionName })) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

export default action
