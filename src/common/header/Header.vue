<template>
    <header class="header" >

        <!--<span class="header-btn header-btn-left">
            <slot name="left"/>
        </span>
        <h1 class="title">{{title}}</h1>
        <span class="header-btn header-btn-right">
            <slot name="right"/>   
        </span> -->
        <div class="headerNav">
            <div class="h-logoBox fl clearfix">
                <div class="h-logo fl" @click="GOHome">
                </div>
                <div class="h-logoName fl">
                    <span>集团财务关键任务管理平台</span>
                </div>
            </div>
            <div class="h-menuBox fr clearfix">
                <ul>
                    <li id = "mgt" @click="toggleAction" @mouseleave="palyFlaghandle">
                        <i class="h-menuIcons el-icon-s-tools"></i><span>管理中心</span><span class="h-menu-list el-icon-caret-bottom"></span>
                        <ul class="h-menu-lists"  v-show="playFlag">
                            <li v-for="(item,index) in menusList" :key='index' @click="goMenuItem(item,index)">{{item.name}}</li>
                        </ul>
                        
                    </li>
                    <li v-for="(item,index) in tabsList" :key='index' @click="setHeadAction(item,index)">
                        <i class="el-dropdown-link" :class="item.itemClass"></i><span>{{item.name}}</span><span :class="item.itemListClass"></span>
                    </li>
                    
                    <!-- <li>
                        <i class="h-menuIcons el-icon-s-tools"></i><span>管理中心</span><span class="h-menu-list el-icon-caret-bottom"></span>
                    </li>
                    <li>
                        <i class="h-menuIcons el-icon-s-custom"></i><span>个人中心</span>
                    </li>
                    <li>
                        <i class="h-menuIcons el-icon-bell"></i><span>通知</span>
                    </li>
                    <li>
                        <i class="h-touxiang"></i><span>白瑞红</span>
                    </li>
                    <li>
                        <i class="el-icon-switch-button"></i>
                    </li> -->
                </ul>
            </div>
        </div>
    </header>
    
</template>

<script>
export default {
    name: 'app-header',
    props: {
        title: String,
    },
    data(){
        return {
            tabsList: [
                // { id:'mgh', name: "管理中心", itemClass: "h-menuIcons el-icon-s-tools",itemListClass:'h-menu-list el-icon-caret-bottom'},
                { id:'self',name: "个人中心", itemClass: "h-menuIcons el-icon-s-custom",itemListClass:'' },
                { id:'mesg',name: "通知", itemClass: "h-menuIcons el-icon-message-solid",itemListClass:'' },
                { id:'touxiang',name:this.title, itemClass: "h-touxiang",itemListClass:'' },
                { id:'down',name:'', itemClass: "el-icon-switch-button",itemListClass:'' }
            ],
            menusList:[{id:"task",name:'任务中心'},{id:"mmgt",name:'管理中心'}],
            playFlag:false

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

<style scoped>
.header{
    width: 100%;
    height: 48px;
    background: #394263;
}
.header .headerNav{
    width:88%;
    height: 100%;
    margin:0 auto;
}
.header .headerNav .h-logoBox{
    height: 100%;
}
.header .headerNav .h-logoBox .h-logo{
    background: url(../../assets/logo.svg) no-repeat center;
    background-size: 100% 100%;
    width: 78px;
    height:100%;
}
.header .headerNav .h-logoBox .h-logo a{
    width:100%;
    height: 100%;
    display: inline-table;
}
.header .headerNav .h-logoBox .h-logoName{
    font-size: 14px;
    color:#fff;
    font-weight: 600;
    margin-top: 18px;
    margin-left: 8px;
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
}
</style>
