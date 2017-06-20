<template>
  <div class="warp-public">
      <form-tip>
        无限次领取，红利单日上限3888元！<br>
        更有限时限量100%存送惊喜等你来抢！
        <a href="/static/preferential.jsp" slot="link" class="text_red">详情 &gt;</a>
      </form-tip>
      <div class="form-public"><p><input @input="computedMoney" v-model.number="submitData.remit" placeholder="请填写转入金额" type="text"> <span class="right_label">元</span></p>
        <p><select v-model="Type">
          <option value="">选择游戏平台</option>
          <option value="PT">PT</option>
          <option value="QT">QT</option>
          <option value="DT">DT</option>
          <option value="MG">MG</option>
          <option value="TTG">TTG</option>
        </select></p>
        <p><select v-model="submitData.youhuiConfigId" @change="computedMoney">
          <option value="">选择优惠幅度</option>
          <option  v-for="(item,i) in filterData"
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
          <p class="item_value text_red"><span class="j-touzhuLimit">{{touzhuLimit }}</span> 元</p></div>
        <div class="flex_1"></div>
      </div>
      <a href="javascript:void(0);" @click="submit" class="btn btn01">确定转入</a>
  </div>
</template>
<script>
  import  "./public.scss"
  import { youhui,getSelfYouHuiObject} from "api/preferential-terms"
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
    props:{},
    methods:{
      submit(){
        if(!this.check())return;
        getSelfYouHuiObject(this.submitData).then((data)=>{
          if(data.success)
            {
            }else{toast(data.message)  }
          }
        ).catch(()=>{
          toast("请求错误请稍后重新尝试...")
        })
      },
      check(){
        console.log(this.submitData.remit)
        if(this.submitData.remit=='')toast("请输入转入金额");
        else if(this.Type=='')toast("请选择优惠平台");
        else if(this.submitData.youhuiConfigId=='')toast("请选择优惠幅度");
        else{ return true}
      },
      computedMoney(){ //计算金额
        let _data=this.listData.filter(item=>item.id==this.submitData.youhuiConfigId);
        if(_data.length<=0 ||  this.submitData.remit=='')return;
        _data=_data[0];
        this.submitData.youHuiType=this.submitData.platform=_data.title;
        let _remit=Math.min(this.submitData.remit*_data.percent,_data.limitMoney);;
        let _limitMoney=_data.betMultiples*(parseFloat(_remit)+parseFloat(this.submitData.remit));
        this.percentMoney=_remit<0?0:_remit;
        this.limitMoney=_remit<0?0:_limitMoney;
        this.touzhuLimit="麻痹不知道怎么算的";
      },
      getYouHui(){
        youhui().then(data=>{
          if(data.success){
            this.listData=data.data
          }
        }).catch(()=>{     toast("获取优惠信息失败...")  });
      }
    },
    watch:{
    },
    computed:{
        filterData(){
          this.submitData.youhuiConfigId='';
          return this.listData.filter((item,i)=>{
                return item.platform==this.Type
          });
        }
    },
    created(){
        this.getYouHui();
    },
    components:{
      "form-tip": require("./form-tip.vue")
    }
  };
</script>

<style lang="scss">
  @import "../../../../../assets/scss/mixin";
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
