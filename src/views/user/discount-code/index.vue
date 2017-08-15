<template>
  <div class="discount-code">

    <div class="form-control">
      <select v-model="couponType" id="couponType">
        <option value=""> 请选择 </option>
        <option v-for="item in platformData" :value="item.value">
          {{item.name}}
        </option>
      </select>
      <i class="right-info iconfont icon-arrow_d"></i>
    </div>
    <div class="form-control">
      <input type="text" v-model.number="couponRemit" placeholder="请填写转入金额" name="couponRemit" maxlength="10">
      <span class="right-info">元</span>
    </div>
    <div class="form-control">
      <input type="text" v-model="couponCode" id="couponCode" maxlength="20"   placeholder="优惠代码">
    </div>
    <div @click="submit" class="btn-submit">确定转入</div>
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
  import formTip from "components/form-tip.vue"
  import {platformData} from "@/assets/data"

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
      formTip
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .discount-code {
    padding: r(30);
    .form-control {
      position: relative;
      height: r(84);
      line-height: r(84);
      overflow: hidden;
      border: r(2) solid #ccc;
      padding: 0 r(24);
      border-radius: 50em;
      margin-bottom: r(32);
      background: #fff;
      @include f(28px);
      select, input {
        font-size: inherit;
        border: none;
        color: #333;
        outline: none;
        height: 100%;
        width: 100%;
        vertical-align: top;
        text-indent: 0.5em;
      }
      .right-info {
        position: absolute;
        height: 100%;
        top: 0;
        right: r(32);

      }
    }

    .btn-submit {
      display: block;
      margin: 0 auto;
      background: $btn-bg1;
      text-align: center;
      @include f(36px);
      color: #fff;
      width: 90%;
      border-radius: r(100);
      line-height: r(88);
    }

  }

</style>
