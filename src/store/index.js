import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vue
// import types from '@/util/types'; //mutations
import {ajaxGetSessionPersonalData} from 'api/user'; //mutations
import * as types from './types'; //引入vue
import {$localStorage,$sessionStorage} from '@/util/storage';
Vue.use(Vuex);
export default new Vuex.Store({
  state:{ //不要直接访问state
    ajaxLoad:0, //ajax加载数量
    showFooter:true,//是否显示底部
    authList:[], //权限列表
    isSetPayPwd:false, //是否设置支付密码
    userData:{
      qq:"qq",
      loginname:"loginname",
      accountName:"accountName",
      phone:"phone",
      email:"email",
      accountMoney:0,
      level:0
    }
  },
  getters:{
    ajaxLoad(state,getters){
       return state.ajaxLoad>0;
    },
    showFooter(state,getters){
      Vue.nextTick(()=>{
          document.querySelector("body").style.paddingBottom=(state.showFooter?"51px":"0");
      })
      return state.showFooter;
    },
    userData(state,getters){ //其有可能进行过滤
      return state.userData;
    },
    authList(state,getters){  //权限集合
      return state.authList;
    },
    isAgent(state,getters){ //没有权限表示没有登录
      return state.authList.includes(types.AUTH_NAME.AGENT);
    },
    isUser(state,getters){ //没有权限表示没有登录
      return state.authList.includes(types.AUTH_NAME.USER);
    },
    islogin(state,getters){ //没有权限 表示没有登录 //或者值中又一个===true表示已经登录了
      if($sessionStorage&&$sessionStorage.get(types.IS_LOGIN)===true){ //先查sessionStorage
        if(state.authList.length==0){ //浏览器刷新 authList肯定没有 没有就查一次后台
          return false
        }
        return true;
      }
      if(state.authList.length>0){  //sessionStorage
        $sessionStorage&&$sessionStorage.set(types.IS_LOGIN,true)
        return true;
      }
      return false;
    }
  },
  mutations:{
    [types.SET_FOOTER](state,val){
      if(val){

      }else{

      }
      state.showFooter=val;
    },
    [types.SET_USERDATA](state,val){
      Object.assign(state.userData,val||{});
    },
    [types.SET_AUTH](state,val){ //设置权限
      if(typeof val==='string'){
        state.authList=[val];
      }
      else if(Array.isArray(val)){
        state.authList=Array.from(val);
      }else{
        state.authList=[];
      }
    },
    [types.ADD_AUTH](state,val){
      state.authList.push(val);
    },
    [types.REMOVE_AUTH](state,val){
      if(val===undefined){ //如果不传清空所有权限
        $sessionStorage&&$sessionStorage.remove(types.IS_LOGIN);
        state.authList=[]
      }else{
        let index=state.authList.indexOf(val)
        if(index> -1){
          state.authList.splice(index,1);
        }
      }
    }
  },
  actions:{
    [types.REMOVE_AUTH]({commit},val){
      commit(types.REMOVE_AUTH,val);
    },
    [types.SET_AUTH]({commit},val){
      commit(types.SET_AUTH,val);
    },
    [types.SET_USERDATA]({commit},val){
      commit(types.SET_USERDATA,val);
    },
    [types.UPDATE_USERDATA]({commit},val){
      ajaxGetSessionPersonalData().then(data =>{
        if(data.success){
          commit(types.SET_USERDATA,data.data);
        }else{
          commit()
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

