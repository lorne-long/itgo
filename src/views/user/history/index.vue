<template>
  <div class="page_content_wrap" >
    <div class="layout_form layout_form03" style="margin-bottom: 1em;">
      <form action="#">
        <div class="form_field_warp">
          <div class="form_field">
            <span class="form_field_label">记录类型</span>
            <div class="form_field_input">
              <select v-model="searchData.historyType">
                <option value="deposit">在线存款记录</option>
                <option value="withdraw">提款记录</option>
                <option value="transfer">户内转账记录</option>
                <option value="concessionReccords">优惠活动记录</option>
                <option value="couponRecords">自助优惠记录</option>
                <option value="deputyRecords">副账户优惠记录</option>
                <option value="ximaDetail">自助返水记录</option>
                <option value="friend">好友推荐记录</option>
              </select>
            </div>
          </div>
          <div class="form_field" v-show="searchData.historyType=='friend'">
            <span class="form_field_label">推荐类型</span>
            <div class="form_field_input">
              <select>
              </select>
            </div>
          </div>
          <div class="form_field">
            <span class="form_field_label">时间范围</span>
            <div class="form_field_input">
              <select v-model="Days">
                <option value="1">一天</option>
                <option value="7">七天</option>
                <option value="30">一个月</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form_btn_wrap">
          <a href="javascript:;" @click="search" class="btn btn01">查询</a>
        </div>
      </form>
    </div>
    <table-data :thead="thead" :data="data">
      <tr v-for="(item,i) in data.records">
        <td>{{item.pno}}</td>
        <td>{{item.amount}}</td>
        <td>{{item.flag}}</td>
        <td>{{item.tempCreateTime}}</td>
      </tr>
    </table-data>
  </div>
</template>
<script>
  import  {queryHistory} from "api/common";
  import tableData from "components/table-data"
  export default {
    data() {
      return {
        thead:['编号','提款金额','状态','提款时间'],
        data:{},
        Days:"1",
        searchData:{
          historyType:"deposit",
          startDate:"",
          endDate:'',
          pageIndex:1,
          size:10
        }
      };
    },
    watch:{
      Days(val){
        this.searchData.endDate=(new Date().addDay(val* -1).format("yyyy-MM-dd"));
      },
      "searchData.historyType"(val){
        if(val=="friend"){
        }
      }
    },
    methods:{
      search(){
        this.showData= !this.showData;
        queryHistory(this.searchData).then(data =>{
          if(data.success){
            this.data=data.data;
          }else{
            toast(data.message)
          }
        })
      }
    },
    created(){
      this.searchData.startDate=new Date().format("yyyy-MM-dd");
      this.Days=1;
    },
    components:{
      tableData
    }
  };
</script>
<style>
</style>
