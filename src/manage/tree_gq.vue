<template>
    <div>
        <el-tree :data="data" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
        
    </div>
</template>