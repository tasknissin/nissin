//const PRO_HOST = 'http://47.92.121.252:8080'
/*
通过接口获取任务反馈页面数据的接口
参数
id(新增不需要传递)	主键
taskId	任务编号
feedbackType	反馈类型
feedbackTime	反馈时间
completedDesc	完成情况
gap	差因
nextPlan	下一步计划
completedStatus	完成状态
totalStatus	整体任务完成状态
selfEvaluate	自评
finalEvaluate	公议
dataStatus	数据状态

 */
const taskFk_API = "/feedbackInfoController/saveData";
export default {
    taskFk_API,
}