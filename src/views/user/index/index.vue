<template>
  <div class="user_center_content">
    <div class="page_notice j-marquee">
      <top-marquee></top-marquee>
    </div>
    <div class="user_info_wrap">
      <div class="user_info_name">
        <span class="user_name_text">{{userData.accountName}}</span><span class="vip_value">
        {{userData.level}}
      </span>
        <p>
          主账户&nbsp;&nbsp;&nbsp;<font>{{userData.accountMoney}}&nbsp;&nbsp;&nbsp;&nbsp;副账户&nbsp;&nbsp;<font>{{Deputy}}</font></font>
        </p><font>
      </font>
      </div>
      <font>
        <img class="avata_img" src="./img//avata.png">
        <img class="line_space" src="./img//bg02.png">
        <div class="user_center_menu_link display_flex_h">
          <div class="icon_with_text flex_1 with_red_dot">
            <router-link to="/user/message">
              <span class="icon icon_mail">
                 <span class="red_dot"></span>
              </span>
              <span>消息</span>
            </router-link>
          </div>
          <div class="icon_with_text flex_1">
            <router-link to="/user/security">
              <span class="icon icon_shield"></span><span>安全</span>
            </router-link>
          </div>
          <div class="icon_with_text flex_1">
            <router-link to="/user/history">
              <span
                class="icon icon_file"></span><span>记录</span>
            </router-link>
          </div>
        </div>
        <div class="link_wrap">
          <a href="javascript:void(0)" @click="showSheet=!showSheet"><span class="icon icon_chat04"></span></a>
          <router-link to="/user/personal" class="link_config2">
            <img src="./img/icon_config.png" alt="Config">
          </router-link>
        </div>
      </font></div>
    <money-option>存款、取款、转账选项</money-option>
    <tab-menu></tab-menu>
    <v-sheet @cover="sheet" :model="showSheet" :data="sheetData"></v-sheet>
  </div>
</template>
<script>
  import  "./index.scss";
  import topMarquee from "components/user-topMarquee"
  import tabMenu from "./components/discount-menu/index.vue"
  import moneyOption from "views/money/moneyOption.vue"
  import vSheet from "base/sheet/sheet.vue"

  import  {getAllMoney} from "api/user"

  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        sheetData: [
          {
            name: "400-2312314",
            method(){
              alert(1)
            }
          }
        ],
        Deputy: 0,
        showSheet: false
      };
    },
    watch: {},
    computed: {
        ...mapGetters(["userData"])
    },
    methods: {
      sheet(val){
        this.showSheet = val;
      }
    },
    created(){
      getAllMoney(["Deputy", "MAIN"], (data) => {
        this.Deputy = data[0].data;
        this.$store.dispatch("SET_USERDATA", {accountMoney: data[1].data})
      })
    },
    components: {
      moneyOption,
      tabMenu,
      topMarquee,
      vSheet
    }
  };
</script>
<!--<style lang="scss">-->
<!--@import "index.scss";-->
<!--</style>-->
