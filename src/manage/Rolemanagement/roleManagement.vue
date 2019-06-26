<template>
    <div>
        <el-row>
            <el-button type="primary" icon="el-icon-circle-plus" @click="addRole">增加</el-button>
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form :model="resultData" ref="resultData" :rules="rules">

                    <!-- <el-form-item label="ID" :label-width="formLabelWidth" prop="menuCode">
                        <el-input v-model="resultData.menuCode"></el-input>
                    </el-form-item> -->
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                        <el-input v-model="resultData.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效" :label-width="formLabelWidth">
                        <el-checkbox v-if="resultData.enabled=1" checked="true" v-model="checked">是否有效</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('resultData')">提交</el-button>
                        <el-button @click="callOf(resultData)">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-row>
        <div id="tableId1" style="height:60%">
            <el-table :row-style="{height:'30px'}" :cell-style="{padding:'0'}"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe
                :default-sort="{prop:'date',order:'descending'}" border style="width: 100%; height:80%;font-size:12px">
                <el-table-column type="index" :index="indexMethod(0)" label="序列号" width="60" height="10">
                </el-table-column>
                <!-- <el-table-column prop="id" label="ID" width="60" height="10"></el-table-column> -->
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="enabled" label="是否有效"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="fy" layout="prev, pager, next" @current-change="current_change" :total="total"
                background>
            </el-pagination>
        </div>
        <!-- <div style="text-align: center;margin-top: 30px;">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
            </el-pagination>
        </div> -->
    </div>

</template>

<script>
    var XLSX = require('xlsx')
    var FileSaver = require('file-saver')
    import {
        getRoleData,
        addRoleData,
        deleteRoleData
    } from '../../services/rwfkPage.js'
    export default {
        data() {
            return {
                tableData: [{
                        id: "12987122",
                        name: "王小虎qweqfsdfsdfdsbdfs of手动阀is电脑佛山带你飞山东试点佛山的烦恼搜地方你啥都发送东方手动阀",
                        amount1: "234",
                        amount2: "3.2",
                        amount3: 10,
                        amount4: 10

                    },
                    {
                        id: "12987122",
                        name: "王小虎",
                        amount1: "234",
                        amount2: "3.2",
                        amount3: 10,
                        amount4: 10

                    },
                    {
                        id: "12987122",
                        name: "王小虎",
                        amount1: "234",
                        amount2: "3.2",
                        amount3: 10,
                        amount4: 10

                    },
                    {
                        id: "12987122",
                        name: "王小虎",
                        amount1: "234",
                        amount2: "3.2",
                        amount3: 10,
                        amount4: 10

                    },
                    {
                        id: "12987122",
                        name: "王小虎",
                        amount1: "234",
                        amount2: "3.2",
                        amount3: 10,
                        amount4: 10

                    },
                    {
                        id: "12987123",
                        name: "王小虎1",
                        amount1: "165",
                        amount2: "4.43",
                        amount3: 12,
                        amount4: 10

                    },
                    {
                        id: "12987124",
                        name: "王小虎2",
                        amount1: "324",
                        amount2: "1.9",
                        amount3: 9,
                        amount4: 10

                    },
                    {
                        id: "12987125",
                        name: "王小虎3",
                        amount1: "621",
                        amount2: "2.2",
                        amount3: 17,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    },
                    {
                        id: "12987126",
                        name: "王小虎4",
                        amount1: "539",
                        amount2: "4.1",
                        amount3: 15,
                        amount4: 10

                    }
                ],
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
                total: 100,
                pagesize: 5,
                currentPage: 1,
                dialogFormVisible: false,
                formLabelWidth: '80px',
                form: {},
                value6: '',
                // currentPage3: 1,
                currentIndex: '',
                formIndex: -1,
            };
        },

        mounted() {
            this.created()
        },
        methods: {
            created() {
                getRoleData('1', this.pagesize).then((data) => {
                    this.tableData = data.data.result;
                    this.total = this.tableData.length;
                });
                //getRoledata()
            },
            getRoledata() {
                getRoleData('1', this.pagesize).then((data) => {
                    this.tableData = data.data.result;
                    this.total = this.tableData.length;
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
                this.form = this.tableData[index]
                this.formIndex = index
                this.currentIndex = index
                this.resultData.id = this.tableData[index].id;
                this.resultData.roleName = this.tableData[index].roleName;
                this.resultData.enabled = this.tableData[index].enabled;
                this.dialogFormVisible = true
            },
            //行删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
                                })
                                
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
            closeDialog(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        location.reload();
                    })
                    .catch(_ => {});
            },
            callOf(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.created()
                // getRoleData('1', this.pagesize).then((data) => {
                //     this.tableData = data.data.result;
                //     this.total = this.tableData.length;
                // });
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
            addUser() {
                console.log(this.total)
                this.total = 10;
            },
            current_change: function (currentPage) {
                this.currentPage = currentPage;
            },
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