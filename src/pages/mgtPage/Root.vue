<template>
 <div>    
     <!-- 将获取到的数据进行计算 -->   
    <button @click="exportExcel">导出</button>
    <el-button
        size="mini"
        type="info"
        @click="handleAdd()">新增
    </el-button>
    <div id="tableId">
        <el-table 
            :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
            :span-method="objectSpanMethod" 
            :row-class-name="tableRowClassName"
            stripe
            border
            @cell-dblclick="dblhandleCurrentChange"  
            @cell-click="handleedicatChange"
            style="width: 100%">
            <el-table-column prop="bicRBufu" label="日期" width="50"></el-table-column>
            <el-table-column prop="bicRHrPositDesc" label="姓名" width="100"></el-table-column>
            <el-table-column prop="bicRPersAreDesc" label="地址" width="200">
                 <!-- <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.bicRHrPositDesc }}</p>
                        <p>住址: {{ scope.row.bicRPersAreDesc }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.bicRPersAreDesc }}</el-tag>
                    </div>
                    </el-popover>
                </template> -->
            </el-table-column>
            <el-table-column prop="bicRZuqun" label="测试单击" width="100">
                <template slot-scope="{row}">
                    <span v-if="!isEdit[row.index]">{{row.bicRZuqun}}</span>
                    <el-input v-if="isEdit[row.index]" @blur="saveEdit(row)" v-model="row.bicRZuqun" placeholder="请输入内容"></el-input>

                </template>
            </el-table-column>
            <el-table-column prop="bicRZuqunDesc" label="地址" width="100"></el-table-column>
            <el-table-column prop="dateTo" label="地址" width="100"></el-table-column>
            <el-table-column prop="ddanClassify" label="地址" width="100"></el-table-column>
            <el-table-column label="操作" v-if= "tableactive">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="dialogFormVisible = true">修改
                </el-button>
                 <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="scope.row.index" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    </el-form-item>
                </el-form>
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div> -->
            </el-dialog>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row,tableData)">删除
                </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
   
    <div class="tabListPage">
        <el-pagination @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-sizes="pageSizes" 
                    :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                    :total="totalCount">
        </el-pagination>
    </div>
    <button @click="gotoFirst">跳转</button>
</div>
</template>
<script>
import {
    getMessageList,
    getMenuList,
    getSelfCenterList,
    getPaginationTaskManageList
} from '../../services/selfPage.js'
var XLSX = require('xlsx')
var FileSaver = require('file-saver')
export default {
   data(){
       return {
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
            spanArr:[],
            multipleSelection: [],
            tableactive:true,
            isEdit:[],
            objlist:{
                bicRHrPositDesc:"",
                bicRPersAreDesc:'',
                bicRZuqun:'',
                bicRZuqunDesc:""
            },
            bicRHrPositDesc:'',
            rowIndexarr:0,
            flagItem:false,
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px'
       }
    },
    methods:{
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
        exportExcel () {
            this.PageSize = this.tableData.length;//表格长度变长
            this.currentPage= 1;
            this.tableactive = false;
            this.$nextTick(function () {
                let wb = XLSX.utils.table_to_book(document.querySelector('#tableId'));
                /* get binary string as output */
                let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
                try {
                    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '表格名字.xlsx')
                } catch (e) {
                    if (typeof console !== 'undefined') console.log(e, wbout)
                }
                this.PageSize = 5;//表格还原
                this.tableactive = true;                
                return wbout
            })
        },
        // downloadExl() {
        //     var wb = XLSX.utils.table_to_book(document.querySelector("#tableId"))
        //     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        //     try {
        //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        //     } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        // },
        // 执行下载
        // s2ab(s) {
        //     if (typeof ArrayBuffer !== 'undefind') {
        //         var buf = new ArrayBuffer(s.length);
        //         var view = new Uint8Array(buf);
        //         for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        //         return buf;
        //     } else {
        //         var buf = new Array(s.length);
        //         for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        //         return buf;
        //     }
        // },
        // 分页
        // 每页显示的条数
        handleSizeChange(val) {
            // 改变每页显示的条数 
            this.PageSize=val
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currentPage=1
        },
            // 显示第几页
        handleCurrentChange(val) {
            // 改变默认的页数
            this.currentPage=val
        },
        // 删除功能
        handleDelete(index,rows,tableData){
            console.log(index,rows,tableData)
            tableData.splice(index, 1);//删掉该行
            this.totalCount = tableData.length;
        },
        // 新增功能
        handleAdd(){
            this.tableData.push(
                {
                    bicRBufu: '测试', 
                    bicRHrPositDesc: '测试',
                    bicRPersAreDesc:'测试',
                    bicRZuqun:'测试',
                    bicRZuqunDesc:'测试',
                    dateTo:'测试',
                    ddanClassify:"测试"
                })
             this.totalCount = this.tableData.length;
        },
        // 双击获取内容
        //row, column, cell, event
        dblhandleCurrentChange(row, column, cell, event){
            console.log(cell.children[0].innerText)
        },
        // 弹出框修改
        handleEdit(index,row){
            console.log(index)
            console.log(row)

           
            this.flagItem = true

            
        },
        tableRowClassName({row, rowIndex}) {
            row.index = rowIndex;
        },
        // 单击内部input修改
        handleedicatChange(row, column, cell, event){
            //判断是否是需要编辑的列 再改变对应的值
            if(column.label == '测试单击') {
                /*第一个参数是你要改变的数组， 
                第二个参数是你要改变数组中对应值的索引，
                第三个参数是你要将这个值改成什么*/
                this.$set(this.isEdit, row.index, true)
            }
        },
        saveEdit(row) {
           
            this.$set(this.isEdit, row.index, false)
                console.log(row)
            // 获取修改的数据的值 
        },
        gotoFirst(){
            this.$router.push({ name:'mgtFirst'})
        }
    },
    created:function(){
        // getPaginationTaskManageList(this.currentPage,this.PageSize).then((result)=>{
        //     console.log(result)
           
        // }) 
        // let arr = []
        // for(var i = 0; i < 10; i++){
        //     arr.push(...data.data)
        // }
        // this.tableData = arr
        // // 将数据的长度赋值给totalCount
        // this.totalCount=arr.length
        // let contactDot = 0;
        // this.tableData.forEach((item,index) => {
        //     if(index===0){
        //         this.spanArr.push(1)
        //     }else{
        //         if(item.id === this.tableData[index-1].id){
        //             this.spanArr[contactDot] += 1;
        //             this.spanArr.push(0)
        //         }else{
        //             contactDot = index
        //             this.spanArr.push(1)
        //         }
        //     }
        // })
    },
    watch:{
        objlist:{
            handler(value){
                console.log(value)
            },
            deep:true,
        }
    },
    mounted() {
        
    },
}
</script>
<style lang="scss">
    .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color: initial !important;
    }
    #tableId{
        padding:10px 20px;  
     
    }
    .tabListPage{
        padding:0 20px;
    }
</style>

