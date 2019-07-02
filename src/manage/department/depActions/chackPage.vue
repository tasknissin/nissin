<template>
    <div>
        <el-row class="elrow">
            <el-button type="primary" size='small' icon="el-icon-circle-plus" class="elbutton" @click="addDepartment">增加
            </el-button>
            <el-button type="primary" size='small' icon="el-icon-edit" class="elbutton" @click="updataDepartment">修改
            </el-button>
            <el-button type="danger" size='small' icon="el-icon-delete" class="elbutton" @click="deleteclick"> 删除
            </el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form :model="resultData" ref="resultData" :rules="rules">
                    <el-form-item label="部门编号" :label-width="formLabelWidth" class="formitem" prop="departmant">
                        <el-input v-model="resultData.departmant" style="width: 0.43rem;"></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称" :label-width="formLabelWidth" class="formitem" prop="departmantName">
                        <el-input v-model="resultData.departmantName" style="width: 0.43rem;"></el-input>
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
                        <el-input v-model="resultData.departmantOwner" style="width: 0.43rem;"></el-input>
                    </el-form-item>
                    <el-form-item label="部门排序" :label-width="formLabelWidth" class="formitem" prop="sortNo">
                        <el-input v-model.number="resultData.sortNo" style="width: 0.43rem;"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效" :label-width="formLabelWidth" class="formitem">
                        <el-checkbox v-if="resultData.enabled=1" checked="checked" v-model="checked">是否有效</el-checkbox>
                    </el-form-item>

                    <el-form-item class="formitem_btn">
                        <el-button type="primary" class="elbutton2" @click="onSubmit('resultData')">提交</el-button>
                        <el-button @click="callOf(resultData)" class="elbutton2" style="margin-right: .1rem;">取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </el-row>
        <app-content>
            <!-- //:resultObj=resultObj -->
            <el-form :data="formData" ref="formData">
                <el-form-item label="部门编号" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmant" :disabled="true" style="width: 0.43rem;"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantName" :disabled="true" style="width: 0.43rem;"></el-input>
                </el-form-item>
                <el-form-item label="父级部门编号" :label-width="formLabelWidth">
                    <el-select v-model="formData.parentId" placeholder="请选择父级部门编号" :disabled="true">
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
                    <el-input v-model="formData.departmantType" :disabled="true" style="width: 0.43rem;"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人" :label-width="formLabelWidth">
                    <el-input v-model="formData.departmantOwner" :disabled="true" style="width: 0.43rem;"></el-input>
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
        sysDepartmantYZ

    } from '../../../services/rwfkPage.js'
    import {
        mapState
    } from 'vuex'
    import ' ../../../public/css/manage.css'
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
            this.created(id);
            this.getUserDataParent();
        },
        methods: {
            created(id) {
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
                this.options = [];
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
                this.resultData.departmantType = this.formData.departmantType;
                this.resultData.departmantOwner = this.formData.departmantOwner;
                this.resultData.enabled = this.formData.enabled;
                this.resultData.sortNo = this.formData.sortNo;
                this.getUserDataParent();
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
                        });
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            deleteclick() {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sysDepartmantYZ(this.$store.state.department.treeid).then((data) => {
                        if (data.data.success == true) {
                            deleteDepartment(this.$store.state.department.treeid).then((result) => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                            });
                        }else{
                            this.$message({
                                    type: 'success',
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
                this.dialogFormVisible = false;
                this.options = [];
                // this.$refs[formName].resetFields();
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

<style scoped>


</style>