<template>
  <div>
    <div class="page_content_wrap user_profile_content">
      <div class="layout_form layout_form_readonly sec_box">
        <div class="form_field_warp">
          <div class="form_field">
            <span class="form_field_label">真实姓名</span>
            <div class="form_field_input"><input :value="userData.accountName" readonly="" type="text"></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">手机号码</span>
            <div class="form_field_input"><input :value="userData.phone" readonly="" type="text"></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">出生日期</span>
            <div class="form_field_input"><input :value="userData.birthday|Date" readonly type="text"></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">微信</span>
            <div class="form_field_input">
              <input v-model="newDetail.weixin" :placeholder="oldDetail.weixin|conceal(2,2)"  type="text">
              <span @click="upData('weixin')" class="edit">修改</span></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">qq</span>
            <div class="form_field_input">
              <input v-model.number="newDetail.qq" :placeholder="oldDetail.qq|conceal(2,2)" type="text">
              <span @click="upData('qq')" class="edit">修改</span></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">电子邮箱</span>
            <div class="form_field_input">
              <input v-model="newDetail.email" :readonly="oldDetail.email!=''"
                     :placeholder="oldDetail.email|conceal(0,oldDetail.email.length-oldDetail.email.indexOf('@'))"
                     type="text">
              <span @click="upData('email')" v-show="oldDetail.email==''" class="edit ">修改</span></div>
          </div>
        </div>
        <v-verify  v-if="userData.phoneValidStatus==0"></v-verify>
      </div>
    </div>
    <bank-list></bank-list>
  </div>
</template>
<script>
  import {modifyCustomerSocialInfo} from 'api/user';
  import { mapGetters } from 'vuex'
  import vVerify from './verify'
  import  bankList from 'components/bank-list/index'

  export default {
    data() {
      return {
        newDetail: {
          qq: "",
          weixin: "",
          email:''
        },
        oldDetail: {
          qq: "",
          weixin: "",
          email:''
        }
      };
    },
    methods: {
      upData(type){
          if(this.newDetail[type]=="")
            return  toast("请填写要修改的数据");
        modifyCustomerSocialInfo({[type]: this.newDetail[type]}).then(data => {
          if(data.success){
              this.oldDetail[type]= this.newDetail[type];
              this.newDetail[type]="";
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
    activated(){
      let {qq,weixin,email}=this.userData;
      Object.assign(this.oldDetail,{qq,weixin,email});
    },
    components: {
      vVerify,bankList
    }
  };
</script>
