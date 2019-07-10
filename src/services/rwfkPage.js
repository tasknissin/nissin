import http from '../utils/http'
import API from '../api'
import API_Tack from '../api/rwfk_index.js'

export function getTaskupdata(getdata) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.taskFk_API,
                method: 'POST',
                data: getdata
            })
            .then(({ data, status }) => {
                resolve(data);

            }).catch(error => {
                console.log(error);
            })
    })
}
//部门查询
export function getDepartment(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.department_API,
                method: 'POST',
                data: { id: id }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
// //部门树形菜单
export function getDepartmentTree() {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.departmentTree_API,
                method: 'POST',
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//部门部门新增修改
export function AddDepartment(newData) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.departmentAddandUpdata_API,
                method: 'POST',
                data: newData
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

//删除部门
export function deleteDepartment(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.departmentDelete_API,
                method: 'POST',
                data: { id: id }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

//菜单查询
export function menuGetData(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.menuQuery_API,
                method: 'POST',
                data: { id: id }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//菜单新增修改
export function AddAndUpdatamenu(newData) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.menuAddandUpdata_API,
                method: 'POST',
                data: newData
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

//菜单删除
export function deleteMenu(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.menudelete_API,
                method: 'POST',
                data: { id: id }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

// //菜单树形菜单
export function getMenuTree() {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.menuTree_API,
                method: 'POST',
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

// //角色分页查询
export function getRoleData() {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.Roledata_API,
                method: 'POST',
                // data: {
                //     pageNo: pageNo,
                //     pageSize: pageSize
                // }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
// //角色增加修改
export function addRoleData(roledata) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.addAndupdataRole_API,
                method: 'POST',
                data: roledata
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

// //角色删除
export function deleteRoleData(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.deleteRole_API,
                method: 'POST',
                data: { id: id }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}


// 获取用户信息
export function getUserData() {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.getuserData_API,
                method: 'POST',

            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

//菜单权限新增修改用户信息

export function addAndUpduteData(roleId, menuIds) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.AddAndUpdaturoleData_API,
                method: 'POST',
                data: {
                    roleId: roleId,
                    menuIds: menuIds
                }

            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}


//用户新增修改用户信息

export function addAndUpduteUserData(roleId, userIds) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.AddAndUpdatuUserData_API,
                method: 'POST',
                data: {
                    roleId: roleId,
                    userIds: userIds
                }

            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

// 根据用户ID 获取用户拥有的菜单(树形结构)	路径	sysMenuController/searchDataByUserId	

export function qxtreeDatachecked(roleId) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.qxtreeDatachecked,
                method: 'POST',
                data: {
                    roleId: roleId,
                }

            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

// 根据角色ID查询（全部）

export function getroleGJjsID(roleId) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.getroleGJjsID,
                method: 'POST',
                data: {
                    roleId: roleId,
                }

            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

//获取所有的部门
export function getAlldepartsinfo(roleId) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.getAlldepartsinfo,
                method: 'POST',
                data: {
                    roleId: roleId,
                }

            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//获取所有的菜单

export function getAllmenuinfo(roleId) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.getAllmenuinfo,
                method: 'POST',
                data: {
                    roleId: roleId,
                    type: 'menu'
                }

            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//部门删除验证

export function sysDepartmantYZ(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.sysDepartmant_yz,
                method: 'POST',
                data: {
                    id: id,
                }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//菜单删除验证
export function sysMenuYZ(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.sysMenu_yz,
                method: 'POST',
                data: {
                    id: id,
                }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

//任务反馈查询接口
export function getAlltaskFeedback(pageNo, pageSize, feedbackType) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.taskFeedback_api,
                method: 'POST',
                data: {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    feedbackType: feedbackType
                }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//任务反馈删除
export function deleteTaskFeedback(id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.deleteTask,
                method: 'POST',
                data: {
                    id: id,

                }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//菜单管理编码验证
export function menuVerificationRepeat(menuCode, id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.menuVerificationRepeat,
                method: 'POST',
                data: {
                    menuCode: menuCode,
                    id: id
                }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}

//部门删除验证

export function depatmentYZ(menuCode, id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.verificationIncidenceRelationbm,
                method: 'POST',
                data: {

                    id: id
                }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}
//验证关联关系(是否存在关联岗位)

export function depatmentgqGLGX(menuCode, id) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.verificationIncidenceRelationByTitlebm,
                method: 'POST',
                data: {

                    id: id
                }
            })
            .then((data, status) => {
                resolve(data);
            })
            .catch(error => {
                console.log(data);
            })
    })
}