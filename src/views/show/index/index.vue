<template>
  <div id="page_content" class="flex_1">
    <v-header></v-header>
    <div class="index-banner">
      <swiper style="height:100%;">
        <swiper-slide><a href="slotGame.jsp"><img src="static/images/banner/banner1.jpg"/></a></swiper-slide>
        <swiper-slide><a href="slotGame.jsp"><img src="static/images/banner/banner2.jpg"/></a></swiper-slide>
        <swiper-slide><a href="slotGame.jsp"><img src="static/images/banner/banner3.jpg"/></a></swiper-slide>
      </swiper>
      <div class="marquee-info">
        <i class="iconfont icon-voice"></i>
        <marquee ref="mq" class="marquee-content" behavior="scroll" direction="left" loop="infinite" scrollamount="3">
          <router-link v-for="(item,i) in announcement" :key="item.id" to="/notice">
            [{{item.createtime}}]&nbsp;<span style="margin-right:0.3rem">{{item.title}}</span>
          </router-link>
        </marquee>
      </div>
    </div>
    <!--<vJackpot></vJackpot>-->
    <slot-menu></slot-menu>
    <hotgame></hotgame>
    <downclient></downclient>
    <!--<div class="client_download_list sec_box layout_item_list">-->
      <!--<h2><span class="icon icon_download"></span><span>客户端下载</span></h2>-->
      <!--<div class="ul_auto_wrap">-->
        <!--<ul class="auto_width" id="gameclient" style="width: 165px;">-->
          <!--<li class="layout_image_with_text"><a href="http://hunter2.agmjs.com/"><img-->
            <!--src="static/images/index/dl_fish.png"><span class="img_text">捕鱼王2</span></a></li>-->
          <!--<li class="layout_image_with_text"><a href="http://down.dreamtech.asia/LL/ios.html"><img-->
            <!--src="static/images/index/dl_dt.png"><span class="img_text">DT苹果版</span></a></li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->

    <alert-tips></alert-tips>
    <v-Sheet v-model="showSheet" :data="sheetData"></v-Sheet>
  </div>
</template>
<script>
  import vHeader from "components/header"
  import vJackpot from "./components/jackpot"
  import slotMenu from "./components/slot-menu"
  import alertTips from "./components/alert-tips"
  import hotgame from "./components/hot-game"
  import downclient from "./components/down-client"

  import vSheet from "base/sheet/sheet"
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getNewAnnouncement} from "api/show"
  export default {
    data() {
      return {
        sheetData: [
          {
            name: "在线客服",
            target: "_blank",
            href: "https://www.ll-kefu.com/chat/chatClient/chatbox.jsp?companyID=8999&configID=37&info=userId%3Dwoodytest%26loginname%3Dwoodytest%26grade%3D3%26name%3D%E7%A6%BB%E5%BC%80%26gender%3D%26mobileNo%3D%26memo%3D%26hashCode%3Df18bb7d1b4df6325aac5c7e50fa6f5e8%26timestamp%3D1498730513813"
          },
          {name: "电话回拨", to: {path: "/help/backCall"}},
          {name: "400-12345768", href: "tel:400-2312314"}
        ],
        showSheet: false,
        announcement:[]
      };
    },
    created() {
      getNewAnnouncement().then(data => {
        this.announcement = data.data;
        this.$refs.mq.start();
      })

    },
    components: {
      vHeader, vSheet, vJackpot, swiper, swiperSlide, slotMenu, alertTips
      ,hotgame,downclient
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .index-banner{
    position:relative;
    height:r(300);
    img{ height:r(300);}

    .marquee-info{
      position: absolute;
      bottom:0;
      left:0;
      height:r(64);
      line-height:r(64);
      width: 100%;
      z-index: 1;
      background: rgba(0,0,0,.65);
      color: #fff;
      .icon-voice{
        position: absolute;
        top:0;
        left:r(22);
        z-index: 9;
        @include f(44px);
      }
    }

  }
</style>
