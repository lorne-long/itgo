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
              <input v-model="withdrawPwd" ref="pwd" type="password" placeholder="6位数字"   maxlength="6"></div>
            <span @touchstart="$refs.pwd.type='text'" @touchend="$refs.pwd.type='password'" class="right_label"></span>
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
  import {mapGetters,mapActions} from 'vuex'
  export default {
    data() {
      return {
        withdrawPwd:'',
        loginPwd:""
      };
    },
    computed:{
     ...mapGetters(["userData"])
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
           this.$store.commit("SET_PAYPWD")
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
    beforeRouteEnter (to, from, next) {
      checkWithdrawPwd().then(res=>{
        if(res.success&&res.data=='1'){
           next("/pwd/payupdate");
         }else{
          next()
        }
       })
    }
  };
</script>
<style>
</style>
