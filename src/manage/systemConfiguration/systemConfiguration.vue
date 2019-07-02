<template lang="html">   
    <div style="width:100%;height:100%;">  <!-- 岗位管理 -->
    <div class="manageTree">
      <ManageTree :treeName="manageTreeName" :treeData="treeData" :firstId="firstId"></ManageTree>
    </div>
    <div class="manage_bmTable">
        <header>用户列表</header>
        <div style="border-left:1px solid #EBEEF5;height:calc(100% - 30px);">
          <router-view></router-view>
        </div>
    </el-table>
    </div>
</div>
  
</template>

<script>
import { getdepartmentTree } from "../../services/Manage/postManage.js";
export default {
  data() {
    return {
      manageTreeName: "部门组织树",
      id: "",
      key: "",
      type: "",
      enabled: "",
      treeData: [],
      firstId: ""
    };
    },
    methods: {
        offxxxListener: function() {
            this.$center.$off("user-event");
        }
    },
    created() {
        setTimeout(() => {
            if (window.location.hash.indexOf("userManage") != -1) {
                getdepartmentTree(this.id, this.key, this.type, this.enabled).then(
                    result => {
                        if (result.result.length > 0) {
                            this.firstId = result.result[0].id;
                            this.$center.$emit("user-event", this.firstId);
                        }
                        this.treeData = result.result;
                    }
                );
            }
        }, 100);
    },
    beforeDestroy() {
        this.offxxxListener();
    }
};
</script>

<style>
</style>
