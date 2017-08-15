<template>
  <div class="discount-code save-send">
    <div class="form-public">
      <div class="form-control">
        <input v-model.number="submitData.remit" placeholder="请填写转入金额" type="text">
        <span class="right-info">元</span>
      </div>
      <div class="form-control"><select v-model="Type">
        <option value="">选择游戏平台</option>
        <option v-for="item in platformData" :value="item">{{item}}</option>
      </select></div>
      <div class="form-control"><select v-model="submitData.youhuiConfigId">
        <option value="">选择优惠幅度</option>
        <option v-for="(item,i) in filterData"
                :value="item.id">
          {{item.name}}
        </option>
      </select>
      </div>
    </div>
    <div class="money-tip">
      <div class="tip-item">
        可获得红利（7天有效）
        <div class="item-money">
          {{percentMoney | toFixed}} 元
        </div>
      </div>
      <div class="tip-item">
        取款流水要求
        <div class="item-money text_red">
          {{limitMoney | toFixed}} 元
        </div>
      </div>
      <div class="tip-item">
        投注限额
        <div class="item-money">{{touzhuLimit | toFixed }} 元</div>
      </div>
    </div>
    <div @click="submit" class="btn-submit">确定转入</div>
    <form-tip>
      <div class="c-red">温馨提示：</div>
      <span class="c-red">1.每天的00:00-01:00为系统结算时间，暂时无法使用自助存送。</span><br>
      2.申请存送后台彩金会自动添加到相应平台，您直接进入游戏即可。 <br>
      3.老虎机存送优惠，存款10元后方可自主操作。
    </form-tip>
  </div>
</template>
<script>
  import {youhui, getSelfYouHuiObject} from "api/preferential-terms"
  import formTip from "components/form-tip.vue"

  export default {
    data() {
      return {
        listData: [], //优惠数据

        percentMoney: 0,  //可获得红利
        limitMoney: 0, //取款流水要求
        touzhuLimit: 0,//投注限额
        Type: '',//选择平台
        submitData: {  //数据提交
          youhuiConfigId: '', // true number
          youHuiType: "", //true string
          platform: "",// true string
          remit: ''//true number
        }
      };
    },
    methods: {
      submit() {
        if (!this.check()) return;
        getSelfYouHuiObject(this.submitData).then((data) => {
            toast(data.message)
          }
        ).catch(() => {
          toast("请求错误请稍后重新尝试...")
        })
      },
      check() {
        if (this.submitData.remit == '') toast("请输入转入金额");
        else if (this.Type == '') toast("请选择优惠平台");
        else if (this.submitData.youhuiConfigId == '') toast("请选择优惠幅度");
        else {
          return true
        }
      },
      computedMoney() { //计算金额
        let _data = this.listData.filter(item => item.id == this.submitData.youhuiConfigId);
        if (_data.length <= 0 || this.submitData.youhuiConfigId == '' || this.submitData.remit == '') return;
        _data = _data[0];
        this.submitData.youHuiType = this.submitData.platform = _data.title;
        let _remit = Math.min(this.submitData.remit * _data.percent, _data.limitMoney);
        let _limitMoney = _data.betMultiples * (parseFloat(_remit) + parseFloat(this.submitData.remit));
        _remit = _remit < 0 ? 0 : _remit;
        this.percentMoney = _remit;
        this.limitMoney = _limitMoney;
        this.touzhuLimit = (this.submitData.remit + _remit) * 0.1
      },
      getYouHui() {
        youhui().then(data => {
          if (data.success) {
            this.listData = data.data
          }
        }).catch(() => {
          toast("获取优惠信息失败...")
        });
      }
    },
    watch: {
      "submitData.youhuiConfigId"(val) {
        val == "" || this.computedMoney();
      },
      "submitData.remit"(val) {
        val == "" || this.computedMoney();
      }
    },
    computed: {
      filterData() {
        this.submitData.youhuiConfigId = '';
        let filterList = this.listData.filter((item, i) => {
          return item.platform == this.Type
        });
        if (filterList.length == 1) {
          this.submitData.youhuiConfigId = filterList[0].id;
        }
        return filterList;
      },
      platformData() {
        let pf = []
        this.listData.forEach(item => {
          if (!pf.includes(item.platform)) {
            pf.push(item.platform)
          }
        });
        return pf;
      }
    },
    created() {
      this.getYouHui();
    },
    components: {
      formTip
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin";

  .save-send {
    @include f(28px);
    .money-tip {
      overflow: hidden;
      color: $cl4;
      .tip-item {
        float: left;
        width: 50%;
        .item-money{
          color: $cl3;
          @include  f(40px);
          line-height:2;
        }
      }
    }
  }

</style>
