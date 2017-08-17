<template>
  <div class="form-group-inline">
    <label class="form-label">{{label}}</label>
    <div class="form-control">
      <slot></slot>
      <i v-if="select!=''" class="right-info iconfont icon-arrow_d"></i>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      label:{
        default:"请选择"
      },
      select:{
        default:''
      }
    },
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
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .form-group-inline {
    position: relative;
    height: r(84);
    line-height: r(82);
    overflow: hidden;
    border: r(2) solid #ccc;
    padding: 0 r(24);
    border-radius: 50em;
    margin-bottom: r(32);
    background: #fff;
    .form-label {
      text-align: right;
      color: $cl4;
      min-width: 4em;
      display: block;
      float: left;
      padding-left: r(16);
    }
    .form-control {
      @include f(28px);
      height: 100%;
      white-space: nowrap;
      select, input {
        vertical-align: top;
        font-size: inherit;
        border: none;
        color: #333;
        outline: none;
        height: 100%;
        width: 100%;
        text-indent: 1em;
      }
      .right-info {
        position: absolute;
        height: 100%;
        top: 0;
        right: r(32);
      }
    }
  }
</style>
