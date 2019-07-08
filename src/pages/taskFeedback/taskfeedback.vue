<template>
    <div class="taskfk" id="taskPage" ref="tackTable">
        <app-subheader style="width:100%;">
            <div slot="left">
                <i class="sub-lefticon el-icon-s-home"></i><span>个人中心首页</span>
            </div>
            <div slot="right">
                <el-button type="primary" style="margin-left: .03rem;" @click="export2Excel"><i
                        class="el-icon-printer"></i>导出</el-button>
                <el-button type="primary" size='small' icon="el-icon-circle-plus" style="width:80px"
                    @click="addnewTask">
                    任务新增</el-button>
            </div>
        </app-subheader>
        <app-content :selectData=selectData :selectObj=selectObj>
            <el-row style="margin-bottom:10px">
                <el-col :span="4" id="feedbackType">
                    <label >反馈类型：</label>
                    <el-select placeholder="请选择反馈类型" v-model="selected" style="width:70%"
                        @change="onSelectedDrug($event)">
                        <el-option label="周度" value="W"></el-option>
                        <el-option label="月度" value="M"></el-option>
                        <el-option label="季度" value="Q"></el-option>
                        <el-option label="年度" value="Y"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <!-- <div class="grid-content bg-purple-light">ssss</div> -->
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
            <el-table :data="tableData" ref="multipleTable" border style="width:100%">
                <el-table-column prop="taskId" label="任务编号" width="180"></el-table-column>
                <el-table-column prop="feedbackType" label="反馈类型" width="180">
                    <template slot-scope="scope">
                        <span>{{feedbackTypeCl(scope.row.feedbackType)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="feedbackTime" label="反馈时间" width="180"></el-table-column>
                <el-table-column prop="completedDesc" label="完成情况" width="180"></el-table-column>
                <el-table-column prop="gap" label="差因" width="180"></el-table-column>
                <el-table-column prop="nextPlan" label="下一步计划" width="180"></el-table-column>
                <el-table-column prop="completedStatus" label="完成状态" width="180">
                    <template slot-scope="scope">
                        <span>{{completedStatusCL(scope.row.completedStatus)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="totalStatus" label="整体任务完成状态" width="180">
                    <template slot-scope="scope">
                        <span>{{totalStatusCL(scope.row.totalStatus)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="selfEvaluate" label="自评" width="180">
                    <template slot-scope="scope">
                        <span>{{selfEvaluateCl(scope.row.selfEvaluate)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="finalEvaluate" label="公议" width="180">
                    <template slot-scope="scope">
                        <span>{{formatterCColumngyCL(scope.row.finalEvaluate)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <!-- <el-button type="primary" size="mini" @click="addRoleqx(scope.$index, scope.row)"></el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5,10, 50, 100, 200]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </app-content>
        <el-dialog :title='title' :visible.sync="dialogFormVisible" style="hieght:400px">
            <el-form :model="formD" ref="formD" :rules="rules">
                <el-form-item label="任务编号" :label-width="formLabelWidth" prop="taskId">
                    <el-input v-model="formD.taskId"></el-input>
                </el-form-item>
                <el-form-item label="反馈类型" :label-width="formLabelWidth" prop="feedbackType">
                    <el-select v-model="formD.feedbackType" placeholder="请选择反馈类型">
                        <el-option label="周度" value="W"></el-option>
                        <el-option label="月度" value="M"></el-option>
                        <el-option label="季度" value="Q"></el-option>
                        <el-option label="年度" value="Y"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="反馈时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="formD.feedbackTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="完成情况" :label-width="formLabelWidth" prop="completedDesc">
                    <el-input v-model="formD.completedDesc"></el-input>
                </el-form-item>
                <el-form-item label="差因" :label-width="formLabelWidth" prop="gap">
                    <el-input v-model="formD.gap"></el-input>
                </el-form-item>
                <el-form-item label="下一步计划" :label-width="formLabelWidth" prop="nextPlan">
                    <el-input v-model="formD.nextPlan"></el-input>
                </el-form-item>
                <el-form-item label="完成状态" :label-width="formLabelWidth" prop="completedStatus">
                    <el-select v-model="formD.completedStatus" placeholder="请选择完成状态">
                        <el-option label="未完成" value="0"></el-option>
                        <el-option label="完成" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="整体任务完成状态" :label-width="formLabelWidth" prop="totalStatus">
                    <el-select v-model="formD.totalStatus" placeholder="请选择整体任务完成状态">
                        <el-option label="未完成" value="0"></el-option>
                        <el-option label="完成" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="自评" :label-width="formLabelWidth" prop="selfEvaluate">
                    <el-select v-model="formD.selfEvaluate" placeholder="请选择自评内容">
                        <el-option v-for="item in selfEvaluaSelectData" :key="item.key" :label="item.value"
                            :value="item.key"></el-option>
                        <!-- <el-option label="完成" value="1"></el-option>
                        <el-option label="未完成" value="2"></el-option> -->
                    </el-select>
                    <!-- <textarea v-model="form.selfEvaluate" autocomplete="off"></textarea> -->
                </el-form-item>
                <el-form-item label="公议" :label-width="formLabelWidth" prop="finalEvaluate">
                    <el-select v-model="formD.finalEvaluate" placeholder="请选择公议状态">
                        <el-option v-for="item in finalEvaluateSelectData" :key="item.key" :label="item.value"
                            :value="item.key"></el-option>
                        <!-- <el-option label="已公议" value="1"></el-option>
                        <el-option label="未公议" value="2"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 96%;float: none;text-align: right;z-index: 1; ">
                    <el-button type="primary" @click="onSubmit('formD')">提交</el-button>
                    <el-button @click="deleteTC">取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {
        getTaskupdata,
        getAlltaskFeedback,
        deleteTaskFeedback
    } from '../../services/rwfkPage.js'
    import {
        searchDictionaryManList
    } from '../../services/Manage/postManage.js'


    export default {
        data() {
            return {
                formD: {
                    taskId: '',
                    feedbackType: '',
                    feedbackTime: '',
                    completedDesc: '',
                    gap: '',
                    nextPlan: '',
                    completedStatus: '',
                    totalStatus: '',
                    selfEvaluate: '',
                    finalEvaluate: '',
                    id: ''
                },
                rules: {
                    taskId: [{
                        required: true,
                        message: '请输入编码Id',
                        trigger: 'blur'
                    }],
                    feedbackType: [{
                        required: true,
                        message: '请选择反馈类型',
                        trigger: 'change'
                    }],
                    feedbackTime: [{
                        type: 'string',
                        required: true,
                        message: '请选择反馈时间',
                        trigger: 'change'
                    }],
                    completedDesc: [{
                        // type: 'date',
                        required: true,
                        message: '请填写完成情况',
                        trigger: 'blur'
                    }],
                    gap: [{
                        //type: 'array',
                        required: true,
                        message: '请填写差因',
                        trigger: 'blur'
                    }],
                    nextPlan: [{
                        required: true,
                        message: '请填写下一个计划',
                        trigger: 'blur'
                    }],

                    completedStatus: [{
                        required: true,
                        message: '请选择完成状态',
                        trigger: 'change'
                    }],
                    totalStatus: [{
                        required: true,
                        message: '请选择整体任务完成状态',
                        trigger: 'change'
                    }],
                    selfEvaluate: [{
                        required: true,
                        message: '请选择自评内容',
                        trigger: 'change'
                    }],
                    finalEvaluate: [{
                        required: true,
                        message: '请选择公议状态',
                        trigger: 'change'
                    }]
                },
                tableData: [],
                selectData: [{
                        name: "year",
                        options: [{
                            value: '',
                            label: '全部'
                        }, {
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
                        name: "numdi",
                        options: [{
                            value: '',
                            label: '全部'
                        }, {
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
                        name: "ptcode",
                        options: [{
                            value: '',
                            label: '全部'
                        }, {
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
                selectObj: {
                    year: '',
                    numid: '',
                    ptcode: ''
                },
                // heightItem: '',
                formLabelWidth: '135px',
                dialogFormVisible: false,
                total: 5,
                currentPage: 1,
                pageSize: 5,
                title: '任务新增',
                selfEvaluaSelectData: [], //自评
                finalEvaluateSelectData: [], //公议
                selected: null


            }
        },
        mounted() {
            this.getAlltaskFdata(1, this.pageSize, this.selected);
            this.getselfEvaluateXL('person_assessment');
            this.getselfEvaluateXL('sys_assessment');

        },
        methods: {
            //反馈类型下拉change事件
            onSelectedDrug(event, item) {
                //打印出绑定的对象  
                console.log(item);
                //     item.drug_id = parseInt(event.target.value)   
                //   this.calculateMoney(item)  
            },
            //获取table数据
            getAlltaskFdata(pageNo, pageSize, feedbackType) {
                getAlltaskFeedback(pageNo, pageSize, feedbackType).then((data) => {
                    if (data.data.result.length > 0) {

                        this.tableData = data.data.result
                        this.total = data.data.rowCount;
                        //this.currentPage = data.data.curr;
                    }
                });

            },
            //获取弹窗下拉列表
            getselfEvaluateXL(type) {
                searchDictionaryManList(type).then((result) => {
                    if (type == "person_assessment") { //自评
                        this.selfEvaluaSelectData = result.result;
                    } else if (type == "sys_assessment") { //公议
                        this.finalEvaluateSelectData = result.result;
                    }
                    //

                })
            },
            //table数据处理
            feedbackTypeCl(type) {
                switch (type) {
                    case 'W':
                        return "周度";
                        break;
                    case 'M':
                        return "月度";
                        break;
                    case 'Q':
                        return '季度'
                        break;
                    case 'Y':
                        return '年度';
                        break;
                    default:
                        return '-'

                }

            },
            //完成状态数据处理
            totalStatusCL(type) {
                switch (type) {
                    case '0':
                        return '未完成';
                        break;
                    case '1':
                        return '完成';
                        break;

                    default:
                        return '-';
                }
            },
            completedStatusCL(type) {
                switch (type) {
                    case '0':
                        return '未完成';
                        break;
                    case '1':
                        return '完成';
                        break;

                    default:
                        return '-';
                }
            },
            selfEvaluateCl(type) {
                //  this.getselfEvaluateXL('person_assessment');
                var name = '';
                for (var i = 0; i < this.selfEvaluaSelectData.length; i++) {
                    if (type == this.selfEvaluaSelectData[i].key) {
                        name = this.selfEvaluaSelectData[i].value
                    }
                }
                return name

            },

            formatterCColumngyCL(type) {
                //this.getselfEvaluateXL('sys_assessment');
                var name = '';
                for (var i = 0; i < this.finalEvaluateSelectData.length; i++) {
                    if (type == this.finalEvaluateSelectData[i].key) {
                        name = this.finalEvaluateSelectData[i].value
                    }
                }
                return name;

            },
            //新增修改提交
            onSubmit(form) {
                const formData = this.formD;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // console.log(formData);
                        getTaskupdata(formData).then((data) => {
                            if (data.success) {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!'
                                })
                                location.reload();
                            }

                        });
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })


            },
            //分页切换
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.getAlltaskFdata(1, val, this.selected);
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAlltaskFdata(val, this.pageSize, this.selected);
                // console.log(`当前页: ${val}`);
            },
            //任务修改
            handleEdit(index, row) {
                this.title = "任务修改"
                this.formD.id = this.tableData[index].id;
                this.formD.taskId = this.tableData[index].taskId;
                this.formD.feedbackType = this.tableData[index].feedbackType;
                this.formD.feedbackTime = this.tableData[index].feedbackTime;
                this.formD.completedDesc = this.tableData[index].completedDesc;
                this.formD.gap = this.tableData[index].gap;
                this.formD.nextPlan = this.tableData[index].nextPlan;
                this.formD.completedStatus = this.tableData[index].completedStatus;
                this.formD.totalStatus = this.tableData[index].totalStatus;
                this.formD.selfEvaluate = this.tableData[index].selfEvaluate;
                this.formD.finalEvaluate = this.tableData[index].finalEvaluate;
                this.dialogFormVisible = true;
                this.getselfEvaluateXL('person_assessment');
                this.getselfEvaluateXL('sys_assessment')

            },
            //任务新增添
            addnewTask() {
                this.title = "任务新增"
                this.formD.taskId = '';
                this.formD.feedbackType = '';
                this.formD.feedbackTime = '';
                this.formD.completedDesc = '';
                this.formD.gap = '';
                this.formD.nextPlan = '';
                this.formD.completedStatus = '';
                this.formD.totalStatus = '';
                this.formD.selfEvaluate = '';
                this.formD.finalEvaluatecompletedStatus = '';
                this.dialogFormVisible = true;
                this.getselfEvaluateXL('person_assessment');
                this.getselfEvaluateXL('sys_assessment')

            },
            //弹窗关闭
            deleteTC() {
                this.dialogFormVisible = false;
                this.$refs['formD'].resetFields(); // 清空表单里的验证
                this.formD.taskId = '';
                this.formD.feedbackType = '';
                this.formD.feedbackTime = '';
                this.formD.completedDesc = '';
                this.formD.gap = '';
                this.formD.nextPlan = '';
                this.formD.completedStatus = '';
                this.formD.totalStatus = '';
                this.formD.selfEvaluate = '';
                this.formD.finalEvaluatecompletedStatus = '';
            },
            //任务删除
            handleDelete(index, row) {
                deleteTaskFeedback(row.id).then((data) => {
                    if (data.data.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        location.reload();
                    } else {
                        this.$message({
                            type: 'success',
                            message: '删除失败!'
                        })
                        location.reload();
                    }

                })
            },
            // 导出
            export2Excel() {
                require.ensure([], () => {
                    const {
                        export_json_to_excel
                    } = require('./../../pages/homePage/Export2Excel.js'); //Export2Excel.js
                    const tHeader = ['任务编号', '反馈类型', '反馈时间', '完成情况', '差因', '下一步计划', '完成状态', '整体任务完成状态', '自评',
                        '公议',
                    ];
                    // 上面设置Excel的表格第一行的标题
                    const filterVal = ['taskId', 'feedbackType', 'feedbackTime', 'completedDesc', 'gap',
                        'nextPlan', 'completedStatus', 'totalStatus', 'selfEvaluate',
                        'finalEvaluatecompletedStatus'
                    ];
                    // 上面的index、nickName、name是tableData里对象的属性
                    const list = this.tableData; //把data里的tableData存到list
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '列表excel');
                })
            },
            //下拉框条件筛选
            onSelectedDrug(event) {
                this.selected = event;
                this.getAlltaskFdata(1, this.pageSize, this.selected);
                //  this.calculateMoney(event)
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }

        },

    }
</script>
<style>
    #taskPage {
        width: cal(100% - 30px);
        min-height: calc(100% - 48px);
        background-color: #eceff4;

    }

    #taskPage .sub-lefticon {
        font-size: 16px;
        color: #adadad;
        margin: 0 4px;
    }

    #taskPage .el-button {
        width: 62px;
        padding: 0;
        height: 26px;
        line-height: 26px;
    }

    #table {
        width: 100%;
        height: 300px;
        background: greenyellow;
    }

    #taskPage .el-form-item {
        position: relative;
        float: left;
        width: 50%;
        z-index: 3;
    }

    #taskPage .el-input {
        width: 89%;
    }

    #taskPage .el-select {
        width: 99%;
    }

    #taskPage .top_btn {
        background-color: white;
        height: 40px;
        padding-top: 10px;
        width: 100%;
    }

    #feedbackType .el-input__inner {
        line-height: 30px;
        height: 36px;

    }

    #feedbackType {
        float: right;
    }
</style>