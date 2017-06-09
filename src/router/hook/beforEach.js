import store from '@/store';	//加载状态管理器
import storage from '@/util/storage';
import {checkLogin} from 'api/authService';
// 权限拦截
export default (to,from,next) =>{
  console.log(to,from)
  if(to.matched.some(function(item,i){
      return item.meta.needAuth;
    })){

    // if(!store.state.islogin){ //没有登录去检查一次 怕煞笔刷新页面 然后数据掉了 本地存储 太久检查一次最好
      checkLogin().then((data)=>{
        let isLogin=data.data.loginname&&(data.success||data.code=='10000');
        store.dispatch("setLogin",isLogin);
        storage.set("islogin",isLogin);
          if(isLogin){
            store.dispatch("setUserData",data.data);
            next();
          }else{
            next({path:'/login/index',query:{rquest:to.fullPath}});
          }
        }
      ).catch(()=>{
        store.dispatch("setLogin",false);
        storage.set("islogin",false);
        next({path:'/login/index',query:{rquest:from.fullPath}});
      });
    // }else{
    //   next();
    // }
  }
  else{
    next();
  }
}
