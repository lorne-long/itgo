<template>
  <div class="user-wash-code">


    <div class="layout_form no_padding with_last_border" v-show="!show">
      <v-input select="1">
        <select class="j-plat" v-model="type">
          <option value="">选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </v-input>

      <v-button @click="search">查询</v-button>

    </div>
    <div v-show="show">
      <p class="total_touzhue">
        总有效投注额{{validAmount}}
      </p>
      <div class="layout_text_side rebate_game_info">
        <div class="left_text">
          <p>
            洗码比率 {{rate}}
          </p>
        </div>
        <div class="right_text text_red">{{ximaAmount}}</div>
      </div>
      <v-button @click="doXima">
        确定洗码
      </v-button>
      <v-button @click="show=false">
        重新选择
      </v-button>
    </div>
    <form-tip>
      所有平台 (非旋转类) 可随时自助洗码。<br>
      若当日没有洗码，次日自动派发到主账户！
      <router-link to="/preferential" class="text_red" slot="link">详情</router-link>
    </form-tip>
  </div>
</template>

<script>

  import vButton from "components/form/button"
  import vInput from "components/form"
  import {getXimaData, doXima} from "api/preferential-terms"
  import formTip from "components/form-tip"
  import {platformData} from "@/assets/data"

  export default {
    data() {
      return {
        type: "",
        platformData,
        validAmount: 0,
        ximaAmount: 0,
        rate: 0,
        show: false
      };
    },
    methods: {
      search() {
        if (this.type == "") return toast("请选择游戏平台!");
        getXimaData({gameId: this.type}).then(data => {
          if (data.success) {
            this.validAmount = data.data.validAmount;
            this.ximaAmount = data.data.ximaAmount;
            this.rate = data.data.rate;
            this.show = true;
          } else {
            toast(data.message);
          }
        }).catch(() => {
          toast("请求错误请稍后重新尝试...");
        })
      },
      doXima() {
        doXima({gameId: this.type}).then(res => {
          toast(res.message);
          if (res.success) {
            this.show = false;
          }
        }).catch(() => {
          toast("洗码失败请重新尝试...");
        })
      }
    },
    computed: {},
    created() {
    },
    components: {
      formTip, vInput, vButton
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .user-wash-code {
    padding: r(30);
  }
</style>
