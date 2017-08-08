<template>
  <table-data :thead="thead" :data="data" @search="search">
    <tr v-if="show" v-for="(item,i) in data.pageContents||[]">
      <td>{{(data.pageNumber - 1) * data.size + i + 1}}</td>
      <td>{{item.loginname}}</td>
      <td>{{item.platform}}</td>
      <td>{{item.bettotal}}</td>
      <td>{{item.amount }}</td>
      <td>{{item.tempCreateTime | Date}}</td>
    </tr>
  </table-data>
</template>
<script>
  import {searchagprofitData} from "api/agent";
  import tableData from "components/table-data"
  export default {
    name: "",
    data() {
      return {
        thead: ['序', '会员帐号', '平台', '投注总额', '输赢值', '时间'],
        data: {pageContents: []},
        searchData: {
          total: 0,
          loginname: "",
          platform: "",
          starttime: "",
          endtime: "",
          size: 10,
          pageIndex: 1
        }
      }
    },
    methods: {
      search(index) {
        if (!isNaN(index)) {
          if (index == this.searchData.pageIndex) return
          this.searchData.pageIndex = index
        }
        this.data.pageContents = [];
        searchagprofitData(this.searchData).then(res => {
          if (res.success) {
            this.show = !this.show
            this.data = res.data
          }
          else {
            this.data.pageContents = [];
            toast(res.message)
          }
        }).catch(err => {
          toast("查询失败")
        })
      }
    },
    components: {
      tableData
    }
  }
</script>
<style spcoed>

</style>
