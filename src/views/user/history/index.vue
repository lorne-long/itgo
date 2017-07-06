<template>
  <div class="page_content_wrap">
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
                <!--<option value="deputyRecords">副账户优惠记录</option>-->
                <option value="ximaDetail">自助返水记录</option>
                <option value="friend">好友推荐记录</option>
              </select>
            </div>
          </div>
          <div class="form_field" v-show="searchData.historyType=='friend'">
            <span class="form_field_label">推荐类型</span>
            <div class="form_field_input">
              <select v-model="searchData.friendtype">
                <option value="0">推荐注册成功玩家</option>
                <option value="1">推荐奖金收入</option>
                <option value="2">推荐奖金支出</option>
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
      <tr v-for="(item,i) in data.records||[]">
          <td v-for="one in thead">
            {{item[one.value]}}
          </td>
      </tr>
    </table-data>
  </div>
</template>
<script>
  import  {queryHistory} from "api/user";
  import tableData from "components/table-data"
  export default {
    data() {
      return {
        thead:[],
        data:{},
        Days:"1",
        searchData:{
          historyType:"deposit",
          startDate:"",
          endDate:'',
          pageIndex:1,
          size:10,
          friendtype:"0"
        }
      };
    },
    watch:{
      Days(val){
        this.searchData.startDate=(new Date().addDay(val* -1).format("yyyy-MM-dd"));
      }
    },
    methods:{
      search(){
          this.changeType(this.searchData.historyType)
          this.showData= !this.showData;
          queryHistory(this.searchData).then((res)=>{
            if(res.success){
              this.data=res.data;
            }else{
              toast(res.message)
            }
          });
      },
      changeType(val){
        switch(val){
          case "deposit":
            return this.thead=[{name:'编号',value:'billno'},{name:"提款金额",value:"money"},{name:"状态", value:"flag" },{name:"提款时间",value:"tempCreateTime"}];
          case "withdraw":
            return this.thead=[{name:'编号',value:'pno'},{name:'提款金额',value:'amount'},{
              name:'状态',
              value:'flag'
            },{name:'提款时间',value:'tempCreateTime'}];
          case "transfer":
            return this.thead=[{name:'编号',value:'id'},{name:'转账金额',value:'remit'},{name:'转账时间',value:'tempCreateTime'}];
          case "concessionReccords":
            return this.thead=[{name:'优惠类型',value:'type'},{name:'赠送金额',value:'amount'},{
              name:'创建时间',
              value:'tempCreateTime'
            }];
          case "couponRecords":
            return this.thead=[{name:'赠送',value:'gifTamount'},{name:'存款',value:'amount'}];

          case "deputyRecords":
            return this.thead=[{name:'附言',value:'depositId'},{name:'银行',value:'bankname'},{
              name:'状态',
              value:'status'
            },{name:'创建时间',value:'tempCreateTime'}];
          case "ximaDetail":
            return this.thead=[{name:'有效投注额',value:'validAmount'},{name:'结算金额',value:'ximaAmount'},{name:'状态',value:'ximaStatus'}];
          case "friend":
            return this.thead=[{name:'玩家账号',value:'downlineuser'},{name:'金额',value:'money'},{name:'类型',value:'type'},{name:'时间',value:'createtime'}];
          default:
            break;
        }
      },
    },
    created(){
      this.searchData.endDate=new Date().format("yyyy-MM-dd");
      this.Days=1;
    },
    components:{
      tableData
    }
  };
</script>
<style>
</style>
