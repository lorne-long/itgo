<template>
  <div>
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        backFun:null
      };
    },
    props:{},
    methods:{},
    computed:{},
    created(){
    },
    components:{
      "v-header":require("../_components/header01.vue")
    }
  };
</script>
<style>

</style>
