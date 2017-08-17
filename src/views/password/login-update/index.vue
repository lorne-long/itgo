<template>
  <div class="login-update">
    <div class="form-box">
      <input-inline label="原密码">
        <input v-model='password' placeholder="原密码" type="password">
      </input-inline>
      <input-inline label="新密码">
        <input ref="pwd1" v-model='new_password' type="password" placeholder="6-16位数字和字母">
        <span @touchstart="$refs.pwd1.type='text'" @touchend="$refs.pwd1.type='password'" class="right_label"></span>
      </input-inline>
      <input-inline label="确认密码">
        <input ref="pwd2" v-model='confirm_password' type="password" placeholder="6-16位数字和字母">
        <span @touchstart="$refs.pwd2.type='text'" @touchend="$refs.pwd2.type='password'" class="right-info"></span>
      </input-inline>
    </div>
    <v-button @click="submit">确定</v-button>
  </div>
</template>
<script>
  import md5 from "MD5";
  import {changepws} from "api/payment";

  import vButton from "components/form/button"
  import inputInline from "components/form/input-inline"

  export default {
    data() {
      return {
        password: "",// true string
        confirm_password: "",// true string
        new_password: ""
      };
    },
    props: {},
    methods: {
      check() {
        if (this.password == "") toast("请输入原密码");
        else if (this.new_password == "") toast("请输入新密码");
        else if (this.confirm_password == "") toast("请重复新密码");
        else if (this.new_password != this.confirm_password) toast("二次密码不一致");
        else if (this.password == this.new_password) toast("新密码不能与旧密码相同");
        else {
          return true;
        }
      },
      submit() {
        if (!this.check()) return;
//            {
//              password: md5(md5(this.password)),
//                confirm_password: md5(md5(this.confirm_password)),
//              new_password: md5(md5(this.new_password)),
//            }
        changepws(this.$data).then(data => {
          if (data.success) {
            toast(data.message);
            this.password = this.confirm_password = this.new_password = ""
          } else {
            toast(data.message)
          }
        })
      }
    },
    components: {
      inputInline, vButton
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .login-update {
    @include f(32px);
    .form-box {
      padding: r(30) r(30) 0;
    }
  }
</style>
