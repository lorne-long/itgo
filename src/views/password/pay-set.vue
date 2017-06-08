<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap">
      <div class="layout_form layout_form04">
        <div class="form_field_warp">
          <div class="form_field form_field_password">
            <span class="form_field_label">原密码</span>
            <div class="form_field_input"><input type="password" class="j-password" maxlength="6"></div>
          </div>
          <div class="form_field with_right_label form_field_password">
            <span class="form_field_label">新密码</span>
            <div class="form_field_input"><input type="password" placeholder="6位数字" class="j-newpassword" maxlength="6"></div>
            <span class="right_label"></span>
          </div>
        </div>
        <div class="btn_wrap">
          <a href="javascript:void(0);" class="btn btn01 j-submit">确定</a>
        </div>
      </div>
    </div>
    <div class="dialog_wrap dialog_with_icon j-tips">
      <div class="dialog_main">
        <div class="icon_wrap"><img src="/mobile/images/icons/icon_warn.png" width="79" height="79"></div>
        <div class="dialog_content">
          <p>您还没有设置支付密码，<br>
            <span class="text_black02">请先完成支付密码设置。</span></p>
        </div>
        <div class="btn_wrap">
          <a href="/mobile/setPayPassword.jsp" class="btn btn01 btn_ok">确定</a>
          <a href="javascript:void(0)" class="btn btn02 j-cancel mt10">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props:{},
        methods:{},
        computed:{},
        created(){
          this.$emit("setHeader","修改支付密码");
        },
        components:{}
    };
</script>
<style>
</style>
