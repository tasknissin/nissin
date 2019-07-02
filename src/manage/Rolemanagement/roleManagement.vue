<template>
    <div>
        <el-row class="elrow">
            <el-button type="primary"  size='small' icon="el-icon-circle-plus"  class="elbutton" @click="addRole">增加</el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible" id="roledialog">
                <el-form :model="resultData" ref="resultData" :rules="rules">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                        <el-input v-model="resultData.roleName"  style="width: 0.43rem;"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效" :label-width="formLabelWidth">
                        <el-checkbox v-if="resultData.enabled=1" checked="checked">是否有效</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('resultData')">提交</el-button>
                        <el-button @click="callOf('rules')">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </el-row>
        <div id="tableId1" style="height:60%; margin-top: 0.02rem;">
            <!-- <el-table :row-style="{height:'30px'}" :cell-style="{padding:'0'}"
                :data="tableData" 
                :default-sort="{prop:'date',order:'descending'}" border style="width: 100%; height:80%;font-size:12px">
               

                <el-table-column prop="id" label="ID" width="60" height="10"></el-table-column> -->
           
            <!-- </el-table> --> 

            <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border style="width: 100%" :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
               <el-table-column type="index" :index="indexMethod(0)" label="序列号" width="120" height="10"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="enabled" label="是否有效"></el-table-column>
              <el-table-column label="操作"  width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button type="primary" size="mini" @click="addRoleqx(scope.$index, scope.row)">权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total"
                background>
            </el-pagination> -->
            <el-dialog title="权限设置" :visible.sync="dialogFormVisibleqx" id="roledialogqxxg">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!-- <el-tab-pane style="min-height:200px;" label="基本信息" name="first">
                       
                    </el-tab-pane> -->
                    <el-tab-pane style="min-height:200px;" label="菜单权限" name="first">
                        <el-tree :data="treedata" show-checkbox default-expand-all ref="tree" node-key="id"
                            highlight-current :props="defaultProps" :default-checked-keys="defaultcheckedkeys">
                        </el-tree>
                    </el-tab-pane>
                    <el-tab-pane style="min-height:200px;" label="分配用户" name="second">
                        <el-transfer v-model="Uservalue" :props="{
                            key: 'id',
                            label: 'userName'
                        }" :titles="['选择用户', '已选用户']" :data="transferUserdata">
                        </el-transfer>

                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="cancelHandel">取 消</el-button>
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
        qxtreeDatachecked,
        getroleGJjsID
    } from '../../services/rwfkPage.js'
    import {
        constants
    } from 'crypto';
  import ' ./../../public/css/manage.css'
    export default {
        data() {
            return {
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
                    console.log(this.tableData);
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
            getUserManList() {
                getUserData().then((data) => {
                    this.transferUserdata = data.data.result;

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
                if(this.tableData[index].enabled=="有效" || this.tableData[index].enabled=="1"){
                     this.resultData.enabled ='1';
                }else{
                    this.resultData.enabled ='0';
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
                    this.tableData.splice(index, 1)
                    deleteRoleData(this.resultData.id).then((data) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })

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
                if (this.checked == true) {
                    this.resultData.enabled = 1;
                } else {
                    this.resultData.enabled = 0;
                }
                this.resultData.userId = '1';
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
            //获取所有的菜单
            getALLmenuData() {
                getMenuTree().then((data) => {
                    this.treedata = data.data.result;
                });
            },
            //权限弹窗
            addRoleqx(index, row) {
                this.resultData.id = this.tableData[index].id;
                this.dialogFormVisibleqx = true;
                this.getALLmenuData();
                this.getTreeDatagj_id(this.resultData.id);


            },
            //根据用户ID 获取用户拥有的菜单(树形结构)
            getTreeDatagj_id(roleId) {
                qxtreeDatachecked(roleId).then((data) => {
                    var result = data.data.result;
                    var treedata = [];
                    for (let i = 0; i < result.length; i++) {
                        treedata.push(result[i].id);
                    }
                    this.defaultcheckedkeys = treedata;
                })

            },

            //根据角色ID查询（全部）
            getRolesGjuserid(roleId) {
                qxtreeDatachecked(roleId).then((data) => {
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
                              this.qxtiqx() 

                        }
                    });
                } else {
                    let userIds = JSON.stringify([...this.Uservalue]);
                    // console.log(userIds);
                    addAndUpduteData(roleId, userIds).then((data) => {
                        if (data.data.success == true) {
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            })
                            this.qxtiqx() 
                        }

                    });

                }



            },
            //权限宫格取消
            qxtiqx() {
                this.dialogFormVisibleqx = false;
            },
            handleClick(tab, event) { //切换新增标签栏的事件
                if (tab.name == 'second') {
                    this.getUserManList();
                    this.getRolesGjuserid(this.resultData.id)
                } else {
                    this.getALLmenuData();
                    this.getTreeDatagj_id(this.resultData.id);
                    this.transferUserdata = [];
                }
            },
            callOf(formName) {
                this.dialogFormVisible = false;
                this.resultData.id = '';
                this.resultData.roleName = '';
                this.resultData.enabled = '';
                this.created()
            },
            // 取消新增操作
            cancelHandel() { 
                this.$refs['resultData'].resetFields();
                this.dialogFormVisibleqx = false;
                this.activeName = 'first';
                this.treedata = [];
                

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
    }
</style>