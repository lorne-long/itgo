<template>
  <div class="user_rescue_content user_center_nav_content show">
    <form-tip>
      救援金有效时间为30天(从派发当天开始计算)，<br>
      规定时间内未领取将自动取消，10倍流水。
      <a href="/mobile/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
    </form-tip>
    <div class="rescue_content_step01 user_center_nav_content_step show  j-rescue1">
      <div class="layout_item_with_arrow_link j-losePromoList" data-is="false">

       <!--<div v-for="(item,i) in listData" class="item_list" data-pno="{{iotem.pno}}">-->
        <!--<a href="javascript:void(0)">-->
          <!--<div class="item_list_date">{{item.tempCreateTime.slice(0,10)}} </div>-->
          <!--<div class="item_list_money text_red">{{item.promo}}元</div>-->
          <!--</a>-->
        <!--</div>-->

      </div>
    </div>
    <div class="rescue_content_step02 user_center_nav_content_step  j-rescue2">
      <div class="layout_form no_padding rescue_content_step02 with_last_border ">
        <div class="form_field_warp">
          <div class="form_field form_field_no_label">
            <div class="form_field_input">
              <select class="j-platRescue">
                <option value="">选择游戏平台</option>
                <option value="PT">PT</option>
                <option value="QT">QT</option>
                <option value="DT">DT</option>
                <option value="TTG">TTG</option>
                <option value="NT">NT</option>
                <option value="MG">MG</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form_btn_wrap">
          <a href="javascript:void(0)" class="btn btn01 j-submitRescue">确定转入</a>
          <a href="javascript:void(0)" class="btn btn03 j-backRescue1">重新选择</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  "./public.scss"
  import  {queryPTLosePromo} from "api/preferential-terms";
  export default {
    data() {
      return {
             listData:[],
            searchLogData:{
              pageIndex:1,
              total:0,
              size:10
            }
      };
    },
    props:{},
    methods:{},
    computed:{},
    created(){
      queryPTLosePromo(this.searchLogData).then(data=>{
          if(data.success){
           this.listData=data.data.records;
           }else{
             toast(data.message);
          }
      }).catch(()=>{
        toast('救援金记录拉取失败');
      });
    },
    components:{
      "form-tip": require("./form-tip.vue")
    }
  };
</script>

<style>
</style>
