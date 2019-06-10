
<template>
    <div class="contentPage">
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
        <button v-on:click="submitClick">提交</button>
        <slot/>
        
    </div>
</template>

<script>
export default {
    name: 'app-content',
    props: {
        title: String,
        selectData:Array,
        selectObj:Object,
    },
    data(){
        return{
            dataModel:[]
        }
    },
    created(){
        console.log(this.selectObj)
        console.log(this.selectData)
        // 这里是动态生成v-model,这个可以放在网络请求成功里面;
        for (var i = 0; i < this.selectData.length; i++) {
            var item = {value1: '',};
            this.dataModel.push(item);
        }
        console.log(this.dataModel)
    },
    methods: {
        // 显示v-model里面的数据
        submitClick: function(event){
          var tag = event.target;
            var _this = this;
            this.dataModel.map(function(item,index){
                switch (index) {
                    case 0:
                        _this.selectObj.year = item.value1
                        break;
                    case 1:
                        _this.selectObj.numid = item.value1
                        break;
                    case 2:
                        _this.selectObj.ptcode = item.value1
                        break;
                    default:
                        break;
                }
            })
        }
    },
}
</script>

<style>
.contentPage{
    width:calc(100% - 30px);
    height: calc(100% - 70px);
    margin:15px;
    border-radius: 10px;
    background: #fff;
    padding:10px 15px;
    box-sizing: border-box;
}
.contentPage .selectbox{
    width:100%;
    height: 30px;
    line-height: 30px;
    text-align: right;
}
.contentPage .selectbox>li{
    font-size: 14px;
    color:#333;
    font-weight: 600;
    display: inline-block;
}
.contentPage .selectbox>li>label{
    margin:0 8px;
}
.contentPage .selectbox>li .el-input__inner{
    height: 30px;
    line-height: 30px;
}
.contentPage .selectbox>li .el-select{
    width:114px;
}
.contentPage .selectbox>li .el-input__icon{
    line-height: 30px;
}
</style>
