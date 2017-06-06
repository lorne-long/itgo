<template>
  <div class="v-cover" v-show='value'  @click="handlerClick" @touchmove="prevent" :style="style" transition="cover-fade">
    <!--省略其它内容-->
  </div>
</template>
<script>
  export default {
    props: {
    	value: {
        type: Boolean
        default:true
      },
      onClick: {
        type: Function
        default:function(){
        }
      },
      opacity: {
        type: Number,
        default: 0.5
      },
      color: {
        type: String,
        default: '#000'
      }
    },
    computed: {
      style() {
        return {
          'opacity': this.opacity,
          'background-color': this.color
        }
      }
    },
    data:{
      return {
        value:true
      }
    },
    methods: {
      prevent (event) {
        event.preventDefault()
        event.stopPropagation()
      },
      handlerClick () {
        if (this.onClick) {
          this.onClick();
        }
      }
    }
  }
</script>
<style lang="scss">
  .v-cover{position:fixed;left:0;top:0;width:100%;height:100%;opacity:0.5;background:#000;z-index: 1000}
  .cover-fade-transition {
      transition: all .3s linear;
    &.cover-fade-enter,
    &.cover-fade-leave {
       opacity: 0 !important;
     }
  }
</style>
