<template>
    <div id='departmentPage'>
        <el-row class="elrow">
            <el-button type="primary" size='mini' icon="el-icon-circle-plus" class="elbutton addbtn"
                @click="addDepartment">增加
            </el-button>
            <el-button type="primary" size='mini' icon="el-icon-edit" class="elbutton addbtn" @click="updataDepartment">
                修改
            </el-button>
            <el-button type="danger" size='mini' icon="el-icon-delete" class="elbutton addbtn" @click="deleteclick"> 删除
            </el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible" id="departmentdialog">
                <el-form :model="resultData" ref="resultData" :rules="rules">
                    <el-form-item label="部门编号" :label-width="formLabelWidth" class="formitem" prop="departmant">
                        <el-input v-model="resultData.departmant"></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称" :label-width="formLabelWidth" class="formitem" prop="departmantName">
                        <el-input v-model="resultData.departmantName"></el-input>
                    </el-form-item>
                    <el-form-item label="父级部门编号" :label-width="formLabelWidth" class="formitem" prop="parentId">
                        <el-select v-model="resultData.parentId" placeholder="请选择父级部门编号">
                            <el-option key="#" label="根节点" value="#">
                            </el-option>
                            <el-option v-for="item in options" :key="item.id" :label="item.departmantName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <!-- <el-input v-model="resultData.parentId"></el-input> -->
                    </el-form-item>
                    <!-- <el-form-item label="父级部门名称" :label-width="formLabelWidth" prop="parentName">
                        <el-input v-model="resultData.parentName"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="部门类型" :label-width="formLabelWidth" prop="departmantType">
                        <el-input v-model="resultData.departmantType"></el-input>
                    </el-form-item> -->
                    <el-form-item label="部门负责人" :label-width="formLabelWidth" class="formitem">
                        <el-input v-model="resultData.departmantOwner"></el-input>
                    </el-form-item>
                    <el-form-item label="部门排序" :label-width="formLabelWidth" class="formitem" prop="sortNo">
                        <el-input v-model.number="resultData.sortNo"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效" :label-width="formLabelWidth" class="formitem">
                        <el-checkbox v-if="resultData.enabled=1" checked="checked" v-model="checked">是否有效</el-checkbox>
                    </el-form-item>

                    <el-form-item class="formitem_btn">
                        <el-button type="primary" class="elbutton2" @click="onSubmit('resultData')">提交</el-button>
                        <el-button @click="callOf('rules')" class="elbutton2" style="margin-right: .1rem;">取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </el-row>
        <app-content>
            <!-- //:resultObj=resultObj -->
            <el-form :data="formData" ref="formData">
                <el-form-item label="部门编号" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmant" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="父级部门编号" :label-width="formLabelWidth">
                    <el-select v-model="formData.parentId" placeholder="请选择父级部门编号" :disabled="true" style="width:50%">
                        <el-option key="#" label="根节点" value="#">
                        </el-option>
                        <el-option v-for="item in options" :key="item.id" :label="item.departmantName" :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="formData.parentId" :disabled="true"></el-input> -->
                </el-form-item>
                <!-- <el-form-item label="父级部门名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.parentName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门类型" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantType" :disabled="true"></el-input>
                </el-form-item> -->
                <el-form-item label="排序编码" :label-width="formLabelWidth">
                    <el-input v-model="formData.sortNo" :disabled="true"></el-input>
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
        deleteDepartment,
        getAlldepartsinfo,
        sysDepartmantYZ,
        getDepartmentTree,
        depatmentYZ,
        depatmentgqGLGX

    } from '../../../services/rwfkPage.js'
    import {
        mapState
    } from 'vuex'
    // import ' ../../../public/css/manage.css'
    export default {
        data() {
            return {
                formData: {},
                resultData: {
                    id: '',
                    departmant: '',
                    departmantName: '',
                    parentId: '',
                    // parentName: '',
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
                    // parentName: [{
                    //     required: true,
                    //     message: '请输入父级部门名称',
                    //     trigger: 'blur'
                    // }],
                    departmantType: [{
                        required: true,
                        message: '请输入部门类型',
                        trigger: 'blur'
                    }],
                    sortNo: [{
                        required: true,
                        message: '请输入部门编码',
                    }, {
                        type: 'number',
                        message: '必须是数字',
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
                id: '',
                options: []

            }
        },
        computed: mapState({
            dataId(state) {
                return state.department.treeid
            }
        }),
        mounted() {
            let id = this.$store.state.department.treeid;
            this.getDepartmentData(id);
            this.getUserDataParent();
        },
        methods: {
            getDepartmentData(id) {
                this.formData = {};
                getDepartment(id).then((data) => {
                    this.formData = {
                        ...data.data.result
                    };
                    //console.log(this.formData)
                });
                this.testHeight = document.querySelector('body').offsetHeight - 90;
            },
            getUserDataParent() {
                getAlldepartsinfo().then((data) => {
                    var xldata = [];
                    for (var i = 0; i < data.data.result.length; i++) {
                        if (this.resultData.id != data.data.result[i].id) {
                            xldata.push(data.data.result[i])
                        }
                    }
                    this.options = xldata;
                });


            },
            addDepartment() {
                this.title = "部门新增"
                this.dialogFormVisible = true;
                this.resultData.id = '';
                this.resultData.parentId = this.$store.state.department.treeid;
                this.options = [];
                this.resultData.departmant = '';
                this.resultData.departmantName = '';
                this.resultData.departmantType = '';
                this.resultData.departmantOwner = '';
                this.resultData.enabled = '';
                this.resultData.sortNo = '';
                this.getUserDataParent();
            },
            updataDepartment() {
                this.title = "部门修改"
                this.dialogFormVisible = true;
                this.options = [];
                this.resultData.id = this.formData.id;
                this.resultData.departmant = this.formData.departmant;
                this.resultData.departmantName = this.formData.departmantName;
                this.resultData.parentId = this.formData.parentId;
                // this.resultData.parentName = this.formData.parentName;
                this.resultData.departmantType = this.formData.sortNo;
                this.resultData.departmantOwner = this.formData.departmantOwner;
                this.resultData.enabled = this.formData.enabled;
                this.resultData.sortNo = this.formData.sortNo;
                this.getUserDataParent();
            },
            //树形菜单
            getTreeData() {
                getDepartmentTree().then((data) => {
                    this.$emit('headCallBack', data.data.result);
                    this.getDepartmentData(data.data.result[0].id);
                });
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
                            });
                            this.dialogFormVisible = false;
                            this.getTreeData();
                            //this.$parent.getbmTree

                        });
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            deleteclick() {
                this.id = this.$store.state.department.treeid;
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((action) => {
                    depatmentYZ(this.id).then((data) => {
                        if (data.data.success) {
                            depatmentgqGLGX(this.id).then((result) => {
                                if (result.data.success) {

                                    deleteDepartment(this.id).then((res) => {
                                        if (res.data.success) {
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功'
                                            })
                                            this.getTreeData();
                                            // this.getDepartmentData(this.$store.state.department.treeid);
                                        } else {
                                            this.$message({
                                                type: 'info',
                                                message: '删除失败'
                                            })
                                        }
                                    });
                                } else {
                                    this.$message({
                                        type: 'info',
                                        message: result.data.message
                                    })

                                }
                            });

                        } else {
                            this.$message({
                                type: 'info',
                                message: data.data.message
                            })
                        }


                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })

            },
            //form 表单关闭
            callOf(formName) {
                this.$refs['resultData'].resetFields();
                this.dialogFormVisible = false;

                this.options = [];
                this.resultData.id = '';
                this.resultData.departmant = '';
                this.resultData.departmantName = '';
                this.resultData.parentId = '';
                // this.resultData.parentName = this.formData.parentName;
                this.resultData.departmantType = '';
                this.resultData.departmantOwner = '';
                this.resultData.enabled = '';
                this.resultData.sortNo = '';
                // location.reload();

                this.getDepartmentData(this.$store.state.department.treeid)
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
                this.getDepartmentData(str)
            },


        }
    }
</script>

<style lang="scss" scoped>
    // @import '../../../../public/css/manage.scss';
    #departmentPage {
        .elrow {
            padding-left: 4px;
            border-bottom: 1px solid #ebe9e9;
            height: 40px;
            padding-top: 5px;
        }

        .elbutton {
            margin-top: 2px;
        }

        .formitem {
            width: 50%;
            position: relative;
            float: left;
            z-index: 11;
        }

        .formitem_btn {
            width: 100%;
            text-align: right;
        }

        .elbutton2 {
            height: 30px;
            line-height: 7px;
            margin-left: 10px;
        }

        .addbtn {
            width: 58px;
            text-align: center;
            padding: 6px;
        }

        .el-select {
            display: inline-block;
            position: relative;
            width: 100%;
        }

        .el-input {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 50%;
        }

        .el-dialog .el-input {
            width: 100% !important;
        }

        #departmentdialog {
            .el-select {

                width: 100%;
            }
        }
    }
</style>