<template>
  <div  class="warp-public">
    <form-tip>
      在生日当天，您可申请生日礼金，无投注额要求，祝您生日快乐，财源广进！
      <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
    </form-tip>
    <a href="javascript:void(0);" @click="submit" :class="['btn',{btn01:isSubmit},{btn_disable02:!isSubmit}]" style="margin-top: 20px">{{message}}</a>
  </div>
</template>

<script>
  import  "./public.scss"
  import  {canClaimBirthdayCoupon,claimBirthdayCoupon} from "api/preferential-terms"
  export default {
    data() {
      return {
        message:"设置生日信息",
        isSubmit:false
      };
    },
    props:{},
    methods:{
      submit(){
        if(!this.isSubmit)return;
        claimBirthdayCoupon().then(data=>{
          toast(data.message)
        });
      }
    },
    computed:{},
    created(){
      canClaimBirthdayCoupon().then(data=>{
          this.isSubmit=data.success;
          this.message=data.message;
      })
    },
    components:{
      "form-tip": require("./form-tip.vue")
    }
  };
</script>

<style>
</style>
