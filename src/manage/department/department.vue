//部门
<template lang="html">
  <div style="width:100%;height:100%;">
    <div class="manageTree">
      <ManageTree :treeName="manageTreeName" :treeData="treeData"  ></ManageTree>
    </div>
    <div class="manage_bmTable">
      <header>部门管理</header>
      <div style="border-left:1px solid #EBEEF5;">
        <router-view></router-view>
      </div>
      </el-table>
    </div>
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

</template>
<script>
  import {
        getDepartmentTree
  } from '../../services/rwfkPage.js'
  export default {
    data() {
      return {
        btn: true,
        // props:{ letter: String},
        item: {
          date: "2018-11-11",
          name: "OnePiece",
          address: "郑州市高新区推进城"
        },
        editableTabsValue2: "2",
        editableTabs2: [],
        tabIndex: 0,
        tableData: [],
        totalList: [],
        manageTreeName: '部门组织树',
        treeData: []
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
      },



    },
    created() {
      getDepartmentTree().then((data) => {
        this.treeData = data.data.result;
          this.$store.dispatch('getid', this.treeData[0].id);
      });
      this.tableData = Array(20).fill(this.item);
    },
    beforeRouteEnter(to, from, next) {
      var self = this;

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

<style lang="scss">
  .manageTree {
    width: 200px;
    height: 100%;
    position: fixed;
    box-sizing: border-box;
  }

  .manage_bmTable {
    margin-left: 200px;
    height: 100%;

    header {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-bottom: 1px solid #EBEEF5;
    }
  }
</style>