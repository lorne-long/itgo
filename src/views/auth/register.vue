<template>
  <div class="from-common">
    <div class="froms">
        <p>
          <i class="iconfont icon-account"></i>
          <input v-model="data.username" placeholder="用户名" type="text" />
        </p>
        <p>
          <i class="iconfont icon-account"></i>
          <input v-model="data.pwd" placeholder="密码" type="password" />
          <span class="r-icon iconfont icon-account"></span>
        </p>
        <p>
          <i class="iconfont icon-account"></i>
          <input v-model="data.pwdTwo" placeholder="再次输入密码" type="password" />
        </p>
        <p>
          <i class="iconfont icon-account"></i>
          <input v-model="data.code" type="text" placeholder="验证码" />
          <img class="r-icon" :src="authImg" @click="getimg" />
        </p>

    </div>
    <div class="btn1 matop" @click="register">
      <a href="javascript:;">  立即开户</a>
    </div>
    <router-link to="/" class="agent-into">
      <i class="iconfont icon-account"></i>
      代理入口
    </router-link>
  </div>
</template>
<script>
  import ajax from 'api/authService';
	export default{
    data() {
      return {
        authImg:ajax.getAuthImg(),
        data:{
          username:"",
          pwd:"",
          pwdTwo:"",
          code:"",
          isRemember:false
        }
      }
    },
    methods:{
      register(){},
      getimg(e) {
        this.authImg = ajax.getAuthImg();
      },
    }
  }
</script>
<style>
  .from-common .matop{ margin-top:0.5rem;}
</style>
