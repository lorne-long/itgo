<template>
  <div class="user_center_content">
    <div class="page_notice j-marquee">
      <v-announceMent></v-announceMent>
    </div>
    <div class="user_info_wrap">
      <div class="user_info_name">
        <span class="user_name_text">{{userData.accountName}}</span><span class="vip_value">
        {{userData.level}}
      </span>
        <p>
          主账户&nbsp;&nbsp;&nbsp;<font>{{userData.accountMoney}}&nbsp;&nbsp;&nbsp;&nbsp;副账户&nbsp;&nbsp;<font>{{Deputy}}</font></font>
        </p><font>
      </font></div>
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
            <router-link to="/pwd/index">
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
          <a href="javascript:void(0)" class="j-openCustomerServices"><span class="icon icon_chat04"></span></a>
          <a href="/mobile/personal.jsp" class="link_config2"><img src="./img/icon_config.png" alt="Config"></a>
        </div>
      </font></div>
    <money-option>存款、取款、转账选项</money-option>
    <tab-menu></tab-menu>
  </div>
</template>
<script>
  import  "./index.scss";
  import  {getAllMoney} from "api/user/getMoney"
  export default {
    data() {
      return {
        Deputy:0,
      };
    },
    computed:{
      userData(){
        return this.$store.state.userData;
      }
    },
    methods:{},
    created(){
      getAllMoney(["Deputy","MAIN"],(data)=>{
        this.Deputy=data[0].data;
        this.$store.dispatch("setUserData",{accountMoney:data[1].data})
      })
    },
    components:{
      "money-option":require("../../money/moneyOption.vue"),
      "tab-menu":require("./components/discount-menu/index.vue"),
      "v-announceMent":require("components/announceMent.vue")
    }
  };
</script>
<!--<style lang="scss">-->
<!--@import "index.scss";-->
<!--</style>-->
