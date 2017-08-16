<template>
  <div class="login-update">

    <div class="form-box">
      <div class="form-group">
        <span class="form-label">原密码</span>
        <div class="form-control"><input v-model='password' placeholder="原密码" type="password"></div>
      </div>
      <div class="form-group">
        <span class="form-label">新密码</span>
        <div class="form-control"><input ref="pwd1" v-model='new_password' type="password" placeholder="6-16位数字和字母">
        </div>
        <span @touchstart="$refs.pwd1.type='text'" @touchend="$refs.pwd1.type='password'" class="right_label"></span>
      </div>
      <div class="form-group">
        <span class="form-label">确认密码</span>
        <div class="form-control"><input ref="pwd2" v-model='confirm_password' type="password"
                                             placeholder="6-16位数字和字母"></div>
        <span @touchstart="$refs.pwd2.type='text'" @touchend="$refs.pwd2.type='password'" class="right-info"></span>
      </div>
    </div>


    <div class="btn-search"
         @click="submit">确定
    </div>
  </div>
</template>
<script>
  import md5 from "MD5";
  import {changepws} from "api/payment";

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
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .login-update {
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
