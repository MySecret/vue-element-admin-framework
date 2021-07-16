/*
 * @Author: your name
 * @Date: 2021-05-10 16:40:24
 * @LastEditTime: 2021-05-25 13:50:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\router\modules\material.route.js
 */
import Layout from '@/layout'
// const RouteView = {
//     name: 'RouteView',
//     render: (h) => h('router-view')
// }
export var material = {
    path: '/material',
    component: Layout,
    redirect: '/material/list',
    name: 'material',
    meta: {
        title: 'material',
        icon: 'material',
    },
    children: [
        {
            path: 'list',
            name: 'material_list',
            meta: { title: 'material_list', icon: 'gengduo2', noCache: true },
            component: () => import('@/views/materialManage/list/index'),
        },
        {
            path: 'unit',
            name: 'material_unit',
            meta: { title: 'material_unit', icon: 'gengduo2' },
            component: () => import('@/views/materialManage/unit/index'),
        },
        {
            path: 'category',
            name: 'material_category',
            meta: { title: 'material_category', icon: 'gengduo2' },
            component: () => import('@/views/materialManage/category/index'),
        },


    ]
}