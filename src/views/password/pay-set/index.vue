<template>
  <div class="pay-set">
    <div class="form-box">
      <div class="form-group">
        <span class="form-label">登录密码</span>
        <div class="form-control"><input v-model="loginPwd" type="password" maxlength="18">
        </div>
      </div>
      <div class="form-group">
        <span class="form-label">支付密码</span>
        <div class="form-control">
          <input v-model="withdrawPwd" ref="pwd" type="password" placeholder="6位数字" maxlength="6"></div>
        <span @touchstart="$refs.pwd.type='text'" @touchend="$refs.pwd.type='password'" class="right-info"></span>
      </div>
    </div>
    <div  @click="submit" class="btn-search">
      确定
    </div>
  </div>
</template>
<script>
  import md5 from "MD5";
  import {bindWithdrawPwd, checkWithdrawPwd} from "api/payment";
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        withdrawPwd: '',
        loginPwd: ""
      };
    },
    computed: {
      ...mapGetters(["userData"])
    },
    methods: {
      checkForm() {
        if (this.loginPwd == '') toast("请输入登录密码");
        else if (this.withdrawPwd == "") toast("请输入支付密码");
        else {
          return true;
        }
      },
      submit() {
        if (!this.checkForm()) return;
        bindWithdrawPwd({
          withdrawPwd: md5(md5(this.withdrawPwd)),
          loginPwd: this.loginPwd
        }).then((data) => {
          if (data.success) {
            toast("设置成功");
            this.$store.commit("SET_PAYPWD", true)
            const {rquest} = this.$route.query;
            if (rquest) {
              this.$router.push({path: rquest});
            }
            this.loginPwd = this.withdrawPwd = '';
          } else {
            toast(data.message);
          }
        }).catch(err => {
          toast("设置失败,请重新尝试");
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      checkWithdrawPwd().then(res => {
        if (res.success && res.data == '1') {
          next("/pwd/payupdate");
        } else {
          next()
        }
      })
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .pay-set {
    @include f(32px);
    .form-box {
      padding: r(30) r(30) 0;
      .form-group {
        position: relative;
        height: r(84);
        line-height: r(82);
        overflow: hidden;
        border: r(2) solid #ccc;
        padding: 0 r(24);
        border-radius: 50em;
        margin-bottom: r(32);
        background: #fff;
      }
      .form-label {
        text-align: right;
        color: $cl4;
        min-width: 4em;
        display: block;
        float: left;
        padding-left: r(16);
      }
      .form-control {
        @include f(28px);
        height: 100%;
        white-space: nowrap;
        select, input {
          vertical-align: top;
          font-size: inherit;
          border: none;
          color: #333;
          outline: none;
          height: 100%;
          width: 100%;
          text-indent: 1em;
        }
        .right-info {
          position: absolute;
          height: 100%;
          top: 0;
          right: r(32);
        }
      }
    }
    .btn-search {
      display: block;
      margin: r(20) auto 0;
      background: $btn-bg1;
      text-align: center;
      @include f(36px);
      color: #fff;
      width: 90%;
      border-radius: r(100);
      line-height: r(88)

    }
  }
</style>
