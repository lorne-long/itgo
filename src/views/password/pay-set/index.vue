<template>
  <div class="pay-set">
    <input-inline label="登录密码">
      <input v-model="loginPwd" type="password" maxlength="18">
    </input-inline>
    <input-inline label="支付密码">
      <input v-model="withdrawPwd" ref="pwd" type="password" placeholder="6位数字" maxlength="6">
      <span @touchstart="$refs.pwd.type='text'" @touchend="$refs.pwd.type='password'" class="right-info"></span>
    </input-inline>
    <v-button @click="submit">确定</v-button>
  </div>
</template>
<script>
  import md5 from "MD5";
  import {bindWithdrawPwd, checkWithdrawPwd} from "api/payment";
  import {mapGetters, mapActions} from 'vuex'
  import vButton from "components/form/button"
  import inputInline from "components/form/input-inline"
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
    },

    components: {
      inputInline, vButton
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .pay-set {
    @include f(32px);
    padding: r(30) r(30) 0;
  }
</style>
