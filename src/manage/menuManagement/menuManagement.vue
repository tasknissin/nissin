<template lang="html">   
  <div style="width:100%;height:100%;">  <!-- 岗位管理 -->
    <div class="manageTree">
      <ManageTree :treeName="manageTreeName"></ManageTree>
    </div>
    <div class="manage_bmTable">
        <header>菜单定义</header>
        <div style="border-left:1px solid #EBEEF5;">
          <router-view></router-view>
        </div>
    </el-table>
    </div>
</div>
  
</template>

<script>
export default {
 
}
</script>

<style>

</style>
