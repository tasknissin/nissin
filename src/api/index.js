//开发环境
const SAT_HOST = 'http://localhost:8080';
//测试
const UAT_HOST = 'http://10.213.12.98:8080';
//生产
// const PRO_HOST = 'http://hgpm.hoppre.haier.net';
// const PRO_HOST = 'http://hgpm.hoppre.haier.net'
const PRO_HOST = 'http://47.92.121.252:8080'


/*
获取通知信息接口
参数： userId 用户id
*/
const Message_API = '/DataPortalRQ/sendMail/getSendMailById';


/*
获取通知菜单权限
参数： 
*/
const MenuList_API = '/api/sys/profile.do';

/*
获取标志性项目的权限管理
参数：  entity: {}
        pageNumber: 1
        pageSize: 12
*/
const selfCenter_API = '/api/empController/getCatHrEmpBaseExtendAllData.do';

/*
测试
*/
const test_API = '/api/testController/seachAllData';



export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    Message_API,
    MenuList_API,
    selfCenter_API,
    test_API
}