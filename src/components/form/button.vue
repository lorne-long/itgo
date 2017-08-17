<template>
  <div :class="myClass" @click="$emit('click')">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {
      className: {
        default: ""
      },
      model: {
        default: -1
      }
    },
    computed: {
      myClass() {
        let $class = "btn-submit ";
        switch (this.model) {
          case "1":
            $class += "btn-disable ";
            break;
          case "0":
            $class += "btn-reset ";
            break;
        }
        return $class + this.className;
      }
    },
    watch: {},
    methods: {},
    created() {
    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixin.scss";

  .btn-submit {
    display: block;
    margin: 0 auto;
    background: $btn-bg1;
    text-align: center;
    @include f(36px);
    color: #fff;
    width: 90%;
    border-radius: r(100);
    line-height: r(88);
  }
  .btn-reset{
    background: $btn-bg2;
    margin-top: r(20);
  }
  .btn-disable {
    background: $btn-dis;
  }

</style>
