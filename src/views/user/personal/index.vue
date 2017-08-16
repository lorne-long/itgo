<template>
  <div class="user-personal">
    <component :is="showWhat"></component>
    <div class="btn_wrap mt10">
      <a href="javascript:void(0);" class="btn btn01 btn_logout" @click="$store.dispatch('LOGIN_OUT')"
      >安全退出</a>
    </div>
  </div>
</template>
<script>
  import vPerfect from "./components/perfect.vue";
  import vUpdate from "./components/update.vue";
  export default {
    data() {
      return {}
    },
    computed: {
      showWhat() {
        let name = this.$store.getters.userData.accountName;
        return name != null && name != "" ? vUpdate : vPerfect;
      }
    },
    components: {
      vUpdate, vPerfect
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .user-personal {
    @include f(32px);
    .form-box {
      padding:r(30) r(30) 0;
      .form-group {
        position: relative;
        height: r(84);
        line-height: r(82);
        overflow: hidden;
        border: r(2) solid #ccc;
        padding: 0 r(24);
        border-radius: 50em;
        margin-bottom: r(32);
        background: #fff;
      }
      .form-label {
        text-align:right;
        color: $cl4;
        min-width: 4em;
        display: block;
        float: left;
        padding-left:r(16);
      }
      .form-control {
        @include f(28px);
        height: 100%;
        white-space: nowrap;
        select,input {
          vertical-align: top;
          font-size: inherit;
          border: none;
          color: #333;
          outline: none;
          height: 100%;
          width: 100%;
          text-indent: 1em;
        }
        .right-info{
          position: absolute;
          height:100%;
          top:0;
          right:r(32);
        }
      }
    }
    .btn-search {
      display: block;
      margin: r(20) auto 0;
      background: $btn-bg1;
      text-align: center;
      @include f(36px);
      color: #fff;
      width: 90%;
      border-radius: r(100);
      line-height: r(88)

    }
  }
</style>
