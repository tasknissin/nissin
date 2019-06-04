import Vue from 'vue'
import Router from 'vue-router'

import Selfpage from '../pages/selfPage/Root'
import Homepage from '../pages/homePage/Root'
import taskCenterPage from '../pages/taskCenterPage/Root'
import mgtCenterPage from '../pages/mgtPage/Root'
import mgtFirstPage from '../components/mgtPage/mgtFirst.vue'
import loginPage from '../pages/loginPage/login.vue'

Vue.use(Router)

const router =  new Router({
  // mode:"history",
  routes: [
    {
      name:"home",
      path:'/home',
      component:Homepage
    },
    {
      name:"self",
      path:'/self',
      component:Selfpage
    },
    {
      name:"taskCenter",
      path:'/taskCenter',
      component:taskCenterPage
    },
    {
      name:"mgtCenter",
      path:'/mgtCenter',
      component:mgtCenterPage,
    },
    {
      name:"mgtFirst",
      path:'/mgtFirst',
      component:mgtFirstPage,
    },
    {
      name:"login",
      path:'/login',
      component:loginPage,
    },
    {
      path: '**',
      redirect: '/home'
    }
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
