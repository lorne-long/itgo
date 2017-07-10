<template>
  <div class="flex_1">
    <component :is="componentChoose"></component>
    <div class="btn_wrap mt10">
      <a href="javascript:void(0);" class="btn btn01 btn_logout"
         @click="$store.dispatch('LOGIN_OUT')"
      >安全退出</a>
    </div>
  </div>
</template>
<script>
  import {logOut} from 'api/authService';
  import {modifyCustomerSocialInfo,getCustomerSocialInfo} from 'api/user';
  import further from "./further-data.vue";
  import update from "./update-data.vue";
  export default {
    data() {
      return {}
    },
    computed:{
      componentChoose(){
        return this.$store.getters.userData.accountName==''?further:update;
      }
    }
  };
</script>
<style>
</style>
