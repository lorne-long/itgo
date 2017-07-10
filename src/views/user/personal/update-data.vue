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
              <input v-model="newDetail.weixin" :placeholder="detail.weixin|conceal(2,2)"  type="text">
              <span @click="upData('weixin')" class="edit">修改</span></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">qq</span>
            <div class="form_field_input">
              <input v-model.number="newDetail.qq" :placeholder="detail.qq|conceal(2,2)" type="text">
              <span @click="upData('qq')" class="edit">修改</span></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">电子邮箱</span>
            <div class="form_field_input">
              <input v-model="newDetail.email" :readonly="detail.email!=''"
                     :placeholder="detail.email|conceal(0,detail.email.length-detail.email.indexOf('@'))"
                     type="text">
              <span @click="upData('email')" v-show="detail.email==''" class="edit ">修改</span></div>
          </div>
        </div>
        <div v-if="userData.phoneValidStatus==0">
          <br>
          <a href="javascript:void(0);" class="btn btn01" @click="verify=true">手机验证</a>
          <br>
            <v-verify v-model="verify"></v-verify>
        </div>
      </div>
    </div>
    <bank-list></bank-list>
  </div>
</template>
<script>
  import {modifyCustomerSocialInfo, getCustomerSocialInfo,endSms4TYJ,checkPhoneCode} from 'api/user';
  import { mapGetters } from 'vuex'
  import vVerify from './components/verify'
  import  bankList from 'components/bank-list/index'

  export default {
    data() {
      return {
        newDetail: {
          qq: "",
          weixin: "",
          email:''
        },
        detail: {
          qq: "",
          weixin: "",
          email:''
        },
        verify:false
      };
    },
    watch:{
    },
    methods: {
      upData(type){
          if(this.newDetail[type]=="")
            return  toast("请填写要修改的数据");
        modifyCustomerSocialInfo({[type]: this.newDetail[type]}).then(data => {
          if(data.success){
              this.detail[type]= this.newDetail[type];
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
      getCustomerSocialInfo().then(res => {
        if (res.success) {
          this.detail = res.data;
        } else {
          toast(data.message)
        }
      })
    },
    components: {
      vVerify,bankList
    }
  };
</script>
