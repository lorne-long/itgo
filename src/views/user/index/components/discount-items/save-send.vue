<template>
  <div class="warp-public">
    <form-tip>
      无限次领取，红利单日上限3888元！<br>
      更有限时限量100%存送惊喜等你来抢！
      <router-link to="/preferential" class="text_red" slot="link">详情</router-link>
    </form-tip>
    <div class="form-public"><p>
      <input v-model.number="submitData.remit" placeholder="请填写转入金额" type="text">
      <span class="right_label">元</span></p>
      <p><select v-model="Type">
        <option value="">选择游戏平台</option>
        <option v-for="item in platformData" :value="item">{{item}}</option>
      </select></p>
      <p><select v-model="submitData.youhuiConfigId">
        <option value="">选择优惠幅度</option>
        <option v-for="(item,i) in filterData"
                :value="item.id">
          {{item.name}}
        </option>
      </select></p>
    </div>
    <div class="display_flex_h layout_2_line_label_text">
      <div class="flex_1"><p class="label_text">可获得红利（7天有效）</p>
        <p class="item_value text_red"><span class="j-percentMoney">{{percentMoney|toFixed}}</span> 元</p></div>
      <div class="flex_1"><p class="label_text">取款流水要求</p>
        <p class="item_value text_red"><span class="j-limitMoney">{{limitMoney|toFixed}}</span> 元</p></div>
    </div>
    <div class="display_flex_h layout_2_line_label_text">
      <div class="flex_1"><p class="label_text">投注限额</p>
        <p class="item_value text_red"><span>{{touzhuLimit|toFixed }}</span> 元</p></div>
      <div class="flex_1"></div>
    </div>
    <a href="javascript:void(0);" @click="submit" class="btn btn01">确定转入</a>
  </div>
</template>
<script>
  import  "./public.scss"
  import {youhui,getSelfYouHuiObject} from "api/preferential-terms"
  import formTip from "components/form-tip.vue"
  export default {
    data() {
      return {
        listData:[], //优惠数据

        percentMoney:0,  //可获得红利
        limitMoney:0, //取款流水要求
        touzhuLimit:0,//投注限额
        Type:'',//选择平台
        submitData:{  //数据提交
          youhuiConfigId:'', // true number
          youHuiType:"", //true string
          platform:"",// true string
          remit:''//true number
        }
      };
    },
    methods:{
      submit(){
        if(!this.check())return;
        getSelfYouHuiObject(this.submitData).then((data)=>{
            toast(data.message)
          }
        ).catch(()=>{
          toast("请求错误请稍后重新尝试...")
        })
      },
      check(){
        if(this.submitData.remit=='')toast("请输入转入金额");
        else if(this.Type=='')toast("请选择优惠平台");
        else if(this.submitData.youhuiConfigId=='')toast("请选择优惠幅度");
        else{
          return true
        }
      },
      computedMoney(){ //计算金额
        let _data=this.listData.filter(item=>item.id==this.submitData.youhuiConfigId);
        if(_data.length<=0||this.submitData.youhuiConfigId==''||this.submitData.remit=='')return;
        _data=_data[0];
        this.submitData.youHuiType=this.submitData.platform=_data.title;
        let _remit=Math.min(this.submitData.remit*_data.percent,_data.limitMoney);
        let _limitMoney=_data.betMultiples*(parseFloat(_remit)+parseFloat(this.submitData.remit));
        _remit=_remit<0 ? 0 : _remit;
        this.percentMoney=_remit;
        this.limitMoney=_limitMoney;
        this.touzhuLimit=(this.submitData.remit+_remit)*0.1
      },
      getYouHui(){
        youhui().then(data=>{
          if(data.success){
            this.listData=data.data
          }
        }).catch(()=>{
          toast("获取优惠信息失败...")
        });
      }
    },
    watch:{
      "submitData.youhuiConfigId"(val){
        val==""||this.computedMoney();
      },
      "submitData.remit"(val){
        val==""||this.computedMoney();
      }
    },
    computed:{
      filterData(){
        this.submitData.youhuiConfigId='';
        let filterList=this.listData.filter((item,i)=>{
          return item.platform==this.Type
        });
        if(filterList.length==1){
          this.submitData.youhuiConfigId=filterList[0].id;
        }
        return filterList;
      },
      platformData(){
        let pf=[]
        this.listData.forEach(item=>{
          if(!pf.includes(item.platform)){
              pf.push(item.platform)
          }
        });
        return pf;
      }
    },
    created(){
      this.getYouHui();
    },
    components:{
      formTip
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin";

  .layout_2_line_label_text {
    margin-bottom: 0.37333rem;
  }

  .layout_2_line_label_text .item_value {
  @include f($f20);
  }

  .layout_2_line_label_text .label_text {
    margin-bottom: 0.13333rem;
  @include f($f14);
    color: #999;
  }
</style>
