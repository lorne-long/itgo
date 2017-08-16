<template>
  <div ref="tool" :class="['tool-bar',{active:myValue}]">
    <div class="tool-close" @click="myValue=false">
      <div class="iconfont icon-close">
      </div>
    </div>
    <div @click="myValue=false" class="tool-user-info">
      <div class="account-img">
        <span class="iconfont icon-zhanghu">
        </span>
      </div>
      <div class="user-name">{{userData.loginname || "您好！请先登录"}}</div>
    </div>
    <router-link class="tool-item-href" to="">
      <i class="iconfont icon-cs"></i>在线客服
    </router-link>
    <div v-if="islogin">
      <router-link class="tool-item-href" to="">
        <i class="iconfont icon-phone"></i>电话回拨
      </router-link>
      <router-link class="tool-item-href" to="/user/personal">
        <i class="iconfont icon-setting"></i>账户设置
      </router-link>
      <router-link class="tool-item-href" to="/user/message">
        <i class="iconfont icon-message"></i> 站内信
      </router-link>
      <router-link class="tool-item-href" to="/user/security">
        <i class="iconfont icon-anquan"></i>安全设置
      </router-link>
      <div class="tool-item-href" @click="$store.dispatch('LOGIN_OUT')">
        <i class="iconfont icon-logout"></i>退出
      </div>
    </div>
    <div v-else @click="myValue=false">
      <router-link to="/login/index" class="tool-item-href"><i class="iconfont icon-zhanghu"></i>登录</router-link>
      <router-link to="/login/register" class="tool-item-href"><i class="iconfont icon-index"></i>立刻注册</router-link>
      <router-link to="/login/index" class="tool-item-href"><i class="iconfont icon-cs"></i>在线客服</router-link>
      <router-link to="/login/index" class="tool-item-href"><i class="iconfont icon-phone"></i>电话回拨</router-link>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        myValue:false
      }
    },
    props: ["value"],
    computed: {
      ...mapGetters(["userData", 'islogin'])
    },
    watch: {
      value(val){
        this.myValue=val;
      },
      myValue(val){
        this.$emit("input",val);
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixin.scss";

  .tool-bar {
    @include f(28px);
    position: fixed;
    transition:transform 0.5s;
    top: 0;
    left: 0;
    text-align: left;
    background: url("./bg.jpg") no-repeat top/100%;
    height: 100%;
    z-index: 1010;
    width: r(440);
    transform: translateX(-100%);
    color: #fff;
    &.active {
      transform: translateX(0);
    }
    .tool-close {
      height: r(120);
      line-height: r(120);
      text-align: right;
      .iconfont {
        color: #fff;
        @include f(72px);
        margin-right: r(32);
      }
    }
    .tool-user-info {
      text-align: center;
      margin-bottom: r(40);
      .user-name {
        line-height: 2;
      }
    }
    .account-img {
      border: solid r(3) #fff;
      border-radius: 100px;
      width: r(150);
      margin: 0 auto;
      background: #1dc4ec;
      height: r(150);
      text-align: center;
      line-height: r(140);
      .iconfont {
        @include f(100px);
      }
    }
    .tool-item-href {
      display: block;
      padding: r(24) r(32);
      background: #138fcb;
      margin-bottom: r(20);
      line-height: 1.4;
      .iconfont {
        @include f(48px);
        margin-right: r(20);
      }
    }
  }
</style>
