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
        components:{}
    };
</script>
<style lang="scss">
  @import "~assets/scss/mixin";
  .form_tip {
    padding: r(30);
    background: #fff5d9;
    color: #666; line-height:r(44);
    text-align: center;
    border: 1px solid #e6cfb8;
    border-radius: 10px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: left;
  @include f($f13);
  .form_tip_text{
    line-height:r(44);
  }
  }
</style>
