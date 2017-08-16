<template>
  <div class="bank-list">
    <h2 class="bank-title">{{text}}</h2>
    <div class="bank-list-data">
      <router-link class="bank-item bank-item-add" to="/datum/addbank" v-if="list.length<3" tag="div">
        + 添加银行卡
      </router-link>
      <div class="bank-item" v-for="(item,i) in list">
        <div class="">{{item.bankname}}</div>
        <img src="./img/bg06.png" class="space">
        <div class="">**** **** **** {{item.bankno}}</div>
        <div class="">{{userData.accountName}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {findUserBankList} from "api/payment"
  import {mapGetters} from 'vuex'
  export default {
    props: {
      text: {
        type: String,
        default: "银行卡资料"
      }
    },
    data() {
      return {
        list: []
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created() {
      findUserBankList().then(data => {
        if (data.success) {
          this.list = data.data;
        } else {
          toast(data.message)
        }
      }).catch(err => {
        toast("银行卡加载失败");
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin.scss";

  .bank-list {
    @include f(28px);
    padding: 0 r(30);
    .bank-title {
      @include f(32px);
      color: $cl4;
      line-height: 3;
    }
    .bank-list-data {
      overflow: hidden;
      color: #fff;
      .bank-item {
        float: left;
        position: relative;
        width: 48%;
        margin:1%;
        height: r(196);
        padding: r(30);
        line-height: 1.3;
        background: url("./img/01.jpg") no-repeat;
        background-size: 100% 100%;
        border-radius: r(20);
      }
      .bank-item-add{
        background: none;
        border: r(2) dashed $cl3;
        color:$cl3;
        line-height:r(136);
        text-align: center;
      }
    }
  }
</style>
