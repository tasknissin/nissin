<template>
    <div>
        <el-row>
            <el-button type="primary" icon="el-icon-circle-plus" @click="addDepartment">增加</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="updataDepartment">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteclick"> 删除</el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form :model="resultData" ref="resultData" :rules="rules">

                    <el-form-item label="菜单编号" :label-width="formLabelWidth" prop="menuCode">
                        <el-input v-model="resultData.menuCode"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
                        <el-input v-model="resultData.menuName"></el-input>
                    </el-form-item>
                    <el-form-item label="父级菜单编号" :label-width="formLabelWidth" prop="parentId">
                        <el-input v-model="resultData.parentId"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="父级菜单名称" :label-width="formLabelWidth" prop="parentName">
                        <el-input v-model="resultData.parentName"></el-input>
                    </el-form-item> -->

                    <el-form-item label="是否有效" :label-width="formLabelWidth">
                        <el-checkbox v-if="resultData.enabled=1" checked="checked" v-model="checked">是否有效</el-checkbox>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                        <el-select v-model="resultData.type" @change="qh($event, item)" placeholder="请选择类型">
                            <el-option label="菜单" value="menu"></el-option>
                            <el-option label="按钮" value="button"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="type" label="图标" :label-width="formLabelWidth" prop="icon">
                        <el-input v-model="resultData.icon"></el-input>
                    </el-form-item>
                    <el-form-item item v-if="type" label="路由" :label-width="formLabelWidth" prop="route">
                        <el-input v-model="resultData.route"></el-input>
                    </el-form-item>
                    <el-form-item item v-if="type" label="位置" :label-width="formLabelWidth" prop="location">
                        <el-select v-model="resultData.location" placeholder="请选择位置">
                            <el-option label="left" value="left"></el-option>
                            <el-option label="top" value="top"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item item v-if="type" label="菜单排序" :label-width="formLabelWidth" prop="sortNo">
                        <el-input v-model="resultData.sortNo"></el-input>
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
                <el-form-item label="菜单编号" :label-width="formLabelWidth">
                    <el-input v-model="formData.menuCode" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.menuName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="父级菜单编号" :label-width="formLabelWidth">
                    <el-input v-model="formData.parentId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="功能按钮" :label-width="formLabelWidth">
                    <el-checkbox v-for="item in formData.childrenList" :key="item.id" checked="checked" :disabled="true" >
                        {{item.menuName}}</el-checkbox>

                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-checkbox v-if="formData.enabled=1" checked="checked"  v-model="checked"  :disabled="true">是否有效</el-checkbox>
                </el-form-item>

            </el-form>
        </app-content>
    </div>
</template>

<script>
    import {
        AddAndUpdatamenu,
        menuGetData,
        deleteMenu

    } from '../../../services/rwfkPage.js'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                formData:{},
                type: false,
                resultData: {
                    id: '',
                    userId: '',
                    type: '',
                    menuCode: '',
                    menuName: '',
                    parentId: '',
                    sortNo: '',
                    enabled: '',
                    icon: '',
                    route: '',
                    location: '',



                },
                title: '菜单新增',
                rules: {

                    menuCode: [{
                        required: true,
                        message: '请输入菜单编码',
                        trigger: 'blur'
                    }],
                    menuName: [{
                        required: true,
                        message: '请输入菜单名称',
                        trigger: 'blur'
                    }],
                    parentId: [{
                        required: true,
                        message: '请输入父级菜单编码',
                        trigger: 'blur'
                    }],

                    sortNo: [{
                        required: true,
                        message: '请输入排序编码',
                    }, {
                        type: 'number',
                        message: '必须是数字'
                    }],
                    enabled: [{
                        required: true,
                        message: '请选择是否有效',
                        trigger: 'change'
                    }],
                    type: [{
                        required: true,
                        message: '请选择按钮类型',
                        trigger: 'change'
                    }],
                    icon: [{
                        required: true,
                        message: '请输入按钮图标地址',
                        trigger: 'blur'
                    }],
                    route: [{
                        required: true,
                        message: '请输入路由地址',
                        trigger: 'blur'
                    }],
                    location: [{
                        required: true,
                        message: '请选择按钮位置',
                        trigger: 'change'
                    }],
                },
                dialogFormVisible: false,
                checked: false,
                formLabelWidth: '120px',
                id: ''

            }
        },
        computed: mapState({
            menudataId(state){
                return state.menuManage.treeid;
            }
        }),
        mounted() {
            let id = this.$store.state.menuManage.treeid;
            this.created(id)
        },
        methods: {
            created(id) {
                //console.log(this.$store.state.id);
                menuGetData(id).then((data) => {
                    //console.log(data)
                    this.formData ={...data.data.result} ;
                });
                this.testHeight = document.querySelector('body').offsetHeight - 90;
            },
            //form 表单关闭
             callOf(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.created(this.$store.state.menuManage.treeid)
                  
            },
            qh(event, item) {
                console.log(event)
                if (event == "menu") {
                    this.type = true
                } else {
                    this.type = false
                }

            },
            addDepartment() {
                this.title = "菜单新增"
                this.dialogFormVisible = true;
                this.resultData.id = '';
                this.resultData.menuCode = '';
                this.resultData.menuName = '';
                this.resultData.parentId = '';
                this.resultData.enabled = '';
                this.resultData.sortNo = '';
                this.resultData.icon = '';
                this.resultData.route = '';
                this.resultData.location = '';
                this.resultData.type = '';
            },
            updataDepartment() {
                this.title = "菜单修改"
                this.dialogFormVisible = true;
                this.resultData.id = this.formData.id;
                this.resultData.menuCode = this.formData.menuCode;
                this.resultData.menuName = this.formData.menuName;
                this.resultData.parentId = this.formData.parentId;
                this.resultData.enabled = this.formData.enabled;
                this.resultData.sortNo = this.formData.sortNo;
                this.resultData.icon = this.formData.icon;
                this.resultData.route = this.formData.route;
                this.resultData.location = this.formData.location;
                this.resultData.type = this.formData.type;
                this.type = this.formData.type;
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
                        AddAndUpdatamenu(formData).then((data) => {
                            if (data.data.result) {
                                alert("操作成功成功！")
                            }
                            //alert("成功！")
                        });
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            deleteclick() {

                deleteMenu(this.resultData.id).then((data) => {
                    alert("删除成功")

                });


            }

        },
        watch: {
            menudataId: function (str) {
                this.id = str;
                this.created(str)
            }
        }
    }
</script>

<style>

</style>