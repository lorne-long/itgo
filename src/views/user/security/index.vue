<template>
  <ul class="user-security">
    <li>
      <router-link  :to="{path:'/pwd/loginupdate'}">修改登录密码</router-link>
      <i class="iconfont icon-arrow_r"></i>
    </li>
    <li>
      <router-link :to="{path:'/pwd/payupdate'}" v-if="isSetPayPwd">修改支付密码</router-link>
      <i class="iconfont icon-arrow_r"></i>
    </li>
    <li v-if="!isSetPayPwd">
      <router-link :to="{path:'/pwd/payset',query:{rquest:'/pwd/index'}}" >设置支付密码</router-link>
      <i class="iconfont icon-arrow_r"></i>
    </li>
  </ul>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters(["isSetPayPwd"])
    }
  };
</script>
<style  lang="scss">
  @import "~assets/scss/mixin.scss";
  .user-security {
    padding-top: r(30);
    li {
      margin-bottom: r(30);
      position: relative;
      border-bottom: r(2) solid #009bc8;
      box-shadow: 0 0 r(10) #999;
      a {
        display: block;
        height: r(88);
        line-height: r(88);
        /*background: #fff url(../images/icons/icon_right.png) right center no-repeat;*/
        @include f(32px);
        color: #666;
        margin: 0 r(30);
      }
    }
    .iconfont{
      border: r(2) #ccc solid;
      padding: r(5);
      text-align: center;
      border-radius: 50%;
      color: #ccc;
      position:absolute;
      right: r(30);
      top:50%;
      @include f(25px);
      z-index:1;
      transform: translateY(-50%);
    }
  }
</style>
