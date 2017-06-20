<template>
  <!--个人中心{-->
  <div class="page_content_wrap no_padding proxy_info_wrap">
    <tab-menu @tabmenu="tabmenu" :data="tabMenuData"></tab-menu>
    <div style="background: #fff; padding:10px 0; ">
    <component :is="tabPanel"></component>
    </div>
  </div>
  <!--}个人中心-->
</template>

<script>
  import tabMenu from "components/tab-menu";
  import {checkWithdrawPwd} from 'api/safeCenter';
  import profile from "./components/profile";
  import loginUpdate from "views/password/login-update";
  import payUpdate from "views/password/pay-update";

  export default {
    data () {
      return {
        tabPanel: profile,
        tabMenuData: [
          {
            name: "个人资料",
            params: profile
          },
          {
            name: "支付密码",
            params: payUpdate
          },
          {
            name: "登录密码",
            params: loginUpdate
          }
        ]
      }
    },
    methods: {
      tabmenu(val,i){
          this.tabPanel=val;
      }
    },
    beforeCreate(to, from, next){
      checkWithdrawPwd().then(data => {
        if (!data.success) {
          this.$router.push("/pwd/payset")
        }
      })
    },
    components: {
      tabMenu
    }
  }
</script>
