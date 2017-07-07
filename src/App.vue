<template>
  <div id="app">
    <transition :name="transitionName">
      <!--<keep-alive :exclude="isExclude">-->
      <!--<router-view ></router-view>-->
      <!--</keep-alive>-->
      <keep-alive>
        <router-view v-if="!$route.meta.noCache"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
    <v-footer v-show="showFooter"></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import "./assets/scss/base.scss";
  import  "./assets/scss/font.scss";
  import "./assets/scss/mixin.scss";
  import vFooter from 'components/footer/footer';
  import ajaxLoad from 'base/ajax-load/';
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        transitionName:"slide",
      }
    },
    computed:{
      ...mapGetters(["showFooter",'ajaxLoad']),
      isExclude(){
        return this.$route.meta.cache ? "" : this.$route.name;
      }
    },
    watch:{
      "$route"(to,from){
        document.title=to.meta.title||to.meta.headName||"itgo";
        const toDepth=to.path.split('/').length;
        const fromDepth=from.path.substring(0,from.path.length-2).split('/').length
        this.transitionName=toDepth<fromDepth ? 'slide_back' : 'slide';
      }
    },
    created(){
      this.$store.dispatch("UPDATE_USERDATA")
    },
    components:{
      vFooter,
      ajaxLoad
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
