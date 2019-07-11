<template>
    <div style="width:100%;height:100%;" v-loading="loading" element-loading-text="拼命加载中"
        element-loading-background="rgba(255, 255, 255, 1)" id="rolemanegePage">
        <el-row class="elrow">
            <el-button type="primary" size='mini' icon="el-icon-circle-plus" class="elbutton addbtn" @click="addRole">增加
            </el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible" id="roledialog">
                <el-form :model="resultData" ref="resultData" :rules="rules">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" class="formitem" prop="roleName">
                        <el-input v-model="resultData.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效" :label-width="formLabelWidth" class="formitem">
                        <el-select v-model="resultData.enabled" style="width:100%">
                            <el-option value="0" label="无效"></el-option>
                            <el-option value="1" label="有效" checked="checked"></el-option>
                        </el-select>
                        <!-- <el-checkbox v-if="resultData.enabled=1" checked="checked">是否有效</el-checkbox> -->

                    </el-form-item>
                    <el-form-item class="formitem_btn">
                        <el-button type="primary" size="mini" @click="onSubmit('resultData')">提交</el-button>
                        <el-button @click="callOf('rules')" size="mini">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </el-row>
        <div id="tableId1" style="height:60%; margin-top: 5px;">
            <!-- <el-table :row-style="{height:'30px'}" :cell-style="{padding:'0'}"
                :data="tableData" 
                :default-sort="{prop:'date',order:'descending'}" border style="width: 100%; height:80%;font-size:12px">
               

                <el-table-column prop="id" label="ID" width="60" height="10"></el-table-column> -->

            <!-- </el-table> -->

            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" :height="heightItem"
                :max-height="heightItem" border style="width: 100%" :header-cell-style="{padding:'8px 0'}"
                :cell-style="{padding:'5px 0'}">
                <el-table-column type="index" :index="indexMethod(1)" label="序列号" width="120" height="10">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="enabled" label="是否有效"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit"
                            style="width:57px; padding: 5px 0px 5px 0px;" @click="handleEdit(scope.$index, scope.row)">
                            修改
                        </el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"
                            style="width:57px; padding: 5px 0px 5px 0px;"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button type="primary" size="mini" icon="el-icon-edit"
                            style="width:57px; padding: 5px 0px 5px 0px;" @click="addRoleqx(scope.$index, scope.row)">权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total"
                background>
            </el-pagination> -->
            <el-dialog title="权限设置" :visible.sync="dialogFormVisibleqx" id="roledialogqxxg">
                <el-tabs v-model="activeName" v-loading="loading" element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                    @tab-click="handleClick">
                    <el-tab-pane style="min-height:200px;" label="菜单权限" name="first">
                        <el-tree :data="treedata" show-checkbox default-expand-all ref="tree" node-key="id"
                            highlight-current :props="defaultProps" :default-checked-keys="defaultcheckedkeys"
                            :check-strictly="checkstrictly" @node-click="eltreeCheckchange"
                            @check-change="eltreeCheckchange" @check='eltreeCheckchange'>
                        </el-tree>
                    </el-tab-pane>
                    <el-tab-pane style="min-height:200px;" label="分配用户" name="second">
                        <el-transfer v-model="Uservalue" :props="{
                            key: 'id',
                            label: 'userName'
                        }" :titles="['选择用户', '已选用户']" :data="transferUserdata" id='transfer'>
                        </el-transfer>

                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="qxtiqx()">取 消</el-button>
                    <el-button size="small" type="primary" @click="submitqx">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    var XLSX = require('xlsx')
    var FileSaver = require('file-saver')
    import {
        getRoleData,
        addRoleData,
        deleteRoleData,
        getMenuTree,
        getUserData,
        addAndUpduteData,
        addAndUpduteUserData,
        qxtreeDatachecked,
        getroleGJjsID,
    } from '../../services/rwfkPage.js'
    import {
        constants
    } from 'crypto';
    // import ' ./../../public/css/manage.css'
    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                resultData: {
                    roleName: '',
                    enabled: '',
                    id: '',
                    userId: '',
                },
                title: '角色新增',
                rules: {
                    roleName: [{
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur'
                    }]
                },
                spanArr: [],
                multipleSelection: [],
                // total: 100,
                // pagesize: 5,
                // currentPage: 1,
                dialogFormVisible: false,
                dialogFormVisibleqx: false,
                formLabelWidth: '80px',
                form: {},
                value6: '',
                // currentPage3: 1,
                currentIndex: '',
                formIndex: -1,
                activeName: 'first',
                treedata: [],
                defaultProps: {
                    children: 'childrenList',
                    label: 'menuName'
                },
                transferUserdata: [],
                Uservalue: [],
                defaultcheckedkeys: [],
                heightItem: window.innerHeight - 160, // 计算表格的高度
                checkstrictly: true

                // munevalue: []

            };
        },

        mounted() {
            this.getRoledata();

        },
        methods: {
            //默认进来获取数据
            getRoledata() {
                getRoleData('1', this.pagesize).then((data) => {
                    this.tableData = data.data.result;
                    for (var i = 0; i < data.data.result.length; i++) {
                        if (data.data.result[i].enabled == 1) {
                            this.tableData[i].enabled = '有效'
                        } else {
                            this.tableData[i].enabled = '无效'
                        }
                    }
                    this.loading = false;
                    // this.total = this.tableData.length;
                });
                //getRoledata()
            },
            //获取角色数据
            // getRoledata() {
            //     getRoleData('1', this.pagesize).then((data) => {
            //         this.tableData = data.data.result;

            //     });
            // },
            //获取用户信息
            getUserManList(id) {
                getUserData().then((data) => {
                    this.transferUserdata = data.data.result.filter(item => item.userName != "").filter(item =>
                        item.userName != null);
                    this.getRolesGjuserid(id);

                });
            },

            //自动添加序列号
            indexMethod(index) {
                return index++;
            },
            //添加
            addRole() {
                this.title = "菜单新增"
                this.dialogFormVisible = true;
                this.resultData.id = '';
                this.resultData.roleName = '';
                this.resultData.enabled = '';
            },
            //修改
            handleEdit(index, row) {
                this.title = "菜单修改"
                this.form = this.tableData[index]
                this.formIndex = index
                this.currentIndex = index
                this.resultData.id = this.tableData[index].id;
                this.resultData.roleName = this.tableData[index].roleName;
                if (this.tableData[index].enabled == "有效" || this.tableData[index].enabled == "1") {
                    this.resultData.enabled = '1';
                } else {
                    this.resultData.enabled = '0';
                }

                this.dialogFormVisible = true
            },
            //行删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.tableData.splice(index, 1)

                    deleteRoleData(row.id).then((data) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getRoledata()

                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 提交
            onSubmit(form) {
                this.resultData.userId = this.$store.state.user.userId;
                const formData = this.resultData;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        addRoleData(formData).then((data) => {
                            if (data.data.result) {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                });
                                this.dialogFormVisible = false;
                                this.getRoledata()


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
            //关闭
            closeDialog(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        location.reload();
                    })
                    .catch(_ => {});
            },
            //添加权限获取所有的菜单
            getALLmenuData(id) {
                getMenuTree().then((data) => {
                    this.treedata = data.data.result;
                    this.getTreeDatagj_id(id);
                });
            },
            //权限弹窗
            addRoleqx(index, row) {
                this.resultData.id = this.tableData[index].id;
                this.dialogFormVisibleqx = true;
                this.getALLmenuData(this.resultData.id);
            },
            //根据角色ID 获取角色拥有的菜单(树形结构)
            getTreeDatagj_id(roleId) {
                qxtreeDatachecked(roleId).then((data) => {
                    var result = data.data.result;
                    var treedata = [];
                    if (result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            treedata.push(result[i].id);
                        }
                        this.defaultcheckedkeys = treedata;
                        this.loading = false;
                    } else {
                        this.defaultcheckedkeys = [];
                        this.loading = false;
                    }

                })

            },

            //根据角色ID查询（全部）
            getRolesGjuserid(roleId) {
                getroleGJjsID(roleId).then((data) => {
                    var result = data.data.result;
                    var transferData = [];
                    for (let i = 0; i < result.length; i++) {
                        transferData.push(result[i].id);
                    }
                    this.Uservalue = transferData;
                })

            },
            //权限菜单权限新增提交
            submitqx() {
                let roleId = this.resultData.id;
                if (this.activeName == "first") {
                    //获取最底层节点的数据
                    let treechildrendata = this.$refs.tree.getCheckedNodes();
                    //获取半选中节点的数据
                    let treeparentsData = this.$refs.tree.getHalfCheckedNodes();

                    let menuIds = [];
                    for (var i = 0; i < treechildrendata.length; i++) {
                        menuIds.push(treechildrendata[i].id)
                    }
                    for (var j = 0; j < treeparentsData.length; j++) {
                        menuIds.push(treeparentsData[j].id)
                    }
                    let menuIds2 = JSON.stringify(menuIds);
                    addAndUpduteData(roleId, menuIds2).then((data) => {
                        if (data.data.success == true) {
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            });
                            this.getRoledata();
                            this.qxtiqx();

                        }
                    });
                } else {
                    let userIds = JSON.stringify([...this.Uservalue]);
                    // console.log(userIds);
                    addAndUpduteUserData(roleId, userIds).then((data) => {
                        if (data.data.success == true) {
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            })
                            this.getRoledata();

                            this.qxtiqx()
                        }

                    });

                }
                this.activeName = 'first';
                this.checkstrictly = true;



            },
            //权限宫格取消
            qxtiqx() {
                this.dialogFormVisibleqx = false;
                this.treedata = [];
                this.defaultcheckedkeys = [];
                this.transferUserdata = [];
                this.Uservalue = [];
                this.activeName = 'first';
                this.checkstrictly = true;


            },
            handleClick(tab, event) { //切换新增标签栏的事件
                if (tab.name == 'second') {
                    this.getUserManList(this.resultData.id);
                    // this.getRolesGjuserid(this.resultData.id)
                } else {
                    this.getALLmenuData(this.resultData.id);
                    // this.getTreeDatagj_id(this.resultData.id);
                    this.transferUserdata = [];
                }
            },
            callOf(formName) {
                this.dialogFormVisible = false;
                this.resultData.id = '';
                this.resultData.roleName = '';
                this.resultData.enabled = '';
                this.getRoledata()
            },
            // 取消新增操作
            cancelHandel() {
                this.$refs['resultData'].resetFields();
                this.dialogFormVisibleqx = false;
                this.activeName = 'first';
                this.treedata = [];


            },
            //权限菜单复选框操作的回掉函数
            eltreeCheckchange() {
                this.checkstrictly = false;
            },
            objectSpanMethod({
                row,
                column,
                rowIndex,
                columnIndex
            }) {
                if (columnIndex === 0) {
                    if (this.spanArr[rowIndex]) {
                        return {
                            rowspan: this.spanArr[rowIndex],
                            colspan: 1
                        }
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
            s2ab(s) {
                if (typeof ArrayBuffer !== 'undefind') {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                } else {
                    var buf = new Array(s.length);
                    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
            },
            // addUser() {
            //     // console.log(this.total)
            //     // this.total = 10;
            // },
            // current_change: function (currentPage) {
            //     // this.currentPage = currentPage;
            // },
            switchChange() {
                this.istag = !this.istag;

            },
        },

    };
</script>
<style lang="scss">
    #tableId1 {
        padding: 0px 20px;

        table {
            border: none;
            border-collapse: collapse !important;

            td {
                border: 1px solid #EBEEF5;
            }

        }

        .el-table thead {
            background-color: red;
        }

        .el-dialog__body {
            padding: 5px 30px;
        }

        .el-checkbox {
            margin-right: 0;
        }

        .el-tab-paneFour {
            .el-form {
                width: 288px !important;
            }
        }

        .el-input--suffix .el-input__inner {
            padding-right: 15px;
        }




    }

    #roledialogqxxg {
        .el-dialog__body {
            padding: 5px 30px;
        }

        .el-transfer-panel {
            width: 42%;
        }

        .el-transfer-panel__item.el-checkbox {
            width: 90%;
        }

        .el-checkbox {
            margin-right: 0;
        }

        .el-tab-paneFour {
            .el-form {
                width: 288px !important;
            }
        }

        .el-input--suffix .el-input__inner {
            padding-right: 15px;
        }

        .el-checkbox:last-child {
            margin-right: 0;
            width: 95%;
        }


    }
</style>
<style lang="scss" scoped>
    // @import '../../../public/css/manage.scss';
    #rolemanegePage {
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
            line-height: 5px;
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
            width: 50%;
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
    }
</style>