<template>
  <div class="m-grid-footer" v-show="mydata.totalRecords!=0">
    <div class="m-grid-pagination">
      <div class="m-grid-pagination-left">
        <div class="m-grid-pagination-first flaticon-media25" @click="pageFun(1)"></div>
        <div class="m-grid-pagination-prev flaticon-media23" @click="prev()"></div>
      </div>
      <div class="m-grid-pagination-page"><span>第</span><input type="text" v-model="mydata.pageNumber"
      ><span> 页</span></div>
      <div class="m-grid-pagination-right">
        <div class="m-grid-pagination-next flaticon-media23"  @click="next()"></div>
        <div class="m-grid-pagination-last flaticon-media25" @click="pageFun(mydata.totalPages)"></div>
      </div>
    </div>
    <div class="m-grid-footer-text">共{{mydata.totalRecords}}笔,共{{mydata.totalPages}}页</div>
  </div>
</template>
<script>
  export default {
    props:{
      data:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      mydata(){
        let mydateInit={
          numberOfRecordsShown:0, //当前页多少条
          pageNumber:1,//当前页
          size:0,  //页大小
          totalPages:0,//总页数，
          totalRecords:0//总记录条数,
        };
        Object.assign(mydateInit,this.data);
        return mydateInit;
      }
    },
    watch:{
      "mydata.pageNumber"(val){
        this.pageFun(val)
      }
    },
    methods:{
      pageFun(index){
        this.$emit("search",index);
      },
      prev(){
        if(this.mydata.pageNumber==1)return;
        this.pageFun(--this.mydata.pageNumber);
      },
      next(){
        if(this.mydata.pageNumber>=this.mydata.totalPages)return
        this.pageFun(++this.mydata.pageNumber);
      }
    }
  }
</script>
