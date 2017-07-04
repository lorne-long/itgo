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
          {name:"在线客服",target:"_blank",href:"https://www.ll-kefu.com/chat/chatClient/chatbox.jsp?companyID=8999&configID=37&info=userId%3Dwoodytest%26loginname%3Dwoodytest%26grade%3D3%26name%3D%E7%A6%BB%E5%BC%80%26gender%3D%26mobileNo%3D%26memo%3D%26hashCode%3Df18bb7d1b4df6325aac5c7e50fa6f5e8%26timestamp%3D1498730513813"},
          {name:"电话回拨",to:{path:"/datum/backCall"}},
          {name: "400-2312314",href:"tel:400-2312314" }
        ],
        Deputy: 0,
        showSheet: false
      };
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
