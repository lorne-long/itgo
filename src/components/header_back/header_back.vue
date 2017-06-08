<template>
  <header class="header_normal">
     <a  @click="doClick" class="back_link"><span class="icon icon_arrow_back"></span></a>
     <h1> <slot></slot></h1>
  </header>
</template>
<script>
    export default {
        props:{
          back:{
            type:Function
          }
        },
        methods:{
          doClick(){
            if(this.back&&typeof this.back ==='function'){
              this.back();
            }else{
              this.$router.back();
            }
          }
        }
    };
</script>
<style>
</style>
