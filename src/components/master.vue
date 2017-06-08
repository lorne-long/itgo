<template>
  <div class="master">
    <back-header :back="back">{{headerTxt}}</back-header>
    <transition name="slide">
      <router-view @setHeader="setHeader"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        headerTxt:""
      };
    },
    methods:{
      setHeader(val,fun){
        this.headerTxt=val;
        this.back=fun;
      },
      back(){
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
