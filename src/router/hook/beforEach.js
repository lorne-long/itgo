import store from '@/store';	//加载状态管理器
import storage from '@/util/storage';

import ajax from 'api/authService';
// 权限拦截
export default (to,from,next) =>{
  console.log(to,from)
  return next();
  const {needAuth,needFalseLogin}=to.meta;
  if(needAuth&&needAuth===true){
    if(!store.state.islogin){
      next({path:'/login',query:{rquest:from.fullPath}});
    }else{
      ajax.checkLogin().then((data)=>{ //没有登录去检查一次
        if(data.success){
          next();
        }else{
          next({path:'/login',query:{rquest:from.fullPath}});
        }
      }
      ).catch(()=>{
        next();
      });
    }
  }
  else{
    next();
  }
}
// if(needFalseLogin&&needFalseLogin==true&&!==true){ // 登录后不允许进入
//
//   if(store.state.islogin){ //不允许重新跳到登录页面
//     next("/index");
//   }
//   else{
//     next();
//   }
