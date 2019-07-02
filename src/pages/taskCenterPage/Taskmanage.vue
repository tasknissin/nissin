<template>
  <div class="page" id="taskManagePage" ref="taskconTable" v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 1)">
    <app-subheader>
      <div slot="left">
        <i class="sub-lefticon el-icon-s-home"></i>
        <span>任务管理</span>
      </div>
      <div slot="right">
        <el-button type="primary">
          <i class="el-icon-printer"></i>导入
        </el-button>
        <el-button type="primary" @click="taskExportHandle">
          <i class="el-icon-printer"></i>导出
        </el-button>
        <el-button type="primary" @click="addTaskHandle">新增任务</el-button>
      </div>
    </app-subheader>
    <app-content >
      <ul class="selectbox">
            <li v-for="(item1,index) in selectData" :key="index">
                <label>完成状态</label>
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
      <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border style="width: 100%" id="taskManTable">
        <el-table-column prop="sortNo" label="任务排序"></el-table-column>
        <el-table-column prop="parentTaskCode" label="父级任务编号"></el-table-column>
        <el-table-column prop="taskType" label="任务类型"></el-table-column>
        <el-table-column prop="urgent" label="紧急程度"></el-table-column>
        <el-table-column prop="important" label="重要程度"></el-table-column>
        <el-table-column prop="context" label="任务内容"></el-table-column>
        <el-table-column prop="standard" label="目标与要求"></el-table-column>
        <el-table-column prop="requestFinishDate" label="要求完成时间"></el-table-column>
        <el-table-column prop="owner" label="责任人"></el-table-column>
        <el-table-column prop="coordicator" label="协同节点"></el-table-column>
        <el-table-column prop="finishStatus" label="完成状态"></el-table-column>
        <el-table-column prop="progress" label="目前进度"></el-table-column>
        <el-table-column prop="taskStatus" label="任务状态"></el-table-column>

        <el-table-column label="操作" v-if="handlesActive"  width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" @close="cancelHandel" >
        <el-form  :inline="true"  :model="form"  size="small">
         
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
                <el-option label="紧急" value="11"></el-option>
                <el-option label="不紧急" value="22"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要程度"  prop="important">
            <el-select v-model="form.important" placeholder="请选择重要程度">
                <el-option label="重要" value="1"></el-option>
                <el-option label="不重要" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务内容"  prop="context">
            <el-input v-model="form.context" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="目标与要求"  prop="standard">
            <el-input v-model="form.standard" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="要求完成时间"  prop="requestFinishDate">
            <el-date-picker v-model="form.requestFinishDate" type="date" placeholder="选择日期"></el-date-picker>
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
  getMessageList,
  getMenuList,
  getSelfCenterList,
  testList,
  getAlltaskManageList
} from "../../services/selfPage.js";
var XLSX = require('xlsx')
var FileSaver = require('file-saver')
export default {
  data() {
    return {
      heightItem: window.innerHeight - 185, // 计算表格的高度
      form: {},      // 新增弹出框
      formLabelWidth: '100px',   //
      dialogFormVisible: false,   //是否显示弹出框
      formIndex:-1,
      oldform : {},
      dataModel:[],
      handlesActive:true, //是否显示表格的操作,
      timer:false,
      // 下拉框数据
      selectData: [
        {
          name: "year",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "2015",
              label: "黄金糕"
            },
            {
              value: "2016",
              label: "双皮奶"
            },
            {
              value: "2017",
              label: "蚵仔煎"
            },
            {
              value: "2018",
              label: "龙须面"
            },
            {
              value: "2019",
              label: "北京烤鸭"
            }
          ]
        },
        {
          name: "numdi",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "11",
              label: "黄金糕y"
            },
            {
              value: "12",
              label: "双皮奶y"
            },
            {
              value: "15",
              label: "蚵仔煎y"
            },
            {
              value: "13",
              label: "龙须面y"
            },
            {
              value: "14",
              label: "北京烤鸭y"
            }
          ]
        },
        {
          name: "ptcode",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "33",
              label: "黄金糕m"
            },
            {
              value: "31",
              label: "双皮奶m"
            },
            {
              value: "32",
              label: "蚵仔煎m"
            },
            {
              value: "35",
              label: "龙须面m"
            },
            {
              value: "36",
              label: "北京烤鸭m"
            }
          ]
        }
      ],
      // 下拉框集合
      selectObj: {
        dateVal: "",
        nameVal: "",
        addressVal: ""
      },
      // 表格数据
      tableData: [
        {
          id:'1',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'2',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'3',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'4',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'5',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'6',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'7',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'8',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'9',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'10',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'11',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'12',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'13',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'14',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'15',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'16',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'197',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'187',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'167',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'157',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'117',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
        {
          id:'17',
          sortNo:'1',
          parentTaskCode:'23',
          taskType:'true',
          urgent:'紧张',
          important:'重要',
          context:'文本',
          standard:'状态',
          requestFinishDate:'2019-03-03',
          owner:'王小虎',
          coordicator:'上海市普陀区金沙江路',
          finishStatus:'完成',
          progress:'未完成',
          taskStatus:'完成'
        },
      ],
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
      this.dialogFormVisible = true;
      console.log(this.form)
    },
    // 取消新增操作
    cancelHandel(){
      this.dialogFormVisible = false;
      console.log(this.oldform)
      for(var m in this.form){
        this.form[m] = this.oldform[m]
      }
    },
    // 确定新增数据
    updateHandle(){
        this.form.date = this.form.date
        this.tableData.splice(this.formIndex,1,this.form) //在表格最后添加好数据
        this.dialogFormVisible = false
    },
    // 表格修改
    handleEdit(index, row) {
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
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
      var _this = this;
      val.map((item,index)=>{
        switch (index) {
            case 0:
                _this.selectObj.dateVal = item.value1
                break;
            case 1:
                _this.selectObj.nameVal = item.value1
                break;
            case 2:
                _this.selectObj.addressVal = item.value1
                break;
            default:
                break;
        }
      })
    },
    // 导出功能 
    taskExportHandle(){
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
          this.handlesActive = true;
          return wbout
      })
    }
  },
  created() {
    // 请求表格数据
    this.loading = false;
    getAlltaskManageList().then(result=>{
      console.log(result)
    })
    for (var i = 0; i < this.selectData.length; i++) {   //循环遍历下拉框
        var item = {value1: '',};
        this.dataModel.push(item);
    }
  },
  mounted() {
      const that = this
      window.onresize = () => {   //用于处理
        return (() => {
          that.heightItem = window.innerHeight - 185
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
#taskManagePage .sub-lefticon {
  font-size: 16px;
  color: #adadad;
  margin: 0 4px;
}
#taskManagePage .el-button {
  width: 80px;
  padding: 0;
  height: 26px;
  line-height: 26px;
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
</style>

