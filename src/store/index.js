import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vue

import types from '@/util/types'; //mutations

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    islogin:false,
		userData:{
        toTal:0,
        userData:{
          qq:"qq",
          loginname:"loginname",
          accountName:"accountName",
          phone:"phone",
          email:"email",
          accountMoney:0
        }
		}
	},

  mutations:{
    setLogin(state,val){
      state.islogin=val;
    },
    setUserData(state,val){
       Object.assign(state.userData,val||{});
    }
  },
  actions:{
    setLogin({commit},val){
        commit("setLogin",val);
    },
    setUserData({commit},val){
        commit("setUserData",val);
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

