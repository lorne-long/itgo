<template>
  <div class="auth">
    <img class="auth-logo" src="../../assets/images/logo.png"/>
    <div class="tab-auth">
      <router-link to="/login/index">会员登录</router-link>
      <router-link to="/login/register">急速开户</router-link>
      <router-link to="/login/agentregister">代理加盟</router-link>
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
    padding:0 20px;
    justify-content: space-around;
    display:flex;

    a {
      flex:none;
      width:4.5em;
      display: inline-block;
      @include f(17px);
      color: #999;
      &.active {
        border-bottom: 3px solid #f66;
        color: #f66;
      }
    }
  }
</style>
