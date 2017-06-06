import ajax from './index'; //引入vue
var xhr=ajax.request;
let checkLogin="/mobi/queryFriendBonue.php";
/*** 检查登录*/
let login="/mobi/login.php";
/*** 登录*/
let logout='/mobi/logout';
/*** 登出*/
let check_code=ajax.defaults.baseURL+"/mobi/mobileValidateCode.php?random="+Math.random();
/**
 * 用户认证所用到的 API
 */

export function checkLogin(){
  return xhr({url:checkLogin});
}
export function login(){
  return xhr({method:'post',url:login,data:userData});
}
export function logOut(){
  return xhr({method:'delete',url:logout})
}
export function getAuthImg(){
  return check_code;
}
export default {checkLogin,login,logOut,getAuthImg} // 实例化后导出，全局单例
