<template>
    <div>
        <el-row>
            <el-button type="primary" icon="el-icon-circle-plus" @click="addDepartment">增加</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="updataDepartment">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteclick"> 删除</el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form  :model="resultData"  ref="resultData"  :rules="rules">
                    <el-form-item label="部门编号" :label-width="formLabelWidth" prop="departmant">
                        <el-input v-model="resultData.departmant"></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称" :label-width="formLabelWidth" prop="departmantName">
                        <el-input v-model="resultData.departmantName"></el-input>
                    </el-form-item>
                    <el-form-item label="父级部门编号" :label-width="formLabelWidth" prop="parentId">
                        <el-input v-model="resultData.parentId"></el-input>
                    </el-form-item>
                    <el-form-item label="父级部门名称" :label-width="formLabelWidth" prop="parentName">
                        <el-input v-model="resultData.parentName"></el-input>
                    </el-form-item>
                    <el-form-item label="部门类型" :label-width="formLabelWidth" prop="departmantType">
                        <el-input v-model="resultData.departmantType"></el-input>
                    </el-form-item>
                    <el-form-item label="部门负责人" :label-width="formLabelWidth">
                        <el-input v-model="resultData.departmantOwner"></el-input>
                    </el-form-item>
                    <el-form-item label="部门排序" :label-width="formLabelWidth" prop="sortNo">
                        <el-input v-model="resultData.sortNo"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效" :label-width="formLabelWidth">
                        <el-checkbox v-if="resultData.enabled=1" checked="checked" v-model="checked">是否有效</el-checkbox>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('resultData')">提交</el-button>
                        <el-button @click="callOf(resultData)">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </el-row>
        <app-content>
            <!-- //:resultObj=resultObj -->
            <el-form :data="formData" ref="formData">
                <el-form-item label="部门编号" :label-width="formLabelWidth">
                    <el-input  v-model="formData.departmant" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="父级部门编号" :label-width="formLabelWidth">
                    <el-input v-model="formData.parentId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="父级部门名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.parentName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门类型" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantType" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="排序编码" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantType" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantOwner" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="是否有效" :label-width="formLabelWidth">
                    <el-checkbox v-if="resultData.enabled=1" checked="checked" v-model="checked" :disabled="true"> 是否有效
                    </el-checkbox>
                    <!-- <el-checkbox v-if="formData.enabled=1" checked="true" >是否有效</el-checkbox> -->
                </el-form-item>
            </el-form>
        </app-content>
    </div>
</template>

<script>
    import {
        AddDepartment,
        getDepartment,
        deleteDepartment

    } from '../../../services/rwfkPage.js'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                formData: {},
                resultData: {
                    id: '',
                    departmant: '',
                    departmantName: '',
                    parentId: '',
                    parentName: '',
                    departmantType: '',
                    departmantOwner: '',
                    sortNo: '',
                    enabled: '',
                    userId: '',

                },
                title: '部门新增',
                rules: {
                    departmant: [{
                        required: true,
                        message: '请输入部门编码',
                        trigger: 'blur'
                    }],
                    departmantName: [{
                        required: true,
                        message: '请输入部门名称',
                        trigger: 'blur'
                    }],
                    parentId: [{
                        required: true,
                        message: '请输入父级部门编码',
                        trigger: 'blur'
                    }],
                    parentName: [{
                        required: true,
                        message: '请输入父级部门名称',
                        trigger: 'blur'
                    }],
                    departmantType: [{
                        required: true,
                        message: '请输入部门类型',
                        trigger: 'blur'
                    }],
                    sortNo: [{
                        required: true,
                        message: '请输入部门排序',
                        trigger: 'blur'
                    }],
                    enabled: [{
                        required: true,
                        message: '请选择是否有效',
                        trigger: 'change'
                    }]
                },
                dialogFormVisible: false,
                checked: false,
                formLabelWidth: '120px',
                id: ''

            }
        },
        computed:mapState({
            dataId(state){
                return state.department.treeid
            }
        }),
        mounted() {
            let id = this.$store.state.department.treeid;
            this.created(id)
        },
        methods: {
            created(id) {
                getDepartment(id).then((data) => {
                    this.formData ={...data.data.result} ;
                    //console.log(this.formData)
                });
                this.testHeight = document.querySelector('body').offsetHeight - 90;
            },
            addDepartment() {
                this.title = "部门新增"
                this.dialogFormVisible = true;
                this.resultData.id = '';
            },
            updataDepartment() {
                this.title = "部门修改"
                this.dialogFormVisible = true;
                this.resultData.id = this.formData.id;
                this.resultData.departmant = this.formData.departmant;
                this.resultData.departmantName = this.formData.departmantName;
                this.resultData.parentId = this.formData.parentId;
                this.resultData.parentName = this.formData.parentName;
                this.resultData.departmantType = this.formData.departmantType;
                this.resultData.departmantOwner = this.formData.departmantOwner;
                this.resultData.enabled = this.formData.enabled;
                this.resultData.sortNo = this.formData.sortNo;
            },
            onSubmit(form) {
                if (this.checked == true) {
                    this.resultData.enabled = 1;
                } else {
                    this.resultData.enabled = 0;
                }
                this.resultData.userId = '1';
                const formData = this.resultData;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // console.log(formData);
                        AddDepartment(formData).then((data) => {

                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            })
                        });
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            deleteclick() {

                deleteDepartment(this.resultData.id).then((data) => {
                    alert("删除成功")
                });
            },
            //form 表单关闭
            callOf(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                // getRoleData('1', this.pagesize).then((data) => {
                //     this.tableData = data.data.result;
                //     this.total = this.tableData.length;
                // });
                 this.created(this.$store.state.department.treeid)
            },
            proving1(e) {
                var boolean = new RegExp("^\+?[1-9][0-9]*$").test(e.target.value);
                if (!boolean) {
                    alert("请输入正整数");
                    e.target.value = ''
                }

            }

        },
        watch: {
             dataId: function (str) {
                this.id = str;
                this.created(str)
            },


        }
    }
</script>

<style>

</style>