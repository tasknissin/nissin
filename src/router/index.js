import Vue from 'vue'
import Router from 'vue-router'

import Selfpage from '../pages/selfPage/Root'
import Homepage from '../pages/homePage/Root'
import taskCenterPage from '../pages/taskCenterPage/Root'
import mgtCenterPage from '../pages/mgtPage/Root'
import mgtFirstPage from '../components/mgtPage/mgtFirst.vue'
import loginPage from '../pages/loginPage/login.vue'
import managePage from '../manage/manage.vue'
import Mune from '../manage/mune.vue'
import elc from '../manage/elc.vue'

import department from '../manage/department/department.vue'
import menuManagement from '../manage/menuManagement/menuManagement.vue'
import roleManagement from '../manage/Rolemanagement/roleManagement.vue'
import station from '../manage/station/station.vue'
import systemConfiguration from '../manage/systemConfiguration/systemConfiguration.vue'
import userManagement from '../manage/userManagement/userandpassword.vue'
Vue.use(Router)

const router = new Router({
    // mode:"history",
    routes: [{
            name: "home",   //首页
            path: '/home',
            component: Homepage
        },
        {
            name: "self",    // 个人中心
            path: '/self',
            component: Selfpage
        },
        {
            name: "taskCenter",   //任务管理
            path: '/taskCenter',
            component: taskCenterPage
        },
        {
            name: "mgtCenter",
            path: '/mgtCenter',
            component: mgtCenterPage,
        },
        {
            name: "mgtFirst",
            path: '/mgtFirst',
            component: mgtFirstPage,
        },
        {
            name: "login",
            path: '/login',
            component: loginPage,
        },

        {
            name: 'manage',
            path: '/manage',
            component: managePage,
            children: [{
                    name: 'elc',
                    path: 'elc',
                    meta: { title: '权限管理' },
                    component: elc,
                },
                {
                    name: 'menu',
                    path: 'menu',
                    meta: { title: '菜单管理' },
                    component: Mune,
                },
                {
                    name: 'department',
                    path: 'department',
                    meta: { title: '部门管理' },
                    component: department,
                    children:[{
                        name:'test1',
                        path:'test1',
                        component:()=>import ('../manage/department/depActions/table1')
                    },{
                        name:'test2',
                        path:'test2',
                        component:()=>import ('../manage/department/depActions/table2')
                    }],
                    // redirect:'department/test1'
                },
                {
                    name: 'menuManagement',
                    path: 'menuManagement',
                    meta: { title: '岗位管理' },
                    component: menuManagement,
                },
                {
                    name: 'roleManagement',
                    path: 'roleManagement',
                    meta: { title: '角色管理' },
                    component: roleManagement,
                },
                {
                    name: 'station',
                    path: 'station',
                    meta: { title: '菜单管理' },
                    component: station,
                },
                {
                    name: 'systemConfiguration',
                    path: 'systemConfiguration',
                    meta: { title: '用户管理' },
                    component: systemConfiguration,
                },
                {
                    name: 'userManagement',
                    path: 'userManagement',
                    meta: { title: '系统配置' },
                    component: userManagement,
                },

            ]
        },
        {
            path: '**',
            redirect: '/home'
        },

    ]
})

export default router;
// 全局守卫

// router.beforeEach((to,from,next)=>{
//   const nextRoute = ['home', 'self', 'taskCenter', 'mgtFirst'];
//   let obj = {}
//   let _cookie = document.cookie.split('; ');
//   for(var i = 0; i < _cookie.length; i++) {
//       var arr = _cookie[i].split('=');
//       obj[arr[0]] = arr[1];
//   }
//   console.log(obj.token)
//   if(nextRoute.indexOf(to.name) >= 0) {  //判断该页面是否需要登陆
//     if(!obj.token) {   //判断登陆状态
//       next({ name : 'login'})   //如果未登录，则跳转到登录页
//     } else {
//       next()  //如果已经登陆，那就可以跳转
//     }
//   } else {  //其他的无需登陆的页面不做验证
//       next()
//   }
// })