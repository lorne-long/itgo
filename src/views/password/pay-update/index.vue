<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap">
      <div class="layout_form layout_form04">
        <div class="form_field_warp">
          <div class="form_field form_field_password">
            <span class="form_field_label">原密码</span>
            <div class="form_field_input">
              <input type="password" v-model="originalPwd" class="j-password" maxlength="6">
            </div>
          </div>
          <div class="form_field with_right_label form_field_password">
            <span class="form_field_label">新密码</span>
            <div class="form_field_input"><input ref="pwd" v-model="newPwd" type="password" placeholder="6位数字"
                                                 class="j-newpassword" maxlength="6"></div>
            <span @touchstart="$refs.pwd.type='text'" @touchend="$refs.pwd.type='password'" class="right_label"></span>
          </div>
        </div>
        <div class="btn_wrap">
          <a href="javascript:void(0);" @click="submit" class="btn btn01 j-submit">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  {modifyWithdrawPwd}  from "api/payment";
  import  md5  from "MD5";
  export default {
    data() {
      return {
        originalPwd:"",
        newPwd:""
      };
    },
    methods:{
      checkFrom(){
        if(this.originalPwd=='')toast("请输入原密码");
        else if(this.newPwd=='')toast("请输入新密码");
        else if(this.newPwd==this.originalPwd)toast("新密码不能和旧密码相同");
        else{
          return true;
        }
      },
      submit(){
        if(!this.checkFrom())return;
        modifyWithdrawPwd({
          originalPwd:md5(md5(this.originalPwd)),
          newPwd:md5(md5(this.newPwd))
        }).then(data=>{
            if(data.success){
              this.originalPwd=this.newPwd='';
              toast("修改成功");
            }else{
              toast(data.message);
            }
        }).catch(err=>{
          toast("修改失败,请重新尝试");
        })
      }
    }
  };
</script>
<style>
</style>
