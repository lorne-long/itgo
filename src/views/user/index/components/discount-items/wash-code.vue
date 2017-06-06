<template>
  <div class="warp-public">
    <form-tip>
      所有平台 (非旋转类) 可随时自助洗码。<br>
      若当日没有洗码，次日自动派发到主账户！
      <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
    </form-tip>

    <div class="form-public">
      <P class="form_field_input">
        <select>
          <option value="">选择游戏平台</option>
          <option value="PT">PT</option>
          <option value="QT">QT</option>
          <option value="DT">DT</option>
          <option value="TTG">TTG</option>
          <option value="NT">NT</option>
          <option value="MG">MG</option>
        </select>
      </P>
    </div>
    <a href="javascript:void(0);" class="btn btn02" id="user_rebate_step01_submit_btn">查询</a>
  </div>
</template>

<script>
  import  "./public.scss"
  export default {
    data() {
      return {};
    },
    props:{},
    methods:{},
    computed:{},
    created(){
    },
    components:{
      "form-tip": require("./form-tip.vue")
    }
  };
</script>

<style lang="scss">
  @import "../../../../../assets/scss/mixin";


</style>
