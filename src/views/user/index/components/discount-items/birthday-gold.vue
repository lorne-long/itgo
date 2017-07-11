<template>
  <div  class="warp-public">
    <form-tip>
      在生日当天，您可申请生日礼金，无投注额要求，祝您生日快乐，财源广进！
      <router-link to="/preferential" class="text_red"  slot="link">详情</router-link>

    </form-tip>
    <a href="javascript:void(0);" @click="submit" :class="['btn',{btn01:isSubmit},{btn_disable02:!isSubmit}]" style="margin-top: 20px">{{message}}</a>
  </div>
</template>

<script>
  import  "./public.scss"
  import  {canClaimBirthdayCoupon,claimBirthdayCoupon} from "api/preferential-terms"
  import formTip from "components/form-tip.vue"
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
        if(data.success){
          this.isSubmit=data.success;
           this.message="领取礼金"
        }else{
          this.message=data.message;
        }
      })
    },
    components:{
      formTip
    }
  };
</script>

<style>
</style>
