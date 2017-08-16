<template>
  <footer class="footer">
    <router-link :to="{path:'/index'}">
      <i class="iconfont icon-home"></i>
      <div>首页</div>
    </router-link>
    <router-link :to="{path:'/agent'}">
      <i class="iconfont  icon-manager"></i>
      <div>代理</div>
    </router-link>

    <router-link :to="{path:'/slotgame'}">
      <i class="iconfont icon-game"></i>
      <div>游戏</div>
    </router-link>
    <router-link :to="{path:'/preferential'}">
      <i class="iconfont icon-money"></i>
      <div>优惠</div>
    </router-link>
    <router-link :to="account">
      <i class="iconfont icon-zhanghu"></i>
      <div>账户</div>
    </router-link>
  </footer>
</template>
<script>
  export default {
    data() {
      return {};
    },
    computed: {
      account() {
        return this.$store.getters.isAgent ? {path: "/agent/index"} : {path: '/user/index'};
      }
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin";

  footer.footer {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    height: r($footer-h);
    z-index: 99;
    width: 100%;
    @include f(28px);
    color: $cl2;
    border-top: 1px solid #ccc;
    background: $footer-bg;
    & > a {
      text-align: center;
      width: 20%;
      flex-direction: column;
      align-items: center;
      line-height:1.5;
      &.active {
        color: $cl1;
        border-top-color: #f33;
      }
    }
    .iconfont {
      @include f(48px);
    }
  }
</style>
