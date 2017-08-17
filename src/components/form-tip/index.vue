<template>
  <div class="form_tip display_flex_h">
    <div class="form_tip_text flex_1">
      <slot></slot>
    </div>
    <slot name="link">
    </slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    components: {}
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .form_tip {
    @include  f(26px);
    text-align: left;
    margin:1em 0;
    padding: r(30);
    background: #acdeed;
    line-height: r(44);
    color: #333;
    border-radius: r(20)
  }
</style>
