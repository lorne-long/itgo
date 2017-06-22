<template>
  <div>
    <div class="layout_form layout_form03">
      <div class="form_field_warp">
        <div class="form_field with_icon_label">
          <span class="form_field_label"><span class="icon icon_user"></span></span>
          <div class="form_field_input"><input v-model="data.account" type="text" placeholder="用户名(6-10位数字和字母)"></div>
        </div>
        <div class="form_field with_icon_label form_field_password with_right_label">
          <span class="form_field_label"><span class="icon icon_password"></span></span>
          <div class="form_field_input"><input v-model="data.password" type="password"
                                               placeholder="密码(6-16位数字和字母）"
                                               maxlength="16"></div>
          <span class="right_label"></span>
        </div>
        <div class="form_field with_icon_label">
          <span class="form_field_label"><span class="icon icon_phone"></span></span>
          <div class="form_field_input"><input v-model.number="data.phone" type="text" placeholder="取款唯一凭证，请正确填写手机号"
                                               ></div>
        </div>
        <div class="form_field with_icon_label with_right_label form_field_cap_code">
          <span class="form_field_label"><span class="icon icon_cap_code"></span></span>
          <div class="form_field_input"><input type="text" v-model.number="data.imageCode" placeholder="请输入验证码" maxlength="4"></div>
          <span class="right_label"><img width="100" height="33"
                                         :src="authImg" @click="getimg"/></span>
        </div>
      </div>
      <div class="btn_wrap">
        <a href="javascript:void(0);" class="btn btn01" @click="register">立即开户</a>
      </div>
    </div>
    <div class="other_link_wrap">
      <router-link to="/login/agentLogin" class="agent-into">
        <i class="iconfont icon-account"></i>
        代理入口
      </router-link>
    </div>
  </div>
</template>
<script>
  import {getAuthImg,register} from 'api/authService';
  export default{
    data() {
      return {
        authImg:getAuthImg(),
        data:{
          aliasName:"", //true string
          phone:"", //true string
          confirmPassword:"",// true string
          email:"", //true string
          name:"", //true string
          account:"", //true string
          birthDate:"", //true string
          imageCode:"", //true string
          password:"", //true string
          qq:"", //true string
          intro:""
        }
      }
    },
    methods:{
      checked(){
        let _RegExp=/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
        let _phone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
        if(!_RegExp.test(this.data.account))toast("用户名(6-10位数字和字母)");
        else if(!_RegExp.test(this.data.password))toast("密码(6-10位数字和字母)");
        else if(!_phone.test(this.data.phone))toast("手机号格式不正确");
        else if(this.data.imageCode=="")toast("请输入验证码");
        else{
          return true;
        }
      },
      register(){
        if(!this.checked())return;
        register(this.data).then((res)=>{
          this.getimg()
            if(res.success){
              this.$router.replace("/login/registersuccess");
            }else{
              toast(res.message);
             }
        }).catch(err=>{
          this.getimg()
        });
      },
      getimg(e) {
        this.authImg=getAuthImg();
      },
    }
  }
</script>
<style>
  .from-common .matop { margin-top: 0.5rem; }
</style>
