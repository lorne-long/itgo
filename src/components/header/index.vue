<template>
  <header class="index-top">
    <i class="iconfont icon-menu" @click="value=true"></i>
    <a href="/" class="link_logo">
      <img src="~static/img/logos.png" alt="利来电游">
    </a>
    <i class="iconfont icon-dongtai"></i>
    <tool-bar v-model="value"></tool-bar>
  </header>
</template>
<script>
  import toolBar from 'components/tool-bar';
  export default {
    data() {
      return {
        value:false
      };
    },
    components:{
      toolBar
    }
  };
</script>
<style lang="scss" scoped>

  @import "~assets/scss/mixin.scss";
  header.index-top {
    height: r($header);
    width: 100%;
    line-height: r($header);
    background-color: $herder-bg;
    position: relative;
    border-bottom: 1px solid #ccc;
    text-align: center;
    .iconfont {
      @include f(60px);
      color: $cl1;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      vertical-align: middle;
    }
    img {
      height: r(72);
    }
    .icon-menu {
      left: r(16);
    }
    .icon-dongtai {
      right: r(16);
    }
  }
</style>
