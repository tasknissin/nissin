<template> 
    <div class="page" id="selfPage"  ref="conTable">
        <app-subheader>
            <div slot="left">
                <i class="sub-lefticon el-icon-s-home"></i><span>个人中心首页</span>
            </div>
            <div slot="right">
                <el-button type="primary"><i class="el-icon-printer"></i>导出</el-button>
                <el-button type="primary">填报内容</el-button>

            </div>
        </app-subheader>
        <app-content :selectData = selectData :selectObj = selectObj>
            <el-table
                :data="tableData"
                :height="heightItem"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
        </app-content>
        
    </div>
</template>

<script>
import {Table,TableColumn} from 'element-ui'
import {
    getMessageList,
    getMenuList,
    getSelfCenterList,
    testList
} from '../../services/selfPage.js'
export default {
    components:{
        "el-table" : Table,
        "el-table-column" : TableColumn,
    },
    data(){
        return{
            selectData : [
                {
                    name:"year",
                    options: [{
                            value: '',
                            label: '全部'
                        },{
                            value: '2015',
                            label: '黄金糕'
                        }, {
                            value: '2016',
                            label: '双皮奶'
                        }, {
                            value: '2017',
                            label: '蚵仔煎'
                        }, {
                            value: '2018',
                            label: '龙须面'
                        }, {
                            value: '2019',
                            label: '北京烤鸭'
                        }],
                },
                {
                    name:"numdi",
                    options: [{
                            value: '',
                            label: '全部'
                        },{
                            value: '11',
                            label: '黄金糕y'
                        }, {
                            value: '12',
                            label: '双皮奶y'
                        }, {
                            value: '15',
                            label: '蚵仔煎y'
                        }, {
                            value: '13',
                            label: '龙须面y'
                        }, {
                            value: '14',
                            label: '北京烤鸭y'
                        }],
                },
                {
                    name:"ptcode",
                    options: [{
                            value: '',
                            label: '全部'
                        },{
                            value: '33',
                            label: '黄金糕m'
                        }, {
                            value: '31',
                            label: '双皮奶m'
                        }, {
                            value: '32',
                            label: '蚵仔煎m'
                        }, {
                            value: '35',
                            label: '龙须面m'
                        }, {
                            value: '36',
                            label: '北京烤鸭m'
                        }],
                }
            ],
            selectObj:{
                year:'',
                numid:'',
                ptcode:''
            },
            tableData:[{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }],
                heightItem:''
        }
    },
    methods:{
       
       
    },
    created(){
        console.log('执行了')
        let userid = '1128605053055246336'
        testList().then((data)=>{
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
        
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
        
    },
    mounted() {
        console.log(this.$refs.conTable)
        this.heightItem = this.$refs.conTable.offsetHeight - 150;
        console.log(this.heightItem);
    },


}
</script>

<style>
#selfPage{
    width:cal(100% - 30px);
    min-height: calc(100% - 48px);
    background-color: #eceff4;
    
}
#selfPage .sub-lefticon{
    font-size: 16px;
    color:#adadad;
    margin:0 4px;
}
#selfPage .el-button{
    width: 80px;
    padding:0;
    height: 26px;
    line-height: 26px;
}
#table{
    width:100%;
    height: 300px;
    background: greenyellow;    
}
</style>

