<template>
  <!--会员列表{-->
  <div class="page_content_wrap">
    <div class="layout_form layout_form04">
      <search-form @search="search" :searchData="searchData"></search-form>
      <table-data :thead="thead" :data="data">
        <tr v-for="(item,i) in data.records||[]">
          <td>{{data.pageIndex+i}}</td>
          <td>{{item.loginname}}</td>
          <td>{{item.flag}}</td>
          <td>{{item.credit}}</td>
          <td>{{item.tempCreateTime|Date}}</td>
          <td>{{item.howToKnow}}</td>
        </tr>
      </table-data>
    </div>
  </div>
  <!--}会员列表-->
</template>

<script>
  import tableData from "components/table-data"
  import searchForm from "components/search-form"
  import {queryAgentSubUserInfo} from "api/agent"
  export default {
    data () {
      return {
        thead: ['序', '会员帐号', '状态', '账户额度', '	开户日期', '来源网址'],
        data: {},
        searchData: {
          total: 0,
          startDate: "",
          endDate: "",
          size: 10,
          pageIndex: 0,
        }
      }
    },
    methods: {
      search(index) {
        if(index&&this.searchData.pageIndex==index)return;
        this.searchData.pageIndex=index||this.searchData.pageIndex
        queryAgentSubUserInfo(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data;
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast("查询错误");
        })
      },
    },
    components: {
      tableData,
      searchForm
    }
  }
</script>
