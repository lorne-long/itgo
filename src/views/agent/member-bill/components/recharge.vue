<template>
  <table-data :thead="thead" :data="data" @search="search">
    <tr v-for="(item,i) in data.pageContents||[]">
      <td>{{(data.pageNumber - 1) * data.size + i + 1}}</td>
      <td>{{item.loginname}}</td>
      <td>{{item.tempCreateTime}}</td>
      <td>{{item.money || item.amount}}</td>
      <td>{{item.type}}</td>
    </tr>
  </table-data>
</template>
<script>
  import {searchsubuserProposalData} from "api/agent";
  import tableData from "components/table-data"

  export default {
    name: "",
    data() {
      return {
        thead: ["序号", "会员账户", "申请时间", "额度", "申请类型"],
        data: {pageContents: []},
        searchData: {
          loginname: "",
          tail: "",
          total: 0,
          starttime: "",
          endtime: "",
          proposalType: "-1",
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
        this.searchData.proposalType = this.type
        searchsubuserProposalData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data
          } else {
            toast(res.message)
          }
        }).catch(err => {
          this.data.pageContents = [];
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
