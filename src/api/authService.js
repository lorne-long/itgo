import ajax from './index'; //引入vue
import store from '@/store';	//加载状态管理器
import storage from '@/util/storage';


let checkLogin="/asp/ajaxGetSessionPersonalData.php";/*** 检查登录*/
let login="/mobi/login.php";/*** 登录*/
let logout='/mobi/logout.php';/*** 登出*/
let register='/mobi/register.php';/*** 登出*/

// let check_code=;/***图片*/
/**
 * 用户认证所用到的 API
 */
export function checkLogin(){
  return ajax.get(checkLogin);
}
export function login(userData){
  return  ajax.post(login,userData);
}
export function logOut(){
  store.dispatch("setLogin",false);
  storage.set("islogin",false);
  return ajax.get(logout);
}
export function getAuthImg(){
  return ajax.defaults.baseURL+"/mobi/mobileValidateCode.php?random="+Math.random();
}
export function register(data){
  return ajax.request(register,Object.assign({
    phone:"",
    account:"",
    imageCode:"",
    password:"",
},data))
}
export default {checkLogin,login,logOut,getAuthImg,register} // 实例化后导出，全局单例
