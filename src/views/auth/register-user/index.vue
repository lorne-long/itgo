<template>
  <div class="form-box login-page">
    <div class="form-group">
      <div class="form-control">
        <input v-model="data.account" type="text" placeholder="用户名(6-10位数字和字母)">
      </div>
    </div>
    <div class="form-group">
      <div class="form-control">
        <input ref="pwd" v-model="data.password" type="password" placeholder="密码(6-16位数字和字母）" maxlength="16">
        <i @touchstart="$refs.pwd.type='text'" @touchend="$refs.pwd.type='password'"
           :class="['iconfont pwd-eye icon-eye-close',{'icon-eye-open':$refs.pwd&&$refs.pwd.type=='password'}]">
        </i>
      </div>
    </div><div class="form-group">
      <div class="form-control">
        <input v-model.number="data.phone" type="text" placeholder="取款唯一凭证，请正确填写手机号">
      </div>
    </div>
    <div class="form-group">
      <div class="form-control inline-block">
        <input type="text" v-model.number="data.imageCode" placeholder="请输入验证码" maxlength="4">
      </div>
      <div class="form-img">
        <img :src="authImg" @click="getimg"/>
      </div>
    </div>
    <div class="btn-box login-btn-box" @click="login">
      <div class="btn login-btn" @click="register">立即开户</div>
      <router-link :to="{path:'/login'}" class="btn rig-btn">登录</router-link>
    </div>
  </div>
</template>
<script>
  import {getAuthImg, register} from 'api/authService';
  export default {
    data() {
      return {
        authImg: getAuthImg(),
        data: {
          aliasName: "", //true string
          phone: "", //true string
          confirmPassword: "",// true string
          email: "", //true string
          name: "", //true string
          account: "", //true string
          birthDate: "", //true string
          imageCode: "", //true string
          password: "", //true string
          qq: "", //true string
          intro: ""
        }
      }
    },
    methods: {
      checked() {
        let _RegExp = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
        let _phone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        if (!_RegExp.test(this.data.account)) toast("用户名(6-10位数字和字母)");
        else if (!_RegExp.test(this.data.password)) toast("密码(6-10位数字和字母)");
        else if (!_phone.test(this.data.phone)) toast("手机号格式不正确");
        else if (this.data.imageCode == "") toast("请输入验证码");
        else {
          return true;
        }
      },
      register() {
        if (!this.checked()) return;
        register(this.data).then((res) => {
          this.getimg()
          if (res.success) {
            this.$router.replace({path: "/login/registersuccess", query: {account: this.data.account}});
          } else {
            toast(res.message);
          }
        }).catch(err => {
          this.getimg()
        });
      },
      getimg(e) {
        this.authImg = getAuthImg();
      }
    }
  }
</script>
<style>
  .from-common .matop {
    margin-top: 0.5rem;
  }
</style>
