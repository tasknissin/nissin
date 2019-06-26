<template>
    <div style="width:100%;height:100%;" v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 1)">
        <div class="postButtons">
            <el-button v-for="(item,index) in allBtns" @click="toggle(item.name)" :key="index" size="mini">{{item.value}}</el-button>
        </div>
        <div class="postTable">
            <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border  :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column prop="titleName" label="岗位名称"></el-table-column>
                <el-table-column prop="titleType" label="岗位类型"></el-table-column>
                <el-table-column label="是否有效">
                    <template slot-scope="scope">
                        <span>{{setTableHandle(scope.row.enabled)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createdTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" v-if="handlesActive"  width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible" @close="cancelHandel">
                <el-form  :inline="true"  :model="form"  size="small">
                    <el-form-item label="岗位名称"  prop="titleName">
                        <el-input v-model="form.titleName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位类型"  prop="titleType">
                        <el-input v-model="form.titleType" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效"  prop="enabled">
                        <el-select v-model="form.enabled" placeholder="请选择">
                            <el-option label="有效" value="1"></el-option>
                            <el-option label="无效" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    
                     <el-form-item label="排序字段"  prop="sortNo">
                        <el-input v-model="form.sortNo" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancelHandel">取 消</el-button>
                <el-button size="small" type="primary" @click="updateHandle">确 定</el-button>
                </div>
            </el-dialog>
        </div>
       
    </div>
</template>

<script>
import {getpostManageList,addpostManList,deletepostManList} from '../../../services/postManage/postManage.js'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            loading: true,
            minBtns:['Add'],   //本页按钮
            allBtns:[],    // 总按钮
            pageNo:'',    //参数
            pageSize:'',//参数
            depId:'', //参数
            key:'',
            type:'',
            departmantId:'',
            enabled:'',
            tableData:[],
            heightItem: window.innerHeight - 150, // 计算表格的高度
            handlesActive:true, //是否显示表格的操作,
            form: {},      // 新增弹出框
            dialogFormVisible: false,   //是否显示弹出框
            formIndex:-1,
            oldform : {},
            dataModel:[],
            timer:false,
            updateIndex:''
        }
    },
    computed: {
        ...mapState(['city','cityID','btns'])
    },
    watch: {
        // dataModel:{
        //     handler(newVal,oldVal){
        //         newVal.map((item,index)=>{
        //         if(item.value1 != ''){
        //             this.selectChangeHandle(newVal)
        //         }
        //         })
        //     },
        //     deep: true
        // },
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
        this.btns.map((item,index)=>{
            if(this.minBtns.indexOf(item.name) != -1){
                this.allBtns.push({
                    'name':item.name,
                    'value':item.value
                })
            }
        })
        this.$center.$on('dep-event',(value)=>{
            if(value != this.departmantId){
                this.departmantId = value;
                getpostManageList(this.departmantId).then((result) => {
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
       
    },
    methods: {
        toggle(val){
            if(val == "Add"){
                this.addTaskHandle();
            }
        },
        addTaskHandle() {   //新增
            this.form = {
                titleName:'',   //岗位名称
                titleType:'',   //岗位类型
                enabled:'',        // 是否有效
                sortNo:''    // 排序字段
            };
            this.dialogFormVisible = true;
        },
        // 表格内部处理
        setTableHandle(res){
            if(res == 1){
                return '有效'
            }else if(res == 0){
                return '无效'
            }
        },
        // 取消新增操作
        cancelHandel(){
            this.dialogFormVisible = false;
            for(var m in this.form){
                this.form[m] = this.oldform[m]
            }
        },
        // 确定新增数据
        updateHandle(){
            let obj = {
                titleName : this.form.titleName,
                titleType : this.form.titleType,
                enabled : this.form.enabled,
                sortNo : this.form.sortNo,
                departmantId:this.departmantId,
                id:this.updateIndex ? this.updateIndex : ''
            }
            // this.tableData.push(this.form) //在表格最后添加好数据
            this.dialogFormVisible = false
            this.form.departmantId = this.departmantId;
            addpostManList(obj).then((result)=>{
                if(result.success){
                    getpostManageList(this.departmantId).then((result) => {
                        this.tableData = result.result;
                    });
                    this.$message({
                        type: 'success',
                        message: '成功!'
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: '失败!'
                    })
                }
            })
        },
        // 表格修改
        handleEdit(index, row) {
            this.updateIndex = this.tableData[index].id;
            this.form = this.tableData[index];
            this.oldform = {...this.tableData[index]}
            this.formIndex = index
            this.dialogFormVisible = true
        },
        // 表格删除数据
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // this.tableData.splice(index, 1)
                deletepostManList(this.tableData[index].id).then((result)=>{
                        if(result.success){
                            getpostManageList(this.departmantId).then((result) => {
                                this.tableData = result.result;
                            });
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }else{
                            this.$message({
                                type: 'error',
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
    .postButtons{
        width:100%;
        height: 28px;
        padding:5px 10px;
        border-bottom: 1px solid rgb(235, 238, 245);
    }
    .postTable{
        padding:6px;
    }
    
    .el-table th.gutter{
        display: table-cell!important;
    }
</style>
