<template>
  <div class="discount-code">
    <v-input select="1">
      <select v-model="couponType" id="couponType">
        <option value=""> 请选择 </option>
        <option v-for="item in platformData" :value="item.value">
          {{item.name}}
        </option>
      </select>
    </v-input>
    <v-input>
      <input type="text" v-model.number="couponRemit" placeholder="请填写转入金额" name="couponRemit" maxlength="10">
      <span class="right-info">元</span>
    </v-input>
    <v-input>
      <input type="text" v-model="couponCode" id="couponCode" maxlength="20"   placeholder="优惠代码">
    </v-input>
    <v-button @click="submit">确定转入</v-button>
    <form-tip>
      <p class="c-red">温馨提示：</p>
      <p>1.不限平台使用。</p>
      <p>2.红利金额会自动添加到您转到的游戏平台里。</p>
      <p>3.优惠券代码会以站内信形式发送给您。</p>
    </form-tip>
  </div>
</template>
<script>
  import {transferInforCoupon} from "api/preferential-terms"
  import formTip from "components/form-tip"
  import {platformData} from "@/assets/data"
  import vInput from "components/form"
  import vButton from "components/form/button"
  export default {
    data() {
      return {
        platformData,
        couponType: "", // true string
        couponRemit: "", //true string
        couponCode: "",//true string
      };
    },
    props: {},
    computed: {},
    methods: {
      check() {
        if (this.couponRemit == '') toast('请输入转入金额');
        else if (this.couponType == '') toast('请选择游戏平台');
        else if (this.couponCode == '') toast('请输入优惠代码');
        else {
          return true;
        }
      },
      submit() {
        if (!this.check()) return;
        console.log(this.$data)
        transferInforCoupon(this.$data).then((data) => {
          if (data.success) {
            this.couponCode = '';
          }
          toast(data.message);
        }).catch(() => {
          toast('请重新尝试');
        })
      }
    },
    created() {
    },
    components: {
      formTip,vInput,vButton
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .discount-code {
    padding: r(30);



  }

</style>
