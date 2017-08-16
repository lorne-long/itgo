<template>
  <div class="user-perfect">
    <div class="page_content_tip">完善资料后就可以领取体验金啦！</div>
    <div class="layout_form sec_box">
      <div class="form-box">
        <div class="form-group">
          <span class="fl form-label">真实姓名</span>
          <div class="form-control"><input v-model="Data.accountName" type="text" placeholder="填写后无法修改，与银行卡持卡人一致"/>
          </div>
        </div>
        <div class="form-group">
          <span class="fl form-label">手机号码</span>
          <div class="form-control">
            <input type="text" v-model="userData.phone" readonly>
          </div>
        </div>
        <div class="form-group date_picker with_arrow_icon">
          <span class="fl form-label">出生日期</span>
          <div class="form-control">
            <input type="date" v-model="Data.birthday" placeholder="请选择"/>
          </div>
        </div>
        <div class="form-group">
          <span class="fl form-label">银行卡号</span>
          <div class="form-control">
            <input type="text" v-model="Data.bankno" placeholder="输入卡号后，系统智能识别银行"
                   @input="getBank" maxlength="19"></div>
        </div>
        <div class="cardTips">{{banktxt}}</div>
        <div class="form-group">
          <span class="fl form-label">微信</span>
          <div class="form-control">
            <input type="text" placeholder="用于接收优惠信息，非必填项"
                   v-model="Data.wexin"
            >
          </div>
        </div>
        <div class="form-group">
          <span class="fl form-label">qq</span>
          <div class="form-control"><input type="text" placeholder="用于接收优惠信息，非必填项" v-model="Data.qq"></div>
        </div>
        <div class="form-group">
          <span class="fl form-label">电子邮箱</span>
          <div class="form-control"><input type="text" placeholder="用于接收优惠信息，非必填项" v-model="Data.email"></div>
        </div>
      </div>
      <div class="form_tip text_align_left">
        请注意，检测如有同ip同姓名，或银行卡已被使用时，将
        无法领取体验金，感谢您的理解。
      </div>
    </div>
    <div @click="submit" class="btn-search"> 保存</div>
  </div>
</template>
<script>
  import {completeUserInfo} from "api/user"
  import {validateBankNo} from "api/payment"
  import {mapGetters} from 'vuex'

  export default {
    name: 'hello',
    data() {
      return {
        banktxt: "",
        validateBankNo: false,
        Data: {
          birthday: "", //true string
          accountName: "", //true string
          bankno: "", //true string
          email: "", //true string
          qq: "",
          wexin: ""
        }
      }
    },
    methods: {
      checked() {
        if (this.Data.birthday == "") toast("请输入生日");
        else if (this.Data.accountName == "") toast("请输入真实姓名");
        else if (!/^[\u4e00-\u9fa5]$/.test(this.Data.accountName)) toast("请输入中文姓名");
        else if (this.Data.bankno == "") toast("请输入银行卡号");
        else if (!this.validateBankNo) toast("银行卡号检测未通过");
        else if (this.Data.email != "" && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.Data.email)) {
          toast("请输入正确的邮箱")
        }
        else {
          return true;
        }
      },
      getBank() {
        if (/^(\d{16}|\d{19})$/.test(this.Data.bankno)) {
          validateBankNo({bankno: this.Data.bankno}).then(data => {
            if (data.success) {
              this.banktxt = data.data;
              this.validateBankNo = data.success;
            }
          })
        } else {
          this.banktxt = "";
        }
      },
      submit() {
        if (!this.checked()) return;
        completeUserInfo(this.Data).then(data => {
          if (data.success) {
            this.$store.dispatch("UPDATE_USERDATA");
          } else {
            toast(data.message)
          }
        }).catch(err => {
          toast("请稍后重试");
        })
      }
    },
    computed: {
      ...mapGetters(["userData"])
    }
  }
</script>
