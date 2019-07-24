import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    // mode:"history",
    routes: [{
            name: "home", //首页
            path: '/home',
            component: () => import('../pages/homePage/Root')
        },
        {
            name: "self", // 个人中心
            path: '/self',
            component: () => import('../pages/selfPage/Root')
        },
        {
            name: "taskCenter", //任务中心
            path: '/taskCenter',
            component: () =>
                import ('../pages/taskCenterPage/TaskCenter')
        },
        {
            name: "taskManage", //任务管理
            path: '/taskManage',
            component: () =>
                import ('../pages/taskCenterPage/Taskmanage')
        },
        {
            name: "taskRoot", //任务管理测试
            path: '/taskRoot',
            component: () =>
                import ('../pages/taskCenterPage/Root')
        },
        {
            name: "mgtCenter",
            path: '/mgtCenter',
            component: () => import('../pages/mgtPage/progress.vue')
        },
        {
            name: "mgtFirst",
            path: '/mgtFirst',
            component: () => import('../components/mgtPage/mgtFirst.vue'),
        },
        {
            name: "login",    //登录
            path: '/login', 
            component: () => import('../pages/loginPage/login.vue'),
        },
        {
            name: 'taskFeedback',   //任务反馈
            path: '/taskFeedback',
            component: () => import('../pages/taskFeedback/taskfeedback.vue')

        },

        {
            name: 'manage',
            path: '/manage',
            component: () => import('../manage/manage.vue'),
            children: [{
                    name: 'elc',
                    path: 'elc',
                    meta: { title: '权限管理' },
                    component: () => import('../manage/elc.vue'),
                },
                {
                    name: 'menu',
                    path: 'menu',
                    meta: { title: '菜单管理' },
                    component: () => import('../manage/mune.vue'),
                },
                {
                    name: 'department',
                    path: 'department',
                    meta: { title: '部门管理' },
                    component: () => import('../manage/department/department.vue'),
                    children: [{
                        name: 'test1',
                        path: 'test1',
                        component: () =>
                            import ('../manage/department/depActions/chackPage.vue')
                    }],
                    // redirect:'department/test1'
                },
                {
                    name: 'station',
                    path: 'station',
                    meta: { title: '岗位管理' },
                    component: ()=>import ('../manage/station/station.vue'),
                    children:[{
                        name:'postManage',
                        path:'postManage',
                        component:() => import ('../manage/station/actions/postManage.vue')
                    }]
                },
                {
                    name: 'roleManagement',
                    path: 'roleManagement',
                    meta: { title: '角色管理' },
                    component: () => import('../manage/Rolemanagement/roleManagement.vue'),
                },
                {
                    name: 'menuManagement',
                    path: 'menuManagement',
                    meta: { title: '菜单管理' },
                    component: () => import ('../manage/menuManagement/menuManagement.vue'),
                    children: [{
                        name: 'menu1',
                        path: 'menu1',
                        component: () =>
                            import ('../manage/menuManagement/menu/menuPage.vue')
                    }],
                },
                {
                    name: 'systemConfiguration',
                    path: 'systemConfiguration',
                    meta: { title: '用户管理' },
                    component: () => import ('../manage/systemConfiguration/systemConfiguration.vue'),
                    children:[{
                        name:'userManage',
                        path:'userManage',
                        component:() => import ('../manage/systemConfiguration/actions/userManage.vue')
                    }]
                },
                {
                    name: 'systemDictionary',
                    path: 'systemDictionary',
                    meta: { title: '系统字典' },
                    component: () => import('../manage/systemdictionary/systemdictionary.vue'),
                    children:[{
                        name:'dictionary',
                        path:'dictionary',
                        component:() => import ('../manage/systemdictionary/actions/dictionary.vue')
                    }]
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

router.beforeEach((to,from,next)=>{
  const nextRoute = ['home'];
  let obj = {}
  let _cookie = document.cookie.split('; ');
  for(var i = 0; i < _cookie.length; i++) {
      var arr = _cookie[i].split('=');
      obj[arr[0]] = arr[1];
  }
  if(nextRoute.indexOf(to.name) >= 0) {  //判断该页面是否需要登陆
    if(!obj.AdminToken) {   //判断登陆状态
      next({ name : 'login'})   //如果未登录，则跳转到登录页
    } else {
      next()  //如果已经登陆，那就可以跳转
    }
  } else {  //其他的无需登陆的页面不做验证
      next()
  }
})