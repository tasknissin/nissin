<template>
  <div class="page" id="taskManagePage" ref="taskconTable">
    <app-subheader>
      <div slot="left">
        <i class="sub-lefticon el-icon-s-home"></i>
        <span>个人中心首页</span>
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
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作" v-if="handlesActive">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" @close="cancelHandel">
        <el-form :model="form">
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
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
  testList
} from "../../services/selfPage.js";
var XLSX = require('xlsx')
var FileSaver = require('file-saver')
export default {
  data() {
    return {
      heightItem: window.innerHeight - 185, // 计算表格的高度
      form: {},      // 新增弹出框
      formLabelWidth: '80px',   //
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
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'2',
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'3',
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'4',
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'5',
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'6',

          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'7',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'8',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'9',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'10',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'11',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'12',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'13',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'14',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'15',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'16',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'197',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'187',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'167',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'157',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'117',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'17',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'127',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'137',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'172',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id:'171',

          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
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
        date: "",
        name: "",
        address: ""
      };
      this.dialogFormVisible = true;
    },
    // 取消新增操作
    cancelHandel(){
      this.dialogFormVisible = false;
      this.form.date = this.oldform.date
      this.form.name = this.oldform.name;
      this.form.address = this.oldform.address;
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
    // let userid = "1128605053055246336";
    // testList()
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // getMessageList(userid).then((data)=>{
    //     console.log(data)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    // 获取角色
    // console.log('执行了')
    // getMenuList(userid).then((data)=>{
    //     console.log(data)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    // // // 获取表格数据
    // getSelfCenterList().then((data)=>{
    //     console.log(data)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    for (var i = 0; i < this.selectData.length; i++) {
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
/* #table{
    width:100%;
    height: 300px;
    background: greenyellow;    
} */
</style>

