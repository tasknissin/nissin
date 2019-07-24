<template lang="html">
  <div class="managePage" v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 1)">
    <el-container>
      <el-aside width="200" style="background-color: rgb(238, 241, 246)">
        <div style="text-align:right;background-color:rgb(240, 246, 246);"><el-checkbox-button style="display:inline-block;width:100%;" v-model="isCollapse" @change="radioChange" size="small"><i class="el-icon-s-operation"></i></el-checkbox-button></div>
        
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" @change="radioChange">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
      <!--左侧菜单组件-->
        <el-menu
          :default-active="isId"
          @select="handleSelect"
          class="el-menu-vertical-demo"
          background-color="#F0F6F6"
          text-color="#3C3F41"
          active-text-color="#f60"
          @open="handleOpen" 
          @close="handleClose" 
          :collapse="isCollapse"
          >
          <NavMenu :navMenus="totalList" :collpase="isCollapse"></NavMenu>
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
import Vue from 'vue';
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Transfer)
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Col);
Vue.use(Row);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

import config from "./config";
import NavMenu from "./leftSidebar.vue";
import {mapState} from 'vuex'
import {searchTypeMenuData,getBtnsPermissionsData } from '../services/Manage/postManage'
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
          path:'test1'
        }
      ],
      tabIndex: 1,
      loading:true,
      tabsPath:[{'name':'部门管理','path':'test1'}],
      isCollapse: false

    };
  },
  watch:{
      isCollapse(val){
        console.log(val)
      }
  },
  computed: {
    ...mapState({
      userId:state => state.user.userId,
    })
  },
  methods: {
    handleSelect(id, keyPath,{route,$attrs}) {
      /**
       * 头部标签页
       */
      // let muneid= $attrs.data.id;
      this.$store.dispatch('getZmuneID',$attrs.data.id);
      let key = $attrs.data.menuName
      let tabs = this.editableTabs;    //标签栏数据
      let activeName = this.editableTabsValue;   //默认进来标签
      // debugger;
      tabs.forEach((tab, index) => {
        if (tab.path === route) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.title != key);
        }
      });
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: key,
        name: newTabName,
        content: "New Tab content",
        path:route

      });
      this.editableTabsValue = newTabName;
      let tabsPath = [...this.tabsPath];
      for(var i = 0; i < tabsPath.length; i++){
        if(tabsPath[i].path != route){
          this.tabsPath.push({name : key,path:route})
          break;
        }else if(tabsPath[i].path == route){
          this.tabsPath = this.tabsPath.filter(tab => tab.name != key);
        }
      } 

      /**
       * 点击按钮切换路由，获取该菜单下该用户的按钮权限
       */
      getBtnsPermissionsData(id,this.userId).then((result)=>{
      })

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
                this.$router.push({name:nextTab.path})
              }else{
                this.$router.push({name:this.editableTabs[this.editableTabs.length - 1].path})
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        if(tabs.length > 1){
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }

      }
    },
    tabsClick(data){
      this.editableTabs.map((tab,index)=>{
        if(tab.title == data.label){
          this.$router.push({name:tab.path})
        }
      })
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    radioChange(val){
      if(val){  
        setTimeout(()=>{
          let navDom = document.querySelector('.navMenu')
          let arrowArr = navDom.getElementsByClassName('el-submenu__icon-arrow');
          for(var i = 0; i < arrowArr.length; i++){
            navDom.getElementsByClassName('el-submenu__icon-arrow')[i].style.display = 'none'
          }
        },340)
      }
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
    // 获取侧边栏菜单数据
    searchTypeMenuData(this.userId,'left').then(result=>{
      if(result.success){
        this.totalList = result.result
        this.loading = false;
      }
    })

    // this.totalList = config.childs;
    var _this = this;
    window.addEventListener('load',function(){
      if(window.location.hash.indexOf('manage')){
        let obj = {};
        let _cookie = document.cookie.split('; ');
        for(var i = 0; i < _cookie.length; i++) {
            var arr = _cookie[i].split('=');
            obj[arr[0]] = arr[1];
        }
        if(!obj.AdminToken){
          _this.$router.push({path:'/login'})
        }else{
          _this.$router.push({path:'/manage/department/test1'})
        }
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
/* .el-menu-item,
.el-submenu__title {
  margin-bottom: 1px;
} */
.ManageContents {
  width: 100%;
  height: calc(100% - 42px);
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: calc(100% - 48px);
}
.managePage .el-menu-vertical-demo {
  min-height: calc(100% - 48px);
}
.managePage .el-checkbox-button__inner{
  padding:6px 2px;
  border-radius: 0 !important;
}
.managePage .el-menu{
  border-right: none !important;
}
.el-checkbox-button__inner{
  display: inline-block;
  width:100%;
}
</style>
