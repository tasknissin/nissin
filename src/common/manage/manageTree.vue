<template>
    <div class="mTreepage">
        <header>{{treeName}}</header>
        <el-tree 
            :data="treeData" 
            :props="defaultProps" 
            node-key="id"
            :highlight-current="true"
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
        treeData:Array,
        firstId:String,
    },
    data(){
        return{
            defaultProps: {
                // children: 'children',
                // label: 'label'
                children: 'childrenList',
                label: 'departmantName'
            },
            hashPath:'',
            
        }
    },
    methods: {
        handleNodeClick(data) {
            this.$store.dispatch('getid',data.id);
            this.$center.$emit('dep-event', data.id);   
            this.$center.$emit('user-event', data.id);   
        }
    },
    
    
}
</script>

<style lang="scss">
    .mTreepage {
        header {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-bottom: 1px solid #EBEEF5;

        }
    }
</style>