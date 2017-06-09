<template>
  <div class="flex_1">
    <div class="page_content_wrap user_profile_content">
      <div class="layout_form layout_form_readonly sec_box">
        <div class="form_field_warp">
          <div class="form_field">
            <span class="form_field_label">真实姓名</span>
            <div class="form_field_input"><input value="{{userData.loginname}}" readonly="" type="text"></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">手机号码</span>
            <div class="form_field_input"><input value="{{userData.phone}}" readonly="" type="text"></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">出生日期</span>
            <div class="form_field_input"><input value="{{userData.phone}}" readonly="" type="text"></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">微信</span>
            <div class="form_field_input"><input value="" class="j-weixinI" placeholder="*54" type="text"><input
              value="254" class="j-weixinI2" type="hidden"><span class="edit j-edit" data-type="weixin">修改</span></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">qq</span>
            <div class="form_field_input"><input value="" class="j-qqI" placeholder="******12" type="text"><input
              value="12121212"  class="j-qqI2" type="hidden"><span class="edit j-edit" data-type="qq">修改</span></div>
          </div>
          <div class="form_field">
            <span class="form_field_label">电子邮箱</span>
            <div class="form_field_input"><input value="" class="j-emailI" readonly="readonly" placeholder="填写电子邮箱"
                                                 type="text"><span class="edit j-edit j-emailIedit hidden"
                                                                   data-type="email">修改</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="page_content_wrap user_profile_content">
      <div class="sec_box bank_card_list normal_padding box_border_box j-bankCardList">
        <h2>银行卡资料</h2>
        <div class="bank_card_item bankImg13">
          <div class="bank_card_info"><h3>招商银行</h3><img class="space" src="/mobile/images/bg/bg06.png">
            <p class="bank_card_num">**** **** **** 8521</p>
            <p class="bank_name">离*</p></div>
        </div>
        <div class="bank_card_item bankImg11">
          <div class="bank_card_info"><h3>齐商银行</h3><img class="space" src="/mobile/images/bg/bg06.png">
            <p class="bank_card_num">**** **** **** 9945</p>
            <p class="bank_name">离*</p></div>
        </div>
        <div class="bank_card_item bankImg11">
          <div class="bank_card_info"><h3>农业银行</h3><img class="space" src="/mobile/images/bg/bg06.png">
            <p class="bank_card_num">**** **** **** 0018</p>
            <p class="bank_name">离*</p></div>
        </div>
      </div>
    </div>
    <div class="btn_wrap mt10"><a href="javascript:void(0);" class="btn btn01 btn_logout j-exit">安全退出</a></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props:{},
    methods:{},
    computed:{
      userData(){
        return this.$store.state.userData;
      }
    },
    created(){
    },
    components:{}
  };
</script>
<style>
</style>
