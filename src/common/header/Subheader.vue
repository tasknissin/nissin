<template>
    <div class="subheader">
        <div class="subheaderBox">
            <div class="subheaderName">
                <slot name="left"/>
            </div>
            <div class="subheaderRight fr">
                <slot name="right"/>   
            </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: 'app-subheader',
    props: {
        title: String
    },
    data(){
        return {
           
        };
    },
    methods:{
        setHeadAction(item,index){
            if(index == 1){ 
                this.$router.push({ name:'self', params:{id:'2'}})
            }
        }
    },
    created(){
        // console.log(this.title)
    }
}
</script>

<style scoped>
.subheader{
    width:100%;
    height: 40px;
    background-color: #f7f7f7;
}
.subheader .subheaderBox{
    width:88%;
    line-height: 40px;
    height: 100%;
    margin:0 auto;
}
.subheader .subheaderBox .subheaderName{
    margin-left: 7%;
    display: inline-block;
}
</style>
