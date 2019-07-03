<template>
    <div class="dictionary" v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 1)" style="width:100%;height:100%;">
        <header>
            <div class="dictionaryButtons">
                <el-button type="primary" icon="el-icon-circle-plus" v-for="(item,index) in allBtns" @click="toggle(item.name)" :key="index" size="mini">{{item.value}}</el-button>
            </div>
            <ul class="selectbox">
                <li v-for="(item1,index) in selectData" :key="index">
                    <label>系统字典类型</label>
                    <el-select v-model="dataModel[index].value1">
                        <el-option
                            v-for="item1 in item1.options"
                            :key="item1.value"
                            :label="item1.label"
                            :value="item1.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
        </header>
        <section>
            <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border style="width: 100%" id="taskManTable" :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
                <el-table-column prop="type" label="类型">
                     <template slot-scope="scope">
                        <span>{{setTable_TypeHandle(scope.row.type)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="key" label="编码"></el-table-column>
                <el-table-column prop="value" label="名称"></el-table-column>
                <el-table-column label="是否有效">
                    <template slot-scope="scope">
                        <span>{{setTableHandle(scope.row.enabled)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
             <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" id="dictionaryDialog" @close="cancelHandel">
                <el-form ref = "dictionaryFormLog" :label-position="labelPosition"  :inline="true"  :model="form"  size="small" label-width="100px" :rules="rules">
                    <el-form-item label="类型"  prop="type" width="200">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option v-for="item in typeSelectArr" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="编码"  prop="key" width="200" class="is-required">
                        <el-input v-model="form.key" auto-complete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="名称"  prop="value" width="200">
                        <el-input v-model="form.value" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效"  prop="enabled">
                        <el-select v-model="form.enabled" placeholder="请选择">
                            <el-option label="有效" value="1"></el-option>
                            <el-option label="无效" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序"  prop="sortNo" width="200">
                        <el-input v-model.number="form.sortNo" auto-complete="off"></el-input>
                    </el-form-item>
                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="cancelHandel">取 消</el-button>
                    <el-button size="mini" type="primary" @click="updateHandle">确 定</el-button>
                </div>
            </el-dialog>
        </section>
    </div>
</template>

<script>
import {
        searchDictionaryManList,
        addUpdateDictionaryManList,
        deleteDictionaryManList,
        searchDictionarySelectList,
        judgeDictionaryKey
    } from '../../../services/Manage/postManage.js'
import {mapState} from 'vuex'
export default {
    data(){
        var KeyFlag = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('编码不能为空！'));
            }else{
                if(this.oldKey != value){
                    judgeDictionaryKey(this.updateIndex,this.form.type,value).then(result=>{
                        console.log(result)
                        if(!result){
                            return callback(new Error('编码已存在！'));
                        }else{
                            return callback()
                        }
                    })
                }
                
            }   
      };
        return{
            loading: true,
            // 下拉框数据
            selectData: [
                {
                    name: "type",
                    options: [{
                        value: null,
                        label: '全部'
                    }]
                }
            ],
            // 下拉框集合
            selectObj: {
                type: "",
            },
            dataModel:[], //下拉框遍历依靠
            minBtns:['Add'],   //本页按钮
            allBtns:[],    // 总按钮
            labelPosition: 'right',
            tableData: [],
            heightItem: window.innerHeight - 160, // 计算表格的高度，
            dialogFormVisible: false,   //是否显示弹出框
            form: {},      // 新增弹出框
            formIndex:-1,
            oldform : {}, // 取消新增后重置
            oldKey:'', // 旧的form表单修改时的key编码值
            updateIndex:'',
            dialogTitle:'',//弹出框的title
            typeSelectArr:[], // 下拉框
            rules:{
                type:[{ required: true, message: '类型不能为空', trigger: 'blur' }],
                value:[{ required: true, message: '名称不能为空', trigger: 'blur' }],
                sortNo:[{ required: true, message: '排序号不能为空', trigger: 'blur' },{type: 'number', message: '必须为数字值', trigger: 'blur' }],
                key:[{ validator: KeyFlag , trigger: 'blur' }]
            }
                 
            
        }
        
    },
    watch: {
         dataModel:{
            handler(newVal,oldVal){
                newVal.map((item,index)=>{
                    if(item.value1 != ''){
                        this.selectChangeHandle(newVal)
                    }
                })
            },
            deep: true
        },
        heightItem(val) {
            if (!this.timer) {
                    this.heightItem = val
                    this.timer = true
                    const that = this
                    setTimeout(function() {
                    that.timer = false
                }, 400)
            }
            deep: true
        }
    },
    computed: {
        ...mapState(['btns'])
    },
    methods: {
        toggle(val){
            if(val == "Add"){
                this.addTaskHandle();
            }
        },
        addTaskHandle() {   //新增功能
            this.form = {
                    type:'urgent',   //类型先默认
                    key:'',   //编码
                    value:'',   //名称，
                    sortNo:'',   //排序
                    enabled:'1'    //是否有效
            };
            this.dialogFormVisible = true;       
            this.dialogTitle = '增加系统字典'
        },
        // 表格内部处理
        setTableHandle(res){
            if(res == 1){
                return '有效'
            }else if(res == 0){
                return '无效'
            }
        },
        // 表格内部的类型处理
        setTable_TypeHandle(res){
            let val = ''
            this.typeSelectArr.map((item,index)=>{
                if(res == item.key){
                    val = item.value;
                }
            })
            return val
        },
        // select发生变化进行查询表格数据
        selectChangeHandle(val){
            var _this = this;
            val.map((item,index)=>{
                switch (index) {
                    case 0:
                        _this.selectObj.type = item.value1
                    break;
                }
            })
            searchDictionaryManList(this.selectObj.type).then((result)=>{
                this.tableData = result.result;
            })
        },
        // 取消新增操作
        cancelHandel(){
            this.dialogFormVisible = false;
            this.$refs['dictionaryFormLog'].resetFields(); // 清空表单里的验证

            for(var m in this.form){
                this.form[m] = this.oldform[m]
            }
        },
        // 确定新增数据
        updateHandle(){
            this.updateIndex = this.updateIndex ? this.updateIndex : ''
            let obj = {
                id:this.updateIndex,
                type:this.form.type,   //类型
                key:this.form.key,   //编码
                value:this.form.value,   //名称
                enabled:this.form.enabled,    //是否有效
                sortNo:this.form.sortNo,   //排序
                userId:'123'     // 登录人（用户ID）
            }
            this.dialogFormVisible = false
            addUpdateDictionaryManList(obj).then((result)=>{
                if(result.success){
                    // 加载系统字典数据
                    searchDictionaryManList('').then((result)=>{
                        this.tableData = result.result;
                        console.log(result)
                    })
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
            this.oldKey = this.tableData[index].key
            this.oldform = {...this.tableData[index]}
            this.dialogTitle = '修改系统字典'
            this.dialogFormVisible = true;

        },
        // 表格删除数据
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteDictionaryManList(this.tableData[index].id).then((result)=>{
                    console.log(result)
                        if(result.success){
                            searchDictionaryManList('').then((result) => {
                                this.tableData = result.result;
                            });
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }else{
                            this.$message({
                                type: 'success',
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
        getStyle(ele) {
            var style = null;
            
            if(window.getComputedStyle) {
                style = window.getComputedStyle(ele, null);
            }else{
                style = ele.currentStyle;
            }
            
            return style;
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
        //加载系统字典下拉
        searchDictionarySelectList().then((result)=>{
            this.typeSelectArr = result.result
            result.result.map((item,index)=>{
                this.selectData[0].options.push({
                    value: item.key,
                    label: item.value
                })
            })
            searchDictionaryManList('').then((result)=>{
                this.tableData = result.result;
                if(result.success){
                    this.loading = false;
                }
                this.$nextTick(function () {
                    setTimeout(() => {
                        const selectWrap = this.$el.querySelector('.el-table__body-wrapper')
                        const gutterWrap = this.$el.querySelector('.gutter')
                        let style = this.getStyle(selectWrap)
                            if(style.overflowY == 'auto'){
                                gutterWrap.style.width = '17px'
                            }else{
                                gutterWrap.style.width = '0px'
                            }
                        })
                    }, 100);
                })
            })
        // 加载系统字典数据
       
        for (var i = 0; i < this.selectData.length; i++) {
            var item = {value1: '',};
            this.dataModel.push(item);
        }
    },
    mounted() {
        const that = this
        window.onresize = () => {   //用于处理
            return (() => {
                that.heightItem = window.innerHeight - 160
            })()
        }
    },
   
}
</script>

<style lang="scss">
    .dictionary{
        header{
            width:100%;
            height: 30px;
            padding: 10px 0;
            line-height: 30px;
            border-bottom:1px solid #ebeef5;
            .dictionaryButtons{
                width:30%;
                line-height: 30px;
                float: left;
            }
            .selectbox{
                    width:70%;
                    float: right;
                    height: 100%;
                    line-height: 30px;
                    text-align: right;
                    padding-right: 10px;
                    box-sizing: border-box;
                    li{
                        font-size: 14px;
                        color:#333;
                        font-weight: 600;
                        display: inline-block;
                    .el-input__inner{
                        height: 30px;
                        line-height: 30px;
                    }
                    .el-select{
                        width:150px;
                    }
                    .el-input__icon{
                        line-height: 30px;
                    }
                    label{
                        margin:0 8px;
                    }
                }
            
            }
        }
        .el-button--small, .el-button--small.is-round{
            padding:6px 
        }
        .el-button--mini, .el-button--mini.is-round{
            padding:6px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 15px;
        }
        .el-table th.gutter{
            display: table-cell !important;
        }
    }
</style>
