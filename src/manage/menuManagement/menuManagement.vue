//部门
<template lang="html">
  <div style="width:100%;height:100%;">
    <div class="manageTree">
      <menuTree :treeName="menuTreeName" :treeData="treeData" ref="tree" :currentNodekey='currentNodekey'  :expandedkeys='expandedkeys'></menuTree>
    </div>
    <div class="manage_bmTable">
      <header>菜单管理</header>
      <div style="border-left:1px solid #EBEEF5;">
        <router-view @MenuheadCallBack="MuneheadCall"></router-view>
      </div>
      </el-table>
    </div>

  </div>

</template>
<script>
  import {
        getMenuTree
  } from '../../services/rwfkPage.js'
  export default {
    data() {
      return {
        btn: true,
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
        menuTreeName: '菜单组织树',
        treeData: [],
        currentNodekey: "", //默认选中的节点树
        expandedkeys: [], //默认展开的节点树 
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
      MuneheadCall(data){
         this.treeData = data;
          this.$store.dispatch('getmenuid', this.treeData[0].id);
          if( this.treeData.length>0){
                  this.currentNodekey =  this.treeData[0].id;
                  this.expandedkeys.push( this.treeData[0].id);

              }

      }


    },
    created() {
      getMenuTree().then((data) => {
        this.treeData = data.data.result;
          this.$store.dispatch('getmenuid', this.treeData[0].id);
          if( this.treeData.length>0){
                  this.currentNodekey =  this.treeData[0].id;
                  this.expandedkeys.push( this.treeData[0].id);

              }

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