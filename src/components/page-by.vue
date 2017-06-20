<template>
  <div class="m-grid-footer">
    <div class="m-grid-pagination">
      <div class="m-grid-pagination-left">
        <div class="m-grid-pagination-first flaticon-media25"></div>
        <div class="m-grid-pagination-prev flaticon-media23"></div>
      </div>
      <div class="m-grid-pagination-page"><span>第</span><input type="text" value="1"><span> 页</span></div>
      <div class="m-grid-pagination-right">
        <div class="m-grid-pagination-next flaticon-media23"></div>
        <div class="m-grid-pagination-last flaticon-media25"></div>
      </div>
    </div>
    <div class="m-grid-footer-text">共1页，总共0笔</div>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Object,
        default(){
          return {
            size:0,
            pageIndex:0,
            pageCount:10,
          }
        }
      },
      pageFun:{ //分页方法
        type: Function
      }
    },
    computed:{
    },
    data () {
      return {}
    },
    methods: {


    }
  }
</script>
