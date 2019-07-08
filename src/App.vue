<template>
  <div id="app">
    <div class="app-Header" v-if="headerFalg">
      <div class="app-headerBox">
        <div class="h-logoBox fl clearfix" @click="GOHome">
                <div class="h-logo fl">
                </div>
                <div class="h-logoName fl">
                    <span>集团财务关键任务管理平台</span>
                </div>
            </div>
        <ul class="userInfo-box">
            <li><i class="el-icon-s-custom"></i><span>白瑞红</span></li>
            <li @click="loginOutHandle"><i class="el-icon-switch-button"></i><span></span></li>
        </ul>
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
    <router-view ></router-view>
    <!-- <p>hx修改</p> -->
    

  </div>

</template>
<script>
import NavMenu from "./common/header/Header.vue";
import {searchTypeMenuData} from './services/Manage/postManage'
import {mapState} from 'vuex';
import {removeToken,removeUserId} from '@/utils/auth.js'
export default {
  components: {
    NavMenu: NavMenu
  },
  data(){
    return{
      activeIndex: 'home',
      menuData:[],
      headerFalg:true,
    }
  },
  computed: {
    ...mapState({
      userId:state => state.user.userId,
      token:state => state.user.token
    })
  },
  watch:{
      '$route.path':function(newVal,oldVal){
        if(newVal === '/login'){
          this.headerFalg = false;
        } else{
          this.headerFalg = true;         
        }
      }
  },
  methods: {
    GOHome(){
      this.$router.push({ name:'home'})
    },
    loginOutHandle(){
      this.$router.push({ name:'login'})
      removeToken();
      removeUserId();
    },
    // headCall(data){
    //   console.log(data)
    //   this.menuData = data;
    // }
  },
  created() {
    
    if(window.location.hash.indexOf('login') != -1){   // 当为登录页面时隐藏头部
      this.headerFalg = false;
    }
    this.$center.$on('headCallBack',(data)=>{
      this.menuData = data;
    })
    this.menuData = JSON.parse(localStorage.getItem('tMenu'))
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
  white-space: nowrap;
  overflow: hidden;
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
    width:25%;
    height: 48px;
    line-height: 48px;
    white-space: nowrap;
    float: left;
}

.h-logoBox .h-logoName{
    font-size: 14px;
    color:#fff;
    font-weight: 600;
    margin-top: 3px;
    margin-left: 8px;
}
.userInfo-box{
    float:right;
}
.userInfo-box li{
    height: 48px;
    line-height: 48px;
    float:left;
    color: rgb(255, 255, 255);
    border-bottom-color: transparent;
    background-color: rgb(57, 66, 99);
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    white-space: nowrap;
    padding:0 10px;
}
.userInfo-box li:hover{
    background-color: rgb(46,53,69) !important;
    color: rgb(255, 255, 255); 
    border-bottom-color: transparent; 
    background-color: rgb(57, 66, 99);
}
.userInfo-box li i{
    margin-right: 5px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    color: #909399;
}
</style>
