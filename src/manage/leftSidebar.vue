<template>
  <div class="navMenu">
    <label v-for="(navMenu,index) in navMenus" :key="index">
      <router-link :to="{ name:navMenu.route, params: {id:navMenu.menuName} }">
        <el-menu-item  v-if="navMenu.childrenList==null"
                      :key="navMenu.id" :data="navMenu" :index="navMenu.menuName" :route="navMenu.route">
          <i :class="navMenu.icon"></i>
          <span slot="title">{{navMenu.menuName}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu  v-if="navMenu.childrenList"
                  :key="navMenu.id" :data="navMenu" :index="navMenu.menuName">
        <template slot="title" style="color: rgb(229, 236, 241);background-color: rgb(57, 66, 99);">
          <i :class="navMenu.icon"></i>
          <span> {{navMenu.menuName}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childrenList"></NavMenu>
      </el-submenu>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {
     
      }
    },
    
    methods: {}
  }
</script>

<style scoped>
    a{
      text-decoration:none
    }
    .el-menu-item {
         color: rgb(229, 236, 241);
    background-color: rgb(57, 66, 99);
    }
</style>



