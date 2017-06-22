<template>
  <div class="m-grid-footer">
    <div class="m-grid-pagination">
      <div class="m-grid-pagination-left">
        <div class="m-grid-pagination-first flaticon-media25" @click="pageFun(1)"></div>
        <div class="m-grid-pagination-prev flaticon-media23" @click="prev()"></div>
      </div>
      <div class="m-grid-pagination-page"><span>第</span><input type="text" v-model="mydata.pageIndex"
      ><span> 页</span></div>
      <div class="m-grid-pagination-right">
        <div class="m-grid-pagination-next flaticon-media23" @click="pageFun(mydata.totalPages)"></div>
        <div class="m-grid-pagination-last flaticon-media25" @click="next()"></div>
      </div>
    </div>
    <div class="m-grid-footer-text">共{{mydata.totalPages}}页，总共{{mydata.totalRecords}}笔</div>
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
          pageIndex:1,//当前页
          size:0,  //页大小
          totalPages:0,//总页数，
          totalRecords:0//总记录条数,
        };
        if(this.data.hasOwnProperty("total")){ //返回数据有些不一样 不好使啊 草           //"data":{"total":0,"records":[],"size":10,"pageIndex":1
          mydateInit.size=this.data.size;
          mydateInit.pageIndex=this.data.pageIndex;
          mydateInit.numberOfRecordsShown=this.data.records.length;
          mydateInit.totalRecords=this.data.total;
          let remin= mydateInit.totalRecords%mydateInit.pageIndex
          mydateInit.totalPages=remin==0?remin:remin+1;


        }else{
          Object.assign(mydateInit,this.data);
        }
        return mydateInit;
      }
    },
    watch:{
      "mydata.pageIndex"(val){
        this.pageFun(val)
      }
    },
    methods:{
      pageFun(index){
        this.$emit("search",index);
      },
      prev(){
        if(this.mydata.pageIndex==1)return;
        this.pageFun(this.mydata.pageIndex--);
      },
      next(){
        if(this.mydata.pageIndex>=this.mydata.totalPages)return
        this.pageFun(this.mydata.pageIndex++);
      }
    }
  }
</script>
