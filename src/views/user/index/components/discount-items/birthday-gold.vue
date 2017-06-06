<template>
  <div  class="warp-public">
    <form-tip>
      在生日当天，您可申请生日礼金，无投注额要求，祝您生日快乐，财源广进！
      <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
    </form-tip>
    <a href="javascript:void(0);" class="btn btn01" style="margin-top: 20px">设置生日信息</a>
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
