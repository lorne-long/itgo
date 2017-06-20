import store from '@/store';	//加载状态管理器
import storage from '@/util/storage';
import {checkLogin, agentReport} from 'api/authService';
// 权限拦截
function checkIsAgent() {
  return agentReport().then(res => {
    store.dispatch("SET_AGENT", res.success)
  })
}
export default (to, from, next) => {
  //checkIsAgent()
  let isAgent = to.matched.some(function (item, i) {  //代理页面需要检查权限
    return item.meta.type && item.meta.type == 1;
  })
  if (to.matched.some(function (item, i) {
      return item.meta.needAuth && item.meta.needAuth === true;
    }) || isAgent) {
    if (store.state.islogin == null) { //没有登录去检查一次 怕煞笔刷新页面 然后数据掉了 本地存储 太久检查一次最好
      checkLogin().then((data) => {
          let isLogin = data.data.loginname && data.success;
          store.dispatch("SET_LOGIN", isLogin);
          if (isLogin) {
            store.dispatch("SET_USERDATA", data.data);
            next();
          } else {
            next({path: '/login/index', query: {rquest: to.fullPath}});
          }
        }
      ).catch(() => {
        store.dispatch("SET_LOGIN", false);
        next({path: '/login/index', query: {rquest: to.fullPath}});
      });
    } else {
      next();
    }
  }
  else {
    next();
  }
}
