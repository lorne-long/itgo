
import ajax from 'api/index'

let _youhui="/rest/youhui.php"; //存送优惠接口 提交接口

let _getSelfYouHuiObject="/asp/getSelfYouHuiObject.php";//存送优惠提交


let _getXimaData="/mobi/getXimaData.php" //洗码查询
let _doXima="/mobi/doXima.php" //确认洗码

let _transferInforCoupon="/asp/transferInforCoupon.php"; //优惠券
let _queryPTLosePromo="/mobi/queryPTLosePromo.php" //查询pt老虎机救援金记录

let _getBetUpgrateVO="/asp/getBetUpgrateVO.php"; //助晋级查询

let _checkUpgrade="/asp/checkUpgrade.php"; //申请礼金

let _canClaimBirthdayCoupon="/canClaimBirthdayCoupon.php"; //查询生日礼金
let _claimBirthdayCoupon="/claimBirthdayCoupon.php"; //领取生日礼金
let _queryFriendBonue="/mobi/queryFriendBonue.php";//推荐好久

let _claimLosePromo="/mobi/claimLosePromo.php ";//处理救援金
let _commitPT8Self='/asp/commitPT8Self.php';


export function commitPT8Self(data){
  $load.open("正在领取...")
  return  ajax.post(_commitPT8Self,data);
}
export function claimLosePromo(data){
  $load.open("处理中...")
  return  ajax.post(_claimLosePromo,data);
}
export function youhui(){
  return  ajax.get(_youhui);
}
export function getSelfYouHuiObject(data){
  $load.open("处理中...")
  return  ajax.post(_getSelfYouHuiObject,data);
}
export function getXimaData(data){
  $load.open("处理中...")
  return  ajax.post(_getXimaData,data);
}
export function doXima(data){
  $load.open("正在洗码...")
  return  ajax.post(_doXima,data);
}

export function transferInforCoupon(data){
  $load.open("处理中...")
  return  ajax.post(_transferInforCoupon,data);
}

export function queryPTLosePromo(data){
  return  ajax.post(_queryPTLosePromo,data);
}
export function getBetUpgrateVO(data){
  return  ajax.post(_getBetUpgrateVO,data);
}
export function checkUpgrade(data){
  return  ajax.post(_checkUpgrade,data);
}
export function canClaimBirthdayCoupon(data){
  return  ajax.post(_canClaimBirthdayCoupon,data);
}
export function claimBirthdayCoupon(data){
  return  ajax.post(_claimBirthdayCoupon,data);
}
export function queryFriendBonue(data){
  return  ajax.post(_queryFriendBonue,data);
}




