<template>
  <div class="master">
    <back-header :back="back">{{headerTxt}}</back-header>
    <transition name="slide">
      <router-view @setHeader="setHeader"
                   @setBack="setBack">
      </router-view>
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
    components:{
      'back-header':require("components/header_back/header_back")
    }
  };
</script>
<style scoped>
  .master{ }
</style>
