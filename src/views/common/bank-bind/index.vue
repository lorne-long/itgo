<template>
  <div class="add-bank-card ">
    <div class="form-box">
      <div class="form-group">
        <span class="form-label">银行卡号</span>
        <div class="form-control">
          <input v-model="bankno" type="text" placeholder="输入卡号后，系统智能识别银行"
                 maxlength="19" @input="getBank"></div>
      </div>
    </div>
    <div class="card-tip">
      {{banktxt}}
    </div>
    <div class="btn-search" @click="submit">保存
    </div>
  </div>
</template>
<script>
  import {validateBankNo, bindBankNo} from "api/payment";

  export default {
    data() {
      return {
        bankno: "",
        banktxt: "",
        validateBankNo: false
      };
    },
    methods: {
      getBank() {
        if (/^(\d{16}|\d{19})$/.test(this.bankno)) {
          validateBankNo({bankno: this.bankno}).then(data => {
            this.validateBankNo = data.success;
            if (data.success) this.banktxt = data.data;
          })
        } else {
          this.banktxt = "";
        }
      },
      submit() {
        if (this.bankno == "") return toast("请输入正确的银行卡");
        if (!this.validateBankNo) return toast("银行卡校验未通过");
        bindBankNo({cardNo: this.bankno}).then(data => {
          if (data.success) {
            this.bankno = "";
            this.$router.back();
          } else {
            toast(data.message);
          }
        }).catch(err => {
          toast("操作失败");
        })
      }
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .add-bank-card {
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


    .card-tip{
      line-height:1.3;
      text-align: center;
      color:$cl3;
    }
  }
</style>
