//const PRO_HOST = 'http://47.92.121.252:8080'
/*
通过接口获取任务反馈页面数据的接口
参数
id(新增不需要传递)	主键
taskId	任务编号
feedbackType	反馈类型
feedbackTime	反馈时间
completedDesc	完成情况
gap	差因
nextPlan	下一步计划
completedStatus	完成状态
totalStatus	整体任务完成状态
selfEvaluate	自评
finalEvaluate	公议
dataStatus	数据状态

 */
const taskFk_API = "/task/feedbackInfoController/saveData";
/*
通过接口获取部门查询页面数据的接口
参数
"id":"1",	主键ID
"departmant":"code1",	部门编码
"departmantName":"公司1",	部门名称
"parentId":"#",	父ID
"parentName":"#",	父名称
"departmantType":"1",	部门类型
"departmantOwner":null,	部门负责人
"enabled":"1",	是否有效
"createdBy":null,	创建者
"createdTime":null,	创建时间
"updateBy":null,	修改者
"updateTime":null	修改时间

 */
const department_API = "/task/sysDepartmantController/selectByPrimaryKey"
    /*
    通过接口获取部门树形菜单数据的接口
    参数
    "id":"1",
    "departmant":"code1",
    "departmantName":"公司1",
    "parentId":"#",
    "parentName":"#",
    "departmantType":"1",
    "departmantOwner":null,
    "enabled":"1",
    "createdBy":null,
    "createdTime":null,
    "updateBy":null,
    "updateTime":null
    childrenList:[]
     */
const departmentTree_API = "/task/sysDepartmantController/searchTreeAllData"

/*
    部门管理新增，修改
      参数
id	主键ID
departmant	部门编号
departmantName	部门名称
parentId	父级部门编号
parentName	父级部门名称
departmantType	部门类型
departmantOwner	部门负责人
enabled	是否有效
sortNo	排序字段


     */
const departmentAddandUpdata_API = "/task/sysDepartmantController/saveData"

/*
    部门管理删除
      参数
id	主键ID
departmant	部门编号
departmantName	部门名称
parentId	父级部门编号
parentName	父级部门名称
departmantType	部门类型
departmantOwner	部门负责人
enabled	是否有效
sortNo	排序字段
     */
const departmentDelete_API = "/task/sysDepartmantController/deleteById"

/*
菜单管理查询
   "id":"1",	主键ID
"departmant":"code1",	部门编码
"departmantName":"公司1",	部门名称
"parentId":"#",	父ID
"parentName":"#",	父名称
"departmantType":"1",	部门类型
"departmantOwner":null,	部门负责人
"enabled":"1",	是否有效
"createdBy":null,	创建者
"createdTime":null,	创建时间
"updateBy":null,	修改者
"updateTime":null	修改时间

     */
const menuQuery_API = "/task/sysMenuController/selectByPrimaryKey"
    /*
        菜单管理新增，修改
      id	主键ID
selectByPrimaryKey	部门编号
departmantName	部门名称
parentId	父级部门编号
parentName	父级部门名称
departmantType	部门类型
departmantOwner	部门负责人
enabled	是否有效
sortNo	排序字段
userId	登录人（用户ID）

         */
const menuAddandUpdata_API = "/task/sysMenuController/saveData"

/*
    菜单管理删除
      参数
菜单id
     */
const menudelete_API = "/task/sysMenuController/deleteById"

/*
  返回值	{	
	"rowCount":3,	总条数
	"result":[	结果
	{	
	"id":"1",	主键ID
	"departmant":"code1",	部门编码
	"departmantName":"公司1",	部门名称
	"parentId":"#",	父ID
	"parentName":"#",	父名称
	"departmantType":"1",	部门类型
	"departmantOwner":null,	部门负责人
	"enabled":"1",	是否有效
	"createdBy":null,	创建者
	"createdTime":null,	创建时间
	"updateBy":null,	修改者
	"updateTime":null	修改时间
	childrenList:[]	子部门
	}]	
	}	


         */
const menuTree_API = "/task/sysMenuController/searchTreeAllData"
    /**
     * 角色菜单分页查询
     * pageNo	页码
    pageSize	条数
    id	主键
    roleName	角色名称
    enabled	是否有效
     */
const Roledata_API = "/task/sysRoleController/searchData"
    /**
     * 角色菜单的添加
post	
roleId	角色编码
userIds	用户ID集合
{	
code:200	
success:true	
message:""	
result:true	
}	

     */
const addAndupdataRole_API = "/task/sysRoleController/saveData"
    /**
     * 角色删除
     * id
     */
const deleteRole_API = "/task/sysRoleController/deleteById"


export default {
    taskFk_API,
    department_API,
    departmentTree_API,
    departmentAddandUpdata_API,
    departmentDelete_API,
    menuQuery_API,
    menuAddandUpdata_API,
    menudelete_API,
    menuTree_API,
    Roledata_API,
    addAndupdataRole_API,
    deleteRole_API
}