<template>
  <div class="birthday-gold">
    <div class="from-date">距您的生日 <span>{{userData.birthday | Date('MM月dd日')}}</span>还有</div>
    <div class="from-day txt-center">
      <strong>{{days}} </strong>天
    </div>
    <v-button @click="submit" :className="!isSubmit?'btn-disable':''">
      领取礼金
    </v-button>
    <div  :class="['btn-submit',{}]"></div>
    <form-tip>
      <p class="c-red">温馨提示：</p>
      1.请您先前往个人资料账户设置中完善生日信息，才能享受该优惠。 <br>
      2.您完善资料后，达到生日礼金的要求，即可自助申请生日礼金。 <br>
      3.当您成功申请生日礼金后，系统将会将礼金派发至您的副账户。
    </form-tip>
  </div>
</template>

<script>
  import {canClaimBirthdayCoupon, claimBirthdayCoupon} from "api/preferential-terms"
  import formTip from "components/form-tip"
  import vButton from "components/form/button"
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        message: "设置生日信息",
        isSubmit: false
      };
    },
    computed: {
      days() {
        let matchs = this.message.match(/\d+/);
        return matchs ? matchs[0] : '';
      },
      ...mapGetters(["userData"])
    },
    methods: {
      submit() {
        if (!this.isSubmit) return;
        claimBirthdayCoupon().then(data => {
          toast(data.message)
        });
      }
    },
    created() {
      canClaimBirthdayCoupon().then(data => {
        if (data.success) {
          this.isSubmit = data.success;
          this.message = "领取礼金"
        } else {
          this.message = data.message;
        }
      })
    },

    components: {
      formTip,vButton
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .birthday-gold {
    padding: r(30);
    @include f(28px);
    .from-date {
      text-align: center;
      color: $cl4;
      span {
        color: #000;
      }
    }
    .from-day {
      text-align: center;
      margin: r(10) 0 r(26);
      color: $cl3;
      strong {
        @include f(60px);
      }
    }

  }
</style>
