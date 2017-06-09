/**
 * Created by Lorne on 2017/6/9.
 */
import ajax from 'api/index'

let _checkWithdrawPwd="/asp/checkWithdrawPwd.php"; //确认用户是否设置支付密码

let _change_pws="/asp/change_pws.php"; //修改登录密码
let _modifyWithdrawPwd="/asp/modifyWithdrawPwd.php"; //修改支付密码
let _bindWithdrawPwd="/asp/bindWithdrawPwd.php";//设置支付密码
export function checkWithdrawPwd(data){
  return  ajax.get(_checkWithdrawPwd,data);
}

export function changepws(data){
  return  ajax.post(_change_pws,data);
}
export function modifyWithdrawPwd(data){
  return  ajax.post(_modifyWithdrawPwd,data);
}

export function bindWithdrawPwd(data){
  return  ajax.post(_bindWithdrawPwd,data);
}


let _findUserBankList="/asp/findUserBankList.php";//银行卡列表
let _validateBankNo="/asp/validateBankNo.php";//校验银行卡列表
let _bindBankNo="/mobi/bindBankNo.php";//银行卡列表

let _thirdWithdraw="/asp/thirdWithdraw.php";//取款提交
export function findUserBankList(data){
  return  ajax.get(_findUserBankList,data);
}

export function thirdWithdraw(data){
  return  ajax.post(_thirdWithdraw,data);
}
export function validateBankNo(data){
  return  ajax.post(_validateBankNo,data);
}
export function bindBankNo(data){
  return  ajax.post(_bindBankNo,data);
}


