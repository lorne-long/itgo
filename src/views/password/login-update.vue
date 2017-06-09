<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap">
      <div class="layout_form layout_form04">
        <form action="#">
          <div class="form_field_warp">
            <div class="form_field form_field_password">
              <span class="form_field_label">原密码</span>
              <div class="form_field_input"><input  v-model='password' placeholder="原密码" type="password" class="j-password"></div>
            </div>
            <div class="form_field with_right_label form_field_password">
              <span class="form_field_label">新密码</span>
              <div class="form_field_input"><input  v-model='new_password'  type="password" placeholder="6-16位数字和字母" class="j-newpassword"></div>
              <span class="right_label"></span>
            </div>
            <div class="form_field with_right_label form_field_password">
              <span class="form_field_label">确认密码</span>
              <div class="form_field_input"><input  v-model='confirm_password'  type="password" placeholder="6-16位数字和字母" class="j-newpassword"></div>
              <span class="right_label"></span>
            </div>
          </div>
          <div class="btn_wrap">
            <a href="javascript:void(0);" @click="submit" class="btn btn01 j-submit">确定</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import  md5  from "MD5";
  import  {changepws}  from "api/safeCenter";
    export default {
        data() {
            return {
              password:"",// true string
              confirm_password:"",// true string
              new_password:""
            };
        },
        props:{},
        methods:{
          check(){
            if(this.password=="")toast("请输入原密码");
            else if(this.new_password=="")toast("请输入新密码");
            else if(this.confirm_password=="")toast("请重复新密码");
            else if(this.new_password!=this.confirm_password)toast("二次密码不一致");
            else if(this.password==this.new_password)toast("新密码不能与旧密码相同");
            else{return true;}
          },
          submit(){

            if(!this.check())return;
            alert(md5(this.password))
            console.log(this.$data)
            changepws(
                {
                  password: md5(md5(this.password)),
                  confirm_password: md5(md5(this.confirm_password)),
                  new_password: md5(md5(this.new_password)),
                }
            ).then(data=>{
              if(data.success){
                  toast(data.message);
                  this.password=this.confirm_password=this.new_password=""
              }else{
                toast(data.message)
              }
            })
          }
        },
        computed:{},
        created(){
          this.$emit("setHeader","修改登录密码");
        },
        components:{}
    };
</script>
<style>
</style>
