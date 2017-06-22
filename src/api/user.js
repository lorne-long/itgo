
import ajax from 'api/index'
import axios from 'axios'

let _getGameMoney="/asp/getGameMoney.php"; //获取金钱接口

let  _getCustomerSocialInfo="/asp/getCustomerSocialInfo.php";  //获取登录用户qq，微信，邮箱

let  _changeinfo="/asp/change_info.php";  //修改用户信息

let  _modifyCustomerSocialInfo="/asp/modifyCustomerSocialInfo.php";  //修改用户qq，微信，邮箱
let  _completeUserInfo="/asp/completeUserInfo.php";  //完善用户信息
let _ajaxGetSessionPersonalData="/asp/ajaxGetSessionPersonalData.php";/***获取用户资料*/

let _queryHistory="/mobi/queryHistory.php";//记录查询


export function queryHistory(data){
  return  ajax.post(_queryHistory,data);
}
export function ajaxGetSessionPersonalData(data){
  return  ajax.get(_ajaxGetSessionPersonalData,data);
}
export function getCustomerSocialInfo(data){
  return  ajax.get(_getCustomerSocialInfo,data);
}
export function changeinfo(data){
  return  ajax.post(_changeinfo,data);
}
export function modifyCustomerSocialInfo(data){
  return  ajax.post(_modifyCustomerSocialInfo,data);
}
export function completeUserInfo(data){
  return  ajax.post(_completeUserInfo,data);
}

//获取单个直接传入 "PT"
export  function getAllMoney(opticons){
  return   ajax.post(_getGameMoney,opticons);
};
//获取多个  getAllMoney([pT,NT....]) 返回数组 ［ＰＴ数据，ＮＴ数据］
export function getAllMoneyAll(opticons,fun){
  if(opticons instanceof  Array){
    return  axios.all(
      opticons.map(item=>{
        return getGameMoneySolo({gameCode:item});
      })
    ).then(axios.spread(function(){
      fun(Array.from(arguments));
    }));
  }
}
