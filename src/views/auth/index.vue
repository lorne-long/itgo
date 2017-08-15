<template>
  <div class="auth-login">
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
  .auth-login {
    background:#fff url(~images/bg/bg-login.jpg) no-repeat top center/100%;
    padding-top: r(260);
    display: block;
  }
</style>

