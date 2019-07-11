<template>
  <div class="page" id="taskManagePage" ref="taskconTable" v-loading="loading" :element-loading-text="loadText" element-loading-background="rgba(255, 255, 255, 1)">
    <app-subheader>
      <div slot="left">
        <i class="sub-lefticon el-icon-s-home"></i>
        <span>任务管理</span>
      </div>
      <div slot="right">
        <el-button type="primary" size="mini">
          <i class="el-icon-printer"></i>导入
        </el-button>
        <el-button type="primary" @click="taskExportHandle" size="mini">
          <i class="el-icon-printer"></i>导出
        </el-button>
        <el-button type="primary" @click="addTaskHandle"  size="mini">新增任务</el-button>
      </div>
    </app-subheader>
    <app-content >
      
    <ul class="selectbox">
          <li v-for="(item1,index) in selectData" :key="index">
              <label>{{item1.name}}</label>
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
      
      <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border style="width: 100%" id="taskManTable" :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
        <el-table-column prop="sortNo" label="任务排序"></el-table-column>
        <el-table-column prop="parentTaskCode" label="父级任务编号"></el-table-column>
        <el-table-column prop="taskType" label="任务类型"></el-table-column>
        <el-table-column prop="urgent" label="紧急程度">
            <template slot-scope="scope">
              <span>{{urgentHandle(scope.row.urgent)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="important" label="重要程度">
           <template slot-scope="scope">
              <span>{{importantHandle(scope.row.important)}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="context" label="任务内容"></el-table-column>
        <el-table-column prop="standard" label="目标与要求"></el-table-column>
        <el-table-column prop="requestFinishDate" label="要求完成时间"></el-table-column>
        <el-table-column prop="owner" label="责任人"></el-table-column>
        <el-table-column prop="coordicator" label="协同节点"></el-table-column>
        <el-table-column prop="finishStatus" label="完成状态">
          <template slot-scope="scope">
              <span>{{scope.row.urgent == '1' ? '完成' : '未完成'}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="progress" label="目前进度">
            <template slot-scope="scope">
              <span>{{scope.row.urgent == '1' ? '完成' : '未完成'}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态">
          <template slot-scope="scope">
              <span>{{scope.row.urgent == '1' ? '完成' : '未完成'}}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" v-if="handlesActive"  width="150">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button icon="el-icon-delete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-sizes="pageSizes" 
                    :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                    :total="totalCount"
                    style="margin-top:5px;">
      </el-pagination>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" @close="cancelHandel" >
        <el-form  :inline="true"  :model="form"  size="small" label-width="100px">
         
          <el-form-item label="任务排序"  prop="sortNo">
            <el-input v-model="form.sortNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级任务编号"  prop="parentTaskCode">
            <el-input v-model="form.parentTaskCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务类型"  prop="taskType">
            <el-input v-model="form.taskType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="紧急程度"  prop="urgent">
             <el-select v-model="form.urgent" placeholder="请选择紧急程度">
                <el-option label="紧急" v-for="item in urgentSelectArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要程度"  prop="important">
            <el-select v-model="form.important" placeholder="请选择重要程度">
                <el-option label="重要" v-for="item in importantSelectArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务内容"  prop="context">
            <el-input v-model="form.context" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="目标与要求"  prop="standard">
            <el-input v-model="form.standard" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="要求完成时间"  prop="requestFinishDate">
            <el-date-picker value-format="yyyy-MM-dd" v-model="form.requestFinishDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="责任人"  prop="owner">
            <el-input v-model="form.owner" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="协同节点"  prop="coordicator">
            <el-input v-model="form.coordicator" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="完成状态"  prop="finishStatus">
            <el-select v-model="form.finishStatus" placeholder="请选择完成状态">
                <el-option label="完成" value="1"></el-option>
                <el-option label="未完成" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目前进度"  prop="progress">
            <el-select v-model="form.progress" placeholder="请选择目前进度">
                <el-option label="完成" value="1"></el-option>
                <el-option label="未完成" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务状态"  prop="taskStatus">
            <el-select v-model="form.taskStatus" placeholder="请选择任务状态">
                <el-option label="完成" value="1"></el-option>
                <el-option label="未完成" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelHandel">取 消</el-button>
          <el-button type="primary" @click="updateHandle">确 定</el-button>
        </div>
      </el-dialog>
    </app-content>
  </div>
</template>

<script>
import {
  // getMessageList,
  // getMenuList,
  // getSelfCenterList,
  // testList,
  getAlltaskManageList,   //获取所有表格数据
  updatetaskManageList,
  deletetaskManageList,
  getPaginationTaskManageList   // 获取分页表格数据
} from "../../services/selfPage.js";
import {
  searchDictionaryManList,
  addUpdateDictionaryManList,
  deleteDictionaryManList,
  searchDictionarySelectList,
  judgeDictionaryKey
} from '../../services/Manage/postManage.js'
import {mapState} from 'vuex'
var XLSX = require('xlsx')
var FileSaver = require('file-saver')

export default {
  data() {
    return {
      heightItem: window.innerHeight - 215, // 计算表格的高度
      form: {},      // 新增弹出框
      formLabelWidth: '100px',   //
      dialogFormVisible: false,   //是否显示弹出框
      formIndex:-1,
      oldform : {},
      dataModel:[],
      handlesActive:true, //是否显示表格的操作,
      timer:false,
      // 总数据
      tableData:[],
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:1,
      // 个数选择器（可修改）
      pageSizes:[5,10,30,40],
      // 默认每页显示的条数（可修改）
      PageSize:5,
      // 下拉框数据
      selectData: [],
      // 下拉框集合
      selectObj: {
        dateVal: "",
        nameVal: "",
        addressVal: ""
      },
      // 表格数据
      tableData: [],
      rules: {
        sortNo: [{
            required: true,
            message: '任务排序',
            trigger: 'blur'
        }],
        parentTaskCode: [{
            required: true,
            message: '父级任务编号',
            trigger: 'blur'
        }],
        taskType: [{
            type: 'date',
            required: true,
            message: '任务类型',
            trigger: 'blur'
        }],
        urgent: [{
            // type: 'date',
            required: true,
            message: '紧急程度',
            trigger: 'change'
        }],
        important: [{
            //type: 'array',
            required: true,
            message: '重要程度',
            trigger: 'change'
        }],
        context: [{
            required: true,
            message: '任务内容',
            trigger: 'blur'
        }],
        standard: [{
          required: true,
          message: '目标与要求',
          trigger: 'blur'
        }],
        requestFinishDate: [{
          required: true,
          message: '要求完成时间',
          trigger: 'change'
        }],
        owner: [{
            required: true,
            message: '责任人',
            trigger: 'blur'
        }],
        coordicator: [{
            required: true,
            message: '协同节点',
            trigger: 'blur'
        }],
        finishStatus: [{
            required: true,
            message: '完成状态',
            trigger: 'change'
        }],
        progress: [{
            required: true,
            message: '目前进度',
            trigger: 'change'
        }],
        taskStatus: [{
            required: true,
            message: '任务状态',
            trigger: 'change'
        }]
      },
      loading:true,
      loadText:"拼命加载中",
      updateIndex:'',//主键 id
      urgentSelectArr:[],  // 紧急程度类型下拉菜单，新增里面的下拉
      importantSelectArr:[],   // 重要程度下拉菜单，新增里面的下拉  
    };
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
    }
  },
  computed: {
      ...mapState({
          btns: state => state.btns,
          userId:state => state.user.userId
      })
  },
  methods: {
    // 新增操作
    addTaskHandle() {
      this.form = {
        sortNo:'',
        parentTaskCode:'',
        taskType:'',
        urgent:'',
        important:'',
        context:'',
        standard:'',
        requestFinishDate:'',
        owner:'',
        coordicator:'',
        finishStatus:'',
        progress:'',
        taskStatus:''
      };
      this.updateIndex = '';      
      if(this.urgentSelectArr.findIndex(item => item.label === '全部') != -1){
        this.urgentSelectArr.splice(this.urgentSelectArr.findIndex(item => item.label === '全部'), 1)
      }
      if(this.importantSelectArr.findIndex(item => item.label === '全部') != -1){
        this.importantSelectArr.splice(this.urgentSelectArr.findIndex(item => item.label === '全部'), 1)
      }
      this.dialogFormVisible = true;
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
        this.updateIndex = this.updateIndex ? this.updateIndex : ''
        let obj = {
          id:this.updateIndex,
          sortNo:this.form.sortNo,
          parentTaskCode:this.form.parentTaskCode,
          taskType:this.form.taskType,
          urgent:this.form.urgent,
          important:this.form.important,
          context:this.form.context,
          standard:this.form.standard,
          requestFinishDate:this.form.requestFinishDate,
          owner:this.form.owner,
          coordicator:this.form.coordicator,
          finishStatus:this.form.finishStatus,
          progress:this.form.progress,
          taskStatus:this.form.taskStatus,
        
        }
        updatetaskManageList(obj).then((result)=>{
           if(result.success){
              // 加载系统字典数据
              getPaginationTaskManageList(this.currentPage,this.PageSize).then((result)=>{
                this.tableData = result.result;
                this.totalCount = result.rowCount     
                this.currentPage = 1;
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
        this.dialogFormVisible = false
    },
    // 表格修改
    handleEdit(index, row) {
      this.updateIndex = this.tableData[index].id;
      this.form = this.tableData[index]
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
          deletetaskManageList(this.tableData[index].id).then((result)=>{
                if(result.success){
                    getPaginationTaskManageList(this.currentPage,this.PageSize).then((result) => {
                        this.tableData = result.result;
                        this.totalCount = result.rowCount     
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
    // select发生变化进行查询表格数据
    selectChangeHandle(val){
      // console.log(val)
      var _this = this;
      val.map((item,index)=>{
        switch (index) {
            case 0:
                _this.selectObj.urgent = item.value1
                break;
            case 1:
                _this.selectObj.important = item.value1
                break;
            default:
                break;
        }
      })
      getPaginationTaskManageList(this.currentPage,this.PageSize,this.selectObj.urgent,this.selectObj.important).then(result=>{
        this.tableData = result.result;  
      })
    },
    // 导出功能 
    taskExportHandle(){
      /**
       * 直接导出table表格方法，
       */
      this.loading = true;
      this.loadText = '导出中,请稍后...'
      getAlltaskManageList().then(result=>{
        if(result.success){
          this.tableData = result.result
          this.PageSize = this.tableData.length;
          this.currentPage= 1;
          this.handlesActive = false;   //隐藏掉操作栏
          this.$nextTick(function () {
              let wb = XLSX.utils.table_to_book(document.querySelector('#taskManTable'));
              /* get binary string as output */
              let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
              try {
                  FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '任务管理.xlsx')
              } catch (e) {
                  if (typeof console !== 'undefined') console.log(e, wbout)
              }         
              this.PageSize = 5;//表格还原
              //再次请求数据
              getPaginationTaskManageList(this.currentPage,this.PageSize).then(result=>{
                this.tableData = result.result;  
              })
              this.handlesActive = true;
              this.loading = false
              return wbout
          })
        }else{
          this.loading = false;
        }
      })
    },
    // 分页功能
    // 每页显示的条数
    handleSizeChange(val) {
      // console.log(val)
      // 改变每页显示的条数 
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
      //再次请求数据
      getPaginationTaskManageList(this.currentPage,this.PageSize).then(result=>{
        this.tableData = result.result;  
      })

    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      getPaginationTaskManageList(this.currentPage,this.PageSize).then(result=>{
        this.tableData = result.result;  
      })
    },
    urgentHandle(val){
      let labelVal = ''
      this.urgentSelectArr.map((item,index)=>{
        if(item.value == val){
          labelVal = item.label
        }
      })
      return labelVal
    },
    importantHandle(val){
      let labelVal = ''
      this.importantSelectArr.map((item,index)=>{
        if(item.value == val){
          labelVal = item.label
        }
      })
      return labelVal
    }
  },
  created() {
    // 请求表格数据
    getPaginationTaskManageList(this.currentPage,this.PageSize).then(result=>{
      if(result.result.length > 0){
        this.tableData = result.result;  
        this.totalCount = result.rowCount     
        this.loading = false;
      }
    })
    searchDictionaryManList('').then((result)=>{
      this.urgentSelectArr.push()
      let urgArr = [{value:null,label:'全部'}];
      let impArr = [{value:null,label:'全部'}];
      result.result.map((item,index)=>{
        if(item.type == "urgent"){
          this.urgentSelectArr.push({value:item.key,label:item.value})
          urgArr.push({value:item.key,label:item.value})
        }else if(item.type == "important"){
          this.importantSelectArr.push({value:item.key,label:item.value})
          impArr.push({value:item.key,label:item.value})
        }
      })
      this.selectData.push({name:'类型',options:urgArr},{name:'大类',options:impArr})
      for (var i = 0; i < this.selectData.length; i++) {   //循环遍历下拉框
        var item = {value1: '',};
        this.dataModel.push(item);
      }
    })
   
  },
  mounted() {
      const that = this
      window.onresize = () => {   //用于处理
        return (() => {
          that.heightItem = window.innerHeight - 215
        })()
      }
  }
};
</script>

<style>
#taskManagePage {
  width: cal(100% - 30px);
  height: calc(100% - 48px);
  background-color: #eceff4;
}
#taskManagePage .el-input--suffix .el-input__inner{
  padding-right: 15px;
}
#taskManagePage .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:auto;
}
#taskManagePage .sub-lefticon {
  font-size: 16px;
  color: #adadad;
  margin: 0 4px;
}
#taskManagePage .el-button--small, .el-button--small.is-round{
    padding:6px 
}
#taskManagePage .el-button--mini, .el-button--mini.is-round{
    padding:6px;
}
.selectbox{
    width:100%;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    text-align: right;
}
.selectbox>li{
    font-size: 14px;
    color:#333;
    font-weight: 600;
    display: inline-block;
}
.selectbox>li>label{
    margin:0 8px;
}
.selectbox>li .el-input__inner{
    height: 30px;
    line-height: 30px;
}
.selectbox>li .el-select{
    width:114px;
}
.selectbox>li .el-input__icon{
    line-height: 30px;
}
.el-form--inline .el-form-item{
  min-width: 45%;
}
#taskManagePage  .el-table th.gutter{
  display: table-cell !important;
}
#taskManagePage .el-input{
  width:auto !important;
}
</style>

