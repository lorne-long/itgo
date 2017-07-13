<template>
  <div id="page_content" class="flex_1">
    <v-top v-model="showSheet"></v-top>
    <div class="index-promotion-bar"><a href="static/register.jsp">立即注册 • 马上领取<b>8元</b>红包</a></div>
    <v-Sheet v-model="showSheet" :data="sheetData"></v-Sheet>
    <swiper style="height: 120px">
      <swiper-slide><a href="slotGame.jsp"><img  src="static/images/banner/banner1.jpg"/></a></swiper-slide>
      <swiper-slide><a href="slotGame.jsp"><img src="static/images/banner/banner2.jpg"/></a></swiper-slide>
      <swiper-slide><a href="slotGame.jsp"><img src="static/images/banner/banner3.jpg"/></a></swiper-slide>
    </swiper>
    <vJackpot></vJackpot>
    <div class="slot_game_list  sec_box">
      <slot-menu></slot-menu>
    </div>
    <div class="hot_game_list sec_box layout_item_list" v-show="recommandData.length>0">
      <h2><span class="icon icon_hot"></span><span>热门游戏</span></h2>
      <div class="ul_auto_wrap index-ul_auto_wrap">
          <div v-for="item in recommandData" @click="tickGanme(item)" class="hot-item game-info">
            <div class="layout_image_hover_text">
              <a class="btn-open" href="javascript:;"> <span class="game_tag game_tag_hot"></span>
                <img class="game_img lazy" :src="getImg(item)" width="150" height="150">
              </a></div>
            <div class="display_flex_h game_item_operations">
              <a href="javascript:;" class="flex_1 link_try btn-open">{{item.gameName}}</a>
              <a data-state="0" href="javascript:;" class="collect  link_fav"></a>
            </div>
          </div>
      </div>
    </div>
    <div class="client_download_list sec_box layout_item_list">
      <h2><span class="icon icon_download"></span><span>客户端下载</span></h2>
      <div class="ul_auto_wrap">
        <ul class="auto_width" id="gameclient" style="width: 165px;">
          <li class="layout_image_with_text"><a href="http://hunter2.agmjs.com/"><img
            src="static/images/index/dl_fish.png"><span class="img_text">捕鱼王2</span></a></li>
          <li class="layout_image_with_text"><a href="http://down.dreamtech.asia/LL/ios.html"><img
            src="static/images/index/dl_dt.png"><span class="img_text">DT苹果版</span></a></li>
        </ul>
      </div>
    </div>
    <model-game v-model="showModel" :data="curItem"></model-game>
    <alert-tips></alert-tips>
  </div>
</template>
<script>
  import  vTop from "./components/index-top"
  import  vJackpot from "./components/jackpot"
  import  slotMenu from "./components/slot-menu"
  import    alertTips from "./components/alert-tips"

  import vSheet from "base/sheet/sheet"
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import  modelGame from "components/model-game"
  import {queryRecommandGamesList,queryBannerList,getCarouselListAll} from "api/show"
  export default {
    name:"index",
    data() {
      return {
        sheetData:[
          {
            name:"在线客服",
            target:"_blank",
            href:"https://www.ll-kefu.com/chat/chatClient/chatbox.jsp?companyID=8999&configID=37&info=userId%3Dwoodytest%26loginname%3Dwoodytest%26grade%3D3%26name%3D%E7%A6%BB%E5%BC%80%26gender%3D%26mobileNo%3D%26memo%3D%26hashCode%3Df18bb7d1b4df6325aac5c7e50fa6f5e8%26timestamp%3D1498730513813"
          },
          {name:"电话回拨",to:{path:"/help/backCall"}},
          {name:"400-2312314",href:"tel:400-2312314"}
        ],
        showSheet:false,
        recommandData:[],
        curItem:{},
        showModel:false
      };
    },
    props:{},
    methods:{
      getImg(item){
        return ` http://staticserverhost.com/games/images/iphone/${item.platform.toLowerCase()}games/${item.picPath}`;
      },
      tickGanme(item){
        this.curItem={
          "eName":"",
          "name":item.gameName,
          "id":item.gameId,
          "code":item.gameId,
          "category":item.platform,
          "type":"SLO",
          "line":"",
          "state":1,
          "pic":item.picPath,
          "tag":[]
        };
        this.showModel=true;
      },
    },
    computed:{},
    created(){
      queryRecommandGamesList({gameType:1}).then(res=>{
        if(res.success)
          this.recommandData=res.data
      })
      queryBannerList({bannerType:1}).then()
    },
    components:{
      vTop,vSheet,vJackpot,modelGame,swiper, swiperSlide,slotMenu,alertTips
    }
  };
</script>
<style>
  .index-promotion-bar {
    text-align: center;
    color: #fff;
    padding: 2% 0;
    display: block;
    background: #ff6666;
    font-size: medium;
    font-weight: bold;
    background-repeat: no-repeat;
    background-position-y: 50%;
    background-position-x: 97%;
    background-size: 12px;
  }
  .swiper-container a{
   display: block;
  }
  .index-ul_auto_wrap{
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
  }
  .hot-item{width: 140px; height:100px;border-radius: 10px; overflow: hidden; margin-right: 10px; flex: none; position: relative; }
  .hot-item img{ width: 100%;height:100px; }
  .hot-item .game_item_operations{position: absolute;
    bottom: 5px;
    left: 0px;
    background: rgba(0,0,0,.5);
    color: #fff;
    width: 100%;
    font-size: 12px;}
</style>
