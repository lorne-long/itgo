<template>
  <!--佣金报表{-->
  <div class="page_content_wrap">
    <div class="layout_form layout_form04">
      <search-form  @search="search" :searchData="searchData"></search-form>
      <table-data :thead="thead" :data="data"  @search="search">
        <tr v-for="(item,i) in data.records||[]">
          <td>{{data.pageIndex+i}}</td>
          <td>{{getPlatForm(item.platform)}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.createdate|Date}}</td>
          <td>{{item.profitall}}</td>
          <td>{{item.couponfee}}</td>
          <td>{{item.ximafee}}</td>
          <td>{{item.platformfee}}</td>
          <td>{{item.betall}}</td>
          <td>{{item.tempExcuteTime|Date}}</td>
        </tr>
      </table-data>
    </div>
  </div>
  <!--}佣金报表-->
</template>

<script>
  import tableData from "components/table-data"
  import searchForm from "components/search-form"
  import {queryPtCommission} from "api/agent"
  export default {
    name: 'hello',
    data () {
      return {
        thead: ['序','平台','日佣金','数据日期', '输赢额度', '优惠额度', '洗码额度','平台费','投注额', '执行时间'],
        data: {},
        searchData: {
          total:0,
          startDate: "",
          endDate: "",
          size:2,
          pageIndex:0,
        }
      }
    },

    methods: {
      search(index) {
        if(index&&this.searchData.pageIndex==index)return;
        this.searchData.pageIndex=index||this.searchData.pageIndex;
        queryPtCommission(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data;
          }else{
              toast(res.message)
          }
        }).catch(err => {
          toast("查询错误");
        })
      },
      getPlatForm(val){
          switch(val){
            case "slotmachine":
                return "老虎机佣金"
            case "liveall":
              return "其他佣金"
            default :
              return val
          }
      }
    },
    components: {
      tableData,
      searchForm
    }
  }
</script>
