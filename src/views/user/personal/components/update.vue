<template>
  <div class="user-personal-updata">
    <input-inline label="真实姓名">
      <input :value="userData.accountName" readonly="" type="text">
    </input-inline>
    <input-inline label="手机号码">
      <input :value="userData.phone" readonly="" type="text">
    </input-inline>
    <input-inline label="出生日期">
      <input :value="userData.birthday|Date" readonly type="text">
    </input-inline>
    <input-inline label="微信">
      <input v-model="newDetail.weixin" :placeholder="oldDetail.weixin|conceal(2,2)" type="text">
      <span @click="upData('weixin')" class="right-info">修改</span>
    </input-inline>
    <input-inline label="QQ">
      <input v-model.number="newDetail.qq" :placeholder="oldDetail.qq|conceal(2,2)" type="text">
      <span @click="upData('qq')" class="right-info">修改</span>
    </input-inline>
    <input-inline label="电子邮箱">
      <input v-model="newDetail.email" :readonly="oldDetail.email!=''"
             :placeholder="oldDetail.email|conceal(0,oldDetail.email.length-oldDetail.email.indexOf('@'))"
             type="text">
      <span @click="upData('email')" v-show="oldDetail.email==''" class="right-info ">修改</span>
    </input-inline>
    <!--<div class="btn-search">-->
    <!--修改-->
    <!--</div>-->
    <!--<div class="btn-search">-->
    <!--手机验证-->
    <!--</div>-->

    <v-verify v-show="userData.phoneValidStatus==0"></v-verify>
    <bank-list></bank-list>
  </div>
</template>
<script>
  import {modifyCustomerSocialInfo} from 'api/user';
  import inputInline from "components/form/input-inline";
  import {mapGetters} from 'vuex'
  import vVerify from './verify'
  import bankList from 'components/bank-list/index'

  export default {
    data() {
      return {
        newDetail: {
          qq: "",
          weixin: "",
          email: ''
        },
        oldDetail: {
          qq: "",
          weixin: "",
          email: ''
        }
      };
    },
    methods: {
      upData(type) {
        if (this.newDetail[type] == "")
          return toast("请填写要修改的数据");
        modifyCustomerSocialInfo({[type]: this.newDetail[type]}).then(data => {
          if (data.success) {
            this.oldDetail[type] = this.newDetail[type];
            this.newDetail[type] = "";
          }
          toast(data.message);
        }).catch(err => {
          toast("加载失败")
        })
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    activated() {
      let {qq, weixin, email} = this.userData;
      Object.assign(this.oldDetail, {qq, weixin, email});
    },
    components: {
      vVerify, bankList, inputInline
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .user-personal-updata {
      padding: r(30);
  }
</style>
