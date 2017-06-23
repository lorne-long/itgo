<template>
  <div>
    <div class="froms">
      <p>
        <i class="iconfont icon-account"></i>
        <input v-model="data.account" placeholder="用户名" type="text"/>
      </p>
      <p>
        <i class="iconfont icon-account"></i>
        <input v-model="data.password" placeholder="密码" type="password"/>
        <span class="r-icon iconfont icon-account"></span>
      </p>
      <p>
        <i class="iconfont icon-account"></i>
        <input v-model="data.imageCode" type="text" placeholder="验证码"/>
        <img class="r-icon" :src="authImg" @click="getimg"/>
      </p>
      <div class="clearfix operate-links">
        <router-link to="/" class="forgot-pwd">忘记密码?</router-link>
        <div class="remember_username">
          <span class="rem_desc">记住用户名</span>
          <v-choose :value="data.isRemember" ref="choose"></v-choose>
        </div>
      </div>
    </div>
    <div class="btn_wrap" @click="login">
      <a href="javascript:void(0);" class="btn btn01 j-login">登录</a>
    </div>
    <router-link v-if="!isAgent" to="/login/agentLogin" class="agent-into">
      <i class="iconfont icon-account"></i>
      代理入口
    </router-link>
    <router-link v-if="isAgent" to="/login/index" class="agent-into">
      <i class="iconfont icon-account"></i>
      会员入口
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  import {login, getAuthImg} from 'api/authService';
  import vChoose from 'components/choose';
  import {$localStorage, $sessionStorage} from '@/util/storage';
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
        login(this.data).then(res => {
          if (res.success) {
            if (this.$refs.choose.cheacked) {
              $localStorage.set("isRememberAccount", this.data.account);
            } else {
              $localStorage.remove("isRememberAccount");
            }
            let {rquest} = this.$route.query;
            if (!rquest) {
              let {role} = res.data;
              let $path = "/index";
              this.$store.dispatch("SET_AUTH", role);
              if (role == AUTH_NAME.AGENT) {
                $path = "/agent/index";
              } else if(role == AUTH_NAME.USER) {
                $path = "/user/index";
              }
              this.$router.push({path: $path});
            } else {
              this.$router.push({path:rquest});
            }
          } else {
            this.reset(res.message)
          }
        }).catch(error => {
          this.reset("请求失败")
        });
      },
      check() {
        if (this.data.account == "")
          toast("用户名不能为空")
        else if (this.data.password == "")
          toast("密码不能为空")
        else if (this.data.imageCode == "")
          toast("验证码不能为空")
        else
          return true;
      },
      changeTab(){
        this.isAgent = this.$route.name == 'agentLogin';
        if (this.isAgent) {
          this.data.account = "a_bbb";
          this.data.password = "aa123456"
        }
      }
    },
    watch: {
      "$route"(){
        this.changeTab()
      }
    },
    created() {
      if ($localStorage.get("isRememberAccount")) {
        this.data.isRemember = true;
        this.data.account = $localStorage.get("isRememberAccount");
      }
      this.changeTab();
    },
    components: {
      vChoose
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .forgot-pwd {
    color: #1a84bb;
    float: left;
    line-height: r(74);
  }

  .remember_username {
    float: right;
    color: #999;
    line-height: r(74);
  }

  .operate-links {
    padding: 0 r(30);
    line-height: r(74);
    @include f(14px);
    margin: r(15) 0 r(40) 0;
  }
</style>
