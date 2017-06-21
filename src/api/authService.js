import ajax from './index'; //引入vue
import store from '@/store';	//加载状态管理器

let checkLogin = "/asp/ajaxGetSessionPersonalData.php";
/*** 检查登录*/
let login = "/mobi/login.php";
/*** 登录*/
let logout = '/mobi/logout.php';
/*** 登出*/
let register = '/mobi/register.php';
/***注册*/
let _agentReport = "/mobi/agentReport.php"; //代理用户页面一般用户无法访问

/**
 * 用户认证所用到的 API
 */
export function checkLogin() {
  return ajax.get(checkLogin);
}
export function login(userData) {
  return ajax.post(login, userData);
}
export function logOut() {
  store.dispatch("REMOVE_AUTH");
  return ajax.get(logout);
}
export function getAuthImg() {
  return ajax.defaults.baseURL + "/mobi/mobileValidateCode.php?random=" + Math.random();
}

export function register(data) {
  return ajax.request(register, Object.assign({
    phone: "",
    account: "",
    imageCode: "",
    password: "",
  }, data))
}


export function agentReport() {
  return ajax.post(_agentReport);
}
