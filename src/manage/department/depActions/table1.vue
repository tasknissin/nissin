<template>
    <div>
        <el-table :data="tableData" :height="testHeight">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData: [],
            item: {
                date: "2018-11-11",
                name: "OnePiece",
                address: "郑州市高新区推进城"
            },
            testHeight:""
        }
    },
    created(){
        this.tableData = Array(20).fill(this.item);
        this.testHeight = document.querySelector('body').offsetHeight - 90;
    }
}
</script>

<style>

</style>
