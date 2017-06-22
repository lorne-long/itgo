<template>
  <div class="user_center_content proxy_center_content">
    <account-top :slotAccount="slotAccount">头部内容</account-top>
    <div class="proxy_info_main sec_box">
      <col-list  :data="colData"></col-list>
      <div style="padding: 15px;" class="padding_wrap">
        <div class="form_tip text_align_left">
          温馨提示：<br>
          当月汇总时间段是按照代理下线会员上月最后一天到当月倒数第二天，比如8月份的数据时间段为7月31日00:00—8月30日23:59。<br>
          每天下午日结佣金结束之后数据会更新。<br>
          数据可能会出现延迟，如果出现误差，请联系市场专员，以正式后台为准。
        </div>
      </div>
    </div>
    <row-list :data="rowdata"></row-list>
    <div class="btn_wrap" style="margin-top: 1em"><a @click="logOut" href="javascript:;" class="btn btn01">退出</a></div>
  </div>
</template>
<script>
  import {logOut} from 'api/authService';
  import {agentReport} from 'api/agent';
  import {mapGetters} from 'vuex'
  import accountTop from "components/account-top"
  import colList from "components/col-list.vue"
  import rowList from "components/row-list.vue"
  export default {
    data () {
      return {
        slotAccount:0,
        rowdata:[
          {name:'佣金报表',to:{path:"/agent/ptcommission"}},
          {name:'会员列表',to:{path:"/agent/subuser"}},
          {name:'会员账务',to:{path:"/agent/platform"}},
          {name:'额度记录',to:{path:"/agent/creditlog"}},
          {name:'个人中心',to:{path:"/agent/profile"}},
          {name:'绑定银行卡/折号',to:{path:"/agent/personal"}},
        ],
        colData:[
          {name:"本月总输赢",view:0},
          {name:"本月总反水",view:0},
          {name:"本月总优惠",view:0},
          {name:"会员总人数",view:0},
          {name:"本月注册量",view:0},
          {name:"本月投注额",view:0}
        ]
      }
    },
    created(){
      agentReport().then((res)=> {
          this.colData[0].view=res.data.profitall||0;
          this.colData[1].view=res.data.ximafee||0;
          this.colData[2].view=res.data.couponfee||0;
          this.colData[3].view=res.data.reg||0;
          this.colData[4].view=res.data.monthly_reg||0;
          this.colData[5].view=res.data.betall||0;
          this.slotAccount=res.data.slotAccount||0;
        }).catch((err)=>{
          toast("流水查询失败");
        });
    },
    computed:{
      ...mapGetters(["userData"])
    },
    methods:{
      logOut:function(){
        logOut();
        this.$router.push("/index");
      }
    },
    components:{
      rowList,
      colList,
      accountTop
    }
  }
</script>
<style>

</style>
