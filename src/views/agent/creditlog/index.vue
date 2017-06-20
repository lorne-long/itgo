<template>
  <!--额度记录{-->
    <div class="page_content_wrap">
      <div class="layout_form layout_form04">
        <search-form :searchData="searchData"
                     :search="search" ></search-form>
        <table-data :thead="thead" :data="data">
          <tr v-for="(item,i) in data.records">
            <td>{{data.pageIndex+i}}</td>
            <td>{{item.type}}</td>
            <td>{{item.remit}}</td>
            <td>{{item.credit}}</td>
            <td>{{item.newCredit}}</td>
            <td>{{item.tempCreateTime|Date}}</td>
          </tr>
        </table-data>
      </div>
    </div>
  <!--}额度记录-->
</template>
<script>
  import {queryCreditlogs}  from "api/agent"
  import tableData from "components/table-data"
  import searchForm from "components/search-form"
  export default {
    name: 'hello',
    data () {
      return {
        thead: ["序", '操作类型', '额度变量', '改变前额度', '改变后额度', '加入时间'],
        data: {},
        searchData: {
          total: 0, //true string
          startDate: "", //true string
          endDate: "",// true string
          size: 10, //true string
          pageIndex: 0, //true string
        }
      }
    },
    methods: {
      search(){
        queryCreditlogs(this.searchData).then(res => {
          if (res.success) {
              this.data=res.data
          } else {
            toast(res.message)
          }
        })
      }
    },
    components: {
      tableData,
      searchForm
    }
  }
</script>
<style>
</style>
