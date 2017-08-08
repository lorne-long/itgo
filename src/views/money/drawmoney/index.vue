<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap withdraw_content_wrap">
      <div v-show="step<=1">
        <div class="sec_box main_account_sec ">
          <h3>主账户</h3>
          <p><span class="money_text">{{userData.accountMoney}}</span> 元</p>
        </div>
        <div class="layout_form layout_form04">
          <div class="form_field_warp">
            <div class="form_field with_right_label">
              <span class="form_field_label">金额</span>
              <div class="form_field_input"><input type="text" v-model.number="sumitData.amount" placeholder="最少100元">
              </div>
              <span class="right_label">元</span>
            </div>
            <div class="form_field bank_card_select">
              <span class="form_field_label">取款至</span>
              <span class="icon icon_logo_bank icon_logo_02"></span><!-- 不同银行卡的样式 icon_logo_01 icon_logo_02 -->
              <div class="form_field_input">
                <select v-model="sumitData.id" ref="carddom">
                  <option value="">请选择银行卡</option>
                  <option v-for="(item,i) in bankList" :value="item.id">{{item.bankname}}（尾号{{item.bankno}}）</option>
                </select>
              </div>
            </div>
          </div>
          <div class="btn_wrap">
            <a href="javascript:void(0);" @click="showPay" class="btn btn01">提交</a>
          </div>
        </div>
        <div class="bottom_link">
          <router-link to="/datum/addbank">添加银行卡？</router-link>
        </div>
      </div>
      <div class="dialog_wrap dialog_with_title" v-show="step==1">
        <div class="dialog_main">
          <div class="title_wrap">请输入支付密码</div>
          <div class="dialog_content">
            <div class="layout_form layout_form_dialog">
              <div class="form_field_warp">
                <div class="form_field">
                  <span class="form_field_label">银行</span>
                  <div class="form_field_input">
                    {{bankText}}
                  </div>
                </div>
                <div class="form_field no_border">
                  <span class="form_field_label">金额</span>
                  <div class="form_field_input"><span class="money_text">{{sumitData.amount}}</span></div>
                </div>
                <div class="form_field with_icon_label form_field_password with_right_label">
                  <div class="form_field_input"><input v-model="sumitData.password" type="password"
                                                       placeholder="支付密码是由6位纯数字组成的" maxlength="6" class="j-payPassword">
                  </div>
                  <span class="right_label"></span>
                </div>
              </div>
              <div class="btn_wrap">
                <a href="javascript:void(0);" @click="submit" class="btn btn01">确定</a>
                <a href="javascript:void(0);" @click="step=0" class="btn btn02 mt10">取消</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page_content_wrap" v-show="step==2">
        <div class="layout_operation_result normal_padding">
          <div class="sec_box">
            <img class="icon_top" src="static/images/icons/icon_ok.png" width="78" height="79">
            <h3>取款申请成功</h3>
            <p class="result_text">金额 <span>{{sumitData.amount}}</span></p>
            <div class="space_border"></div>
            <p class="info_text">工作人员正在为您处理，如果您的各项资料正确，
              取款金额会在1小时内到达您的绑定银行账户。</p>
          </div>
          <div class="btn_wrap no_padding">
            <router-link to="/user/history" class="btn btn01">查看取款记录</router-link>
          </div>
        </div>
      </div>
      <div class="dialog_wrap dialog_with_icon" v-show="!isSetPayPwd&&showSetPay">
        <div class="dialog_main">
          <div class="icon_wrap"><img src="static/images/icons/icon_warn.png" width="79" height="79"></div>
          <div class="dialog_content">
            <p>您还没有设置支付密码，<br>
              <span class="text_black02">请先完成支付密码设置。</span></p>
          </div>
          <div class="btn_wrap">
            <router-link to="/pwd/payset" class="btn btn01 btn_ok">确定</router-link>
            <a href="javascript:void(0)" class="btn btn02  mt10" @click="showSetPay=false">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from "MD5";
  import {findUserBankList, thirdWithdraw} from "api/safeCenter";
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        step: 0,
        bankList: [],
        bankText: "",
        showSetPay: true,
        sumitData: {
          amount: "",
          id: "",
          password: "",
          tkType: ""// false string 若是代理提款，必填输入代理提款类型，提款类型，slotmachine-老虎机，liveall-其他部分
        }
      };
    },
    watch: {
      "sumitData.id"() {
        this.bankText = this.$refs.carddom.options[this.$refs.carddom.options.selectedIndex].text;
      }
    },
    methods: {
      checkForm() {
        if (this.sumitData.amount == "") toast("请输入取款金额!");
        else if (this.sumitData.amount < 100) toast("最少取款100元!");
        else if (this.sumitData.amount > this.userData.accountMoney) toast("余额不足!");
        else if (this.sumitData.id == "") toast("请选银行卡!");
        else {
          return true;
        }
      },
      showPay(val) {
        if (!this.checkForm()) {
          return;
        }
        this.step = 1;
      },
      submit() {
        if (!this.checkForm()) return;
        if (this.sumitData.password == "") return toast("请输入支付密码!");
        this.sumitData.tkType = this.isAgent ? "slotmachine" : "";
        this.sumitData.password = md5(md5(this.sumitData.password))
        thirdWithdraw(this.sumitData).then(data => {
          this.sumitData.password = '';
          if (data.success) {
            this.step = 2;
          }
          toast(data.message);
        }).catch((err) => {
          toast("取款失败,请稍后重新尝试!")
        })
      }
    },
    computed: {
      ...mapGetters(["userData", "isSetPayPwd", "isAgent", "isUser"])
    },
    created() {
      findUserBankList().then((res) => {
        if (res.success) {
          if (res.result.length > 0) {
            this.bankList = res.result;
          } else {
//          this.$router.replace("/datum/addbank")
          }
        }
        else {
          toast("获取银行卡失败")
        }
      }).catch((err) => {
        toast("获取银行卡失败")
      })
    }
  };
</script>
<style>
</style>
