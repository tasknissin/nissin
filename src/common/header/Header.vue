<template>
    <div class="headerNav" >
        <template v-for="navMenu in navMenus">
                    <!-- 最后一级菜单 -->
                <el-menu-item v-if="!navMenu.childrenList && navMenu"
                                :key="navMenu.id" :data="navMenu" :index="navMenu.route" 
                            >
                    <i :class="navMenu.icon"></i>
                    <span slot="title">{{navMenu.menuName}}</span>
                </el-menu-item>
                <!-- 此菜单下还有子菜单 -->
                <el-submenu v-if="navMenu.childrenList && navMenu"
                            :key="navMenu.id" :data="navMenu" :index="navMenu.route">
                    <template slot="title">
                    <i :class="navMenu.icon"></i>
                    <span> {{navMenu.menuName}}</span>
                    </template>
                    <!-- 递归 -->
                    <NavMenu :navMenus="navMenu.childrenList"></NavMenu>
                </el-submenu>
        </template>
        
    </div>
    
</template>

<script>
import {
  Submenu,
  MenuItem} from "element-ui"
export default {
    name: 'NavMenu',
    components: {
        "el-menu-item":MenuItem,
        "el-submenu" : Submenu
    },
    props: {
        title: String,
        navMenus:Array
    },
    data(){
        return {
           

        };
    },
    methods:{
        setHeadAction(item,index){
                if(item.id == 'self'){ 
                this.$router.push({ name:'self'})
            }
        },
        toggleAction(event){
            if(event.target.id == 'mgt' || event.target.parentNode.id == 'mgt'){
                this.playFlag = !this.playFlag //取反
            }else{
                this.playFlag = false;
            }
        },
        palyFlaghandle(){
            this.playFlag = false;
        },
        GOHome(){
            this.$router.push({ name:'home'})
        },
        goMenuItem(item,index){
            if(item.id == 'task'){
                this.$router.push({ name:'taskCenter'})
            }else if(item.id == 'mmgt'){
                this.$router.push({ name:'mgtCenter'})
            }
        }
    },
    created(){
    }
}
</script>

<style>
*{
  outline:none;
}
/* 水平样式 */
.el-menu--horizontal>div>.el-submenu {
    float: left;
}

/* 一级菜单的样式 */
.el-menu--horizontal>div>.el-menu-item {
    float: left;
    height: 48px;
    line-height: 48px;
    margin: 0;
    /* border-bottom: 2px solid transparent ; */
    color: #909399;
}
.el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
    position: static;
    /* vertical-align: middle; */
    margin-left: 8px;
    margin-top: -3px;
}
.el-menu-item * {
    vertical-align: initial;
}
.el-submenu__title * {
    vertical-align: inherit;
}
.el-menu.el-menu--horizontal{
    border-bottom:none;
    height: 48px;
}
.el-menu--horizontal>div>.el-menu-item{
  border:none;
}
.headerNav .el-submenu__title{
  height: 48px !important;
  line-height: 48px !important;
  /* margin:0;
  padding:0; */
}
.headerNav .el-menu-item{
    padding:0 10px !important;
}
.headerNav .el-submenu__title{
    padding:0 10px !important;
}
.headerNav .header{
    width: 100%;
    height: 48px;
    background: #394263;
}
/* .headerNav .el-menu-item i{
    color:#fff;
} */
/* .headerNav .el-submenu__title i{
    color:#fff;
} */
.headerNav .h-logoBox .h-logo{
    background: url(../../assets/logo.svg) no-repeat center;
    background-size: 100% 100%;
    width: 78px;
    height:100%;
}
.headerNav .h-logoBox{
    /* margin:0 40px; */
    height: 48px;
    line-height: 48px;
    float: left;
}
.headerNav .h-logoBox .h-logo{
    background: url(../../assets/logo.svg) no-repeat center;
    background-size: 100% 100%;
    width: 78px;
}
.headerNav .h-logoBox .h-logoName{
    font-size: 14px;
    color:#fff;
    font-weight: 600;
    margin-top: 3px;
    margin-left: 8px;
}

</style>
