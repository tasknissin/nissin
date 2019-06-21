<template lang="html">
  <div class="managePage">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!--左侧菜单组件-->
        <el-menu
          :default-active="isId"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          background-color="#F0F6F6"
          text-color="#3C3F41"
          active-text-color="#f60">
          <NavMenu :navMenus="totalList"></NavMenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="height:100%;">
          <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit" style="height:40px;" @tab-click="tabsClick">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
          <div class="ManageContents">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import config from "./config";
import NavMenu from "./leftSidebar.vue";
export default {
  data() {
    return {
      totalList: [],
      isId: "部门管理",
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "部门管理",
          name: "1",
          content: "Tab 1 content",
          path:'/manage/department/test1'
        }
      ],
      tabIndex: 1,
      tabsPath:[{'name':'部门管理','path':'/manage/department/test1'}]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key,keyPath)
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      tabs.forEach((tab, index) => {
        if (tab.title === key) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.title != key);
        }
      });

     
      setTimeout(()=>{ //路由切换完在赋值
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: key,
          name: newTabName,
          content: "New Tab content",
          path:window.location.hash.replace('#','')

        });
        this.editableTabsValue = newTabName;
        let tabsPath = [...this.tabsPath];
        for(var i = 0; i < tabsPath.length; i++){
          if(tabsPath[i].name != key){
            this.tabsPath.push({name : key,path:window.location.hash.replace('#','')})
            break;
          }else if(tabsPath[i].name == key){
            this.tabsPath = this.tabsPath.filter(tab => tab.name != key);
          }
        } 
      },200)

    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
          path:window.location.hash.replace('#','')
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        this.$router.push({path:this.editableTabs[this.editableTabs.length - 1].path})

      }
    },
    tabsClick(data){
      this.tabsPath.map((tab,index)=>{
        if(tab.name == data.label){
          this.$router.push({path:tab.path})
        }
      })
    }
  },
  components: {
    NavMenu
  },
  beforeRouteEnter(to, from, next) {
    // console.log("我从哪里来", to.params.id, from);

    var self = this;
    next(vm => {
      vm.isId = to.params.id;
    });
  },
  watch: {
    $route(to, from) {
      this.isId = to.params.id;
    }
  },
  created() {
    this.totalList = config.childs;
    var _this = this;
    window.addEventListener('load',function(){
      if(window.location.hash.indexOf('manage')){
        _this.$router.push({path:'/manage/department/test1'})
      }
    })
  }
};
</script>

<style>
.managePage {
  height: calc(100% - 48px);
}
.el-main {
  padding: 0px;
}
.el-left {
  width: 15% !important;
  background-color: white;
}
.el-right {
  width: 80%;
  background-color: white;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-menu-item,
.el-submenu__title {
  margin-bottom: 1px;
}
.ManageContents {
  width: 100%;
  height: calc(100% - 42px);
  overflow: hidden;
}
</style>
