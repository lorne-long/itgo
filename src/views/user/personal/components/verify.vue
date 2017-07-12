<template>
  <div>
    <br>
    <a href="javascript:void(0);" class="btn btn01" @click="verify=2">手机验证</a>
    <br>
    <div v-show="verify==2">
      <div class="layout_icon_text_button display_flex_h flex_align_center">
        <div class="icon_wrap"><img src="static/images/icons/icon_send_message.png" width="84" height="45"></div>
        <div class="flex_1">
          <p>点击获取验证码，系统将向您的注册手机号发送一个验证码</p>
          <div class="layout_form">
            <div class=" form_field">
              <span class="form_field_label">验证码:</span>
              <div class="form_field_input">
                <input type="text" v-model="code" placeholder="请输入验证码" maxlength="6">
              </div>
            </div>
            <div></div>
          </div>
          <div class="btn_wrap no_padding">
            <a href="javascript:void(0);" class="btn btn04" @click="showVerify=true">获取验证码</a>
          </div>
        </div>
      </div>
      <v-touclick v-model="showVerify" @success="success"></v-touclick>
      <div class="btn_wrap no_padding">
        <a href="javascript:void(0);" @click="verify" class="btn btn01 ">验证</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {endSmsTYJ,checkPhoneCode} from 'api/user';
  import {mapGetters} from 'vuex'
  import vTouclick from 'components/touclick'
  export default {
    data() {
      return {
        code:"",
        showVerify:false,
        step:1,
        myData:{
          sid:"",//true string
          check_address:"", //true string
          check_key:"", //true string
        }
      };
    },
    props:{
      value:Boolean
    },
    methods:{
      success(obj,tc){
        tc.destory();
        this.showVerify=false;
        this.myData.check_key=obj.token;
        this.myData.check_address=obj.checkAddress;
        this.myData.sid=obj.sid;
        endSmsTYJ(this.myData).then(res=>{
          toast(res.message);
          if(res.success){
          }
        }).catch(err=>{
          toast("发送失败")
        });
      },
      verify(){
        if(this.code=="")return toast("请填写验证码");
        checkPhoneCode({code:this.code}).then(res=>{
          toast(res.message)
          if(res.success){
            this.$emit("input",false)
          }
        }).catch(err=>{
          toast("验证失败");
        })
      }
    },
    components:{
      vTouclick
    }
  };
</script>
<style>
</style>
