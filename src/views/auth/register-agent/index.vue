<template>
  <div class="layout_form layout_form03">
    <div class="form_field_warp">
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_user"></span></span>
        <div class="form_field_input"><input type="text" placeholder="账号(以a_(下划线)开头，3-15个数字或字母)" id="agent-account"></div>
      </div>
      <div class="form_field with_icon_label form_field_password with_right_label">
        <span class="form_field_label"><span class="icon icon_password"></span></span>
        <div class="form_field_input"><input type="password" placeholder="密&nbsp;&nbsp;&nbsp;码(6-16位数字或字母）" id="agent-password"></div>
        <span class="right_label"></span>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_user_file"></span></span>
        <div class="form_field_input"><input type="text" placeholder="姓名(须与银行账户姓名相同，否则无法提款)" id="agent-name"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_website"></span></span>
        <div class="form_field_input"><input type="text" placeholder="加盟网址(1-6个数字或字母,作为您的标识)" id="agent-url"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_email"></span></span>
        <div class="form_field_input"><input type="text" placeholder="电子邮箱(加盟负责人及时联系您)" id="agent-email"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_mobile"></span></span>
        <div class="form_field_input"><input type="text" placeholder="联系电话(加盟负责人及时联系您)" id="agent-phone"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_qq"></span></span>
        <div class="form_field_input"><input type="text" placeholder="QQ/SKYPE(方便与我们取得联系)" id="agent-qq"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_wechat"></span></span>
        <div class="form_field_input"><input type="text" placeholder="微信(通过微信方便与我们取得联系)" id="agent-wechat"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_mobile"></span></span>
        <div class="form_field_input"><input type="text" placeholder="推荐码" id="agent-partner"></div>
      </div>
      <div class="form_field with_icon_label with_right_label form_field_cap_code">
        <span class="form_field_label"><span class="icon icon_cap_code"></span></span>
        <div class="form_field_input"><input type="text" placeholder="请输入验证码" id="agent-code" maxlength="4"></div>
        <span class="right_label"><img width="100" height="33" id="agent-image" src="/mobi/mobileValidateCode.php?0.46006110522979393"></span>
      </div>
    </div>
    <div class="btn_wrap">
      <a href="javascript:void(0)" class="btn btn01" id="agent-submit">注册</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
