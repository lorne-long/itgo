<template>
  <div class="layout_form with_last_border layout_form_readonly sec_box">
    <form action="#">
      <div class="form_field_warp">
        <div class="form_field">
          <span class="form_field_label">真实姓名</span>
          <div class="form_field_input"><input type="text" :value="userData.accountName" readonly=""></div>
        </div>
        <div class="form_field">
          <span class="form_field_label">手机号码</span>
          <div class="form_field_input"><input type="text" :value="userData.phone" readonly=""></div>
        </div>
        <div class="form_field">
          <span class="form_field_label">邮箱地址</span>
          <div class="form_field_input"><input type="text" :value="userData.email" readonly=""></div>
        </div>
      </div>
      <div class="form_tip small_form_tip" style="margin-top: 10px;" @click="userData.referWebsite.$copy();">
        推广网址：{{userData.referWebsite}}（按此区域复制）
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed:{
      userData(){
        return this.$store.getters.userData;
      }
    },
    methods:{
    }
  }
</script>
