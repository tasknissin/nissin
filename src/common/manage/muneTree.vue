<template>
    <div class="mTreepage">
        <header>{{treeName}}</header>
        <el-tree :data="treeData" :props="defaultProps" node-key="id" :current-node-key="currentNodekey"
            :default-expand-all='defaultExpandAll' @node-click="handleNodeClick" ref="tree">
            <!-- :default-expanded-keys="expandedkeys" -->
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
                currentNodekey: "", //默认选中的节点树
                expandedkeys: [], //默认展开的节点树 
                defaultExpandAll: true
            }
        },
        mounted() {
            //    /  this.$refs.tree.setCurrentKey();//一定要加这个选中了否则样式没有出来
        },
        methods: {
            handleNodeClick(data) {
                this.$store.dispatch('getmenuid', data.id);
                // this.$refs.tree.setCurrentKey();//一定要加这个选中了否则样式没有出来
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