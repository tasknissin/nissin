<template>
    <div class="headerNav" >
        <!--<span class="header-btn header-btn-left">
            <slot name="left"/>
        </span>
        <h1 class="title">{{title}}</h1>
        <span class="header-btn header-btn-right">
            <slot name="right"/>   
        </span> -->
        <!-- <div class="headerNav">
            <div class="h-logoBox fl clearfix">
                <div class="h-logo fl" @click="GOHome">
                </div>
                <div class="h-logoName fl">
                    <span>集团财务关键任务管理平台</span>
                </div>
            </div>
        </div> -->
        
        <template v-for="navMenu in navMenus">
                    <!-- 最后一级菜单 -->
                <el-menu-item v-if="!navMenu.childs&&navMenu.entity"
                                :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" 
                            >
                    <i :class="navMenu.entity.icon"></i>
                    <span slot="title">{{navMenu.entity.alias}}</span>
                </el-menu-item>

                <!-- 此菜单下还有子菜单 -->
                <el-submenu v-if="navMenu.childs&&navMenu.entity"
                            :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
                    <template slot="title">
                    <i :class="navMenu.entity.icon"></i>
                    <span> {{navMenu.entity.alias}}</span>
                    </template>
                    <!-- 递归 -->
                    <NavMenu :navMenus="navMenu.childs"></NavMenu>
                </el-submenu>
        </template>
    </div>
    
</template>

<script>
export default {
    name: 'NavMenu',
    props: {
        title: String,
        navMenus:Array
    },
    data(){
        return {
            // tabsList: [
            //     // { id:'mgh', name: "管理中心", itemClass: "h-menuIcons el-icon-s-tools",itemListClass:'h-menu-list el-icon-caret-bottom'},
            //     { id:'self',name: "个人中心", itemClass: "h-menuIcons el-icon-s-custom",itemListClass:'' },
            //     { id:'mesg',name: "通知", itemClass: "h-menuIcons el-icon-message-solid",itemListClass:'' },
            //     { id:'touxiang',name:this.title, itemClass: "h-touxiang",itemListClass:'' },
            //     { id:'down',name:'', itemClass: "el-icon-switch-button",itemListClass:'' }
            // ],
            // menusList:[{id:"task",name:'任务中心'},{id:"mmgt",name:'管理中心'}],
            // playFlag:false

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
}
.el-menu--horizontal>div>.el-menu-item{
  border:none;
}
.el-submenu__title{
  height: 48px !important;
  line-height: 48px !important;
  /* margin:0;
  padding:0; */
}
.el-menu-item{
    padding:0 10px;
}
.header{
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
.h-logoBox .h-logo{
    background: url(../../assets/logo.svg) no-repeat center;
    background-size: 100% 100%;
    width: 78px;
    height:100%;
}
.h-logoBox{
    /* margin:0 40px; */
    height: 48px;
    line-height: 48px;
    float: left;
}
.h-logoBox .h-logo{
    background: url(../../assets/logo.svg) no-repeat center;
    background-size: 100% 100%;
    width: 78px;
}
.h-logoBox .h-logoName{
    font-size: 14px;
    color:#fff;
    font-weight: 600;
    margin-top: 3px;
    margin-left: 8px;
}
/* .header .headerNav{
    width:88%;
    height: 100%;
    margin:0 auto;
}
.header .headerNav 
.header .headerNav 
.header .headerNav .h-logoBox .h-logo a{
    width:100%;
    height: 100%;
    display: inline-table;
}

.header .headerNav .h-menuBox{
    height: 100%;
}
.header .headerNav .h-menuBox>ul{
    height:100%;
    position: relative;
}

.header .headerNav .h-menuBox>ul>li{
    float: left;
    height: 48px;
    line-height: 48px;
    height:100%;
    padding:0 12px;
    color:#fff;
}
.header .headerNav .h-menuBox>ul>li .h-touxiang{
    display: block;
    float: left;
    width: 25px;
    height: 25px;
    background: url(../../assets/user.png) no-repeat center;
    background-size: 100% 100%;
    margin:11px 5px 0 5px;

}
.header .headerNav .h-menuBox>ul>li .h-menuIcons{
    font-size: 16px;
    vertical-align: -1.2px;
    margin-right: 5px;
    color:#fff;
}
.header .headerNav .h-menuBox>ul>li .h-menu-listIcon{
    margin-left: 3px;
}
.header .headerNav .h-menuBox>ul>li:hover{
    background-color: #262e4c;
}
.header .headerNav .h-menuBox>ul>li:first-child{
    width:96px;
}
.h-menu-lists{
    width:120px;
    position: absolute;
    top:48px;
    left:0;
    background-color: #394263;
    z-index: 10;
}
.h-menu-lists>li{
    width:100%;
    text-align: center;
} */
</style>
