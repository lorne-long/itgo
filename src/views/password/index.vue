<template>
  <div id="page_content" class="flex_1">
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
            <router-link :to="{path:'/pwd/payset'}" v-if="!isSetPayPwd">设置支付密码</router-link>
          </li>
        </ul>
        <div class="btn_wrap">
          <a href="javascript:void(0)" @click="logOut" class="btn btn01">退出</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {logOut} from 'api/authService';

  import {checkWithdrawPwd} from 'api/safeCenter';

  export default {
    data() {
      return {
        isSetPayPwd:false
      };
    },
    props:{},
    methods:{
      logOut:function(){
        logOut();
        this.$router.push("/index");
      },
      checkPwd(){
        checkWithdrawPwd().then(data=>{
          if(data.success){
            this.isSetPayPwd=data.data
          }
          else{
            toast(data.message);
          }
        })
      }
    },
    activated(){
      this.checkPwd()
    },
    created(){
      this.$emit("setHeader","安全中心");
      //此处有个判断判断是否设置支付密码 ajax请求
      this.checkPwd();
    }
  };
</script>
<style>
</style>
