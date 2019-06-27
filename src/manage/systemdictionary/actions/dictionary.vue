<template>
    <div class="dictionary">
        <header>
            <div class="dictionaryButtons">
                <el-button v-for="(item,index) in allBtns" @click="toggle(item.name)" :key="index" size="mini">{{item.value}}</el-button>
            </div>
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
        </header>
        <section>
            <el-table :data="tableData" :height="heightItem" :max-height="heightItem" border style="width: 100%" id="taskManTable" :header-cell-style="{padding:'8px 0'}" :cell-style="{padding:'5px 0'}">
                <el-table-column prop="sortNo" label="任务排序"></el-table-column>
                <el-table-column prop="taskType" label="任务类型"></el-table-column>
                <el-table-column prop="urgent" label="紧急程度"></el-table-column>
                <el-table-column prop="important" label="重要程度"></el-table-column>
                <el-table-column prop="context" label="任务内容"></el-table-column>
                <el-table-column prop="standard" label="目标与要求"></el-table-column>
                <el-table-column prop="owner" label="责任人"></el-table-column>
                <el-table-column prop="coordicator" label="协同节点"></el-table-column>
                <el-table-column prop="finishStatus" label="完成状态"></el-table-column>
                <el-table-column prop="progress" label="目前进度"></el-table-column>
                <el-table-column prop="taskStatus" label="任务状态"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            // 下拉框数据
            selectData: [
                {
                name: "year",
                options: [{
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
                    }]
                }
            ],
            // 下拉框集合
            selectObj: {
                dateVal: "",
                nameVal: "",
                addressVal: ""
            },
            dataModel:[], //下拉框遍历依靠
            minBtns:['Add'],   //本页按钮
            allBtns:[],    // 总按钮
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
            heightItem: window.innerHeight - 160, // 计算表格的高度
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
    },
    computed: {
        ...mapState(['btns'])
    },
    methods: {
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
        for (var i = 0; i < this.selectData.length; i++) {
            var item = {value1: '',};
            this.dataModel.push(item);
        }
    }
   
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
                        width:114px;
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
       
    }
</style>
