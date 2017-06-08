import ajax from 'api/index'

import axios from 'axios'; //引入axios

let xhr=ajax.request;

//获取金钱接口
let getGameMoney_url="/asp/getGameMoney.php";
//获取单个直接传入 "PT"
export  function getGameMoneySolo(opticons){
  return   ajax.post(getGameMoney_url,{gameCode:opticons});
};
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

