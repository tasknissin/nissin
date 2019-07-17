<template>
    <div class="postmanage" style="width:100%;height:100%;" v-loading="loading" element-loading-text="拼命加载中"
        element-loading-background="rgba(255, 255, 255, 1)">
        <div class="postButtons">
            <el-button type="primary" icon="el-icon-circle-plus" v-for="(item,index) in allBtns"
                @click="toggle(item.name)" :key="index" size="mini">{{item.value}}</el-button>
        </div>
        <div class="postTable">
            <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border
                :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column prop="titleName" label="岗位名称"></el-table-column>
                <el-table-column prop="departmantName" label="所属部门"></el-table-column>
                <el-table-column prop="titleType" label="岗位类型"></el-table-column>
                <el-table-column prop="hierarchy" label="岗位级别"></el-table-column>
                <el-table-column label="是否有效">
                    <template slot-scope="scope">
                        <span>{{setTableHandle(scope.row.enabled)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-if="handlesActive" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
                @close="cancelHandel">
                <el-form :label-position="labelPosition" ref="postManageFormLog" :inline="true" :model="form"
                    size="small" label-width="100px" :rules="rules">
                    <el-form-item label="岗位名称" prop="titleName">
                        <el-input v-model="form.titleName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位类型" prop="titleType">
                        <el-input v-model="form.titleType" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位级别" prop="hierarchy">
                        <el-input v-model="form.hierarchy" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="父级岗位" prop="parentId">
                        <el-select v-model="form.parentId" placeholder="请选择">
                            <el-option v-for="(item,index) in parentIdSelectArr" :key="index" :label="item.value"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属部门" prop="departmantId">
                        <el-select v-model="form.departmantId" placeholder="请选择">
                            <el-option v-for="item in departmantIdArr" :key="item.id" :label="item.value"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否有效" prop="enabled">
                        <el-select v-model="form.enabled" placeholder="请选择">
                            <el-option label="有效" value="1"></el-option>
                            <el-option label="无效" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序字段" prop="sortNo">
                        <el-input v-model="form.sortNo" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="cancelHandel">取 消</el-button>
                    <el-button size="small" type="primary" @click="submitForm('postManageFormLog')">确 定</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {
        getpostManageList,
        addpostManList,
        deletepostManList,
        getDepartmentDialogData,
        deletejudgeDictionaryByChild,
        deleterjudgeDictionaryByUser
    } from '../../../services/Manage/postManage.js'
    import {
        mapState
    } from 'vuex'
    export default {
        props: {
            treeData: Array
        },
        data() {
            return {
                loading: true,
                minBtns: ['Add'], //本页按钮
                allBtns: [], // 总按钮
                pageNo: '', //参数
                pageSize: '', //参数
                depId: '', //参数
                key: '',
                type: '',
                departmantId: '',
                enabled: '',
                tableData: [],
                heightItem: window.innerHeight - 150, // 计算表格的高度
                handlesActive: true, //是否显示表格的操作,
                form: {}, // 新增弹出框
                dialogFormVisible: false, //是否显示弹出框
                formIndex: -1,
                oldform: {},
                dataModel: [],
                timer: false,
                updateIndex: '',
                parentIdSelectArr: [{
                    id: '#',
                    value: '根节点'
                }], // 新增时的所有父级岗位
                departmantIdArr: [], // 新增时的所有部门,
                labelPosition: 'right',
                rules: {
                    titleName: [{
                        required: true,
                        message: '请输入岗位名称',
                        trigger: 'blur'
                    }, ],
                    titleType: [{
                        required: true,
                        message: '请输入岗位类型',
                        trigger: 'blur'
                    }, ],
                    hierarchy: [{
                        required: true,
                        message: '请输入岗位级别',
                        trigger: 'blur'
                    }, ],
                    parentId: [{
                        required: true,
                        message: '请选择父级岗位',
                        trigger: 'change'
                    }, ],
                    sortNo: [{
                        required: true,
                        message: '请输入排序号',
                        trigger: 'blur'
                    }, ]
                }
            }
        },
        computed: {
            ...mapState({
                btns: state => state.btns,
                userId: state => state.user.userId
            }),


        },
        watch: {
            // treeData:{
            //     handler(newVal,oldVal){
            //         console.log(newVal)
            //     },
            //     deep: true
            // },
            heightItem(val) {
                if (!this.timer) {
                    this.heightItem = val
                    this.timer = true
                    const that = this
                    setTimeout(function () {
                        that.timer = false
                    }, 400)
                }
            }
        },
        created() {
            this.btns.map((item, index) => {
                if (this.minBtns.indexOf(item.name) != -1) {
                    this.allBtns.push({
                        'name': item.name,
                        'value': item.value
                    })
                }
            })
            this.$center.$on('dep-event', (value) => {
                this.parentIdSelectArr = [{
                    id: '#',
                    value: '根节点'
                }]
                if (value != this.departmantId) {
                    this.departmantId = value;
                    getpostManageList(this.departmantId, 'CHILDS').then((result) => {
                        if (result.success) {
                            this.tableData = result.result;
                            getpostManageList(this.departmantId, 'PARENT').then((result) => {
                                if (result.success) {
                                    result.result.map((item, index) => {
                                        this.parentIdSelectArr.push({
                                            id: item.id,
                                            value: item.titleName
                                        })
                                    })
                                    this.loading = false
                                } else {
                                    this.loading = false
                                    this.$message({
                                        type: 'error',
                                        message: '加载失败!'
                                    })
                                }
                            });
                        } else {
                            this.loading = false
                            this.$message({
                                type: 'error',
                                message: '加载失败!'
                            })
                        }
                    });

                }

            })
            getDepartmentDialogData().then(result => {
                if (result.success) {
                    result.result.map((item, index) => {
                        this.departmantIdArr.push({
                            id: item.id,
                            value: item.departmantName
                        })
                    })
                }
            })

        },
        methods: {
            activeUsers(res) {
                for (var i = 0; i < this.departmantIdArr.length; i++) {
                    if (this.departmantIdArr[i].key == res) {
                        return this.departmantIdArr[i].name
                    }
                }
            },
            toggle(val) {
                if (val == "Add") {
                    this.addTaskHandle();
                }
            },
            addTaskHandle() { //新增
                this.form = {
                    titleName: '', //岗位名称
                    titleType: '', //岗位类型
                    enabled: '1', // 是否有效
                    sortNo: '', // 排序字段
                    hierarchy: "", // 岗位级别
                    parentId: '#', //父级岗位
                    departmantId: this.departmantId // 部门id
                };
                this.dialogFormVisible = true;
                this.updateIndex = '';
                this.parentIdSelectArr = [{
                    id: '#',
                    value: '根节点'
                }]
                getpostManageList(this.departmantId,'PARENT').then((result) => {
                    if (result.success) {
                        result.result.map((item, index) => {
                            this.parentIdSelectArr.push({
                                id: item.id,
                                value: item.titleName
                            })
                        })
                    }
                });
            },
            // 表格内部处理
            setTableHandle(res) {
                if (res == 1) {
                    return '有效'
                } else if (res == 0) {
                    return '无效'
                }
            },
            // 取消新增操作
            cancelHandel() {
                this.dialogFormVisible = false;
                this.$refs['postManageFormLog'].resetFields(); // 清空表单里的验证
                for (var m in this.form) {
                    this.form[m] = this.oldform[m]
                }

            },
            // 确定新增数据
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            titleName: this.form.titleName,
                            titleType: this.form.titleType,
                            enabled: this.form.enabled,
                            sortNo: this.form.sortNo,
                            hierarchy: this.form.hierarchy,
                            parentId: this.form.parentId,
                            departmantId: this.form.departmantId,
                            id: this.updateIndex ? this.updateIndex : '',
                            userId: this.userId
                        }
                        this.dialogFormVisible = false
                        this.form.departmantId = this.departmantId;
                        addpostManList(obj).then((result) => {
                            if (result.success) {
                                getpostManageList(this.departmantId).then((result) => {
                                    this.tableData = result.result;
                                });
                                this.$message({
                                    type: 'success',
                                    message: '成功!'
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '失败!'
                                })
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '验证失败!'
                        })
                        return false;
                    }
                });

            },
            // 表格修改
            handleEdit(index, row) {
                this.updateIndex = this.tableData[index].id;
                this.form = this.tableData[index];
                this.oldform = {
                    ...this.tableData[index]
                }
                this.formIndex = index
                this.dialogFormVisible = true
                this.parentIdSelectArr = [{
                    id: '#',
                    value: '根节点'
                }]
                getpostManageList(this.departmantId,'PARENT').then((result) => {
                    if (result.success) {
                        result.result.map((item, index) => {
                            this.parentIdSelectArr.push({
                                id: item.id,
                                value: item.titleName
                            })
                        })
                        this.parentIdSelectArr.map((item, index) => {
                            if (item.id == this.updateIndex) {
                                this.parentIdSelectArr.splice(index, 1)
                            }
                        })
                    }
                });

            },
            // 表格删除数据
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.tableData.splice(index, 1)
                    deletejudgeDictionaryByChild(this.tableData[index].id).then((res) => { // 验证
                        if (res.success) {
                            deleterjudgeDictionaryByUser(this.tableData[index].id).then(data => { // 验证
                                if (data.success) {
                                    deletepostManList(this.tableData[index].id).then((
                                    result) => {
                                        if (result.success) {
                                            getpostManageList(this.departmantId).then((
                                                result) => {
                                                this.tableData = result.result;
                                            });
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            })
                                        } else {
                                            this.$message({
                                                type: 'error',
                                                message: '删除失败!'
                                            })
                                        }
                                    })
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: data.message
                                    })
                                }
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.message
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
        },
        mounted() {
            const that = this
            window.onresize = () => { //用于处理
                return (() => {
                    that.heightItem = window.innerHeight - 185
                })()
            }
        }
    }
</script>

<style lang="scss">
    .postmanage {
        .postButtons {
            width: 100%;
            height: 28px;
            padding: 5px 10px;
            border-bottom: 1px solid rgb(235, 238, 245);

            .el-button--mini,
            .el-button--mini.is-round {
                padding: 6px;
            }
        }

        .postTable {
            padding: 6px;

            .el-button--mini,
            .el-button--mini.is-round {
                padding: 6px;
            }
        }

        .el-table th.gutter {
            display: table-cell !important;
        }

    }

    .el-input--suffix .el-input__inner {
        padding-right: 15px;
    }
</style>