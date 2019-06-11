<template lang="html">
  <div class="" style="height: 92%;">
    <el-container style="height: 100%; border: 1px solid #eee">
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
  <el-main>
   <router-view></router-view>
  </el-main>
</el-container>
</el-container>
  </div>
</template>
<script>
import config from './config'
import NavMenu from './leftSidebar.vue';
export default {
  data() {
    return{
      totalList:[],
      isId:"权限管理"
    }

  },
  methods: {
    handleSelect(key,keyPath){
      console.log(key,keyPath)
    }
  },
  components: {
                NavMenu
    },
   beforeRouteEnter (to, from, next) {
      console.log("我从哪里来",to.params.id,from)
      var self = this
      next(vm=>{
        vm.isId = to.params.id
      })
    },
 watch:{
     $route(to,from){
        this.isId = to.params.id
     }
   },
  created(){
    this.totalList = config.childs
  },
}
</script>

<style lang="css">
.el-main {
    padding: 2px;
}

</style>
