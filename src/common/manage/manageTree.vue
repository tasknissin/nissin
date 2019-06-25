<template>
    <div class="mTreepage">
        <header>{{treeName}}</header>
        <el-tree 
            :data="treeData" 
            :props="defaultProps" 
            node-key="id"
            :default-expanded-keys="[1,3]"
            @node-click="handleNodeClick"
        >
        </el-tree>
    </div>
</template>

<script>
export default {
    name:'ManageTree',
    props:{
        treeName:String,
        treeData:Array
    },
    data(){
        return{
            data: [{
                id:'1',
                label: '一级 1',
                children: [{
                    id:'2',
                    label: '表格1',
                    value:"/manage/department/test1"
                },{
                    id:'3',
                    label: '表格2',
                    value:"/manage/department/test2"

                }]
                }, {
                id:'4',
                label: '一级 2',
                children: [{
                    id:'5',
                    label: '二级 2-1',
                    children: [{
                    id:'6',
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            hashPath:'',
            
        }
    },
    methods: {
        handleNodeClick(data) {
            if(data.value){

                console.log(data);
                console.log(this.hashPath)
                console.log(window.location)
                this.$router.push({path:data.value})
            }
        }
    },
    
}
</script>

<style lang="scss">
    .mTreepage{
        header{
            width:100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-bottom: 1px solid #EBEEF5;

        }
    }
</style>
