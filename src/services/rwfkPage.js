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
                alert("返回成功")

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
export function getRoleData(pageNo, pageSize, ) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.Roledata_API,
                method: 'POST',
                data: {
                    pageNo: pageNo,
                    pageSize: pageSize
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