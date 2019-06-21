<template>
    <div class="taskfk" id="taskPage" ref="tackTable">
        <app-subheader>
            <div slot="left">
                <i class="sub-lefticon el-icon-s-home"></i><span>个人中心首页</span>
            </div>
        </app-subheader>
        <div slot="rigth">
            <el-button type="primary"><i class="el-icon-printer"></i>导出</el-button>
            <el-button type="text" @click="dialogFormVisible = true">任务反馈</el-button>
        </div>
        <app-content :selectData=selectData :selectObj=selectObj>
            <el-table :data="tableData" :height="heightItem" border style="width:100%">
                <el-table-column prop="taskId" label="任务编号" width="180"></el-table-column>
                <el-table-column prop="feedbackType" label="反馈类型" width="180"></el-table-column>
                <el-table-column prop="feedbackTime" label="反馈时间" width="180"></el-table-column>
                <el-table-column prop="completedDesc" label="完成情况" width="180"></el-table-column>
                <el-table-column prop="gap" label="差因" width="180"></el-table-column>
                <el-table-column prop="nextPlan" label="下一步计划" width="180"></el-table-column>
                <el-table-column prop="completedStatus" label="完成状态" width="180"></el-table-column>
                <el-table-column prop="totalStatus" label="整体任务完成状态" width="180"></el-table-column>
                <el-table-column prop="selfEvaluate" label="自评" width="180"></el-table-column>
                <el-table-column prop="finalEvaluate" label="公议" width="180"></el-table-column>

            </el-table>
        </app-content>
        <el-dialog title="任务反馈" :visible.sync="dialogFormVisible">
            <el-form :model="formD" ref="formD" :rules="rules">
                <el-form-item label="任务编号" :label-width="formLabelWidth" prop="taskId">
                    <el-input v-model="formD.taskId"></el-input>
                </el-form-item>
                <el-form-item label="反馈类型" :label-width="formLabelWidth" prop="feedbackType">
                    <el-select v-model="formD.feedbackType" placeholder="请选择反馈类型">
                        <el-option label="周度" value="1"></el-option>
                        <el-option label="月度" value="2"></el-option>
                        <el-option label="季度" value="3"></el-option>
                        <el-option label="年度" value="4"></el-option>

                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="反馈时间" :label-width="formLabelWidth" prop="feedbackTime">
                    <el-date-picker v-model="formD.feedbackTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item> -->
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
                        <el-option label="完成" value="1"></el-option>
                        <el-option label="未完成" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="整体任务完成状态" :label-width="formLabelWidth" prop="totalStatus">
                    <el-select v-model="formD.totalStatus" placeholder="请选择整体任务完成状态">
                        <el-option label="完成" value="1"></el-option>
                        <el-option label="未完成" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="自评" :label-width="formLabelWidth" prop="selfEvaluate">
                    <el-select v-model="formD.selfEvaluate" placeholder="请选择自评内容">
                        <el-option label="完成" value="1"></el-option>
                        <el-option label="未完成" value="2"></el-option>
                    </el-select>
                    <!-- <textarea v-model="form.selfEvaluate" autocomplete="off"></textarea> -->
                </el-form-item>
                <el-form-item label="公议" :label-width="formLabelWidth" prop="finalEvaluate">
                    <el-select v-model="formD.finalEvaluate" placeholder="请选择公议状态">
                        <el-option label="已公议" value="1"></el-option>
                        <el-option label="未公议" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('formD')">提交</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {
        getTaskupdata
    } from '../../services/rwfkPage.js'
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
                        type: 'date',
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
                tableData: [{
                        taskId: '1',
                        feedbackType: 'sgsg',
                        feedbackTime: '2019-06-20',
                        completedDesc: 'fffeewf',
                        gap: 'bccbvbv',
                        nextPlan: 'bccc',
                        completedStatus: 'nngffffvvbbnddddvvb',
                        totalStatus: 'jghhgnhrrrdgdgff',
                        selfEvaluate: 'ttyereree',
                        finalEvaluate: 'rwtretregrgd',
                    },
                    {
                        taskId: '1',
                        feedbackType: 'sgsg',
                        feedbackTime: '2019-06-20',
                        completedDesc: 'fffeewf',
                        gap: 'bccbvbv',
                        nextPlan: 'bccc',
                        completedStatus: 'nngffffvvbbnddddvvb',
                        totalStatus: 'jghhgnhrrrdgdgff',
                        selfEvaluate: 'ttyereree',
                        finalEvaluate: 'rwtretregrgd',
                    },
                    {
                        taskId: '1',
                        feedbackType: 'sgsg',
                        feedbackTime: '2019-06-20',
                        completedDesc: 'fffeewf',
                        gap: 'bccbvbv',
                        nextPlan: 'bccc',
                        completedStatus: 'nngffffvvbbnddddvvb',
                        totalStatus: 'jghhgnhrrrdgdgff',
                        selfEvaluate: 'ttyereree',
                        finalEvaluate: 'rwtretregrgd',
                    }
                ],
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
                heightItem: '',
                formLabelWidth: '125px',
                dialogFormVisible: false

            }
        },
        methods: {
            onSubmit(form) {

               const formData=this.formD;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // console.log(formData);
                        getTaskupdata(formData).then((data)=>{
                            console.log(data)
                        });
                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })


            }
        },
        created() {},
        mounted() {

        }
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
        width: 80px;
        padding: 0;
        height: 26px;
        line-height: 26px;
    }

    #table {
        width: 100%;
        height: 300px;
        background: greenyellow;
    }
</style>