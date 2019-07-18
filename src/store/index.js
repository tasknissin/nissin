import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        city: localStorage.getItem('city') ? localStorage.getItem('city') : '11',
        cityID: localStorage.getItem('cityID') ? localStorage.getItem('cityID') : 30,
        btns: [{ name: 'Add', value: '增加' }, { name: 'Delete', value: '删除' }, { name: 'Update', value: '修改' }, { name: 'Reset', value: '密码重置' }],
        department: {
            treeid: '',
        },
        menuManage: {
            treeid: '',
        },
        perBtns: [],
        muneId: '',
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
        },
        setPerBtns(state, arr) {
            state.perBtns = arr
        },
        getMuneID(state, str) {
            state.muneId = str;
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
        },
        getZmuneID(context, id) {
            context.commit('getMuneID', id)
        },
        selectperBtns(context, arr) {
            context.commit('setPerBtns', arr)
        }

    },
    modules: {
        user
    }
})