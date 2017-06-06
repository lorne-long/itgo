import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vue

import cart from './modules/cart'; //mutations
import other from './modules/other'; //mutations
import types from '@/util/types'; //mutations
Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		cart,
		other
	},
  state:{
    islogin:false,
		userData:{
		}
	},
  mutations:{
    setLogin(state,val){
      state.islogin=val;
    }
  },
  actions:{
    setLogin({commit},val){
        commit("setLogin",val);
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

