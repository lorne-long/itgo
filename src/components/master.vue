<template>
  <div class="master">
    <back-header :back="back">{{headerTxt}}</back-header>
    <transition name="slide">
      <router-view @setHeader="setHeader"
                   @setBack="setBack">
      </router-view>
      <slot></slot>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        headerTxt:"",
        back:null
      };
    },
    methods:{
      setHeader(val){
        this.headerTxt=val;
      },
      setBack(fun){
        this.back=fun;
      }
    },
    mounted(){
      this.$store.commit("SET_FOOTER",false);
    },
    activated(){
      this.$store.commit("SET_FOOTER",false);
    },
    deactivated(){
      this.$store.commit("SET_FOOTER",true);
    },
    beforeDestroy(){
      this.$store.commit("SET_FOOTER",true);
    },
    components:{
      'back-header':require("components/header_back/header_back")
    }
  };
</script>
<style scoped>
  .master { }
</style>
