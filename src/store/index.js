import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        // city:localStorage.getItem('city')?localStorage.getItem('city'):'深圳',
        // cityID:localStorage.getItem('cityID')?localStorage.getItem('cityID'):30
        department: {
            treeid: '',
        },
        menuManage: {
            treeid: '',
        },

        //id: '',

    },


    getters: {
        get_id: state => state.department.treeid,
        getmenu_id: state => state.menuManage.treeid
    },
    mutations: {
        // setCity(state,value){
        //   state.city = value;
        // },
        // setCityID(state,value){
        //   state.cityID = value;
        // }
        change_id(state, str) {
            state.department.treeid = str;
        },
        menuchange_id(state, str) {
            state.menuManage.treeid = str;
        }



    },
    actions: {
        // selectCity(context,params){
        //   context.commit('setCity',params.city)
        //   context.commit('setCityID', params.id);
        //   // 持久化保存数据
        //   localStorage.setItem('city', params.city);
        //   localStorage.setItem('cityID', params.id);
        // }
        getid(context, id) {
            context.commit('change_id', id)
        },
        getmenuid(context, id) {
            context.commit('menuchange_id', id)
        }

    },

})