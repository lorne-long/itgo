<template>
  <div class="flex_1">
    <component :is="componentChoose"></component>
    <div class="btn_wrap mt10"><a href="javascript:void(0);" @click="logOut"
                                  class="btn btn01 btn_logout j-exit">安全退出</a></div>
  </div>
</template>
<script>
  import {logOut} from 'api/authService';
  import {modifyCustomerSocialInfo, getCustomerSocialInfo} from 'api/user';

  import further from "./further-data.vue";
  import update from "./update-data.vue";
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        detail: {
          qq: "",
          weixin: "",
          email: "",
        }
      };
    },
    props: {},
    methods: {
      logOut: function () {
        logOut();
        this.$router.push("/index");
      },
    },
    computed: {
      ...mapGetters(["userData"]),
      componentChoose(){
        return this.userData.accountName == '' ? further : update;
      }
    }
  };
</script>
<style>
</style>
