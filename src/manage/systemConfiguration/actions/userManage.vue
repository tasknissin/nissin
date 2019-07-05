<template>
    <div class="userManageBox" style="width:100%;height:100%;" v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 1)">
        <div class="postButtons">
            <el-button type="primary" icon="el-icon-circle-plus" v-for="(item,index) in allBtns" @click="toggle(item.name)" :key="index" size="mini">{{item.value}}</el-button>
        </div>
        <div class="postTable">
            <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border  :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column prop="userCode" label="用户编号"></el-table-column>
                <el-table-column prop="userName" label="用户姓名"></el-table-column>
                <el-table-column prop="mail" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column label="是否有效">
                    <template slot-scope="scope">
                        <span>{{scope.row.enabled == '1' ? '有效' : '无效'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-if="handlesActive"  width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit"  size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="增加用户信息" :visible.sync="dialogFormVisible" id="userDialog" @close="cancelHandel">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane style="min-height:200px;" label="基本信息" name="first">
                        <el-form :label-position="labelPosition"  :inline="true"  :model="form"  size="small" label-width="100px" :rules="rulesForm" ref="userManageFormLog">
                            <el-form-item label="用户编号"  prop="userCode" width="200">
                                <el-input v-model="form.userCode" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户姓名"  prop="userName" width="200">
                                <el-input v-model="form.userName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item v-if="passwordFlag" label="用户密码"  prop="password" width="200">
                                <el-input auto-complete="new-password" type="password" v-model="form.password" ></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱"  prop="mail" width="200"
                            :rules="[
                                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                            ]">
                                <el-input v-model="form.mail" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号"  prop="mobile" width="200">
                                <el-input v-model="form.mobile" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="是否有效"  prop="enabled">
                                <el-select v-model="form.enabled" placeholder="请选择">
                                    <el-option label="有效" value="1"></el-option>
                                    <el-option label="无效" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane style="min-height:200px;" label="角色权限" name="second">
                        <el-transfer v-model="Rloevalue" 
                        :props="{
                            key: 'id',
                            label: 'roleName'
                        }"
                        :titles="['选择角色', '已选角色']"
                        :data="transferDataRloe">
                        </el-transfer>
                    </el-tab-pane>
                    <el-tab-pane style="min-height:200px;" label="岗位权限" name="third">
                        <el-transfer v-model="Depvalue" 
                        :props="{
                            key: 'id',
                            label: 'titleName'
                        }"
                        :titles="['选择岗位', '已选岗位']"                        
                        :data="transferDataDep"></el-transfer>
                    </el-tab-pane>
                    <el-tab-pane style="min-height:200px;" label="密码重置" name="four" class="el-tab-paneFour" v-if="elTabFour">
                       <el-form size="small" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="密码" prop="pass" width="200">
                                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass" width="200">
                                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="cancelHandel">取 消</el-button>
                    <el-button size="small" type="primary" @click="updateHandle">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
        getUserManageList,
        addUserManList,
        deleteUserManList,
        getRolesUserManList,
        getpostManageList,
        addUser_RolesManList,
        addUser_DepsManList,
        searchUser_RolesManList,
        searchUser_DepsManList,
        resetoneUserPasswordList
    } from '../../../services/Manage/postManage.js'
import {mapState} from 'vuex'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            loading: true,     //页面加载
            minBtns:['Add'],   //本页按钮
            allBtns:[],    // 总按钮
            departmantId:'',  //部门id
            tableData:[],    //表格数据
            heightItem: window.innerHeight - 150, // 计算表格的高度
            handlesActive:true, //是否显示表格的操作,
            form: {},      // 新增弹出框
            dialogFormVisible: false,   //是否显示弹出框
            formIndex:-1,
            oldform : {}, // 取消新增后重置
            dataModel:[],
            timer:false, //定时高度的
            updateIndex:'',
            passwordFlag:true, // 是否展示密码输入框
            activeName: 'first',
            labelPosition: 'right',
            transferDataRloe: [],  //角色权限新增
            Rloevalue: [], //用户的角色
            transferDataDep:[],  // 用户岗位新增
            Depvalue:  [],    // 用户所在岗位
            AdduserId:'',   // 用户新增后返回的用户id在进行给该用户新增角色，及岗位
            ruleForm: {
                pass: '',
                checkPass: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                // age: [
                //     { validator: checkAge, trigger: 'blur' }
                // ]
            },
            rulesForm:{
                userCode:[
                    { required: true, message: '请输入用户编码', trigger: 'blur' },
                ],
                userName:[
                    { required: true, message: '请输入用户姓名', trigger: 'blur' },                    
                ],
                password:[
                    { required: true, message: '请输入用户密码', trigger: 'blur' },                    
                ],
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },                    
                ]
            },
            elTabFour:false,   //是否展示重置密码框
        }
    },
    computed: {
        ...mapState({
            btns: state => state.btns,
            userId:state => state.user.userId
        })
    },
    watch: {
        heightItem(val) {
            if (!this.timer) {
                    this.heightItem = val
                    this.timer = true
                    const that = this
                    setTimeout(function() {
                    that.timer = false
                }, 400)
            }
        }
    },
    created(){
        // console.log(this.btns)
        // console.log(this.userId)
        this.btns.map((item,index)=>{
            if(this.minBtns.indexOf(item.name) != -1){
                this.allBtns.push({
                    'name':item.name,
                    'value':item.value
                })
            }
        })
        this.$center.$on('user-event',(value)=>{
            if(value != this.departmantId){
                this.departmantId = value;
                getUserManageList(this.departmantId).then((result) => {
                    if(result.success){
                        this.tableData = result.result;
                        this.loading = false
                    }else{
                        this.loading = false
                        this.$message({
                            type: 'error',
                            message: '加载失败!'
                        })
                    }
                });
            }
        })
        getRolesUserManList().then((result)=>{  //获取新增角色权限
                this.transferDataRloe = result.result
        })
        getpostManageList('').then((result) => {   // 获取所有岗位权限
            this.transferDataDep = result.result;
        });
       
    },
    methods: {
        handleClick(tab, event) {   //切换新增标签栏的事件
            if(tab.name == 'four'){
                 this.$refs.ruleForm.resetFields();
            }
        },
        toggle(val){
            if(val == "Add"){
                this.addTaskHandle();
            }
        },
        addTaskHandle() {   //新增功能
            this.form = {
                    userCode:'',   //用户编号
                    userName:'',   //用户姓名
                    password:'',   //用户密码
                    mail:'',        // 邮箱号
                    mobile:'',    // 手机号
                    enabled:'1'    //是否有效
            };
            this.Rloevalue = [];
            this.Depvalue = []
            this.dialogFormVisible = true;
            this.passwordFlag = true;
            this.elTabFour = false;
            this.activeName = 'first'            
            console.log(this.form)
        },
        // 取消新增操作
        cancelHandel(){
            this.dialogFormVisible = false;
            this.activeName = 'first'
            this.$refs['userManageFormLog'].resetFields();
            for(var m in this.form){
                this.form[m] = this.oldform[m]
            }
        },
        // 确定新增数据
        updateHandle(){
            // 重置密码
            if(this.ruleForm.pass != '' && this.ruleForm.checkPass != ''){
                resetoneUserPasswordList(this.updateIndex,this.ruleForm.pass).then((result)=>{
                    console.log(result)
                })
            }
            if(this.Depvalue.length > 0 && this.form.userName != '' && this.form.userName != ''){
                this.updateIndex = this.updateIndex ? this.updateIndex : ''
                let obj = {
                        id:this.updateIndex,
                        userCode:this.form.userCode,   //用户编号
                        userName:this.form.userName,   //用户姓名
                        password:this.form.password,   //用户密码
                        mail:this.form.mail,        // 邮箱号
                        mobile:this.form.mobile,    // 手机号
                        enabled:this.form.enabled,    //是否有效
                        userId:this.userId   // 登录人（用户ID）
                }
                this.dialogFormVisible = false
                this.form.departmantId = this.departmantId;
                addUserManList(obj).then((result)=>{    // 用户新增
                    if(result.success){
                        this.AdduserId = result.result;
                        // this.AdduserId = this.updateIndex ?  this.updateIndex : ''
                        let roleval = JSON.stringify([...this.Rloevalue])
                        addUser_RolesManList(this.AdduserId,roleval).then((result)=>{    // 用户-角色新增
                            if(result.success){
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '用户角色错误，添加失败!'
                                })
                            }
                        })
                        let depval = JSON.stringify([...this.Depvalue])
                        addUser_DepsManList(this.AdduserId,depval).then((result)=>{    // 用户-岗位新增
                            if(result.success){
                                getUserManageList(this.departmantId).then((result) => {
                                    this.tableData = result.result;
                                });
                                this.$message({
                                    type: 'success',
                                    message: '成功!'
                                })
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '添加失败!'
                                })
                            }
                        }) 
                    }else{
                        this.$message({
                            type: 'error',
                            message: '添加失败!'
                        })
                    }
                })

                
            }else{
                this.$message({
                    type: 'warning',
                    message: '用户信息及岗位不能为空！'
                })
            }
            
        },
        // 表格修改
        handleEdit(index, row) {
            this.activeName = 'first'
            this.updateIndex = this.tableData[index].id;
            this.form = this.tableData[index];
            this.passwordFlag = false;
            searchUser_RolesManList(this.updateIndex).then((result)=>{
                var _this = this;
                result.result.map((item,index)=>{
                    _this.Rloevalue.push(item.id)
                })

            })
            searchUser_DepsManList(this.updateIndex).then((result) =>{
                var _this = this;
                result.result.map((item,index)=>{
                    _this.Depvalue.push(item.id)
                })
            })
            this.oldform = {...this.tableData[index]}
            this.formIndex = index;
            this.elTabFour = true;
            this.ruleForm.pass = '';
            this.ruleForm.checkPass = '';
            this.dialogFormVisible = true;

        },
        // 表格删除数据
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // this.tableData.splice(index, 1)
                deleteUserManList(this.tableData[index].id).then((result)=>{
                        if(result.success){
                            getUserManageList(this.departmantId).then((result) => {
                                this.tableData = result.result;
                            });
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }else{
                            this.$message({
                                type: 'success',
                                message: '删除失败!'
                            })
                        }
                })
               
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                })
            })
        },
        // submitForm(formName) {
        //     console.log(this.ruleForm)
        //     console.log(formName)
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             console.log(valid)
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // }
    },
    mounted() {
        const that = this
        window.onresize = () => {   //用于处理
            return (() => {
                that.heightItem = window.innerHeight - 185
            })()
        }
  }
}
</script>

<style lang="scss">
.userManageBox{
     .postButtons{
        width:100%;
        height: 28px;
        padding:5px 10px;
        border-bottom: 1px solid rgb(235, 238, 245);
        .el-button--mini, .el-button--mini.is-round{
            padding:6px;
        }
    }
    .postTable{
        padding:6px;
        .el-button--mini, .el-button--mini.is-round{
            padding:6px;
        }
    }
    
    .el-table th.gutter{
        display: table-cell !important;
    }
    #userDialog{
        .el-dialog__body{
            padding:5px 30px;
        }
        .el-transfer-panel{
            width:39%;
        }
        .el-transfer-panel__item.el-checkbox{
            width:90%;
        }
        .el-checkbox{
            margin-right:0;
        }
        .el-tab-paneFour{
            .el-form{
                width:288px !important;
            }
        }
        .el-input--suffix .el-input__inner{
            padding-right: 15px;
        }
        
       
    }
   
    .el-form-item{
        min-width: 45%;
    }
}
   
</style>
