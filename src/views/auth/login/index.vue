<template>
  <div class="login-page form-box">
    <div class="form-group">
      <label class="form-lable">帐号：</label>
      <div class="form-control">
        <input  v-model="data.account" type="text" placeholder="请输入游戏帐号">
      </div>
    </div>
    <div class="form-group">
      <label class="form-lable">密码：</label>
      <div class="form-control">
        <input v-model="data.password" ref="pwd" type="password" placeholder="请输入游戏密码">
        <i @click="$refs.pwd.type=($refs.pwd.type=='password'?'text':'password')"
           :class="['pwd-eye icon-eye-close',{'icon-eye-open':false}]">
        </i>
      </div>
    </div>
    <div class="form-group">
      <label class="form-lable">验证码：</label>
      <div class="form-control inline-block">
        <input v-model="data.imageCode" name="imageCode" type="text" placeholder="请输入验证码">
      </div>
      <div class="form-img">
        <img :src="authImg" @click="getimg"/>
      </div>
    </div>
    <div class="operate-links">
        <router-link to="/help/forgotpwd" class="forgot-pwd">忘记密码?</router-link>
        <div class="remember-username">
          <span class="rem_desc">记住用户名</span>
          <v-choose  v-model="data.isRemember"></v-choose>
        </div>
    </div>
    <div class="btn-box login-btn-box">
      <div @click="login" class="btn login-btn">登录</div>
      <router-link :to="{path:'/login/register'}" class="btn rig-btn">注册</router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {login, getAuthImg} from 'api/authService';
  import vChoose from './components/choose';
  import {$localStorage} from '@/util/storage';
  import {AUTH_NAME} from "@/store/types"//权限名称
  export default {
    data() {
      return {
        authImg: getAuthImg(),
        isAgent: false,
        data: {
          account: "woodytest",
          password: "aa123456789",
          imageCode: "",
          isRemember: false
        }
      };
    },
    activated(){
      this.getimg();
    },
    computerd:{
    },
    methods: {
      getimg(e) {
        this.authImg = getAuthImg();
      },
      reset(msg){
        this.data.imageCode=""
        this.getimg()
        toast(msg);
      },
      login() {
        if (!this.check())return;
        login(this.data).then(res =>{
          if (res.success) {
            this.data.imageCode=this.data.password='';
            if (this.data.isRemember) {
              $localStorage.set("isRememberAccount", this.data.account);
            } else {
              $localStorage.remove("isRememberAccount");
            }
            let {rquest} = this.$route.query;
            if (!rquest) {
              let {role} = res.data;
              let $path = "/index";
              this.$store.dispatch("UPDATE_USERDATA");
              this.$store.commit("SET_AUTH", role);
              if (role == AUTH_NAME.AGENT) {
                $path = "/agent/index";
              } else if(role == AUTH_NAME.USER) {
                $path = "/user/index";
              }
              this.$router.push({path: $path});
            } else {
              this.$router.push({path:rquest});
            }
          }else {
            this.reset(res.message)
          }
        }).catch(error =>{
          this.reset("请求失败")
        });
      },
      check() {
        if (this.data.account == "")toast("用户名不能为空")
        else if (this.data.password == "")toast("密码不能为空")
        else if (this.data.imageCode == "")toast("验证码不能为空")
        else  return true;
      }
    },
    created() {
      if ($localStorage.get("isRememberAccount")) {
        this.data.isRemember = true;
        this.data.account=$localStorage.get("isRememberAccount");
      }
    },
    components: {
      vChoose
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .form-box{
      .form-group{
        margin-bottom:r(32);
        font-size: 0;
        .form-lable{
          @include  f(36px);
          display:block;
          color: #009bc8;
          padding-left:r(20);
          font-weight: bold;
          letter-spacing: 2px;
          margin-bottom:r(16);
        }
        .form-control{
          display: block;
          position: relative;
          height: r(84);
          line-height:r(84);
          border: solid r(4) #009bc8;
          padding: 0 r(40);
          border-radius:r(40);
          background: #fff;
          overflow: hidden;
          @include f(32px);
          .input,input{
            vertical-align: top;
            width: 100%;
            height:100%;
            border: none;
          }
          &.inline-block{
            display: inline-block;
            width: 70%;
          }
        }
        .form-img{
          display: inline-block;
          vertical-align: top;
          overflow: hidden;
          border-radius: r(40);
          margin-left: 2%;
          width:28%;
          height: r(84);
          img{height: 100%;}
        }
        .pwd-eye{  position:absolute;right:r(20);top:0;width:52px; height:100%;  }
      }
  }
  .login-page{
    padding: 0 r(30);
      .operate-links{
        padding: 0 r(50);
        line-height: r(48);
        overflow: hidden;
        margin-bottom: r(20);
      }
    .forgot-pwd{ float: left;color:#009bc8 }
    .remember-username{ float:right;}
    .btn-box{
      display: flex;
      padding: 0 r(50);
      text-align: center;
      color:#fff;
      &.column{
        flex-direction: column;
      }
      @include  f(36px);
      .btn{
        flex:1;
        padding:r(20) 0;
        margin: r(20);
      }
    }
    .login-btn{
      border-radius:r(200);
      background:$btn-bg1;
    }
    .rig-btn{
      border-radius:r(200);
      background:$btn-bg2;
    }
  }
</style>
