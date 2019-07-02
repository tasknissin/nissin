//岗位
import http from '../../utils/http'
import API from '../../api'
import Login from '../../api/login.js'
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

// 岗位新增，修改弹出框的所属部门的查询下拉

export function getDepartmentDialogData(){
    return new Promise((resolve,reject)=>{
        http({
            url:API.searchAllDepartmentData_API,
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



// 系统字典-查询系统字典数据

export function searchDictionaryManList(type){
    return new Promise((resolve,reject)=>{
        http({
            url:API.searchDictionaryAlldata_API,
            method:'POST',
            data:{
                type:type
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
// 系统字典 - 下拉菜单查询
export function searchDictionarySelectList(){
    return new Promise((resolve,reject)=>{
        http({
            url:API.searchDictionarySelectdata_API,
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
// 系统字典-新增&修改系统字典

export function addUpdateDictionaryManList(data){
    return new Promise((resolve,reject)=>{
        http({
            url:API.addUpdateDictionary_API,
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

// 系统字典-删除系统字典

export function deleteDictionaryManList(id){
    return new Promise((resolve,reject)=>{
        http({
            url:API.deleteDictionary_API,
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
//系统字典-判断新增时用户输入的key是否已经存在
export function judgeDictionaryKey(id,type,key){
    return new Promise((resolve,reject)=>{
        http({
            url:API.judgeDictionaryKey_API,
            method:'POST',
            data:{
                id:id,
                type:type,
                key:key
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
// 用户登录

export function userLoginController(loginName,loginPassword){
    return new Promise((resolve,reject)=>{
        http({
            url:Login.UserLogin_API,
            method:'GET',
            data:{
                loginName:loginName,
                loginPassword:loginPassword
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

// 用户登录后获取菜单，渲染菜单

export function searchTypeMenuData(userId,position){
    return new Promise((resolve,reject)=>{
        http({
            url:API.searchtypeMenuData_API,
            method:'POST',
            data:{
                userId:userId,
                location:position
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