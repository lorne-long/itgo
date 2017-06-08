<template>
  <div class="customerServices j-customerServices hidden">

    <a v-for="(i,item) in data" href="item.href">

    </a>
      <a class="customerServices1" href="##" target="_blank">
        在线客服
      </a>
      <c:choose>
        <c:when test="${session.customer!=null}">
          <a href="##"  class="customerServices2">电话回拨</a>
        </c:when>
      </c:choose>
      <a href="tel:4000000000"  class="customerServices3">4000000000</a>
      <span class="j-customerServicesCancel">取消</span>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        props:{
          data:{
            type:Array
          }
        },
        methods:{},
        computed:{},
        created(){
        },
        components:{}
    };
</script>
