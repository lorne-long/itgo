<template>
  <div class="pay-update">
    <input-inline label="原密码">
      <input type="password" v-model="originalPwd" class="j-password" maxlength="6" placeholder="原密码">
    </input-inline>
    <input-inline label="新密码">
      <input ref="pwd" v-model="newPwd" type="password" placeholder="6位数字"
             class="j-newpassword" maxlength="6">
      <span @touchstart="$refs.pwd.type='text'" @touchend="$refs.pwd.type='password'" class="right-info"></span>
    </input-inline>
    <v-button @click="submit">确定</v-button>
  </div>
</template>
<script>
  import {modifyWithdrawPwd} from "api/payment";
  import md5 from "MD5";
  import vButton from "components/form/button"
  import inputInline from "components/form/input-inline"

  export default {
    data() {
      return {
        originalPwd: "",
        newPwd: ""
      };
    },
    methods: {
      checkFrom() {
        if (this.originalPwd == '') toast("请输入原密码");
        else if (this.newPwd == '') toast("请输入新密码");
        else if (this.newPwd == this.originalPwd) toast("新密码不能和旧密码相同");
        else {
          return true;
        }
      },
      submit() {
        if (!this.checkFrom()) return;
        modifyWithdrawPwd({
          originalPwd: md5(md5(this.originalPwd)),
          newPwd: md5(md5(this.newPwd))
        }).then(data => {
          if (data.success) {
            this.originalPwd = this.newPwd = '';
            toast("修改成功");
          } else {
            toast(data.message);
          }
        }).catch(err => {
          toast("修改失败,请重新尝试");
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

  .pay-update {
    @include f(32px);
    padding: r(30) r(30) 0;
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
