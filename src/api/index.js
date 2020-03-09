//开发环境
const SAT_HOST = 'http://localhost:8080';
// const SAT_HOST = 'http://localhost:8081';
//测试
const UAT_HOST = 'http://10.213.12.98:8080';
//生产
// const PRO_HOST = 'http://hgpm.hoppre.haier.net';
// const PRO_HOST = 'http://10.153.84.93:8080'
const PRO_HOST = 'http://47.92.121.252:8080'


/**
 * 系统管理模块的岗位，用户，系统字典，登录，菜单下拉
 */

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



/**
 * 岗位模块
 *
 */
/*岗位模块的树形菜单为部门菜单
 **参数
 */

const departmentTree_API = '/task/sysDepartmantController/searchTreeAllData'
    /*岗位查询
     **参数
     */
const postSearch_API = '/task/sysTitleController/searchAllData'

/*岗位新增、修改
 **参数
 */
const addPostmanage_API = '/task/sysTitleController/saveData'


/*岗位删除
 **参数
 */
const deletePostmanage_API = '/task/sysTitleController/deleteById'

/*
 *   岗位中查询所有部门进行所属部门的改变
 **/

const searchAllDepartmentData_API = '/task/sysDepartmantController/searchAllData'

/*用户查询
 **参数
 */
const userSearch_API = '/task/sysUserController/searchAllDataByDepartmantId'

/*用户新增、修改
 **参数
 */
const addUsermanage_API = '/task/sysUserController/saveData'


/*用户删除
 **参数
 */
const deleteUsermanage_API = '/task/sysUserController/deleteById'

/*角色全部查询
 **参数 
 */
const getRoleUsermanage_API = '/task/sysRoleController/searchAllData'

/*用户-角色新增
 **参数
 */
const addUser_Rolemanage_API = '/task/sysRoleController/insertUserRoleList'

/*用户-岗位新增
 **参数
 */
const addUser_Depmanage_API = '/task/sysTitleController/insertUserTitleList'


/*用户-根据用户查询该用户角色
 **参数
 */
const searchUser_Rolemanage_API = '/task/sysRoleController/searchAllDataByUserId'


/*用户-根据用户查询该用户岗位
 **参数
 */
const searchUser_Depmanage_API = '/task/sysTitleController/searchAllDataByUserId'


/*用户-重置单个用户密码
 **参数
 */
const resetoneUserPassword_API = '/task/sysUserController/resetPassword'

/*用户-判断输入得用户code，用户新增时是否已经存在
 **参数
 */
const judgeUserCode_API = '/task/sysUserController/verificationRepeat'

/*系统字典-查询系统字典下拉框数据
 **参数
 */
const searchDictionarySelectdata_API = '/task/sysDictionariesController/searchAllGroupData'

/*系统字典-查询系统字典数据
 **参数
 */
const searchDictionaryAlldata_API = '/task/sysDictionariesController/searchAllData'

/*系统字典-查询系统字典数据
 **参数
 */
const addUpdateDictionary_API = '/task/sysDictionariesController/saveData'

/*系统字典-系统字典删除
 **参数
 */
const deleteDictionary_API = '/task/sysDictionariesController/deleteById'

/*系统字典-判断系统字典的key，用户新增时是否已经存在
 **参数
 */
const judgeDictionaryKey_API = '/task/sysDictionariesController/verificationRepeat'
    /*系统字典-删除系统字典时作验证(验证关联关系(是否存在下级岗位))
     **参数
     */
const deletejudgeDictionaryByChild_API = '/task/sysTitleController/verificationIncidenceRelationByChildren'

/*系统字典-验证关联关系(是否存在关联用户)
 **参数
 */
const deletejudgeDictionaryByUser_API = '/task/sysTitleController/verificationIncidenceRelationByUser'
    /*菜单权限渲染接口
     **参数
     */
const searchtypeMenuData_API = '/task/sysMenuController/searchDataByUserId'

/**
 * 任务管理模块
 * 
 */

/**
 * 任务管理查询
 */
const getallTaskManageData_API = '/task/taskInfoController/searchAllData'

/**
 * 任务管理新增，修改
 */
const updateTaskManageData_API = '/task/taskInfoController/saveData'

/**
 * 任务管理删除
 */
const deleteTaskManageData_API = '/task/taskInfoController/deleteById'

/**
 * 任务管理查询
 */
const getPaginationTaskManageData_API = '/task/taskInfoController/searchData'

/**
 * 按钮权限 根据用户id,菜单id获取页面的按钮权限
 */

const getBtnsPermissions_API = '/task/sysMenuController/searchButtonDataByUserId'

// 测试
const gettestData_API = '/admin/userStat'

export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    Message_API,
    MenuList_API,
    selfCenter_API,
    test_API,
    departmentTree_API,
    postSearch_API,
    addPostmanage_API,
    deletePostmanage_API,
    userSearch_API,
    addUsermanage_API,
    deleteUsermanage_API,
    getRoleUsermanage_API,
    addUser_Rolemanage_API,
    addUser_Depmanage_API,
    searchUser_Rolemanage_API,
    searchUser_Depmanage_API,
    resetoneUserPassword_API,
    judgeUserCode_API,
    searchDictionarySelectdata_API,
    searchDictionaryAlldata_API,
    addUpdateDictionary_API,
    deleteDictionary_API,
    judgeDictionaryKey_API,
    searchtypeMenuData_API,
    searchAllDepartmentData_API,
    getallTaskManageData_API,
    updateTaskManageData_API,
    deleteTaskManageData_API,
    getPaginationTaskManageData_API,
    deletejudgeDictionaryByChild_API,
    deletejudgeDictionaryByUser_API,
    getBtnsPermissions_API,
    gettestData_API
}