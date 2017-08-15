<template>
  <div class="recommend-firend">
    <div v-show="step==1">
      <div class="link-box" @click="friendLink.$copy()">
        您的专属推荐链接 (点击可复制)
        <div class="link-href" ref="linkurl">{{friendLink}}</div>
      </div>
      <div class="item-list  iconfont icon-arrow_r" @click="step=2" >
        推荐奖金
        <div class="item-list-money">{{money}}</div>
      </div>
    </div>
    <div v-show="step==2">
      <div class="form-control">
        <select v-model="myData.platform">
          <option value="">请选择转入平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </div>
      <div class="form-control">
        <input v-model.number="myData.money" type="text" placeholder="请填写转入金额">
        <span class="right-info">元</span>
      </div>
      <div class="btn-submit" @click="submit">确定转入</div>
    </div>
    <form-tip>
      <p class="c-red">温馨提示：</p>
      1.被介绍人需要在介绍人的<span class="c-red">专属链接</span>下进行注册 <br>
      2.被介绍人<span class="c-red">当日的负盈利</span>,会有30%在隔日18:00前派发给介绍人. <br>
      3.如有疑问请及时联系24小时在线客服进行咨询.
    </form-tip>
  </div>
</template>
<script>
  import {queryFriendBonue, transferInforFriend} from "api/preferential-terms";
  import formTip from "components/form-tip.vue"
  import {platformData} from "@/assets/data"

  export default {
    data() {
      return {
        platformData,
        step: 1,
        money: 0,
        url: "",
        myData: {
          platform: "", //true string
          money: ""
        }
      };
    },
    computed: {
      friendLink() {
        return window.location.origin + "?friendcode=" + this.url;
      }
    },
    methods: {
      submit() {
        if (this.myData.platform == "") return toast("请选择转入平台")
        if (this.myData.money == "") return toast("请输入金额")
        if (this.myData.money > this.money) return toast("推荐奖励金额不足")
        transferInforFriend(this.myData).then(res => {
          toast(res.message)
        }).catch(err => {
          toast("领取失败")
        })
      }
    },
    created() {
      queryFriendBonue().then(data => {
        this.money = data.data.money;
        this.url = data.data.url;
      })
    },
    components: {
      formTip
    }
  };
</script>

<style lang="scss">
  @import "~assets/scss/mixin.scss";
  .recommend-firend {
    padding: r(30);
    @include f(28px);
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
    .btn-submit {
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
    .link-box, .item-list {
      margin-bottom: r(30);
      padding: r(30);
      border: r(2) dashed #1096b9;
      border-radius: r(10);
      line-height: r(48);
      color: #999;
    }
    .link-href {
      @include f(32px);
      color: #282828;
    }

    .item-list {
      position:relative;
      margin-bottom: r(20);
      padding: r(30);
      border: r(2) solid #ddd;
      border-radius: r(20);
      background-repeat: no-repeat;
      background-size: 7px 12px;
      &::before{
        position: absolute;
        right:r(30);
        top:50%;
        transform: translateY(-50%);
      }
      .item-list-money {
        @include f(40px);
        line-height: 1.8;
        color: $cl3;
      }
    }
  }
</style>
