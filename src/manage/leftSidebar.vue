<template>
  <div class="navMenu">
    <label v-for="(navMenu,index) in navMenus" :key="index">
      <router-link :to="{ name:navMenu.route, params: {id:navMenu.menuName} }">
        <el-menu-item  v-if="navMenu.childrenList == null" :key="navMenu.id" :data="navMenu" :index="navMenu.menuName" :route="navMenu.route">
          <i :class="navMenu.icon"></i>
          <span slot="title">{{navMenu.menuName}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu  v-if="navMenu.childrenList" :key="navMenu.id" :data="navMenu" :index="navMenu.menuName">
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span v-if="!collpase">{{navMenu.menuName}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childrenList"></NavMenu>
      </el-submenu>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: {
      'navMenus':Array,
      'collpase':Boolean 
    },
    data() {
      return {
     
      }
    },
    
    methods: {}
  }
</script>

<style>
    /* a{
      text-decoration:none
    } */
    .navMenu .el-menu-item {
      /* color: rgb(229, 236, 241) !important; */
      /* background-color: rgb(57, 66, 99)  !important; */
    }
    .navMenu .el-menu-item:hover{
      /* background-color:green !important; */
    }
</style>



