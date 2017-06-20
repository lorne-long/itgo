<template>
  <!--绑定银行卡{-->
  <div id="page-bindcard">
    <bank-list showAdd="true"></bank-list>
    <div class="btn_wrap logout_btn_wrap" @click="logOut">
      <a href="javascript:void(0);" class="btn btn01 btn_logout j-exit">安全退出</a>
    </div>
  </div>
  <!--}绑定银行卡-->
</template>
<script>
  import {logOut} from 'api/authService';
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      "bankList": require("components/bank-list/index")
    },
    methods: {
      logOut: function () {
        logOut();
        this.$router.push("/index");
      }
    },
  }
</script>
