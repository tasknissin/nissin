<template>
    <div id="menuPage">
        <el-row class="elrow">
            <el-button type="primary" size='mini' icon="el-icon-circle-plus" class="elbutton addbtn" @click="addMenu">增加
            </el-button>
            <el-button type="primary" size='mini' icon="el-icon-edit" class="elbutton addbtn" @click="updataMenu">修改
            </el-button>
            <el-button type="danger" size='mini' icon="el-icon-delete" class="elbutton addbtn" @click="deleteclick"> 删除
            </el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form :model="resultData" ref="resultData" :rules="rules">
                    <el-form-item label="菜单编号" :label-width="formLabelWidth" class="formitem" prop="menuCode">
                        <el-input v-model="resultData.menuCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单名称" :label-width="formLabelWidth" class="formitem" prop="menuName">
                        <el-input v-model="resultData.menuName"></el-input>
                    </el-form-item>
                    <el-form-item label="父级菜单" :label-width="formLabelWidth" class="formitem" prop="parentId">
                        <el-select v-model="resultData.parentId" placeholder="请选择父级部门">
                            <el-option key="#" label="根节点" value="#">
                            </el-option>
                            <el-option v-for="item in options" :key="item.id" :label="item.menuName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否有效" :label-width="formLabelWidth" class="formitem">
                        <el-checkbox v-if="resultData.enabled=1" checked="checked" v-model="checked">是否有效</el-checkbox>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth" class="formitem" prop="type">
                        <el-select v-model="resultData.type" @change="qh($event)" placeholder="请选择类型"
                            :disabled="disabled">
                            <el-option label="菜单" value="menu"></el-option>
                            <el-option label="按钮" value="button"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="type" label="图标" :label-width="formLabelWidth" class="formitem" prop="icon">
                        <el-input v-model="resultData.icon"></el-input>
                    </el-form-item>
                    <el-form-item v-if="type" label="路由" :label-width="formLabelWidth" class="formitem">
                        <el-input v-model="resultData.url"></el-input>
                    </el-form-item>
                    <el-form-item v-if="type" label="位置" :label-width="formLabelWidth" class="formitem" prop="location">
                        <el-select v-model="resultData.location" placeholder="请选择位置">
                            <el-option label="左侧" value="left"></el-option>
                            <el-option label="顶部" value="top"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="type" label="菜单排序" :label-width="formLabelWidth" class="formitem" prop="sortNo">
                        <el-input v-model.number="resultData.sortNo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('resultData')" size="mini" class="elbutton2" style="margin-top: 11%;
    float: right;    margin-left: .01rem;">提交
                        </el-button>
                        <el-button @click="callOf(resultData)" class="elbutton2" size="mini" style="    margin-top: 11%;
    float: right;">取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!-- <el-form-item label="父级菜单名称" :label-width="formLabelWidth" prop="parentName">
                        <el-input v-model="resultData.parentName"></el-input>
                    </el-form-item> -->
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
                <el-form-item label="父级菜单" :label-width="formLabelWidth">
                    <!-- <el-input v-model="formData.parentId" :disabled="true"></el-input> -->
                    <el-select v-model="formData.parentId" placeholder="请选择父级部门" :disabled="true">
                        <el-option key="#" label="根节点" value="#">
                        </el-option>
                        <el-option v-for="item in options" :key="item.id" :label="item.menuName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="按钮类型" :label-width="formLabelWidth">
                    <el-select v-model="formData.type" placeholder="请选择类型" :disabled="true">
                        <el-option label="菜单" value="menu"></el-option>
                        <el-option label="按钮" value="button"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="t_type" label="图标" :label-width="formLabelWidth">
                    <el-input v-model="formData.icon" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item v-if="t_type" label="路由" :label-width="formLabelWidth">
                    <el-input v-model="formData.url" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item v-if="t_type" label="位置" :label-width="formLabelWidth">
                    <el-select v-model="formData.location" placeholder="请选择位置" :disabled="true">
                        <el-option label="左侧" value="left"></el-option>
                        <el-option label="顶部" value="top"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="t_type" label="菜单排序" :label-width="formLabelWidth">
                    <el-input v-model.number="formData.sortNo" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="功能按钮" :label-width="formLabelWidth">
                    <el-checkbox v-for="item in formData.childrenList" :key="item.id" :disabled="true">
                        {{item.menuName}}</el-checkbox>
                </el-form-item>

                <el-form-item label="" :label-width="formLabelWidth">
                    <el-checkbox v-if="formData.enabled=1" checked="checked" v-model="checked" :disabled="true">是否有效
                    </el-checkbox>
                </el-form-item>

            </el-form>
        </app-content>
    </div>
</template>

<script>
    import {
        AddAndUpdatamenu,
        menuGetData,
        deleteMenu,
        getAllmenuinfo,
        sysMenuYZ,
        getMenuTree,
        menuVerificationRepeat

    } from '../../../services/rwfkPage.js'
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入菜单编码'));
            //     } else {
            //         if (this.rules.menuCode !== '') {
            //             console.log("aaa")
            //             // this.$refs.rules.validateField('menuCode');
            //         }
            //         callback();
            //     }
            // };
            var menuKeyFlag = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('编码不能为空！'));
                } else {
                    if (this.rules.menuCode != value) {
                        menuVerificationRepeat(value, this.resultData.id).then(result => {
                            console.log(result)
                            if (result.data == false) {
                                return callback(new Error('编码已存在！'));
                            } else {
                                return callback()
                            }
                        })
                    }

                }
            };
            return {
                formData: {},
                type: false,
                t_type: false,
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
                    url: '',
                    location: '',
                },
                title: '菜单新增',
                rules: {

                    menuCode: [{
                        trigger: 'blur',
                        validator: menuKeyFlag,
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
                        message: '必须是数字',
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
                    // url: [{
                    //     required: true,
                    //     message: '请输入路由地址',
                    //     trigger: 'blur'
                    // }],
                    location: [{
                        required: true,
                        message: '请选择按钮位置',
                        trigger: 'change'
                    }],
                },
                dialogFormVisible: false,
                checked: false,
                formLabelWidth: '120px',
                id: '',
                options: [],
                disabled: false

            }
        },
        computed: mapState({
            menudataId(state) {
                return state.menuManage.treeid;
            }
        }),
        mounted() {
            let id = this.$store.state.menuManage.treeid;
            this.getmenuGetData(id);
            this.getUserDataParent();
        },
        methods: {
            getmenuGetData(id) {
                //console.log(this.$store.state.id);
                menuGetData(id).then((data) => {
                    //console.log(data)
                    this.formData = {
                        ...data.data.result
                    };
                    if (this.formData.type == "menu") {
                        this.t_type = true
                    } else {
                        this.t_type = false
                    }

                });
                this.testHeight = document.querySelector('body').offsetHeight - 90;
            },
            getUserDataParent() {
                getAllmenuinfo().then((data) => {
                    // this.options = data.data.result;
                    var xldata = [];
                    for (var i = 0; i < data.data.result.length; i++) {
                        if (this.resultData.id != data.data.result[i].id) {
                            xldata.push(data.data.result[i])
                        }
                    }
                    this.options = xldata;
                });


            },
            //form 表单关闭
            callOf(formName) {
                this.$refs['resultData'].resetFields();
                this.dialogFormVisible = false;

                this.resultData.id = '';
                this.resultData.menuCode = '';
                this.resultData.menuName = '';
                this.resultData.parentId = '';
                this.resultData.enabled = '';
                this.resultData.sortNo = '';
                this.resultData.icon = '';
                this.resultData.url = '';
                this.resultData.location = '';
                this.resultData.type = '';
                this.options = [];
                //  location.reload();
                this.type = false;
                this.getmenuGetData(this.$store.state.menuManage.treeid)

            },
            qh(event) {
                if (this.title == "菜单新增") {
                    if (event == "menu") {
                        this.type = true;
                    } else {
                        this.type = false;
                    }

                    this.resultData.sortNo = '';
                    this.resultData.icon = '';
                    this.resultData.url = '';
                    this.resultData.location = '';
                } else {
                    if (event == "menu") {
                        this.type = true;
                        this.resultData.sortNo = this.formData.sortNo;
                        this.resultData.icon = this.formData.icon;
                        this.resultData.url = this.formData.url;
                        this.resultData.location = this.formData.location;
                    } else {
                        this.type = false;
                        this.resultData.sortNo = '';
                        this.resultData.icon = '';
                        this.resultData.url = '';
                        this.resultData.location = '';

                    }
                }


            },
            //新增菜单
            addMenu() {
                this.title = "菜单新增"
                this.disabled = false;
                this.dialogFormVisible = true;
                this.resultData.id = '';
                this.resultData.menuCode = '';
                this.resultData.menuName = '';
                this.resultData.parentId = this.formData.parentId;
                this.resultData.enabled = '';
                this.resultData.sortNo = '';
                this.resultData.icon = '';
                this.resultData.url = '';
                this.resultData.location = '';
                this.resultData.type = '';
                this.type = false;
                this.getUserDataParent();
            },
            //修改菜单
            updataMenu() {
                this.title = "菜单修改"
                this.disabled = true;
                this.dialogFormVisible = true;
                this.resultData.id = this.formData.id;
                this.resultData.menuCode = this.formData.menuCode;
                this.resultData.menuName = this.formData.menuName;
                this.resultData.parentId = this.formData.parentId;
                this.resultData.enabled = this.formData.enabled;
                this.resultData.sortNo = this.formData.sortNo;
                this.resultData.icon = this.formData.icon;
                this.resultData.url = this.formData.url;
                this.resultData.location = this.formData.location;
                this.resultData.type = this.formData.type;
                if (this.formData.type == "menu") {
                    this.type = true;
                } else {
                    this.type = false;
                }

                this.getUserDataParent();
            },
            getMenuTreef() {
                getMenuTree().then((data) => {
                    this.$emit("MenuheadCallBack", data.data.result)

                });

            },
            onSubmit(form) {
                if (this.checked == true) {
                    this.resultData.enabled = 1;
                } else {
                    this.resultData.enabled = 0;
                }
                this.resultData.userId = this.$store.state.user.userId;
                const formData = this.resultData;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // console.log(formData);
                        AddAndUpdatamenu(formData).then((data) => {
                            if (data.data.result) {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.dialogFormVisible = false;
                            }
                            this.getMenuTreef();
                            this.getmenuGetData(this.$store.state.menuManage.treeid);
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

                // deleteMenu(this.resultData.id).then((data) => {
                //     alert("删除成功")

                // });
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sysMenuYZ(this.$store.state.menuManage.treeid).then((data) => {
                        if (data.data.success == true) {
                            deleteMenu(this.$store.state.menuManage.treeid).then((result) => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.getMenuTreef();
                                this.getmenuGetData(this.$store.state.menuManage.treeid);
                            });
                        } else {
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


            }

        },
        watch: {
            menudataId: function (str) {
                this.id = str;
                this.getmenuGetData(str)
            }
        }
    }
</script>
<style scoped>
    @import '../../../../public/css/manage.css';
</style>