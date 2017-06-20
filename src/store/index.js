import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vue

// import types from '@/util/types'; //mutations
import {ajaxGetSessionPersonalData} from 'api/user'; //mutations
import * as types from './type'; //引入vue

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    islogin:null,
    isAgent:null,
    userData: {
      qq: "qq",
      loginname: "loginname",
      accountName: "accountName",
      phone: "phone",
      email: "email",
      accountMoney: 0,
      level: 0
    }
  },
  getters:{
    userData(state, getters){ //其有可能进行过滤
      return state.userData;
    },
    isAgent(state, getters){ //其有可能进行过滤
      return state.userData;
    },
    islogin(state, getters){ //其有可能进行过滤
      return state.userData;
    }
  },
  mutations: {
    [types.SET_LOGIN](state, val){
      state.islogin = val;
    },
    [types.SET_USERDATA](state, val){
      Object.assign(state.userData, val || {});
    }
    ,
    [types.SET_AGENT](state, val){
      state.isAgent = val;
    }
  },
  actions: {
    [types.SET_LOGIN]({commit}, val){
      commit("SET_LOGIN", val);
    },
    [types.SET_AGENT]({commit}, val){
      commit("isAgent", val);
    },
    [types.SET_USERDATA]({commit}, val){
      commit("SET_USERDATA", val);
    },
    [types.UPDATE_USERDATA]({commit}, val){
      ajaxGetSessionPersonalData().then(data=>{
        if(data.success){
          commit("SET_USERDATA",data.data);
        }
      })
    }
  }
});
//
// //使用
// new Vue({
// 	store,
// 	computed: {
// 		doneTodosCount() {
// 			return this.$store.getters.doneTodosCount
// 		}
// 	},
// 	computed:{
// //		...mapGetters(["DataCount","filterdata"])
// //		mapGetters({
// //		  // 映射 this.doneCount 为 store.getters.doneTodosCount
// //		  doneCount: 'doneTodosCount'
// //		})
// 	}
// })

