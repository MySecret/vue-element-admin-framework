/*
 * @Author: your name
 * @Date: 2021-05-31 16:54:45
 * @LastEditTime: 2021-07-09 14:33:54
 * @LastEditors: sxt
 * @Description: In User Settings Edit
 * @FilePath: \运动员管理前端v2e:\SVN\前端源码\业务系统\src\main.js
 */
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import '@/assets/iconfont/iconfont.css' //导入iconfont
import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters
import "./directives/action"; //自定义指令-控制按钮显示与否
import formCreate from '@form-create/element-ui'; //自定义表单
import FcDesigner from '@/components/CustomForm/index';
//引入并注册自定义指令
import * as directives from './directives/onlyNumber'
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));

//通用组件注册
import CustomInput from "@/components/CustomInput/index";
import CustomTable from "@/components/CustomTable/index";
import CustomDialog from "@/components/CustomDialog/index";
import Transfer from "@/components/Transfer";
import CustomCols from "@/components/CustomCols";
import ElTreeSelect from "@/components/ElTreeSelect"
import CustomImport from "@/components/CustomImport"
import TextTooltip from '@/components/TextTooltip'
Vue.component('CustomInput', CustomInput);
Vue.component('CustomTable', CustomTable);
Vue.component('CustomDialog', CustomDialog);
Vue.component('Transfer', Transfer);
Vue.component('CustomCols', CustomCols);
Vue.component('CustomImport', CustomImport);
Vue.component('TextTooltip', TextTooltip);
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'development') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

Vue.use(Element, {
    size: Cookies.get('size') || 'small', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})

Vue.use(ElTreeSelect);

Vue.directive('onlyNumber', function() {
    //定义指令
});

//自定义表单
Vue.use(formCreate);
Vue.component('FcDesigner', FcDesigner);

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})