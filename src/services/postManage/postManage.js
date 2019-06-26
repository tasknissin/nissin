//岗位
import http from '../../utils/http'
import API from '../../api'
// 获取岗位的属性菜单为部门菜单
export function getdepartmentTree(id,key,type,enabled){
    return new Promise((resolve,reject)=>{
        http({
            url:API.departmentTree_API,
            method:'POST',
            data:{
                id: id,
                key:key,
                type:type,
                enabled:enabled
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);

        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
} 
//获取岗位信息
export function getpostManageList(departmantId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.postSearch_API,
            method:'POST',
            data:{
                departmantId:departmantId,
            }
        })
        .then(({data,status})=>{
            // if(status != 200){
            //     //请求失败
            //     return;
            // }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 岗位新增
export function addpostManList(data){
    return new Promise((resolve,reject)=>{
        http({
            url:API.addPostmanage_API,
            method:'POST',
            data:data
        })
        .then(({data,status})=>{
            // if(status != 200){
            //     //请求失败
            //     return;
            // }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 岗位删除

export function deletepostManList(id){
    return new Promise((resolve,reject)=>{
        http({
            url:API.deletePostmanage_API,
            method:'POST',
            data:{
                id:id
            }
        })
        .then(({data,status})=>{
            // if(status != 200){
            //     //请求失败
            //     return;
            // }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

//查询用户信息-根据部门
export function getUserManageList(departmantId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.userSearch_API,
            method:'POST',
            data:{
                departmantId:departmantId
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 用户新增-根据部门
export function addUserManList(data){
    return new Promise((resolve,reject)=>{
        http({
            url:API.addUsermanage_API,
            method:'POST',
            data:data
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 用户删除-根据部门
export function deleteUserManList(id){
    return new Promise((resolve,reject)=>{
        http({
            url:API.deleteUsermanage_API,
            method:'POST',
            data:{
                id:id
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


// 查询全部角色权限

export function getRolesUserManList(id){
    return new Promise((resolve,reject)=>{
        http({
            url:API.getRoleUsermanage_API,
            method:'POST',
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


// 用户-角色新增

export function addUser_RolesManList(userId,roleIds){
    return new Promise((resolve,reject)=>{
        http({
            url:API.addUser_Rolemanage_API,
            method:'POST',
            data:{
                userId:userId,  // 用户id
                roleIds:roleIds // 角色ID集合
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 用户-岗位新增

export function addUser_DepsManList(userId,roleIds){
    return new Promise((resolve,reject)=>{
        http({
            url:API.addUser_Depmanage_API,
            method:'POST',
            data:{
                userId:userId,  // 用户id
                titleIds:roleIds // 岗位ID集合
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


// 用户-根据用户查询该用户角色

export function searchUser_RolesManList(userId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.searchUser_Rolemanage_API,
            method:'POST',
            data:{
                userId:userId,  // 用户id
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


// 用户-根据用户查询该用户岗位

export function searchUser_DepsManList(userId,roleIds){
    return new Promise((resolve,reject)=>{
        http({
            url:API.searchUser_Depmanage_API,
            method:'POST',
            data:{
                userId:userId,  // 用户id
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


// 用户-重置单个密码

export function resetoneUserPasswordList(userId,password){
    return new Promise((resolve,reject)=>{
        http({
            url:API.resetoneUserPassword_API,
            method:'POST',
            data:{
                userId:userId,  // 用户id
                password:password  // 用户密码
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}
