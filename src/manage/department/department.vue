//部门
<template lang="html">
  <div style="width:100%;height:100%;">
    <div class="manageTree">
      <ManageTree :treeName="manageTreeName"></ManageTree>
    </div>
    <div class="manage_bmTable">
        <header>菜单定义</header>
        <router-view></router-view>
    </el-table>
    </div>
<<<<<<< HEAD
    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
  <el-tab-pane
    v-for="(item, index) in editableTabs2"
    :key="item.name"
    :label="item.title"
    :name="item.name"
    class="tab-pane"
  >
    {{item.title}}
  </el-tab-pane>
  </el-tabs>

    <el-table :data="tableData">
    <el-table-column prop="deptCode" label="部门编号" width="140">
    </el-table-column>
    <el-table-column prop="deptName" label="部门名称" width="120">
    </el-table-column>
    <el-table-column prop="P_deptCode" label="父级部门编号">
    </el-table-column>
    <el-table-column prop="P_deptName" label="父级部门名称">
    </el-table-column>
    <el-table-column prop="deptType" label="部门类型">
    </el-table-column>
    <el-table-column prop="manager" label="部门负责人">
    </el-table-column>
    <el-table-column prop="Enabled" label="是否有效">
    </el-table-column>
  </el-table>
</div>
=======
    <!-- <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{item.title}}
      </el-tab-pane>
    </el-tabs> -->

   
  </div>
>>>>>>> 1f63fd6220952696f32805dc86169c56f2108d69
  
</template>
<script>
export default {
  data() {
    return {
<<<<<<< HEAD
      btn:true,
      item:{
        deptCode: '2018-11-11',
        deptName: 'OnePiece',
        P_deptCode: '郑州市高新区推进城',
        P_deptName: '2018-11-11',
        deptType: 'OnePiece',
        manager: '郑州市高新区推进城',
        Enabled: '郑州市高新区推进城',
        
=======
      btn: true,
      item: {
        date: "2018-11-11",
        name: "OnePiece",
        address: "郑州市高新区推进城"
>>>>>>> 1f63fd6220952696f32805dc86169c56f2108d69
      },
      editableTabsValue2: "2",
      editableTabs2: [],
      tabIndex: 0,
      tableData: [],
      totalList: [],
      manageTreeName: '部门组织树'
    };
  },
  methods: {
    addTab(targetName) {
      this.btn = true;
      this.editableTabs2.forEach((v, k) => {
        if (v.title == targetName) {
          this.btn = false;
          this.editableTabsValue2 = v.name;
        }
      });
      if (this.btn) {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs2.push({
          title: targetName,
          name: newTabName,
          content: targetName
        });
        this.editableTabsValue2 = newTabName;
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;

      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push({
                name: "elc",
                params: {
                  id: nextTab.title
                }
              });
            }
          }
        });
      }

      this.editableTabsValue2 = activeName;

      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
    }
  },
  created() {
    this.tableData = Array(20).fill(this.item);
  },
<<<<<<< HEAD
  beforeRouteEnter (to, from, next) {
      console.log("我从哪里来",to.params.id,from)
      var self = this
     
      next(vm=>{
      vm.item.name =to.meta.title;
       vm.addTab(to.meta.title);
      })
=======
  beforeRouteEnter(to, from, next) {
    console.log("我从哪里来", to.params.id, from);
    var self = this;
>>>>>>> 1f63fd6220952696f32805dc86169c56f2108d69

    next(vm => {
      vm.item.name = to.params.id;
      vm.addTab(to.params.id);
    });
  },
  watch: {
    $route(to, from) {
      this.item.name = this.$route.params.id;
      this.addTab(to.params.id);
    }
  }
};
</script>

<<<<<<< HEAD
<style lang="css">
.el-tabs__item.is-active {
    color: #ffffff;
}
.el-tabs__nav {
      background-color: #394263;
}

=======
<style lang="scss">
.manageTree{
  width:200px;
  height: 100%;
  position: fixed;
  border-right:1px solid #EBEEF5;
  box-sizing: border-box;
}
.manage_bmTable{
  margin-left: 200px;
  height: 100%;
  header{
    width:100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #EBEEF5;
  }
}
>>>>>>> 1f63fd6220952696f32805dc86169c56f2108d69
</style>

