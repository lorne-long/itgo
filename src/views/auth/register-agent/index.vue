<template>
  <div class="layout_form layout_form03">
    <div class="form_field_warp">
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_user"></span></span>
        <div class="form_field_input"><input type="text"  v-model="data.account"  placeholder="账号(以a_(下划线)开头，3-15个数字或字母)"></div>
      </div>
      <div class="form_field with_icon_label form_field_password with_right_label">
        <span class="form_field_label"><span class="icon icon_password"></span></span>
        <div class="form_field_input"><input type="password" v-model="data.password" placeholder="密&nbsp;&nbsp;&nbsp;码(6-16位数字或字母）" ></div>
        <span class="right_label"></span>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_user_file"></span></span>
        <div class="form_field_input"><input type="text" v-model="data.name" placeholder="姓名(须与银行账户姓名相同，否则无法提款)" ></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_website"></span></span>
        <div class="form_field_input"><input type="text"  v-model="data.url"  placeholder="加盟网址(1-6个数字或字母,作为您的标识)"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_email"></span></span>
        <div class="form_field_input"><input type="text"  v-model="data.email" placeholder="电子邮箱(加盟负责人及时联系您)" ></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_mobile"></span></span>
        <div class="form_field_input"><input type="text"  v-model.number="data.phone" placeholder="联系电话(加盟负责人及时联系您)" ></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_qq"></span></span>
        <div class="form_field_input"><input type="text" v-model.number="data.qq" placeholder="QQ/SKYPE(方便与我们取得联系)"></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_wechat"></span></span>
        <div class="form_field_input"><input type="text" v-model="data.wechat" placeholder="微信(通过微信方便与我们取得联系)" ></div>
      </div>
      <div class="form_field with_icon_label">
        <span class="form_field_label"><span class="icon icon_mobile"></span></span>
        <div class="form_field_input"><input type="text" v-model="data.partner"  placeholder="推荐码" id="agent-partner"></div>
      </div>
      <div class="form_field with_icon_label with_right_label form_field_cap_code">
        <span class="form_field_label"><span class="icon icon_cap_code"></span></span>
        <div class="form_field_input"><input v-model="data.imageCode" type="text" placeholder="请输入验证码"  maxlength="4"></div>
        <span class="right_label"><img width="100" height="33"  :src="authImg" @click="getimg"/></span>
      </div>
    </div>
    <div class="btn_wrap">
      <a href="javascript:void(0)" class="btn btn01" @click="register">注册</a>
    </div>
  </div>
</template>

<script>
  import {getAuthImg,registerAgent} from 'api/authService';
  export default{
    data() {
      return {
        authImg:getAuthImg(),
        data:{
          phone:"", //true string
          email:"", //true string
          name:"", //true string
          account:"", //true string
          imageCode:"", //true string
          password:"", //true string
          qq:"", //true string
          partner:"",
          wechat:"",
          url:""
        }
      }
    },
    methods:{
      checked(){
        let account=/^a_[\da-zA-Z]{3,15}$/;
        let _RegExp=/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
        let _phone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        let email=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(!account.test(this.data.account))toast("账号(以a_(下划线)开头，3-15个数字或字母)");
        else if(!_RegExp.test(this.data.password))toast("密码(6-10位数字和字母)");
        else if(this.data.name=="")toast("请输入姓名)");
        else if(this.data.url=="")toast("请输入加盟地址)");
        else if(! email.test(this.data.email))toast("请输入电子邮箱地址)");
        else if(!_phone.test(this.data.phone))toast("手机号格式不正确");
        else if(this.data.imageCode=="")toast("请输入验证码");
        else{
          return true;
        }
      },
      register(){
        if(!this.checked())return;
        registerAgent(this.data).then((res)=>{
          this.getimg()
          if(res.success){
            this.$router.replace({path:"/login/registersuccess",query:{account:this.data.account}});
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
