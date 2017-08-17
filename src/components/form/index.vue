<template>
  <div class="form-control-block">
    <slot></slot>
    <i v-if="select!=''" class="right-info iconfont icon-arrow_d"></i>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      select:{
        default:''
      }
    },
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .form-control-block {
    position: relative;
    height: r(84);
    line-height: r(84);
    overflow: hidden;
    border: r(2) solid #ccc;
    padding: 0 r(24);
    border-radius: 50em;
    margin-bottom: r(32);
    background: #fff;
    @include f(28px);
    select, input {
      font-size: inherit;
      border: none;
      color: #333;
      outline: none;
      height: 100%;
      width: 100%;
      vertical-align: top;
      text-indent: 0.5em;
    }
    .right-info {
      position: absolute;
      height: 100%;
      top: 0;
      right: r(32);

    }
  }
</style>
