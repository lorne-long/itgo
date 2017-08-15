<template>
  <div class="down-client">
    <h2><i class="iconfont icon-xiazai"></i><span>热门游戏</span></h2>
    <ul class="down-list">
      <li><a href="http://hunter2.agmjs.com/">
        <img src="~static/images/index/dl_fish.png">
        <div class="down-text">捕鱼王2</div>
      </a>
      </li>
      <li>
        <a href="http://down.dreamtech.asia/LL/ios.html">
        <img src="~static/images/index/dl_dt.png">
        <div class="down-text">DT苹果版</div>
      </a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {},
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    activated() {
    },
    components: {}
  }
</script>
<style spcoed lang="scss">
  @import "~assets/scss/mixin.scss";
  .down-client {
    @include f(28px);
    padding: r(10) 0 r(30) r(30);
    h2 {
      margin-bottom: r(24)
    }
    .icon-xiazai {
      @include f(32px);
      color: $cl1;
      margin-right: r(16);
    }
    .down-list {
      display: flex;
      text-align: center;

      li{ margin-right:r(20);}
      img{ width: r(140); height: r(140)}
      .down-text{
        margin-top: r(14);
      }
      /*li{ float: left}*/
    }
  }
</style>
