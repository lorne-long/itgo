<template>
  <div class="page_content_wrap">
    <div class="layout_form layout_form04">
      <search-form @search="search" :data="searchData">
        <div class="form_field date_picker with_arrow_icon">
          <span class="form_field_label">类型</span>
          <div class="form_field_input">
            <select v-model="searchData.proposalType" class="without_style with_arrow">
              <option v-for="item in type" :value="item.value">{{item.name}}</option>
            </select>
          </div>
        </div>
      </search-form>
      <winlose ref="-1" v-show="searchData.proposalType==-1"></winlose>
      <recharge v-for="(item,i) in type.slice(1)" :searchData="searchData"
                :ref="item.value" v-show="searchData.proposalType==item.value">
      </recharge>
    </div>
  </div>
  <!--}会员账务-->
</template>
<script>
  import {getAgentQueryType, searchagprofitData, searchsubuserProposalData} from "api/agent";
  import tableData from "components/table-data"
  import searchForm from "components/search-form"
  import winlose from './components/win-lose';//会员账务  》  输赢
  import recharge from './components/recharge';//会员账务  》  公共页  提款 存款 反水 优惠
  export default {
    data() {
      return {
        type: [{name: "输赢", value: "-1"}],

        searchData: {
          loginname: "",
          tail: "",
          starttime: "",
          endtime: "",
          proposalType: "-1",
          size: 10,
          pageIndex: 1
        }
      }
    },
    methods: {
      search() {
        if (this.$refs[this.searchData.proposalType]) {
          this.$refs[this.searchData.proposalType].search()
        }
        else {
          this.$refs[this.searchData.proposalType][0].search()
        }
      },
    },
    created() {
      getAgentQueryType().then(res => {
        if (res.success) {
          this.type.push(...res.data);
        } else {
          toast(res.message)
        }
      }).catch(err => {
        toast("类型加载失败")
      })
    },
    components: {
      tableData, searchForm, winlose, recharge
    }
  }
</script>
