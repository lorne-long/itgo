/**
 * Created by Lorne on 2017/7/5.
 */
import ajax from 'api/index'
import axios from 'axios'
import $store from '@/store'
let $getNewAnnouncement="/asp/getNewAnnouncement.php?v=0.941433513213153";// 获取公告
let $queryRecommandGamesList="/asp/queryRecommandGamesList.php";//查询推荐的游戏
let $checkConfigSystem="/asp/checkConfigSystem.php";//弹框配置 首页

export function checkConfigSystem(data){
  return ajax.post($checkConfigSystem,data);
}
export function getNewAnnouncement(){
  return ajax.get($getNewAnnouncement,{v:Math.random()});
}
export function queryRecommandGamesList(data){
  return ajax.post($queryRecommandGamesList,data);
}
let version=(new Date()).getWeekNumber()

let allGameType=[
  axios.get('http://staticserverhost.com/games/slot/phone/ptPhone.json?v=q19'+version),//QT
  axios.get('http://staticserverhost.com/games/slot/phone/mgsPhone.json?v=q19'+version), //MGS:
  axios.get('http://staticserverhost.com/games/slot/phone/qtPhone.json?v=q19'+version), // QT:
  axios.get('http://staticserverhost.com/games/slot/phone/dtPhone.json?v=q19'+version),// DT:
  axios.get('http://staticserverhost.com/games/slot/phone/ntPhone.json?v=q19'+version),// NT:
  axios.get('http://staticserverhost.com/games/slot/phone/pngPhone.json?v=q19'+version)//PNG:
];
let  $saveOrUpdateGameStatus="/mobi/saveOrUpdateGameStatus.php";//收藏/首先收藏
let  $queryGameStatus="/mobi/queryGameStatus.php";//查询用户收藏


let $getQTGame="/mobi/getQTGame.php";//QT手机端
let $gameH5MGS="/mobi/gameH5MGS.php";//MSG手机端
let $loginDT="/mobi/loginDT.php";//DT手机端
let $getNTGame="/mobi/getNTGame.php";//NT手机端
let $mobileGameAgFish="/mobi/mobileGameAgFish.php";//NT手机端
let $gamePNGMobile="/gamePNGMobile.php";//PNG手机端



export function getAllGames(fun){
  return axios.all(allGameType).then(axios.spread(function(){
    fun(Array.from(arguments));
  }));
}
export function mobileGameAgFish(data){
  return ajax.get($mobileGameAgFish,data);
}
export function gamePNGMobile(data){
  return ajax.post($gamePNGMobile,data);
}
export function gameH5MGS(data){
  return ajax.post($gameH5MGS,data);
}
export function getNTGame(data){
  return ajax.get($getNTGame,data);
}
export function loginDT(data){
  return ajax.get($loginDT,data);
}
export function queryGameStatus(data){
  return ajax.get($queryGameStatus,data);
}
export function getQTGame(data){
  return ajax.post($getQTGame,data);
}
export function saveOrUpdateGameStatus(data){
  return ajax.post($saveOrUpdateGameStatus,data);
}
