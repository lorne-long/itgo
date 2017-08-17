<template>
  <div class="verify-code">
    <div class="btn-search" @click="step=2">手机验证</div>
    <div class="flex form-code" v-show="step==2">
      <div class="flex-2"><img src="~static/images/icons/icon_send_message.png"></div>
      <div class="flex-3 ">
        <p>点击获取验证码，系统将向您的注册手机号发送一个验证码</p>
        <div class="form-box">
          <input-inline label="验证码:">
            <input type="text" v-model="code" placeholder="请输入验证码" maxlength="6">
          </input-inline>
        </div>
        <div class="btn-getcode" @click="showVerify=true">获取验证码</div>
      </div>
    </div>
    <v-touclick v-model="showVerify" @success="success"></v-touclick>
    <v-button  @click="verify">验证</v-button>
  </div>
</template>
<script>
  import vButton from "components/form/button"
  import inputInline from "components/form/input-inline"
  import {sendSms4TYJ, checkPhoneCode} from 'api/user';
  import {mapGetters} from 'vuex'
  import vTouclick from 'components/touclick'

  export default {
    data() {
      return {
        code: "",
        showVerify: false,
        step: 1,
        myData: {
          sid: "",//true string
          check_address: "", //true string
          check_key: "", //true string
        }
      };
    },
    props: {
      value: Boolean
    },
    methods: {
      success(obj, tc) {
        tc.destory();
        this.showVerify = false;
        this.myData.check_key = obj.token;
        this.myData.check_address = obj.checkAddress;
        this.myData.sid = obj.sid;
        sendSms4TYJ(this.myData).then(res => {
          toast(res.message);
          if (res.success) {
          }
        }).catch(err => {
          toast("发送失败")
        });
      },
      verify() {
        if (this.code == "") return toast("请填写验证码");
        checkPhoneCode({code: this.code}).then(res => {
          toast(res.message)
          if (res.success) {
            this.$emit("input", false)
          }
        }).catch(err => {
          toast("验证失败");
        })
      }
    },
    components: {
      vTouclick,vButton,inputInline
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .verify-code {
    padding: r(30);
    margin-top: 1em;
    .flex-2 {
      align-self: center;
      text-align: center;
      img{
        width: 80%;
      }
    }
    .form-code{
      margin-top: 1em;
      line-height:1.4;
    }
    .btn-getcode {
      background: #fff;
      border-radius: r(10);
      text-align: center;
      display: inline-block;
      color: $btn-bg1;
      line-height: r(68);
      width: 60%;
      border: r(2) solid $btn-bg1;
    }
  }
</style>
