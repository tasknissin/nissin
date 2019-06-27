<template>
    <div class="mTreepage">
        <header>{{treeName}}</header>
        <el-tree :data="treeData" :props="defaultProps"  node-key="id" :default-expanded-keys="[1,3]"
            @node-click="handleNodeClick">
        </el-tree>

    </div>
</template>

<script>
    export default {
        name: 'menuTree',
        props: {
            treeName: String,
            treeData: Array,
        },
        data() {
            return {
                defaultProps: {
                    // children: 'children',
                    // label: 'label'
                    children: 'childrenList',
                    label: 'menuName'
                },
                hashPath: '',
            }
        },
        methods: {
            handleNodeClick(data) {
               this.$store.dispatch('getmenuid',data.id);
               // console.log(data.id);
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