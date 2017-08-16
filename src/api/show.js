/**
 * Created by Lorne on 2017/7/5.
 */
import ajax from 'api/index'
import axios from 'axios'


let $getNewAnnouncement="/index/getNewAnnouncement.php";// 获取公告获取公告 只获取最新15条，时间倒序排列
let $queryRecommandGamesList="/index/queryRecommandGamesList.php";//查询推荐的游戏
let $checkConfigSystem="/index/checkConfigSystem.php";//弹框配置 首页
let $queryBannerList="/index/queryBannerList.php";//弹框配置 首页


let $getCarouselListAll="/index/getCarouselListAll.php";// 首页中奖信息
let $makeCall = "/user/makeCall.php"; //电话回拨接口

let  $saveOrUpdateGameStatus="/index/saveOrUpdateGameStatus.php";//收藏接口

let $getMessageByUser = "/index/getMessageByUser.php";//获取消息记录集合
let $readMsg = "/index/readMsg.php"; //获取单个消息
let $getGuestbookCountNew = "/index/getGuestbookCountNew.php"; //获取未读消息
let $getbackPwdByDx_dc = "/index/getbackPwdByDx_dc.php";//手机短信找回密码




let version=(new Date()).getWeekNumber()
let $getQTGame="/mobi/getQTGame.php";//QT手机端
let $gameH5MGS="/mobi/gameH5MGS.php";//MSG手机端
let $loginDT="/mobi/loginDT.php";//DT手机端
let $getNTGame="/mobi/getNTGame.php";//NT手机端
let $mobileGameAgFish="/mobi/mobileGameAgFish.php";//NT手机端
let $gamePNGMobile="/gamePNGMobile.php";//PNG手机端

export function getAllGames(fun){
  return axios.all([
    axios.get('http://staticserverhost.com/games/slot/phone/ptPhone.json?v=q19'+version),//QT
    axios.get('http://staticserverhost.com/games/slot/phone/mgsPhone.json?v=q19'+version), //MGS:
    axios.get('http://staticserverhost.com/games/slot/phone/qtPhone.json?v=q19'+version), // QT:
    axios.get('http://staticserverhost.com/games/slot/phone/dtPhone.json?v=q19'+version),// DT:
    axios.get('http://staticserverhost.com/games/slot/phone/ntPhone.json?v=q19'+version),// NT:
    axios.get('http://staticserverhost.com/games/slot/phone/pngPhone.json?v=q19'+version)//PNG:
  ]).then(axios.spread(function(){
    return Promise.resolve(Array.from(arguments))
  }));
}



export function getbackPwdByDx_dc(data) {
  $load.open("正在验证...")
  return ajax.post($getbackPwdByDx_dc, data)
}

export function getGuestbookCountNew(data) {
  return ajax.get($getGuestbookCountNew, data)
}
export function makeCall(data) {
  $load.open("处理中...")
  return ajax.get($makeCall, data)
}
export function getCarouselListAll(data){
  return ajax.get($getCarouselListAll,data);
}
export function checkConfigSystem(data){
  return ajax.post($checkConfigSystem,data);
}
export function queryBannerList(data){
  return ajax.get($queryBannerList,data);
}
export function getNewAnnouncement(){
  return ajax.get($getNewAnnouncement,{v:Math.random()});
}
export function queryRecommandGamesList(data){
  return ajax.get($queryRecommandGamesList,data);
}

export function saveOrUpdateGameStatus(data){
  return ajax.get($saveOrUpdateGameStatus,data);
}
export function getMessageByUser(data) {
  return ajax.get($getMessageByUser, data);
}
export function readMsg(data) {
  return ajax.get($readMsg, data);
}



export function mobileGameAgFish(data){
  return ajax.get($mobileGameAgFish,data);
}
export function gamePNGMobile(data){
  return ajax.get($gamePNGMobile,data);
}
export function gameH5MGS(data){
  return ajax.get($gameH5MGS,data);
}
export function getNTGame(data){
  return ajax.get($getNTGame,data);
}
export function loginDT(data){
  return ajax.get($loginDT,data);
}

export function getQTGame(data){
  return ajax.get($getQTGame,data);
}
