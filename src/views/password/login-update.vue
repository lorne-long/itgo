<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap">
      <div class="layout_form layout_form04">
        <form action="#">
          <div class="form_field_warp">
            <div class="form_field form_field_password">
              <span class="form_field_label">原密码</span>
              <div class="form_field_input"><input type="password" class="j-password"></div>
            </div>
            <div class="form_field with_right_label form_field_password">
              <span class="form_field_label">新密码</span>
              <div class="form_field_input"><input type="password" placeholder="6-16位数字和字母" class="j-newpassword"></div>
              <span class="right_label"></span>
            </div>
          </div>
          <div class="btn_wrap">
            <a href="javascript:void(0);" class="btn btn01 j-submit">确定</a>
          </div>
        </form>
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
          this.$emit("setHeader","修改登录密码");
        },
        components:{}
    };
</script>
<style>
</style>
