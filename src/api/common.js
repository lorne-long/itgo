import ajax from 'api/index'


//获取公告
let getGameMoney_url="/asp/getNewAnnouncement.php";

let _queryEmail="/mobi/queryEmail.php";//获取消息记录集合
let _readMsg="/asp/readMsg.php"; //获取单个消息


let _queryHistory="/mobi/queryHistory.php";//记录查询

export function getNewAnnouncement(){
 return  ajax.get(getGameMoney_url)
}


export function queryEmail(data){
  return  ajax.post(_queryEmail,data);
}
export function readMsg(data){
  return  ajax.post(_readMsg,data);
}

export function queryHistory(data){
  return  ajax.post(_queryHistory,data);
}


