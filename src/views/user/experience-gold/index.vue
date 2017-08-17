<template>
  <div class="user-experience-gold">
    <div v-show="step==1">
      <form-tip>
        8-88元体验金，无投注额要求，<br>
        满100元即可提款！
      </form-tip>
      <div class="txt-center">
        <img src="~static/images/icons/icon_profile.png" width="77" height="75">
        <div>
          <router-link v-if="accountName==''" to="/user/personal" class="link">
            立即完善个人资料
          </router-link>
        </div>
      </div>
      <v-button @click="step=2">领取体验金</v-button>
    </div>
    <div v-show="step==2">
      <div>
        恭喜您获得<span class="text_red">8元体验金</span>，选择游戏厅后即可使用。<br>
        <span class="text_red j-btnTtg">TTG</span>、
        <a href="/mobile/slotGame.jsp?showtype=NT" class="text_red">NT</a>需要先激活游戏，点击红色<span
        class="text_red j-btnTtg">TTG</span>、
        <a href="/mobile/slotGame.jsp?showtype=NT">NT</a>即可激活。<br>
        目前<a href="/mobile/slotGame.jsp?showtype=PT" class="text_red">PT</a>仅只支持手机操作，操作后可使用电脑下注。
      </div>
      <input-inline label="选择游戏平台" select="1">
        <select v-model="platform">
          <option value="">选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </input-inline>
      <v-button @click="submit">提交</v-button>
    </div>
    <div v-show="step==3" class="layout_icon_text_button02">
      <img class="layout_icon" src="static/images/icons/icon_ok02.png" width="57" height="57">
      <p>转入成功</p>
      <div class="btn_wrap no_padding">
        <router-link to="/" class="btn btn01">马上游戏</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import formTip from "components/form-tip"
  import vButton from "components/form/button"
  import inputInline from "components/form/input-inline"
  import {commitPT8Self} from "api/preferential-terms"
  import {platformData} from "@/assets/data"

  export default {
    data() {
      return {
        step: 1,
        platformData,
        platform: ""
      };
    },
    methods: {
      submit() {
        if (this.platform == "") return toast("请选择转入平台");
        commitPT8Self({platform: this.platform}).then(res => {
          toast(res.message);
          if (res.success) {
            this.step = 3;
          }
        }).catch(err => {
          toast("领取体验金失败了");
        })
      }
    },
    computed: {
      accountName() {
        return this.$store.getters.userData.accountName;
      }
    },
    created() {
    },
    components: {
      formTip, vButton, inputInline
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin.scss";

  .user-experience-gold {
    padding: r(30);
  }
</style>
