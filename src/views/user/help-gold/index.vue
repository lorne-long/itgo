<template>
  <div class="help-gold">
    <div v-show="!submitData.pno">
      <div v-for="(item,i) in listData" class="item-list   iconfont icon-arrow_r" @click="submitData.pno=item.pno">
        <div class="item-list-text">{{item.tempCreateTime.slice(0, 10)}}</div>
        <div class="item-list-money">{{item.promo}}元</div>
      </div>
    </div>
    <div  v-show="!!submitData.pno">
      <v-input select="1">
        <select v-model="submitData.platform">
          <option value="">选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </v-input>
      <v-button @click="submit">
        确定转入
      </v-button>
      <v-button @click="submitData.pno=submitData.platform=''" model="0">
        重新选择
      </v-button>
    </div>
    <form-tip>
      <p class="c-red">温馨提示：</p>
      1.请您确认“领取”，点击领取救援金转入游戏平台后，将无法更改。 <br>
      2.救援金有效时间为30天（从派发当天开始计算），规定时间内未领取会自动取消。
    </form-tip>
  </div>
</template>

<script>
  import {queryPTLosePromo, claimLosePromo} from "api/preferential-terms";
  import formTip from "components/form-tip"
  import vInput from "components/form"
  import vButton from "components/form/button"
  import {platformData} from "@/assets/data"
  export default {
    data() {
      return {
        platformData,
        listData: [],
        searchLogData: {
          pageIndex: 1,
          total: 0,
          size: 100
        },
        submitData: {
          pno: "",
          platform: "",
          flag: 2
        }
      };
    },
    methods: {
      submit() {
        if (this.submitData.pno == "") return toast("请选择救援金");
        if (this.submitData.platform == "") return toast("选择游戏平台");
        claimLosePromo(this.submitData).then(res => {
          toast(res.message);
          if (res.success) this.submitData.pno = "";
        }).catch(err => {
          toast("处理失败...")
        })
      }
    },
    created() {
      queryPTLosePromo(this.searchLogData).then(data => {
        if (data.success) {
          this.listData = data.data.pageContents.filter(function (item, i) {
            return item.status == 0
          });
        } else {
          toast(data.message);
        }
      }).catch(() => {
        toast('查询救援金错误...');
      });
    },
    components: {
      formTip,vInput,vButton
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .help-gold {
    padding: r(30);
    @include  f(28px);
    .item-list {
      position:relative;
      margin-bottom: r(20);
      padding: r(30);
      border: r(2) solid #ddd;
      border-radius: r(20);
      background-repeat: no-repeat;
      line-height: r(60);
      &::before{
        position: absolute;
        right:r(30);
        top:50%;
        transform: translateY(-50%);
      }
      .item-list-money {
        @include f(40px);
        color: $cl3;
      }
      .item-list-text{
        color: $cl4;
      }
    }

  }
</style>
