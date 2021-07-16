/*
 * @Author: sxt
 * @Date: 2021-07-06 15:32:41
 * @LastEditors: sxt
 * @LastEditTime: 2021-07-06 15:40:18
 * @Description: 资源管理路由
 */
import Layout from '@/layout'

const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
}

export var resource = {
    path: '/resource',
    component: Layout,
    redirect: '/resource/repair',
    name: 'resource',
    meta: {
        title: '资源管理',
        icon: 'resource',
    },
    children: [{
            path: 'repair',
            name: 'resource_repair',
            meta: { title: '维修任务', icon: 'gengduo2' },
            component: () =>
                import ('@/views/resourceManage/repair/index'),
        },
        {
            path: 'check',
            name: 'resource_check',
            meta: { title: '点检任务', icon: 'gengduo2' },
            component: () =>
                import ('@/views/resourceManage/check/index'),
        },
        {
            path: 'maintain',
            name: 'resource_maintain',
            meta: { title: '保养任务', icon: 'gengduo2' },
            component: () =>
                import ('@/views/resourceManage/maintain/index'),
        },
        {
            path: 'spareparts',
            name: 'resource_spareparts',
            meta: { title: '备件管理', icon: 'gengduo2' },
            component: () =>
                import ('@/views/resourceManage/spareparts/index'),
        },
        {
            path: 'knife',
            name: 'resource_knife',
            meta: { title: '刀具管理', icon: 'gengduo2' },
            component: () =>
                import ('@/views/resourceManage/knife/index'),
        },
    ]
}