<template>
  <div id="app">

    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
			<v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import "./assets/scss/base.scss";

  import  "./assets/scss/font.scss";
  import "./assets/scss/mixin.scss";


//  import alerts from "base/msgbox/msgbox.js";
  import cover from 'base/cover/cover';
  import footer from './views/_components/footer';
  console.log(cover)
  export default {
    mixins:[cover],
    name:'app',
    data(){
      return {
        transitionName:"slide",
        showfooter:true
      }
    },
    watch:{
      "$route"(to,from){
        const toDepth=to.path.split('/').length;
        const fromDepth=from.path.substring(0,from.path.length-2).split('/').length
        this.transitionName=toDepth<fromDepth ? 'slide_back' : 'slide';
        this.value=!this.value;
      }
    },
    components:{
      'v-footer':footer
    }
  }

</script>
<style lang="scss">

  .slide-enter,
  .slide_back-enter { position: absolute; width: 100%; }
  .slide-leave,
  .slide_back-leave { position: absolute; width: 100%; }
  .slide-enter-active,
  .slide_back-enter-active { transition: all 0.3s linear; }
  .slide-leave-active { position: absolute; transition: all 0.3s linear; transform: translate(-100%); }
  .slide-enter { transform: translateX(100%); }
  .slide_back-leave-active { position: absolute; transition: all 0.3s linear; transform: translate(100%); }
  .slide_back-enter { transform: translateX(-100%); }
</style>
