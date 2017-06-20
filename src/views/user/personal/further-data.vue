<template>
    <div class="page_content_wrap no_padding user_profile_content">
      <div class="page_content_tip">完善资料后就可以领取体验金啦！</div>
      <div class="layout_form sec_box">
        <div class="form_field_warp">
          <div class="form_field">
            <span class="form_field_label">真实姓名{{userData.accountName}}</span>
            <div class="form_field_input"><input  v-model="Data.accountName" type="text" placeholder="填写后无法修改，与银行卡持卡人一致" class="j-accountName">
            </div>
          </div>
          <div class="form_field">
            <span class="form_field_label">手机号码</span>
            <div class="form_field_input"><input type="text" :value="userData.phone" readonly></div>
          </div>
          <div class="form_field date_picker with_arrow_icon">
            <span class="form_field_label">出生日期</span>
            <div class="form_field_input">
              <input class="date_picker_real" v-model="Data.birthday" type="date"  placeholder="请选择">
            </div>
          </div>
          <div class="form_field">
            <span class="form_field_label">银行卡号</span>
            <div class="form_field_input">
              <input type="text"  v-model.number="Data.bankno" placeholder="输入卡号后，系统智能识别银行"
                     @input="getBank" maxlength="19"></div>
          </div>
          <div class="cardTips">{{banktxt}}</div>
        </div>
        <div class="form_tip text_align_left">
          请注意，检测如有同ip同姓名，或银行卡已被使用时，将
          无法领取体验金，感谢您的理解。
        </div>
      </div>
      <div class="btn_wrap"><a href="javascript:void(0);" @click="submit" class="btn btn01">保存</a></div>
    </div>
</template>
<script>
  import {completeUserInfo} from "api/user"
  import {validateBankNo} from "api/safeCenter"
  import { mapGetters } from 'vuex'
  export default {
    name: 'hello',
    data () {
      return {
        banktxt: "",
        validateBankNo: false,
        Data: {
          birthday: "", //true string
          accountName: "", //true string
          bankno: "", //true string
          email: "", //true string
          qq: ""
        }
      }
    },
    methods: {
      checked(){
        if (this.Data.birthday == "") toast("请输入生日");
        else if (this.Data.accountName == "") toast("请输入生日");
        else if (this.Data.bankno == "") toast("请输入银行卡号");
        else if (!this.validateBankNo) toast("银行卡号检测未通过");
//        else if (this.Data.email == "") toast("请输入邮箱");
//        else if (this.Data.qq == "") toast("请输入QQ");
        else {
          return true;
        }
      },
      getBank(){
        if (/^(\d{16}|\d{19})$/.test(this.Data.bankno)) {
          validateBankNo({bankno: this.Data.bankno}).then(data => {
            if(data.success){
                this.banktxt = data.data;
                this.validateBankNo = data.success;
            }
          })
        } else {
          this.banktxt = "";
        }
      },
      submit(){
        if (!this.checked())return;
        completeUserInfo(this.Data).then(data => {
          if (data.success) {
              this.$store.dispatch("UPDATE_USERDATA");
          } else {
            toast(data.message)
          }
        }).catch(err=>{
          toast("请稍后重试");
        })
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
  }
</script>
