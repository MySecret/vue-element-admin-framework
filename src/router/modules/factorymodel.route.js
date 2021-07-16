/*
 * @Author: your name
 * @Date: 2021-05-21 08:30:38
 * @LastEditTime: 2021-06-16 09:26:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\router\modules\basedate.route.js
 */
import Layout from '@/layout'
import RouteView from '@/views/routeview'
// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export var factorymodel = {
    path: '/factorymodel',
    component: Layout,
    name: 'factorymodel',
    children: [{ //基础数据
        path: 'basedata',
        component: RouteView,
        name: 'basedata',
        meta: {
            title: 'basedata',
            icon: 'basedata',
        },
        children: [{
            path: 'bomlist',
            name: 'basedata_list',
            meta: { title: 'basedata_list', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/list/index'),
        },
        {
            path: 'process',
            name: 'basedata_process',
            meta: { title: 'basedata_process', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/process/index'),
        },
        {
            path: 'routing',
            name: 'basedata_routing',
            meta: { title: 'basedata_routing', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/routing/index'),
        },
        {
            path: 'bom',
            name: 'bom',
            meta: { title: 'bom', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/bom'),
        },
        {
            path: 'warehouse',
            name: 'warehouse',
            meta: { title: 'warehouse', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/warehouse'),
        },
        {
            path: 'storesite',
            name: 'storesite',
            meta: { title: 'storesite', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/storesite'),
        },
        {
            path: 'supplier',
            name: 'supplier',
            meta: { title: 'supplier', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/supplier'),
        },
        {
            path: 'supplierType',
            name: 'supplier_type',
            meta: { title: 'supplier_type', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/supplierType'),
        },
        {
            path: 'defective',
            name: 'defective',
            meta: { title: 'defective', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/defective'),
        },
        {
            path: 'log',
            name: 'basedata_log',
            hidden: true,
            meta: { title: 'basedata_log', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/log/index'),
        },
        {
            path: 'staffgroup',
            name: 'basedata_staffgroup',
            hidden: true,
            meta: { title: '人员组', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/staffGroup/index'),
        },
        {
            path: 'staffskill',
            name: 'basedata_staffskill',
            hidden: true,
            meta: { title: '人员技能', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/staffSkill/index'),
        },
        {
            path: 'reporttpl',
            name: 'basedata_reporttpl',
            meta: { title: '报告模板', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/baseDataManage/reportTemplate/index'),
        },
        ]
    },
    { //生产建模
        path: 'producemodel',
        component: RouteView,
        name: 'producemodel',
        meta: {
            title: '生产建模',
            icon: 'basedata',
        },
        children: [{
            path: 'room',
            name: 'producemodel_room',
            meta: { title: '车间管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/produceModel/roomManage/index'),
        },
        {
            path: 'line',
            name: 'producemodel_line',
            meta: { title: '产线管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/produceModel/lineManage/index'),
        },
        {
            path: 'worksite',
            name: 'producemodel_worksite',
            meta: { title: '工位管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/produceModel/worksite/index'),
        },
        {
            path: 'workdate',
            name: 'producemodel_workdate',
            meta: { title: '工作日历', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/produceModel/workdate/index'),
        },
        ]
    },
    { //模具设备
        path: 'mouldDevice',
        component: RouteView,
        name: 'mouldDevice',
        meta: {
            title: '模具设备',
            icon: 'basedata',
        },
        children: [{
            path: 'deviceSort',
            name: 'mouldDevice_deviceSort',
            meta: { title: '设备分类', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/deviceSort/index'),
        },
        {
            path: 'deviceParam',
            name: 'mouldDevice_deviceParam',
            meta: { title: '设备参数', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/deviceParam/index'),
        },
        {
            path: 'deviceList',
            name: 'mouldDevice_deviceList',
            meta: { title: '设备列表', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/deviceList/index'),
        },
        {
            path: 'sparepartSort',
            name: 'mouldDevice_sparepartSort',
            meta: { title: '模具备件类', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/sparepartSort/index'),
        },
        {
            path: 'sparepartStore',
            name: 'mouldDevice_sparepartStore',
            meta: { title: '模具备件仓库', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/sparepartStore/index'),
        },
        {
            path: 'mouldList',
            name: 'mouldDevice_mouldList',
            meta: { title: '模具列表', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/mouldList/index'),
        },
        {
            path: 'reasonDict',
            name: 'mouldDevice_reasonDict',
            meta: { title: '原因字典', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/reasonDict/index'),
        },
        {
            path: 'strategyGroup',
            name: 'mouldDevice_strategyGroup',
            meta: { title: '维护策略组', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/mouldDevice/strategyGroup/index'),
        },
        ]
    },
    { //供应链建模
        path: 'chainModel',
        component: RouteView,
        name: 'chainModel',
        meta: {
            title: '供应链建模',
            icon: 'basedata',
        },
        children: [{
            path: 'warehouse',
            name: 'chainModel_warehouse',
            meta: { title: '仓库管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/chainModel/warehouse/index'),
        },
        {
            path: 'storesite',
            name: 'chainModel_storesite',
            meta: { title: '库位管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/chainModel/storesite/index'),
        },
        {
            path: 'produceStoreSite',
            name: 'chainModel_produceStoreSite',
            meta: { title: '生产库位', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/chainModel/produceStoreSite/index'),
        },
        {
            path: 'vendorSort',
            name: 'chainModel_vendorSort',
            meta: { title: '供应商分类', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/chainModel/vendorSort/index'),
        },
        {
            path: 'vendorManage',
            name: 'chainModel_vendorManage',
            meta: { title: '供应商管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/chainModel/vendorManage/index'),
        },
        ]
    },
    { //客户建模
        path: 'customerModel',
        component: RouteView,
        name: 'customerModel',
        meta: {
            title: '客户建模',
            icon: 'basedata',
        },
        children: [{
            path: 'customer',
            name: 'customerModel_customer',
            meta: { title: '客户管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/customerModel/customer/index'),
        },
        {
            path: 'customerType',
            name: 'customerModel_customerType',
            meta: { title: '客户分类', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/customerModel/customerType/index'),
        },
        ]
    },
    { //质量建模
        path: 'qualitymodel',
        component: RouteView,
        name: 'qualitymodel',
        meta: {
            title: '质量建模',
            icon: 'basedata',
        },
        children: [{
            path: 'testItemType',
            name: 'qualitymodel_testItemType',
            meta: { title: '质检项分类', icon: 'gengduo2' },
            component: () =>
                import('@/views/qualityModel/testItemType/index'),
        },
        {
            path: 'testItem',
            name: 'qualitymodel_testItem',
            meta: { title: '质检项', icon: 'gengduo2' },
            component: () =>
                import('@/views/qualityModel/testItem/index'),
        },
        {
            path: 'badCause',
            name: 'qualitymodel_badCause',
            meta: { title: '不良管理', icon: 'gengduo2' },
            component: () =>
                import('@/views/qualityModel/badCause/index'),
        },
        {
            path: 'inspectionPlan',
            name: 'qualitymodel_inspectionPlan',
            meta: { title: '质检方案', icon: 'gengduo2' },
            component: () =>
                import('@/views/factoryModel/qualityModel/inspectionPlan/index'),
        },
        ]
    }
    ]
}