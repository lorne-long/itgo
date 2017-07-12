<template>
  <div class="flex_1">
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
    computed:{
      showWhat(){
        let name=this.$store.getters.userData.accountName;
        return name!=null&&name!="" ? vUpdate : vPerfect;
      }
    },
    components:{
      vUpdate,vPerfect
    }
  };
</script>
<style>
</style>
