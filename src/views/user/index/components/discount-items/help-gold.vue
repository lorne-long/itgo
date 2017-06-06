<template>
<div class="warp-public">
    <form-tip>
      救援金有效时间为30天(从派发当天开始计算)，<br>
      规定时间内未领取将自动取消，10倍流水。
     <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
    </form-tip>

  </div>
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
