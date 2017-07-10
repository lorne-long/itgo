<template>
  <footer class="footer">
    <router-link :to="{path:'/index'}">
      <i class="iconfont icon-index"></i>
      <div>首页</div>
    </router-link>
    <router-link :to="{path:'/slotgame'}">
      <i class="iconfont icon-promotion"></i>
      <div>游戏大厅</div>
    </router-link>
    <router-link :to="{path:'/preferential'}">
      <i class="iconfont icon-cup"></i>
      <div>优惠</div>
    </router-link>
    <router-link :to="account">
      <i class="iconfont icon-account"></i>
      <div>账户</div>
    </router-link>
  </footer>
</template>
<script>
  export default {
    data() {
      return {};
    },
    computed:{
      account(){
        return this.$store.getters.isAgent?{path:"/agent/index"}:{path:'/user/index'};
      }
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  footer.footer {
    display: flex;
    position: fixed;
    bottom: 0;
    z-index:10;
    width: 100%;
  @include f(14px);
    border-top: 1px solid #ccc;
    background:#fff;
  &>a{
    text-align: center;
    display: flex;
    color: #666;
    height: r(100);
    justify-content: center;
    flex-direction: column;
    width: 25%;

    &.active {
      color: #f33;
      border-top-color: #f33;
    }
  }
    .iconfont { @include f(20 px); }
  }
</style>
