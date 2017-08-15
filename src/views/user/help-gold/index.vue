<template>
  <div class="help-gold">
    <div v-show="!submitData.pno">
      <div v-for="(item,i) in listData" class="item-list   iconfont icon-arrow_r" @click="submitData.pno=item.pno">
        <div class="item-list-text">{{item.tempCreateTime.slice(0, 10)}}</div>
        <div class="item-list-money">{{item.promo}}元</div>
      </div>
    </div>
    <div  v-show="!!submitData.pno">
      <div class="form-control">
        <select v-model="submitData.platform">
          <option value="">选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
        <i class="right-info iconfont icon-arrow_d"></i>
      </div>
      <div class="btn-submit " @click="submit">确定转入</div>
      <div class="btn-reset" @click="submitData.pno=submitData.platform=''">重新选择</div>
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
  import formTip from "components/form-tip.vue"
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
      formTip
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
    .form-control {
      position: relative;
      height: r(84);
      line-height: r(84);
      overflow: hidden;
      border: r(2) solid #ccc;
      padding: 0 r(24);
      border-radius: 50em;
      margin-bottom: r(32);
      background: #fff;
      @include f(28px);
      select, input {
        font-size: inherit;
        border: none;
        color: #333;
        outline: none;
        height: 100%;
        width: 100%;
        vertical-align: top;
        text-indent: 0.5em;
      }
      .right-info {
        position: absolute;
        height: 100%;
        top: 0;
        right: r(32);

      }
    }
    .btn-reset, .btn-submit {
      display: block;
      margin: 0 auto;
      background: $btn-bg1;
      text-align: center;
      @include f(36px);
      color: #fff;
      width: 90%;
      border-radius: r(100);
      line-height: r(88);
    }
    .btn-reset{
      background: $btn-bg2;
      margin-top: r(20);
    }
  }
</style>
