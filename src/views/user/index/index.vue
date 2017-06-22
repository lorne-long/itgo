<template>
  <div class="user_center_content">
    <div class="page_notice j-marquee">
      <top-marquee></top-marquee>
    </div>
    <account-top v-model="showSheet">头部内容</account-top>
    <money-option>存款、取款、转账选项</money-option>
    <tab-menu></tab-menu>
    <v-sheet  v-model="showSheet"  :data="sheetData"></v-sheet>
  </div>
</template>
<script>
  import  "./index.scss";
  import topMarquee from "components/user-topMarquee"
  import tabMenu from "./components/discount-menu/index"
  import accountTop from "components/account-top"
  import moneyOption from "components/moneyOption"
  import vSheet from "base/sheet/sheet"
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        sheetData: [
          {name:"在线客服"},
          {name:"电话回拨"},
          {name: "400-2312314",method(){ } }
        ],
        Deputy: 0,
        showSheet: false
      };
    },
    computed: {
        ...mapGetters(["userData"])
    },
    components: {
      moneyOption,
      tabMenu,
      topMarquee,
      vSheet,
      accountTop
    }
  };
</script>
