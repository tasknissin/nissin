<template>
  <div id="app">
    <div class="app-Header">
      <div class="app-headerBox">
        <div class="h-logoBox fl clearfix" @click="GOHome">
                <div class="h-logo fl">
                </div>
                <div class="h-logoName fl">
                    <span>集团财务关键任务管理平台</span>
                </div>
            </div>
        <el-menu
          mode="horizontal"
          background-color="#394263"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="activeIndex"
          router
          menu-trigger="hover"
          style="float:right"
        >
          <NavMenu :navMenus="menuData"></NavMenu>
        </el-menu>
      </div>
    </div>
    <router-view></router-view>
    <!-- <p>hx修改</p> -->
    

  </div>

</template>
<script>
import NavMenu from "./common/header/Header.vue";
export default {
  components: {
    NavMenu: NavMenu
  },
  data(){
    return{
      activeIndex: 'home',
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "aa",
            icon: "el-icon-message",
            alias: "首页"
          }
        },
        {
          //一级
          entity: {
            id: 11,
            name: "self",
            icon: "el-icon-message",
            alias: "个人中心"
          }
        },
        
        {
          //一级
          entity: {
            id: 6,
            name: "mgtCenter",
            icon: "el-icon-news",
            alias: "管理中心"
          },
          //二级
          childs: [
            {
              entity: {
                id: 7,
                name: "mgtFirst",
                icon: "el-icon-phone-outline\r\n",
                alias: "任务中心",
                value: ""
              },
            },
            {
              entity: {
                id: 8,
                name: "integralManage",
                icon: "el-icon-picture",
                alias: "管理中心",
                value: "/user/integral"
              }
            },
            {
              entity: {
                id: 9,
                name: "mgtCenter",
                icon: "el-icon-picture",
                alias: "管理",
                value: ""
              }
            },
            {
              entity: {
                id: 19,
                name: "manage",
                icon: "el-icon-picture",
                alias: "后台管理",
                value: ""
              }
            }
          ]
        },
        {
          //一级
          entity: {
            id: 40,
            name: "",
            icon: "el-icon-s-custom",
            alias: "白瑞红"
          },
        },
        {
          //一级
          entity: {
            id: 42,
            name: "",
            icon: "el-icon-switch-button",
            alias: ""
          },
        }
      ],
    }
  },
  methods: {
    GOHome(){
      this.$router.push({ name:'home'})
    }
  },
};
</script>


<style lang="scss" scoped>
#app{
  min-width: 1000px;
}
.app-Header{
  width:100%;
  height: 48px;
  background-color:#394263;
}
.app-Header .app-headerBox{
  width:90%;
  height: 100%;
  margin:0 auto;
}
.h-logoBox .h-logo{
    background: url(./assets/logo.svg) no-repeat center;
    background-size: 100% 100%;
    width: 78px;
    height:100%;
}
.h-logoBox{
    /* margin:0 40px; */
    width:30%;
    height: 48px;
    line-height: 48px;
    float: left;
}

.h-logoBox .h-logoName{
    font-size: 14px;
    color:#fff;
    font-weight: 600;
    margin-top: 3px;
    margin-left: 8px;
}
</style>
