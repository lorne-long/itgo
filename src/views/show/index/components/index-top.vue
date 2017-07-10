<template>
  <header class="display_flex_h flex_align_center normal_padding header_index">
    <div class="site_logo_wrap">
      <a href="/" class="link_logo">
        <img src="static/images/logo.gif" alt="利来电游">
      </a>
    </div>
    <div class="top_links_wrap">
      <a href="javascript:void(0);" @click="$emit('input',true)"><span class="icon icon_chat02"></span></a>
    </div>
  </header>
</template>
<script>
  export default {
    data() {
      return {
        detailShow:false
      };
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  header.header {
    height: r($herder); position: relative;
    line-height: r($herder);
    background-color: #fff; border-bottom: 1px solid #ccc;
  }
  .top_links_wrap { float: right; margin-right: r(30);
  span { @include f(32 px); }
  }
  header.header  img { height: r(120); }
</style>
