<template>
  <div class="auth">
    <img class="auth-logo" src="../../assets/images/logo.png"/>
    <div v-show="!showAgent" class="tab-auth">
      <router-link to="/login/index">会员登录</router-link>
      <router-link to="/login/register">急速开户</router-link>
    </div>
    <div v-if="showAgent" class="tab-auth">
      <router-link to="/login/agentLogin">代理登录</router-link>
      <router-link to="/login/agentregister">代理开户</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        showAgent: true,
      }
    },
    watch: {
      "$route"(){
        this.cheack();
      }
    },
    created(){
      this.cheack();
    },
    methods: {
      cheack(){
        this.showAgent = /[(agentLogin)|(agentregister)]$/.test(this.$route.name);
      }
    }
  }
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .auth-logo {
    margin: r(68) auto;
    display: block;
  }

  .tab-auth {
    margin-bottom: r(30);
    text-align: center;
    a {
      display: inline-block;
      @include f(17px);
      margin: 0 r(50);
      color: #999;
      &.active {
        border-bottom: 3px solid #f66;
        color: #f66;
      }
    }
  }
</style>
