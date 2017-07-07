<template>
  <div class="flex_1">
    <div class="page_content_wrap">
      <div class="layou_config_list">
        <ul>
          <li>
            <router-link :to="{path:'/pwd/loginupdate'}">修改登录密码</router-link>
          </li>
          <li>
            <router-link :to="{path:'/pwd/payupdate'}" v-if="isSetPayPwd">修改支付密码</router-link>
          </li>
          <li>
            <router-link :to="{path:'/pwd/payset',query:{rquest:'/pwd/index'}}" v-if="!isSetPayPwd">设置支付密码</router-link>
          </li>
        </ul>
        <div class="btn_wrap">
          <a href="javascript:void(0)"  class="btn btn01"
             @click="$store.dispatch('LOGIN_OUT')"
          >退出</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
      };
    },
    computed:{
      ...mapGetters(["isSetPayPwd"])
    }
  };
</script>
<style>
</style>
