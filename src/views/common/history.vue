<template>
  <div>
    <back-header :back="back">{{headerTxt}}</back-header>
    <div v-show="!showData" id="page-index">
      <div class="page_content_wrap">
        <div class="layout_form layout_form03">
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
              <div class="form_field" id="recommendType" style="display: none">
                <span class="form_field_label">推荐类型</span>
                <div class="form_field_input">
                  <select name="" id="friend-type">
                  </select>
                </div>
              </div>
              <div class="form_field">
                <span class="form_field_label">时间范围</span>
                <div class="form_field_input">
                  <select v-model="Days" >
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
      </div>
    </div>
    <div v-show="showData" id="page-result">
      <div id="j-grid" class="page_content_wrap">
        <div class="m-grid">
          <div class="m-grid-header"><span class="m-grid-header-title"></span>
            <div class="m-grid-refresh flaticon-refresh57" style="display: none;"></div>
          </div>
          <div class="m-grid-table">
            <table class="tb-data-default">
              <thead>
              <tr>
                <td nowrap="nowrap">编号</td>
                <td nowrap="nowrap">提款金额</td>
                <td nowrap="nowrap">状态</td>
                <td nowrap="nowrap">提款时间</td>
              </tr>
              </thead>
              <tbody>
              <tr  v-if="data.total>0" v-for="(item,i) in data.records">
                  <td>{{item.pno}}</td>
                  <td>{{item.amount}}</td>
                  <td>{{item.flag}}</td>
                  <td>{{item.tempCreateTime}}</td>
              </tr>
              <tr  v-if="data.total<=0">
                <td colspan="4" algin="center" style="position: relative;padding: 2em;">无资料</td>
              </tr>
              </tbody>
            </table>
          </div>
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
            <div class="m-grid-footer-text">共{{data.total}}页，总共0笔</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  {queryHistory} from "api/common";
  export default {
    data() {
      return {
        showData:false,
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
        this.searchData.endDate=(new Date().addDay(val*-1).format("yyyy-MM-dd"));
      }
    },
    methods:{
      search(){
          this.showData=!this.showData;
          queryHistory(this.searchData).then(data=>{
            if(data.success){
              this.data=data.data;
            }else{
              toast(data.message)
            }
          })
      },
      back(){
        if(this.showData){
          this.showData=!this.showData;
        }else{
          this.$router.back();
        }
      }
    },
    computed:{
      headerTxt(val){
        return this.showData?"记录查询":"在线存款记录";
      }
    },
    created(){
      this.searchData.startDate=new Date().format("yyyy-MM-dd");
      this.Days=1;
    },
    components:{
      'back-header':require("components/header_back/header_back")
    }
  };
</script>
<style>
</style>
