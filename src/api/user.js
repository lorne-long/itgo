
import ajax from 'api/index'


let getGameMoney_url="/asp/getGameMoney.php"; //获取金钱接口

let  _getCustomerSocialInfo="/asp/getCustomerSocialInfo.php";  //获取登录用户qq，微信，邮箱

let  _changeinfo="/asp/change_info.php";  //修改用户信息

let  _modifyCustomerSocialInfo="/asp/modifyCustomerSocialInfo.php";  //修改用户qq，微信，邮箱





export function getCustomerSocialInfo(data){
  return  ajax.get(_getCustomerSocialInfo,data);
}
export function changeinfo(data){
  return  ajax.get(_changeinfo,data);
}
export function modifyCustomerSocialInfo(data){
  return  ajax.get(_modifyCustomerSocialInfo,data);
}

//获取单个直接传入 "PT"
export  function getGameMoneySolo(opticons){
  return   ajax.post(getGameMoney_url,{gameCode:opticons});
};
//获取多个  getAllMoney([pT,NT....]) 返回数组 ［ＰＴ数据，ＮＴ数据］
export function getAllMoney(opticons,fun){
  if(opticons instanceof  Array){
    return  axios.all(
      opticons.map(item=>{
        return getGameMoneySolo(item)
      })
    ).then(axios.spread(function(){
      fun(Array.from(arguments));
    }));
  }
}