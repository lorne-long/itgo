<template>

  <div class="warp-public">
    <form-tip>
      温馨提示：优惠券代码会以站内信形式发送给您，<br>请您注意查看站内信通知。
    </form-tip>
    <div class="form-public">
      <p><input type="text" v-model.number="couponRemit" placeholder="请填写转入金额" name="couponRemit"  maxlength="10"><span class="right_label">元</span></p>
      <p><select  v-model="couponType" id="couponType">
        <option value=""> 请选择 </option>
        <option value="PT">PT</option>
        <option value="TTG">TTG</option>
        <option value="NT">NT</option>
        <option value="QT">QT</option>
        <option value="DT">DT</option>
        <option value="MG">MG</option>
      </select></p>
      <p><input type="text" v-model="couponCode" id="couponCode" maxlength="20" placeholder="优惠代码"></p>
    </div>
    <a href="javascript:void(0);" @click="submit" class="btn btn01" >确定转入</a>
</div>
</template>

<script>
  import  "./public.scss"
  import  {transferInforCoupon} from "api/preferential-terms"
  export default {
    data() {
      return {
        couponType:"", // true string
        couponRemit:"", //true string
        couponCode:"",//true string
      };
    },
    props:{},
    computed:{},
    methods:{
      check(){
        if(this.couponRemit=='')toast('请输入转入金额');
        else if(this.couponType=='')toast('请选择游戏平台');
        else if(this.couponCode=='')toast('请输入优惠代码');
        else{return true; }
      },
      submit(){
        if(!this.check())return;
        console.log(this.$data)
        transferInforCoupon(this.$data).then((data)=>{
          if(data.success){
            this.couponCode='';
          }
          toast(data.message);
        }).catch(()=>{
          toast('请重新尝试');
        })
      }
    },
    created(){
    },
    components:{
      "form-tip": require("./form-tip.vue")
    }
  };
</script>

<style>
</style>
