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
  import choose from 'components/choose';
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
      login() {
        if (!this.check())return;
        const {rquest} = this.$route.query;
        login(this.data).then(res => {
          if (res.success) {
            if (this.$refs.choose.cheacked) {
              this.$storage.set("isRememberAccount", this.data.account);
            } else {
              this.$storage.remove("isRememberAccount");
            }
            this.$store.dispatch("SET_LOGIN", true);
            if (!rquest) {
              if (res.role == "AGENT") {
                this.$store.dispatch("SET_AGENT", true);
                this.$router.push({path: "/agent/index"});
              } else {
                this.$router.push({path: "/user"});
              }
            } else {
              this.$router.push({path: rquest});
            }
          } else {
            toast(res.message)
          }
        }).catch(error => {
          toast(error);
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
      }
    },
    watch: {
      "$route"(){
        this.isAgent = this.$route.name == 'agentLogin';
      }
    },
    created() {
      if (this.$storage.get("isRememberAccount")) {
        this.data.isRemember = true;
        this.data.account = this.$storage.get("isRememberAccount");
      }
      this.isAgent = this.$route.name == 'agentLogin';
    },
    components: {
      "v-choose": choose
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
