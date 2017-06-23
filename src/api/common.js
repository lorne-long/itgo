import ajax from 'api/index'


//获取公告
let getGameMoney_url="/asp/getNewAnnouncement.php";

let _queryEmail="/asp/getMessageByUser.php";//获取消息记录集合
let _readMsg="/asp/readMsg.php"; //获取单个消息


let _getGuestbookCountNew="/asp/getGuestbookCountNew.php"; //获取未读消息


export function getGuestbookCountNew(data){
  $load.open();
  return  ajax.get(_getGuestbookCountNew,data)
}
export function getNewAnnouncement(data){
 return  ajax.get(getGameMoney_url,data)
}
export function queryEmail(data){
  return  ajax.post(_queryEmail,data);
}
export function readMsg(data){
  return  ajax.post(_readMsg,data);
}


