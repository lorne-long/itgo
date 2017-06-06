<template>
  <div class="user_info_nav sec_box display_flex_h">
    <div class="flex_1">
      <router-link :to="{path:'/money/deposit'}" class="box_border_box">
        <span class="link_wrap"><span class="icon icon_card"></span><span>存款</span></span>
      </router-link>
    </div>
    <div class="flex_1">
      <router-link :to="{path:'/money/personal'}" class="box_border_box">
        <span class="link_wrap"><span class="icon icon_withdraw"></span><span>取款</span></span>
      </router-link>
    </div>
    <div class="flex_1">
      <router-link :to="{path:'/money/transfer'}" class="box_border_box">
        <span class="link_wrap"><span class="icon icon_transfer"></span><span>转账</span></span>
      </router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    }
  };
</script>
<style lang="scss">
  @import "../../assets/scss/mixin.scss";

  .user_info_nav {
    margin-bottom: r(20);
  @include f($f16);
    color: #3d3d3d;
  }

  .user_info_nav .flex_1 {
    text-align: center;
  }

  .user_info_nav .flex_1 a {
    display: table;
    width: 100%;
    height: 100%;
    padding: r(20) 0;
  }

  .user_info_nav .flex_1 a .link_wrap {
    display: table-cell;
    width: 100%;
    vertical-align: middle;
    border-right: 1px solid #eee;
  }

  .user_info_nav .flex_1:last-child a .link_wrap {
    border-right: none;
  }

  .user_info_nav .flex_1 span {
    vertical-align: middle;
  }

  .user_info_nav .flex_1 .icon {
    margin-right: r(34);
  }

  .user_info_nav .flex_1:last-child {
    border-right: none;
  }
</style>
