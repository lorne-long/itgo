<template>
  <div style="background: #fff; overflow: hidden">
    <div class="main_nav_with_arrow ul_auto_wrap">
      <!--<a href="javascript:void(0);" class="layout_image_with_text active">-->
      <!--<img src="./img/icon01.png">-->
      <!--<span class="img_text">体验金</span>-->
      <!--</a>-->
      <a href="javascript:void(0);" @click="actives='save_send'" :class="{active:actives=='save_send'}">
        <img src="./img/icon02.png">
        <span>存送优惠</span>
      </a>
      <a href="javascript:void(0);" @click="actives='wash_code'" :class="{active:actives=='wash_code'}">
        <img src="./img/icon03.png">
        <span>洗码</span>
      </a>
      <a href="javascript:void(0);"  @click="actives='discount_code'"  :class="{active:actives=='discount_code'}">
        <img src="./img/icon08.jpg">
        <span >优惠券</span>
      </a>
      <a href="javascript:void(0);"  @click="actives='help_gold'" :class="{active:actives=='help_gold'}">
        <img src="./img/icon04.png">
        <span>救援金</span>
      </a>
      <a href="javascript:void(0);" @click="actives='vip_gold'"  :class="{active:actives=='vip_gold'}">
        <img src="./img/icon05.png">
        <span >VIP礼金</span>
      </a>
      <a href="javascript:void(0);"  @click="actives='birthday_gold'"   :class="{active:actives=='birthday_gold'}">
        <img src="./img/icon06.png">
        <span >生日礼金</span>
      </a>
      <a href="javascript:void(0);"  @click="actives='recommend_firend'" :class="{active:actives=='recommend_firend'}">
        <img src="./img/icon07.png">
        <span>推荐好友</span>
      </a>
    </div>
    <component :is="items[actives]"></component>
  </div>
</template>
<script type="text/ecmascript-6">
  let save_send=(resolve) => resolve(require('../discount-items/save-send'));
  let wash_code=(resolve) => resolve(require('../discount-items/wash-code'));
  let discount_code=(resolve) => resolve(require('../discount-items/discount-code'));
  let help_gold=(resolve) => resolve(require('../discount-items/help-gold'));
  let vip_gold=(resolve) => resolve(require('../discount-items/vip-gold'));
  let birthday_gold=(resolve) => resolve(require('../discount-items/birthday-gold'));
  let recommend_firend=(resolve) => resolve(require('../discount-items/recommend-firend'));
  export default {
    data() {
      return{
        actives:'save_send',
        items:{save_send,wash_code,discount_code,help_gold,vip_gold,birthday_gold,recommend_firend}
      };
    }
  };
</script>
<style lang="scss">
  @import "../../../../../assets/scss/mixin.scss";
  .main_nav_with_arrow {
    padding: r(30) 0 0 r(30);
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
  .ul_auto_wrap {
    width: 100%;
    overflow-x: auto;
    box-sizing: border-box;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    text-align: center;
  }

  .main_nav_with_arrow a {
    position: relative;
    background: #fff;
    padding: r(20) 0;
    display: inline-block;
    width: r(176);
    margin-right: r(20);
    border: 1px solid #ddd;
    border-radius:7px;
  @include f($f14);
  &.active {
    background: url("img/bg04.png") no-repeat;
    background-size: 100% 100%;
    color: #f66;
    border-color: transparent;
    box-shadow: 0 0 0;
    padding: r(20) 0 r(54) 0;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: r(14);
    height: r(80); width: r(80)
  }
  }
</style>
