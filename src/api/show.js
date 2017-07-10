/**
 * Created by Lorne on 2017/7/5.
 */
import ajax from 'api/index'
import axios from 'axios'
let _getNewAnnouncement="/asp/getNewAnnouncement.php?v=0.941433513213153";// 获取公告
let _queryRecommandGamesList="/asp/queryRecommandGamesList.php";//查询推荐的游戏
let _checkConfigSystem="/asp/checkConfigSystem.php";//弹框配置 首页
export function checkConfigSystem(data){
  return ajax.post(_checkConfigSystem,data);
}
export function getNewAnnouncement(){
  return ajax.get(_getNewAnnouncement,{v:Math.random()});
}
export function queryRecommandGamesList(data){
  return ajax.post(_queryRecommandGamesList,data);
}
let version=(new Date()).getWeekNumber();
let allGameType=[
  axios.get('http://staticserverhost.com/games/slot/phone/ptPhone.json?v=q19'+version),//QT
  axios.get('http://staticserverhost.com/games/slot/phone/mgsPhone.json?v=q19'+version), //MGS:
  axios.get('http://staticserverhost.com/games/slot/phone/qtPhone.json?v=q19'+version), // QT:
  axios.get('http://staticserverhost.com/games/slot/phone/dtPhone.json?v=q19'+version),// DT:
  axios.get('http://staticserverhost.com/games/slot/phone/ntPhone.json?v=q19'+version),// NT:
  axios.get('http://staticserverhost.com/games/slot/phone/pngPhone.json?v=q19'+version)//PNG:
];
export function getAllGames(fun){
  return axios.all(allGameType).then(axios.spread(function(){

    fun(Array.from(arguments));
  }));
}
