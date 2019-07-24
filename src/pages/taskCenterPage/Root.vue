<template>
  <div>
    <!-- <el-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1"></el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2"></el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3"></el-table-column>
    </el-table>-->
    <button @click="downloadExl">导出</button>
    <div id="tableId1">
        <el-table
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0'}"
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%；font-size:12px"
        >
          <el-table-column current-row-key="id" prop="id" label="ID"  width="60" height="10"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
          <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
          <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
          <el-table-column prop="amount4" label="数值 4（元）"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div style="text-align: center;margin-top: 30px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="current_change">
        </el-pagination>
    </div>
  </div>

</template>

<script>
import {Table,TableColumn,Pagination} from 'element-ui'
var XLSX = require('xlsx')
var FileSaver = require('file-saver')
export default {
  components:{
    "el-table" : Table,
    "el-table-column" : TableColumn,
    "el-pagination" : Pagination,
  },
  data() {
    return {
      tableData: [
        {
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
      spanArr:[],
      multipleSelection: [],
      total: 0,
      pagesize:10,
      currentPage:1
    };
  },
  
  mounted(){
      let contactDot = 0;
      this.tableData.forEach((item,index) => {
          if(index===0){
              this.spanArr.push(1)
          }else{
              if(item.id === this.tableData[index-1].id){
                  this.spanArr[contactDot] += 1;
                  this.spanArr.push(0)
              }else{
                  contactDot = index
                  this.spanArr.push(1)
              }
          }
      })
      this.addUser();
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(columnIndex ===0){
            if(this.spanArr[rowIndex]){
                return {
                    rowspan:this.spanArr[rowIndex],
                    colspan:1
                }
            }else{
                return {
                    rowspan: 0,
                    colspan: 0
                }
            }
        }
    },
    downloadExl() {
        let wb = XLSX.utils.table_to_book(document.getElementById('tableId1')),
            wopts = {
                bookType: 'xlsx',
                bookSST: false,
                type: 'binary'
            },
            wbout = XLSX.write(wb, wopts);

        FileSaver.saveAs(new Blob([this.s2ab(wbout)], {
            type: "application/octet-stream;charset=utf-8"
        }), "个人简介表.xlsx");
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
        this.total= 10; 
    },
    current_change:function(currentPage){
      this.currentPage = currentPage;
    },
  },
  
};
</script>
<style lang="scss">
  #tableId1{
    padding:0px 20px;
    table{
        border:none;
        border-collapse: collapse !important;
      td{
        border: 1px solid #EBEEF5;
      }
      
    }
    .el-table thead{
      background-color:red;
    }
  }

</style>

