<template>
    <div class="page_content_wrap">
      <div class="layout_form layout_form04">
        <div class="form_field_warp">
          <div class="form_field form_field_password">
            <span class="form_field_label">登录密码</span>
            <div class="form_field_input"><input v-model="loginPwd" type="password"  maxlength="18">
            </div>
          </div>
          <div class="form_field with_right_label form_field_password">
            <span class="form_field_label">支付密码</span>
            <div class="form_field_input">
              <input v-model="withdrawPwd" type="password" placeholder="6位数字"   maxlength="6"></div>
            <span class="right_label"></span>
          </div>
        </div>
        <div class="btn_wrap">
          <a href="javascript:void(0);" @click="submit" class="btn btn01">确定</a>
        </div>
      </div>
    </div>
</template>
<script>
  import  md5  from "MD5";
  import  {bindWithdrawPwd,checkWithdrawPwd}  from "api/safeCenter";
  export default {
    data() {
      return {
        withdrawPwd:'',
        loginPwd:""
      };
    },
    methods:{
      checkForm(){
        if(this.loginPwd=='')toast("请输入登录密码");
        else if(this.withdrawPwd=="")toast("请输入支付密码");
        else{ return true;}
      },
      submit(){
        if(!this.checkForm())return;
        bindWithdrawPwd({
          withdrawPwd:md5(md5(this.withdrawPwd)),
          loginPwd:this.loginPwd
        }).then((data)=>{
          if(data.success){
            toast("设置成功");
            const {rquest}= this.$route.query;
            if(rquest){
              this.$router.push({path:rquest});
            }
            this.loginPwd=this.withdrawPwd='';
          }else{
            toast(data.message);
          }
        }).catch(err=>{
          toast("设置失败,请重新尝试");
        })
      }
    },
    created(){
      checkWithdrawPwd().then(data=>{ //如果已经设置了就去修改防止强跳
        if(data.success&&data.data=="1"){
          this.$router.replace("/pwd/payupdate");
        }
      })
    }
  };
</script>
<style>
</style>
