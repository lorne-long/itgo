<template>

  <div class="warp-public">
    <form-tip>
      温馨提示：优惠券代码会以站内信形式发送给您，<br>请您注意查看站内信通知。
    </form-tip>
    <div class="form-public">
      <p><input type="text" placeholder="请填写转入金额" name="couponRemit"  maxlength="10"><span class="right_label">元</span></p>
      <p><select id="couponType">
        <option value=""> 请选择 </option>
        <option value="PT">PT</option>
        <option value="TTG">TTG</option>
        <option value="NT">NT</option>
        <option value="QT">QT</option>
        <option value="DT">DT</option>
        <option value="MG">MG</option>
      </select></p>
      <p><input type="text" id="couponCode" maxlength="20" placeholder="优惠代码"></p>
    </div>
    <a href="javascript:void(0);" class="btn btn01" >确定转入</a>
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

<style>
</style>
