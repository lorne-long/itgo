<template>
  <div class="add-bank-card ">
    <div class="form-box">
      <input-inline label="银行卡号">
        <input v-model="bankno" type="text" placeholder="输入卡号后，系统智能识别银行" maxlength="19" @input="getBank">
      </input-inline>
    </div>
    <div class="card-tip">
      {{banktxt}}
    </div>
    <v-button @click="submit">保存</v-button>
  </div>
</template>
<script>
  import {validateBankNo, bindBankNo} from "api/payment";
  import vButton from "components/form/button"
  import inputInline from "components/form/input-inline"

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
    },
    components: {
      inputInline, vButton
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .add-bank-card {
    @include f(32px);
    padding: r(30) r(30) 0;
    .card-tip {
      line-height: 1.3;
      text-align: center;
      color: $cl3;
    }
  }
</style>
