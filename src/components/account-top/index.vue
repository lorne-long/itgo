<template>
  <!--<div class="user_info_wrap">-->
    <!--<div class="user_info_name">-->
      <!--<span class="user_name_text">{{userData.loginname}}</span>-->
      <!--<span v-if="!isAgent" class="vip_value">VIP {{userData.levelNumber + 1}} </span>-->
      <!--<p v-if="!isAgent">主账户&nbsp&nbsp;<span>{{userData.accountMoney}}</span>&nbsp&nbsp;&nbsp&nbsp;副账户<span>&nbsp&nbsp;{{userData.deputyCredit}}</span>-->
      <!--</p>-->
      <!--<p v-else>总佣金&nbsp;&nbsp;&nbsp;&nbsp;{{userData.accountMoney}}</p>-->
    <!--</div>-->
    <!--<img class="avata_img" src="~static/images/user/avata.png" width="60" height="60">-->
    <!--<img class="line_space" src="/static/images/bg/bg02.png">-->
    <!--<div class="flex">-->
      <!--<div class="flex-1">-->
        <!--<router-link to="/user/message">-->
          <!--<span class="icon icon_mail"><span class="red_dot" v-show="newMsg"></span></span> <span>消息</span>-->
        <!--</router-link>-->
      <!--</div>-->
      <!--<div v-if="!isAgent" class="flex-1">-->
        <!--<router-link to="/user/security">-->
          <!--<span class="icon icon_shield"></span><span>安全</span>-->
        <!--</router-link>-->
      <!--</div>-->
      <!--<div v-if="!isAgent" class="flex-1">-->
        <!--<router-link to="/user/log">-->
          <!--<span class="icon icon_file"></span><span>记录</span>-->
        <!--</router-link>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div v-if="!isAgent" class="link_wrap">-->
      <!--<a href="javascript:void(0)" @click="showSheet=true"><span class="icon icon_chat04"></span></a>-->
      <!--<router-link to="/user/personal" class="link_config2">-->
        <!--<img src="/static/images/icons/icon_config.png" width="24" height="23" alt="Config">-->
      <!--</router-link>-->
    <!--</div>-->
    <!--<div v-else class="link_wrap btn_link">-->
      <!--<router-link to="/money/drawmoney" class="btn_trans">取款</router-link>-->
    <!--</div>-->
  <!--</div>-->
  <div class="account-top">
      <div class="account-img">
        <i class="iconfont icon-zhanghu"></i>
      </div>
      <div class="account-name"><strong>{{userData.loginname}}</strong></div>
      <div class="level-sign">
        <div class="level-info"><i class="iconfont icon-crown"></i>金牌VIP{{userData.levelNumber + 1}}</div>
        <div class="sign-info" @click="doSignRecord">签到</div>
      </div>
    <div class="flex money-list">
      <div class="flex-1">主账户&nbsp;&nbsp;{{userData.accountMoney}}</div>
      <div class="flex-1">副账户&nbsp;&nbsp;{{userData.deputyCredit}}</div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getGuestbookCountNew} from "api/show"
  import {doSignRecord} from "api/user"
  export default {
    data() {
      return {
        newMsg: false,
        showSheet: false,
        sheetData: [
          {name: "在线客服"},
          {name: "电话回拨"},
          {
            name: "400-2312314", method() {
          }
          }
        ]
      };
    },
    props: {
      value: {
        default: false
      }
    },
    watch: {
      value(val) {
        this.showSheet = val;
      },
      showSheet(val) {
        this.$emit("input", val)
      }
    },
    methods: {
      loadData() {
        getGuestbookCountNew().then(res => {  //未读消息
          this.newMsg = res.data > 0;
        })
      },
      doSignRecord(){
        doSignRecord().then(res=>{
          toast(res.message)
        })
      }
    },
    created() {
//      this.loadData();
    },
    computed: {
      ...mapGetters(["userData", "isAgent"])
    }
  }
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .account-top{
    overflow: hidden;

    background:#fff url("~images/bg/bg-accountTop.jpg") no-repeat top center/100% 100%;
    .account-img{
      @include  f(100px);
      margin: r(26) auto 0;
      width: r(164);
      height: r(164);
      color:#fff;
      line-height: r(150);
      border-radius: 50%;
      background:#009bc9;
      border: solid 3px #fff;
      text-align: center;
    }
    .account-name{
      text-align: center;
      @include f(44px);
      margin: r(8) 0;
      color:#fff;
    }
    .level-sign{
      text-align: center;
      line-height: r(44);
      div{
        display: inline-block;
        background-color: #fcff01;
        padding: 0 r(16);
        border-radius:r(30);
        color: #6d091c;
        min-width:r(128);
      }
      .icon-crown{
        @include f(34px);
      }
    }
    .money-list{
      @include f(36px);
      color: #fff;
      text-align: center;
      line-height:r(88);
    }
  }
</style>
