<template>
  <div class="user-index">
    <v-header></v-header>
    <account-top>头部内容</account-top>
    <div class="flex tab-list">
      <router-link class="tab-item" to="/money/deposit">
        <div class="icons icons-store"></div>
        <div>存款</div>
      </router-link>
      <router-link class="tab-item" to="/money/drawmoney">
          <div class="icons icons-withdraw"></div>
          <div>取款</div>
      </router-link>
      <router-link class="tab-item" to="/money/transfer">
          <div class="icons icons-transfer"></div>
          <div>转账</div>
      </router-link>
      <router-link class="tab-item" to="log">
        <div class="icons  icons-record"></div>
        <div>记录</div>
      </router-link>
      <router-link class="tab-item" to="experiencegold" >
        <div class="icons icons-tyj"></div>
        <div>体验金</div>
      </router-link>
      <router-link class="tab-item" to="savesend">
        <div class="icons  icons-cunsong"></div>
        <div>存送优惠</div>
      </router-link>
      <router-link class="tab-item" to="washcode">
        <div class="icons  icons-xima"></div>
        <div>洗码</div>
      </router-link>
      <router-link class="tab-item" to="helpgold">
        <div class="icons  icons-jyj"></div>
        <div>救援金</div>
      </router-link>
      <router-link class="tab-item" to="vipgold">
        <div class="icons  icons-update"></div>
        <div>自助晋级</div>
      </router-link>
      <router-link class="tab-item" to="birthdaygold">
        <div class="icons  icons-birthday"></div>
        <div>生日礼金</div>
      </router-link>
      <router-link class="tab-item" to="recommendfirend">
        <div class="icons  icons-tickets"></div>
        <div>推荐好友</div>
      </router-link>
      <router-link class="tab-item" to="discountcode">
        <div class="icons  icons-tyj"></div>
        <div>优惠券</div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import vHeader from "components/header"
  import accountTop from "components/account-top"
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        Deputy: 0
      };
    },
    components: {
      vHeader,
      accountTop
    }
  };
</script>
<style lang="scss" scoped="">
  @import "~assets/scss/mixin.scss";

  .user-index {
    .tab-list{
      flex-wrap: wrap;
      @include  f(32px);
      text-align: center;
      .tab-item{
        width: 25%;
        padding-top: r(20);
      }
    }
    .iconfont{
     @include  f(128px);
    }
  }

  .icons {
    background-image: url(./user_icon.png);
    background-size:r(128);
    background-repeat: no-repeat;
    display: inline-block;
    width: r(128);;
    height:r(128);;
    margin-bottom: r(4);
  }

  /*普通用户管理中心*/
  .icons-store {
    background-position: 0 r(-74*2);
  }
  .icons-withdraw {
    background-position: 0 r(-298*2)
  }
  .icons-transfer {
    background-position: 0 r(-370*2);
  }
  .icons-record {
    background-position: 0 0;
  }

  .icons-tyj {
    background-position: 0 r(-520*2);
  }

  .icons-cunsong {
    background-position: 0 r(-595*2);
  }

  .icons-xima {
    background-position: 0 r(-670*2);
  }

  .icons-jyj {
    background-position: 0 r(-744*2);
  }

  .icons-update {
    background-position: 0 r(-818*2);
  }

  .icons-birthday {
    background-position: 0 r(-446*2);
  }

  .icons-friend {
    background-position: 0 r(-148*2);
  }

  .icons-tickets {
    background-position: 0 r(-222*2);
  }
</style>
