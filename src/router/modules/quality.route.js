/*
 * @Author: sxt
 * @Date: 2021-07-08 08:59:11
 * @LastEditors: sxt
 * @LastEditTime: 2021-07-08 09:09:48
 * @Description: 质量管理路由
 */
import Layout from '@/layout'

const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
}

export var quality = {
    path: '/quality',
    component: Layout,
    redirect: '/quality/qualityControlTasks',
    name: 'quality',
    meta: {
        title: '质量管理',
        icon: 'quality',
    },
    children: [{
        path: 'qualityControlTasks',
        name: 'qualityControlTasks',
        meta: { title: '质检任务', icon: 'gengduo2' },
        component: () =>
            import ('@/views/qualityManage/qualityControlTasks/index'),
    }, ]
}